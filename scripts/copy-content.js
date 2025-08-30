#!/usr/bin/env node
/**
 * Content copying script for production builds
 * Copies exercise content from content/ to dist/content/
 */

const fs = require('fs').promises;
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'content');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'content');

async function copyRecursive(src, dest) {
  try {
    const stat = await fs.stat(src);
    
    if (stat.isDirectory()) {
      // Create directory if it doesn't exist
      try {
        await fs.mkdir(dest, { recursive: true });
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }
      
      // Copy all files in directory
      const files = await fs.readdir(src);
      for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        await copyRecursive(srcPath, destPath);
      }
    } else {
      // Copy file
      await fs.copyFile(src, dest);
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
  }
}

async function main() {
  console.log('📁 Copying exercise content...');
  
  try {
    // Ensure dist directory exists
    await fs.mkdir(path.dirname(DIST_DIR), { recursive: true });
    
    // Copy content directory
    await copyRecursive(SRC_DIR, DIST_DIR);
    
    console.log('✅ Content copied successfully!');
    console.log(`   From: ${SRC_DIR}`);
    console.log(`   To:   ${DIST_DIR}`);
  } catch (error) {
    console.error('❌ Failed to copy content:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { copyRecursive };