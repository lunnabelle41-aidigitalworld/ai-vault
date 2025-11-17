const fs = require('fs');
const path = require('path');

// Read the new categories
const newCategoriesData = fs.readFileSync(path.join(__dirname, 'new_categories_add43.ts'), 'utf8');

// Extract the categories array using a more robust approach
const newCategoriesMatch = newCategoriesData.match(/export const newCategories = (\[[\s\S]*?\]);/);

// Parse the categories using eval (safe in this context since we control the input)
let newCategories;
try {
  newCategories = eval(newCategoriesMatch[1]);
} catch (error) {
  console.error('Error parsing categories:', error);
  process.exit(1);
}

// Read the existing categories file
let categoriesContent = fs.readFileSync(path.join(__dirname, 'categories.ts'), 'utf8');

// Find the position to insert new categories (before the closing bracket of the array)
const insertPosition = categoriesContent.lastIndexOf('];');

// Convert new categories to the proper format
let newCategoriesString = '';
newCategories.forEach(category => {
  newCategoriesString += '  {\n';
  newCategoriesString += `    name: "${category.name}",\n`;
  newCategoriesString += `    icon: "${category.icon}",\n`;
  newCategoriesString += `    toolCount: ${category.toolCount},\n`;
  newCategoriesString += '    subcategories: [\n';
  
  category.subcategories.forEach(subcategory => {
    // Escape any quotes in the values
    const name = subcategory.name.replace(/"/g, '\\"');
    const favicon = subcategory.favicon.replace(/"/g, '\\"');
    const website = subcategory.website.replace(/"/g, '\\"');
    newCategoriesString += `      { name: "${name}", favicon: "${favicon}", website: "${website}" },\n`;
  });
  
  newCategoriesString += '    ]\n';
  newCategoriesString += '  },\n';
});

// Insert the new categories before the closing bracket
const updatedContent = categoriesContent.slice(0, insertPosition) + 
  newCategoriesString + 
  '];';

// Write the updated content back to the file
fs.writeFileSync(path.join(__dirname, 'categories.ts'), updatedContent);

console.log('Successfully appended 5 new categories to categories.ts');