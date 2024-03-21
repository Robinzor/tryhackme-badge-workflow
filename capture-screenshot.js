const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.setContent(`<html><body><script src="https://tryhackme.com/badge/1604750"></script></body></html>`, { waitUntil: 'networkidle0' });
  
  // Wait for the script to load and render the badge. The selector might need to be adjusted.
  await page.waitForSelector('div', { visible: true });

  // Get the bounding box of the outer div that contains the badge.
  const element = await page.$('div'); // Make sure this selector accurately selects the badge's outer div
  const boundingBox = await element.boundingBox();

  // Set the screenshot options to capture with transparent background and clip around the badge
  await page.screenshot({
    path: 'badge.png',
    omitBackground: true,
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height
    }
  });

  await browser.close();
})();