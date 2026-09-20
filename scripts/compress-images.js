const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeKb = (statsBefore.size / 1024).toFixed(1);

  // Skip tiny icons
  if (statsBefore.size < 5000) return;

  // EXCLUSION: Do NOT compress Our Work (portfolio) or Case Studies images
  if (filePath.includes("portfolio") || filePath.includes("case-studies")) {
    return;
  }

  const relPath = path.relative(publicDir, filePath);
  console.log(`Processing: ${relPath} (${sizeBeforeKb} KB)...`);

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    let transform = sharp(inputBuffer);

    // If it's an avatar (in testimonials or team), resize to max 400x400
    if (filePath.includes("testimonials") || filePath.includes("team")) {
      if (metadata.width > 400 || metadata.height > 400) {
        transform = transform.resize(400, 400, { fit: "cover", position: "center" });
      }
    } else if (metadata.width > 1920) {
      transform = transform.resize(1920, null, { withoutEnlargement: true });
    }

    // Generate WebP version alongside
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    await transform.clone().webp({ quality: 82 }).toFile(webpPath);
    const webpStats = fs.statSync(webpPath);

    // Optimize original format in place as fallback
    let buffer;
    if (ext === ".png") {
      buffer = await transform.png({ quality: 80, compressionLevel: 9, progressive: true }).toBuffer();
    } else {
      buffer = await transform.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }

    // Only overwrite original if optimized buffer is smaller
    if (buffer.length < statsBefore.size) {
      fs.writeFileSync(filePath, buffer);
      const sizeAfterKb = (buffer.length / 1024).toFixed(1);
      const webpSizeKb = (webpStats.size / 1024).toFixed(1);
      console.log(`  -> Optimized ${ext.toUpperCase()}: ${sizeAfterKb} KB | WebP: ${webpSizeKb} KB`);
    } else {
      console.log(`  -> Original was already small, WebP: ${(webpStats.size / 1024).toFixed(1)} KB`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        await walkDir(fullPath);
      }
    } else {
      await processFile(fullPath);
    }
  }
}

(async () => {
  console.log("Starting image compression & WebP generation...");
  await walkDir(publicDir);
  console.log("Done optimizing images!");
})();
