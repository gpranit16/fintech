const fs = require('fs');
const path = require('path');

// Create a simple HTML that can be screenshot as flowchart
// For now, just copy the SVG to PNG location
const svgPath = path.join(__dirname, '..', 'public', 'flowchart.png.svg');
const pngPath = path.join(__dirname, '..', 'public', 'flowchart.png');

// Read the SVG and save as .png (browsers will render SVG as image)
if (fs.existsSync(svgPath)) {
  fs.copyFileSync(svgPath, pngPath);
  console.log('✅ Flowchart placeholder created at:', pngPath);
  console.log('⚠️  For best results, replace this with your actual Canva flowchart!');
} else {
  console.log('❌ SVG file not found');
}
