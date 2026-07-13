import { test, expect } from '@playwright/test';

test.describe('MAAD Website Hero Animation Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    page.on('console', (msg) => {
      console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      console.log(`BROWSER PAGE ERROR: ${err.message}`);
    });
  });

  test('should execute the two-stage intro animation correctly', async ({ page }) => {
    await page.goto('/');

    const headlineWrapper = page.locator('[class*="headlineWrapper"]').first();
    await expect(headlineWrapper).toBeVisible();

    const viewportSize = page.viewportSize();
    if (!viewportSize) throw new Error('No viewport size');

    // Get bounding box of headline wrapper immediately after mount
    const initialBox = await headlineWrapper.boundingBox();
    if (!initialBox) throw new Error('No bounding box found for headline wrapper');

    // It should be roughly centered horizontally
    const expectedCenter = (viewportSize.width - initialBox.width) / 2;
    expect(Math.abs(initialBox.x - expectedCenter)).toBeLessThan(50);

    // Wait for the typing, pause, and push-reveal to complete
    await page.waitForTimeout(5000);

    const restingBox = await headlineWrapper.boundingBox();
    if (!restingBox) throw new Error('No bounding box found for headline wrapper at rest');

    // It should now be shifted to the left resting position
    expect(restingBox.x).toBeLessThan(150);

    // The video wrapper should now be visible and open
    const videoWrapper = page.locator('[class*="videoWrapper"]').first();
    await expect(videoWrapper).toBeVisible();
  });

  test('should execute scroll-driven zoom and fade transition correctly', async ({ page }) => {
    await page.goto('/');

    // Wait for intro to complete
    await page.waitForTimeout(5000);

    const headline = page.locator('h1[class*="headline"]').first();
    const videoContainer = page.locator('[class*="videoContainer"]').first();

    const viewportSize = page.viewportSize();
    if (!viewportSize) throw new Error('No viewport size');

    const initialHeadlineOpacity = await headline.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(initialHeadlineOpacity)).toBeCloseTo(1, 1);

    const initialVideoBox = await videoContainer.boundingBox();
    if (!initialVideoBox) throw new Error('No initial video box');

    // Scroll down to 800px — near the end of the pinned phase (total trigger length is ~864px)
    await page.mouse.wheel(0, 800);
    
    // Wait for GSAP scrub to smoothly catch up
    await page.waitForTimeout(2000);

    // 1. Headline should be almost completely faded out (opacity close to 0)
    const scrolledHeadlineOpacity = await headline.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(scrolledHeadlineOpacity)).toBeLessThan(0.15);

    // 2. Video container should grow to cover the viewport
    const scrolledVideoBox = await videoContainer.boundingBox();
    if (!scrolledVideoBox) throw new Error('No scrolled video box');
    
    // Check that it has scaled up significantly
    expect(scrolledVideoBox.width).toBeGreaterThan(initialVideoBox.width * 1.6);
    expect(scrolledVideoBox.height).toBeGreaterThan(initialVideoBox.height * 1.6);

    // The top-left corner of the video box must start at or before the top-left of the viewport (within a small margin)
    expect(scrolledVideoBox.x).toBeLessThanOrEqual(40);
    expect(scrolledVideoBox.y).toBeLessThanOrEqual(40);

    // The bottom-right corner of the video box must end at or after the bottom-right of the viewport (within a small margin)
    expect(scrolledVideoBox.x + scrolledVideoBox.width).toBeGreaterThanOrEqual(viewportSize.width - 40);
    expect(scrolledVideoBox.y + scrolledVideoBox.height).toBeGreaterThanOrEqual(viewportSize.height - 40);

    // ── REVERSE SCROLL: Scroll back to top ──
    await page.mouse.wheel(0, -800);

    await page.waitForTimeout(2000);

    // Everything should return to the rest state
    const returnedHeadlineOpacity = await headline.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(returnedHeadlineOpacity)).toBeCloseTo(1, 1);

    const returnedVideoBox = await videoContainer.boundingBox();
    if (!returnedVideoBox) throw new Error('No returned video box');
    expect(Math.abs(returnedVideoBox.width - initialVideoBox.width)).toBeLessThan(15);
  });
});
