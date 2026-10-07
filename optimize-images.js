const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// AR Heating project ka public folder path
const targetDir = path.join(__dirname, 'public'); 

async function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.error(`Directory nahi mili: ${directory}`);
    return;
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Sub-folders ke andar bhi jayein
      await processDirectory(fullPath);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      const ext = path.extname(entry.name);
      const baseName = path.basename(entry.name, ext);
      const newFilePath = path.join(directory, baseName + '.webp');
      const tempFilePath = path.join(directory, baseName + '-temp.webp');

      try {
        // Sharp ke zariye WebP mein convert karein
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(tempFilePath);

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
        fs.renameSync(tempFilePath, newFilePath);

        // Yahan original PNG/JPG file delete ho rahi hai taake double images na rahein
        fs.unlinkSync(fullPath);

        console.log(`Converted & Deleted Original: ${entry.name} -> ${baseName}.webp`);
      } catch (error) {
        console.error(`Error processing ${entry.name}:`, error);
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    }
  }
}

console.log('Images optimization aur cleanup shuru ho raha hai...');
processDirectory(targetDir).then(() => {
  console.log('Tamam original images delete ho gayi hain aur sirf WebP bachi hain!');
});