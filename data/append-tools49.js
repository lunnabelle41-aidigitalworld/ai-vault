const fs = require('fs');
const path = require('path');

// Read the new tools
const newToolsData = fs.readFileSync(path.join(__dirname, 'new_tools_add49.ts'), 'utf8');
const newToolsMatch = newToolsData.match(/export const newTools = (\[[\s\S]*?\]);/);

// Parse the tools data
let newToolsString = newToolsMatch[1];
// Fix the formatting to match the existing tools file
newToolsString = newToolsString.replace(/"/g, '"')
  .replace(/\\'/g, "'")
  .replace(/\\n/g, "\n")
  .replace(/\\t/g, "\t");

// Read the existing tools file
let toolsContent = fs.readFileSync(path.join(__dirname, 'tools.ts'), 'utf8');

// Find the position to insert new tools (before the closing bracket of the array)
const insertPosition = toolsContent.lastIndexOf('];');

// Insert the new tools before the closing bracket
const updatedContent = toolsContent.slice(0, insertPosition) + 
  '  // AI for Retail & E-commerce - 10 tools\n' +
  '  // AI for Travel & Tourism - 10 tools\n' +
  '  // AI for Real Estate - 10 tools\n' +
  '  // AI for Banking & Finance - 10 tools\n' +
  '  // AI for Education & Learning - 10 tools\n' +
  newToolsString.slice(1, -1) + ',\n];';

// Write the updated content back to the file
fs.writeFileSync(path.join(__dirname, 'tools.ts'), updatedContent);

console.log('Successfully appended 50 new tools to tools.ts');