const fs = require('fs');

// Read the categories file
const categoriesData = fs.readFileSync('./data/categories.ts', 'utf8');

// Extract categories with 0 tools
const zeroToolCategories = [];
const categoryMatches = categoriesData.match(/name: "([^"]+)",\s+icon: "[^"]+",\s+toolCount: (\d+),/g);

if (categoryMatches) {
  categoryMatches.forEach(match => {
    const nameMatch = match.match(/name: "([^"]+)"/);
    const countMatch = match.match(/toolCount: (\d+)/);
    
    if (nameMatch && countMatch) {
      const name = nameMatch[1];
      const count = parseInt(countMatch[1]);
      
      if (count === 0) {
        zeroToolCategories.push(name);
      }
    }
  });
}

console.log('Categories with 0 tools:');
zeroToolCategories.forEach(cat => console.log('- ' + cat));
console.log(`\nTotal categories with 0 tools: ${zeroToolCategories.length}`);

// Also list all categories and their tool counts
console.log('\nAll categories:');
const allCategories = [];
if (categoryMatches) {
  categoryMatches.forEach(match => {
    const nameMatch = match.match(/name: "([^"]+)"/);
    const countMatch = match.match(/toolCount: (\d+)/);
    
    if (nameMatch && countMatch) {
      const name = nameMatch[1];
      const count = parseInt(countMatch[1]);
      allCategories.push({ name, count });
    }
  });
}

// Sort by tool count descending
allCategories.sort((a, b) => b.count - a.count);
allCategories.forEach(cat => console.log(`${cat.name}: ${cat.count}`));