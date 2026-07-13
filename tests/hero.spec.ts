import { test, expect } from '@playwright/test';

test.describe('MAAD Website Hero Animation Tests', () => {
  test.beforeEach(async ({ page }) => {
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
    await page.waitForTimeout(4000);

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
    await page.waitForTimeout(4000);

    // Specifically target the h1 element to avoid selecting the wrapper container
    const headline = page.locator('h1[class*="headline"]').first();
    const videoContainer = page.locator('[class*="videoContainer"]').first();

    const initialHeadlineOpacity = await headline.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(initialHeadlineOpacity)).toBeCloseTo(1, 1);

    const initialVideoBox = await videoContainer.boundingBox();
    if (!initialVideoBox) throw new Error('No initial video box');

    // Use mouse wheel to scroll down
    await page.mouse.wheel(0, 800);
    
    // Wait for GSAP scrub to smoothly catch up
    await page.waitForTimeout(2000);

    // The headline should fade out
    const scrolledHeadlineOpacity = await headline.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(scrolledHeadlineOpacity)).toBeLessThan(0.9);

    // The video container should grow in width and height
    const scrolledVideoBox = await videoContainer.boundingBox();
    if (!scrolledVideoBox) throw new Error('No scrolled video box');
    
    expect(scrolledVideoBox.width).toBeGreaterThan(initialVideoBox.width);
    expect(scrolledVideoBox.height).toBeGreaterThan(initialVideoBox.height);
  });
});
