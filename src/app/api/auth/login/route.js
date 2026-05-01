import { NextResponse } from "next/server";
import { createSession, buildSessionCookie } from "@/lib/auth";

// Simple in-memory rate limiter
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  
  if (!record) return false;
  
  // Clean up expired lockouts
  if (record.lockedUntil && now > record.lockedUntil) {
    loginAttempts.delete(ip);
    return false;
  }
  
  if (record.lockedUntil) return true;
  
  return false;
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
  
  record.count += 1;
  
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION;
  }
  
  loginAttempts.set(ip, record);
}

function clearAttempts(ip) {
  loginAttempts.delete(ip);
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Account locked for 15 minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    // Sanitize input length
    if (username.length > 100 || password.length > 200) {
      return NextResponse.json(
        { error: "Invalid input." },
        { status: 400 }
      );
    }

    // Check credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      console.error("ADMIN_USERNAME or ADMIN_PASSWORD env vars not set!");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const usernameMatch = username === validUsername;
    const passwordMatch = password === validPassword;

    if (!usernameMatch || !passwordMatch) {
      recordFailedAttempt(ip);
      
      // Intentionally vague error message to prevent enumeration
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Success — clear rate limit and create session
    clearAttempts(ip);
    const token = await createSession(username);

    const response = NextResponse.json({ success: true });
    const cookie = buildSessionCookie(token);
    response.cookies.set(cookie);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
