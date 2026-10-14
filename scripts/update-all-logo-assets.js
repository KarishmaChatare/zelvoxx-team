const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const userUploadedPath = "C:\\Users\\kaira\\.gemini\\antigravity-ide\\brain\\89bb5f91-4abd-4819-9ad0-9799d9404b78\\.user_uploaded\\media_1791895169493.png";
const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "images");
const appDir = path.join(__dirname, "..", "app");

// Helper to build a valid .ico file containing PNG-compressed images
function createIcoFromPngBuffers(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function main() {
  console.log("Loading user uploaded logo from:", userUploadedPath);
  const rawBuffer = fs.readFileSync(userUploadedPath);

  // 1. Trim transparent padding to get maximum fidelity
  const trimmedBuffer = await sharp(rawBuffer)
    .trim()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed logo dimensions: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 2. Export canonical transparent web assets
  await sharp(trimmedBuffer)
    .png({ compressionLevel: 9 })
    .toFile(path.join(imagesDir, "zelvoxx-logo.png"));

  await sharp(trimmedBuffer)
    .webp({ quality: 100, lossless: true, alphaQuality: 100 })
    .toFile(path.join(imagesDir, "zelvoxx-logo.webp"));

  await sharp(trimmedBuffer)
    .webp({ quality: 100, lossless: true, alphaQuality: 100 })
    .toFile(path.join(imagesDir, "zelvoxx-zk-logo.webp"));

  await sharp(trimmedBuffer)
    .webp({ quality: 100, lossless: true, alphaQuality: 100 })
    .toFile(path.join(imagesDir, "zelvoxx-zk-logo-transparent.webp"));

  await sharp(trimmedBuffer)
    .png({ compressionLevel: 9 })
    .toFile(path.join(imagesDir, "zelvoxx-zk-logo-transparent.png"));

  console.log("Canonical web logo assets created in /public/images!");

  // 3. Generate Favicon & App Icon sizes on square canvas with slight padding
  async function makeSquareIcon(size, paddingPercent = 0.08) {
    const pad = Math.round(size * paddingPercent);
    const innerSize = size - pad * 2;

    const resizedLogo = await sharp(trimmedBuffer)
      .resize({
        width: innerSize,
        height: innerSize,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: resizedLogo, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  const png16 = await makeSquareIcon(16, 0.05);
  const png32 = await makeSquareIcon(32, 0.06);
  const png48 = await makeSquareIcon(48, 0.06);
  const png180 = await makeSquareIcon(180, 0.08);
  const png192 = await makeSquareIcon(192, 0.08);
  const png512 = await makeSquareIcon(512, 0.08);

  // Write PNG favicons
  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), png180);
  fs.writeFileSync(path.join(appDir, "icon.png"), png32);
  fs.writeFileSync(path.join(publicDir, "icon-192x192.png"), png192);
  fs.writeFileSync(path.join(publicDir, "icon-512x512.png"), png512);

  // Write multi-resolution .ico file
  const icoBuffer = createIcoFromPngBuffers([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 }
  ]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);

  console.log("All favicons (16x16, 32x32, 180x180, .ico, app icons) generated successfully!");

  // 4. Update site.webmanifest
  const manifest = {
    name: "Zelvoxx - Premium Digital Growth Agency",
    short_name: "Zelvoxx",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    theme_color: "#7C61FF",
    background_color: "#08080C",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));

  // 5. Update OG Image
  console.log("Regenerating Open Graph 1200x630 social preview card with new transparent logo...");
  const funnelPath = path.join(imagesDir, "bg", "abstract-glass-1920.webp");
  let funnelBuffer;
  if (fs.existsSync(funnelPath)) {
    funnelBuffer = fs.readFileSync(funnelPath);
  } else {
    const altPath = path.join(imagesDir, "abstract-glass-widescreen.webp");
    if (fs.existsSync(altPath)) funnelBuffer = fs.readFileSync(altPath);
  }

  // Generate a high-res logo mark for the OG card
  const ogLogoMark = await sharp(trimmedBuffer)
    .resize({ width: 340, height: 190, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#7C61FF" />
          <stop offset="50%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#A78BFA" />
        </linearGradient>
      </defs>
      
      <!-- Brand Name -->
      <text x="100" y="240" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="64" letter-spacing="8" fill="#FFFFFF">ZELVOX<tspan fill="url(#purpleGrad)">X</tspan></text>
      
      <!-- Tagline Pill -->
      <rect x="100" y="280" width="340" height="38" rx="19" fill="#7C61FF" fill-opacity="0.15" stroke="#7C61FF" stroke-opacity="0.3" stroke-width="1"/>
      <text x="120" y="305" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#A78BFA">PREMIUM GROWTH SYSTEMS</text>
      
      <!-- Main Value Proposition -->
      <text x="100" y="380" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="38" fill="#FFFFFF">Architecting High-Velocity</text>
      <text x="100" y="430" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="38" fill="url(#purpleGrad)">Revenue &amp; Digital Dominance</text>
      
      <text x="100" y="500" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="20" fill="#9CA3AF">Web Engineering • Funnel Architecture • Paid Acquisition</text>
      
      <!-- Bottom Bar -->
      <line x1="100" y1="550" x2="1100" y2="550" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1"/>
      <text x="100" y="585" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="16" letter-spacing="2" fill="#6B7280">ZELVOXX.COM</text>
    </svg>
  `);

  const composites = [
    {
      input: svgOverlay,
      top: 0,
      left: 0,
      blend: "over"
    },
    {
      input: ogLogoMark,
      top: 180,
      left: 750,
      blend: "over"
    }
  ];

  if (funnelBuffer) {
    const rightGraphic = await sharp(funnelBuffer)
      .resize(560, 560, { fit: "contain" })
      .png()
      .toBuffer();

    composites.unshift({
      input: rightGraphic,
      top: 35,
      left: 620,
      blend: "over"
    });
  }

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 8, g: 8, b: 12, alpha: 1 }
    }
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, "og-image.jpg"));

  console.log("Social preview card (og-image.jpg) regenerated successfully with new logo!");
}

main().catch(console.error);
