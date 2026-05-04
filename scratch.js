const fs = require('fs');
const file = 'src/app/admin/page.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace backgrounds
content = content.replace(/bg-\[#11131A\]/g, "bg-white dark:bg-[#11131A]");
content = content.replace(/bg-\[#0B0F1A\]/g, "bg-slate-50 dark:bg-[#0B0F1A]");
content = content.replace(/bg-\[#050816\]/g, "bg-slate-100 dark:bg-[#050816]");
content = content.replace(/bg-\[#111427\]/g, "bg-white dark:bg-[#111427]");

// Replace text
content = content.replace(/text-white(\/\d+)?/g, (match, p1) => {
    return `text-slate-900${p1 || ''} dark:${match}`;
});
content = content.replace(/text-\[#8A8F98\]/g, "text-slate-500 dark:text-[#8A8F98]");

// Replace borders
content = content.replace(/border-white(\/\d+)?/g, (match, p1) => {
    return `border-slate-200 dark:${match}`;
});
content = content.replace(/border-\[#242835\]/g, "border-slate-200 dark:border-[#242835]");

// Replace transparent backgrounds (hover effects etc)
content = content.replace(/bg-white(\/\d+)?/g, (match, p1) => {
    if(!p1) return "bg-slate-900 dark:bg-white"; // this might break actual white bgs.
    return `bg-slate-900${p1} dark:${match}`;
});

// Avoid duplicate prefixes if run multiple times
content = content.replace(/bg-white dark:bg-white dark:bg-\[#11131A\]/g, "bg-white dark:bg-[#11131A]"); // Just in case

fs.writeFileSync('src/app/admin/page.jsx.light', content);
console.log("Done");
