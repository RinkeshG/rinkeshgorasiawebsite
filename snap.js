const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true,
        defaultViewport: { width: 1200, height: 630 }
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'images/og-image.jpg', type: 'jpeg', quality: 90 });

    await page.goto('http://localhost:8000/work.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'images/og-work.jpg', type: 'jpeg', quality: 90 });

    await page.goto('http://localhost:8000/writing.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'images/og-writing.jpg', type: 'jpeg', quality: 90 });

    await browser.close();
})();
