import React, { useRef, useEffect, useState, useCallback } from 'react';

const SoundManager = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const oscillatorsRef = useRef([]);

    // Create ambient synth sound
    const createAmbientSound = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.connect(audioContextRef.current.destination);
            gainNodeRef.current.gain.value = 0;
        }

        const ctx = audioContextRef.current;
        const gain = gainNodeRef.current;

        // Stop existing oscillators
        oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        oscillatorsRef.current = [];

        // Create layered ambient sound
        const frequencies = [
            { freq: 80, type: 'sine', volume: 0.15 },
            { freq: 160, type: 'sine', volume: 0.08 },
            { freq: 240, type: 'triangle', volume: 0.05 },
            { freq: 320, type: 'sine', volume: 0.03 }
        ];

        frequencies.forEach(({ freq, type, volume }) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc.type = type;
            osc.frequency.value = freq;
            oscGain.gain.value = volume;

            osc.connect(oscGain);
            oscGain.connect(gain);

            osc.start();
            oscillatorsRef.current.push(osc);
        });

        // Add subtle LFO modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1;
        lfoGain.gain.value = 5;
        lfo.connect(lfoGain);
        oscillatorsRef.current[0] && lfoGain.connect(oscillatorsRef.current[0].frequency);
        lfo.start();
        oscillatorsRef.current.push(lfo);

    }, []);

    const toggleSound = useCallback(() => {
        if (!audioContextRef.current) {
            createAmbientSound();
        }

        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        setIsPlaying(!newMutedState);

        // Fade in/out
        if (gainNodeRef.current) {
            const currentTime = audioContextRef.current.currentTime;
            gainNodeRef.current.gain.cancelScheduledValues(currentTime);
            gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, currentTime);
            gainNodeRef.current.gain.linearRampToValueAtTime(
                newMutedState ? 0 : 0.15,
                currentTime + 0.5
            );
        }
    }, [isMuted, createAmbientSound]);

    // Click sound effect
    const playClickSound = useCallback(() => {
        if (isMuted || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    }, [isMuted]);

    // Add click sound to links
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                playClickSound();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [playClickSound]);

    return (
        <button
            onClick={toggleSound}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: isPlaying
                    ? 'linear-gradient(135deg, #915eff, #ff4c9f)'
                    : 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                boxShadow: isPlaying
                    ? '0 0 20px rgba(145, 94, 255, 0.5)'
                    : 'none'
            }}
            title={isMuted ? 'Enable ambient sound' : 'Disable sound'}
        >
            {isMuted ? '🔇' : '🔊'}
        </button>
    );
};

export default SoundManager;
