const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve('C:/Users/amitk/.gemini/antigravity/brain/5c6d2486-b243-44ec-8993-211e762b5da7/screenshots');
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Helper to toggle dark mode via document.documentElement.classList
  async function setDarkMode(isDark) {
    await page.evaluate((dark) => {
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }, isDark);
    await sleep(250);
  }

  // 1. HOME
  console.log('1. Capturing Home...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'home_desktop_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'home_desktop_dark.png'), fullPage: false });

  await page.setViewport({ width: 390, height: 844 });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'home_mobile.png'), fullPage: false });

  // 2. LISTINGS
  console.log('2. Capturing Listings...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/listings', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'listings_desktop_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'listings_desktop_dark.png'), fullPage: false });

  await page.setViewport({ width: 390, height: 844 });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'listings_mobile.png'), fullPage: false });

  // 3. PRODUCT DETAIL (bzx-1: iPhone 13 & bzx-4: Canon Rent)
  console.log('3. Capturing Product Detail...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/product/bzx-1', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'product_detail_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'product_detail_dark.png'), fullPage: false });

  // Make an Offer Dialog
  await setDarkMode(false);
  const offerBtn = await page.$('button ::-p-text(Make an Offer)');
  if (offerBtn) {
    await offerBtn.click();
    await sleep(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'product_offer_dialog.png'), fullPage: false });
    // Press Esc to close
    await page.keyboard.press('Escape');
    await sleep(200);
  }

  // Rent item bzx-4
  await page.goto('http://localhost:3000/product/bzx-4', { waitUntil: 'networkidle0' });
  await sleep(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'product_rent_calculator.png'), fullPage: false });

  // 4. POST AD
  console.log('4. Capturing Post Ad...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/post', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await sleep(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'post_ad_wizard_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'post_ad_wizard_dark.png'), fullPage: false });

  await page.setViewport({ width: 390, height: 844 });
  await setDarkMode(false);
  await page.screenshot({ path: path.join(OUT_DIR, 'post_ad_mobile.png'), fullPage: false });

  // 5. LOGIN
  console.log('5. Capturing Login...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await sleep(200);
  await page.screenshot({ path: path.join(OUT_DIR, 'login_desktop_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'login_desktop_dark.png'), fullPage: false });

  // 6. CHAT
  console.log('6. Capturing Chat...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/chat', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await sleep(300);

  // Type and send message
  const textarea = await page.$('textarea');
  if (textarea) {
    await textarea.type('Can we meet tomorrow at the campus cafeteria?');
    await page.keyboard.press('Enter');
    await sleep(2200); // Wait for seller reply to appear
  }
  await page.screenshot({ path: path.join(OUT_DIR, 'chat_desktop_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'chat_desktop_dark.png'), fullPage: false });

  // 7. DASHBOARD
  console.log('7. Capturing Dashboard...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  await setDarkMode(false);
  await sleep(400); // Allow count-up
  await page.screenshot({ path: path.join(OUT_DIR, 'dashboard_desktop_light.png'), fullPage: false });
  await setDarkMode(true);
  await page.screenshot({ path: path.join(OUT_DIR, 'dashboard_desktop_dark.png'), fullPage: false });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Error running walkthrough capture:', err);
  process.exit(1);
});

