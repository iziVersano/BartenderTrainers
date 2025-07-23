#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to calculate relative path
function getRelativePath(fromFile, toPath) {
  const fromDir = path.dirname(fromFile);
  const absoluteToPath = path.resolve(__dirname, 'src', toPath.replace('@/', ''));
  const relativePath = path.relative(fromDir, absoluteToPath);
  
  // Ensure the path starts with './' for relative imports
  if (!relativePath.startsWith('.')) {
    return './' + relativePath;
  }
  return relativePath;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace @/ imports with relative paths
  content = content.replace(/from ["']@\/([^"']+)["']/g, (match, importPath) => {
    changed = true;
    const relativePath = getRelativePath(filePath, '@/' + importPath);
    return `from "${relativePath}"`;
  });
  
  content = content.replace(/import ["']@\/([^"']+)["']/g, (match, importPath) => {
    changed = true;
    const relativePath = getRelativePath(filePath, '@/' + importPath);
    return `import "${relativePath}"`;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in: ${filePath}`);
  }
}

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTsFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fix imports in all TypeScript files
const srcDir = path.join(__dirname, 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files. Fixing imports...`);

tsFiles.forEach(fixImportsInFile);

console.log('Import fixing complete!');