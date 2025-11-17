const fs = require('fs');

// Read the tools file
const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');

// Extract category information using regex
const categoryMatches = toolsData.match(/"category": "([^"]+)"/g);

// Count categories
const categories = {};
if (categoryMatches) {
  categoryMatches.forEach(match => {
    const category = match.replace('"category": "', '').replace('"', '');
    categories[category] = (categories[category] || 0) + 1;
  });
}

// Sort and display results
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`${category}: ${count}`);
  });

console.log(`\nTotal categories: ${Object.keys(categories).length}`);
console.log(`Total tools: ${categoryMatches ? categoryMatches.length : 0}`);