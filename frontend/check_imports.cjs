const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

// Walk directory
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(srcDir);

// Verify exact casing of a file/folder path by checking readdir on the parent repeatedly
function getExactCasedPath(absoluteTarget) {
  if (!fs.existsSync(absoluteTarget)) return null;

  const parts = absoluteTarget.split(path.sep);
  let currentPath = parts[0] + path.sep; // C:\

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part === '') continue;

    // Read directory content to find exact upper/lower case match
    try {
      const items = fs.readdirSync(currentPath);
      const exactMatch = items.find((item) => item.toLowerCase() === part.toLowerCase());
      if (!exactMatch) return null; // Should not happen since existsSync was true
      currentPath = path.join(currentPath, exactMatch);
    } catch(e) {
      return null;
    }
  }
  return currentPath;
}

// Check imports
let fixesCount = 0;

for (const sourceFile of files) {
  let content = fs.readFileSync(sourceFile, 'utf8');
  let newContent = content;

  // regex to match import/export paths
  const importRegex = /(?:import|export)[^'"]+['"]([^'"]+)['"]/g;

  let match;
  while ((match = importRegex.exec(newContent)) !== null) {
    const originalImport = match[1];
    
    // Process only local and alias imports
    if (!originalImport.startsWith('.') && !originalImport.startsWith('@/')) {
      continue;
    }

    let absoluteTarget;
    let isAlias = originalImport.startsWith('@/');

    if (isAlias) {
      absoluteTarget = path.join(srcDir, originalImport.slice(2));
    } else {
      absoluteTarget = path.resolve(path.dirname(sourceFile), originalImport);
    }

    // Attempt to guess extensions if missing
    let targetWithExt = absoluteTarget;
    let found = false;
    let exts = ['', '.jsx', '.js', '/index.jsx', '/index.js'];
    
    for (const ext of exts) {
      if (fs.existsSync(absoluteTarget + ext)) {
        const stat = fs.statSync(absoluteTarget + ext);
        if (!stat.isDirectory()) {
           targetWithExt = absoluteTarget + ext;
           found = true;
           break;
        }
      }
    }

    if (!found) {
      console.log(`[NOT FOUND] ${originalImport} in ${sourceFile}`);
      continue;
    }

    // Now verify exact casing!
    const exactTarget = getExactCasedPath(targetWithExt);
    if (!exactTarget) {
      console.log(`[EXACT CASE FAIL] ${originalImport} in ${sourceFile}`);
      continue;
    }

    // Compute relative path from sourceFile to exactTarget
    let relativeImport = path.relative(path.dirname(sourceFile), exactTarget);
    
    // Normalize path separators for imports
    relativeImport = relativeImport.replace(/\\/g, '/');
    if (!relativeImport.startsWith('.')) {
      relativeImport = './' + relativeImport;
    }

    // If alias, or different casing, or missing extension... we replace!
    if (originalImport !== relativeImport) {
      console.log(`[FIXING] ${sourceFile}: \n   ${originalImport}  ->  ${relativeImport}`);
      // escape regex characters for original target
      const escTarget = originalImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // replace only inside quotes
      const replaceRegex = new RegExp(`(['"])${escTarget}(['"])`, 'g');
      newContent = newContent.replace(replaceRegex, `$1${relativeImport}$2`);
      fixesCount++;
    }
  }

  if (content !== newContent) {
    fs.writeFileSync(sourceFile, newContent, 'utf8');
  }
}

console.log(`Done. Fixed ${fixesCount} imports.`);
