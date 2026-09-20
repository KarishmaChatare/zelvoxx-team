const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "images");

async function generateFavicons() {
  console.log("Generating multi-resolution favicons...");
  // Use existing crisp logo or create from high-res source
  const logoSource = path.join(imagesDir, "zelvoxx-zk-logo.jpg");
  const sourceBuffer = fs.readFileSync(logoSource);

  // 16x16
  await sharp(sourceBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, "favicon-16x16.png"));

  // 32x32
  await sharp(sourceBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));

  // 180x180 (Apple Touch Icon)
  await sharp(sourceBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  // Site webmanifest
  const manifest = {
    name: "Zelvoxx - Premium Digital Growth Agency",
    short_name: "Zelvoxx",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    theme_color: "#7C61FF",
    background_color: "#08080C",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));

  console.log("Favicons generated successfully!");
}

async function generateOgImage() {
  console.log("Generating Open Graph 1200x630 social preview card...");
  const funnelPath = path.join(imagesDir, "abstract-glass-widescreen.jpg");
  const funnelBuffer = fs.readFileSync(funnelPath);

  // Create SVG overlay with high-end typography
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08080C" />
          <stop offset="60%" stop-color="#0E0D17" />
          <stop offset="100%" stop-color="#141322" />
        </linearGradient>
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

  // Resize and position funnel graphic on the right
  const rightGraphic = await sharp(funnelBuffer)
    .resize(560, 560, { fit: "contain" })
    .png()
    .toBuffer();

  // Create base 1200x630 dark canvas
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 8, g: 8, b: 12, alpha: 1 }
    }
  })
  .composite([
    {
      input: rightGraphic,
      top: 35,
      left: 620,
      blend: "over"
    },
    {
      input: svgOverlay,
      top: 0,
      left: 0,
      blend: "over"
    }
  ])
  .jpeg({ quality: 90 })
  .toFile(path.join(imagesDir, "og-image.jpg"));

  console.log("Social preview card (og-image.jpg) generated successfully!");
}

(async () => {
  try {
    await generateFavicons();
    await generateOgImage();
  } catch (err) {
    console.error("Error generating assets:", err);
  }
})();
