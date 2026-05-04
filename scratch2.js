const fs = require('fs');
const file = 'src/app/admin/page.jsx';
let content = fs.readFileSync(file, 'utf8');

// Color mapping (Dark hardcoded -> Light default, Dark specific)
// bg-[#0B0F1A] -> bg-slate-50 dark:bg-[#0B0F1A]
// bg-[#11131A] -> bg-white dark:bg-[#11131A]
// bg-[#050816] -> bg-slate-100 dark:bg-[#050816]
// bg-[#111427] -> bg-white dark:bg-[#111427]
// text-white -> text-slate-900 dark:text-white
// text-[#8A8F98] -> text-slate-500 dark:text-[#8A8F98]
// border-[#242835] -> border-slate-200 dark:border-[#242835]

// We use lookarounds to ensure we aren't already prefixing it.
const map = {
    'bg-\\[#11131A\\]': 'bg-white dark:bg-[#11131A]',
    'bg-\\[#0B0F1A\\]': 'bg-slate-50 dark:bg-[#0B0F1A]',
    'bg-\\[#050816\\]': 'bg-slate-100 dark:bg-[#050816]',
    'bg-\\[#111427\\]': 'bg-white dark:bg-[#111427]',
    'border-\\[#242835\\]': 'border-slate-200 dark:border-[#242835]',
    'text-\\[#8A8F98\\]': 'text-slate-500 dark:text-[#8A8F98]',
};

for (const [key, val] of Object.entries(map)) {
    const regex = new RegExp(`(?<!dark:)${key}`, 'g');
    content = content.replace(regex, val);
}

// Special handling for white/opacity
content = content.replace(/(?<!dark:)(bg-white(?:\/\d+)?)(?![\w-])/g, (match) => {
    // bg-white -> bg-slate-900 dark:bg-white
    // bg-white/5 -> bg-slate-900/5 dark:bg-white/5
    if (match === 'bg-white') return 'bg-slate-900 dark:bg-white';
    return match.replace('bg-white', 'bg-slate-900') + ' dark:' + match;
});

content = content.replace(/(?<!dark:)(text-white(?:\/\d+)?)(?![\w-])/g, (match) => {
    return match.replace('text-white', 'text-slate-900') + ' dark:' + match;
});

content = content.replace(/(?<!dark:)(border-white(?:\/\d+)?)(?![\w-])/g, (match) => {
    return match.replace('border-white', 'border-slate-200') + ' dark:' + match;
});

fs.writeFileSync('src/app/admin/page.jsx', content);
console.log("Applied light mode classes successfully.");
