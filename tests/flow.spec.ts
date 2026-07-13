import { test, expect } from '@playwright/test';

test.describe('MAAD Website Full Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    page.on('console', (msg) => {
      console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      console.log(`BROWSER PAGE ERROR: ${err.message}`);
    });
  });

  test('should execute desktop user journey flow correctly', async ({ page }) => {
    // 1. Visit Home Page
    await page.goto('/');

    // 2. Validate Hero Section
    const headline = page.locator('h1[class*="headline"]').first();
    await expect(headline).toBeVisible();

    // Wait for the hero intro typing animation to finish
    await page.waitForTimeout(5000);

    // 3. Scroll to Partners/Clients Section
    await page.locator('#partners').scrollIntoViewIfNeeded();
    const partnersSection = page.locator('#partners');
    await expect(partnersSection).toBeVisible();
    
    const clientsLabel = page.locator('[class*="clientsSection"] [class*="label"]').first();
    await expect(clientsLabel).toBeVisible();
    await expect(clientsLabel).toContainText('TRUSTED PARTNERSHIPS');

    // Verify client partner logo images fetch successfully
    const clientLogos = page.locator('#partners img');
    const logoCount = await clientLogos.count();
    expect(logoCount).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(logoCount, 5); i++) {
      const src = await clientLogos.nth(i).getAttribute('src');
      if (src) {
        const response = await page.request.get(src);
        expect(response.status()).toBe(200);
      }
    }

    // 4. Scroll to Projects (Work) Section
    await page.locator('#work').scrollIntoViewIfNeeded();
    const projectsSection = page.locator('#work');
    await expect(projectsSection).toBeVisible();

    const projectsTitle = page.locator('[class*="projectsSection"] h2[class*="title"]').first();
    await expect(projectsTitle).toBeVisible();
    await expect(projectsTitle).toContainText('WORK');
    await expect(projectsTitle).toContainText('MATTERS');

    // Verify project images fetch successfully (checking dist/assets/img/projects)
    const projectImages = page.locator('#work img');
    const projectImagesCount = await projectImages.count();
    expect(projectImagesCount).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(projectImagesCount, 3); i++) {
      const src = await projectImages.nth(i).getAttribute('src');
      if (src) {
        const response = await page.request.get(src);
        expect(response.status()).toBe(200);
      }
    }

    // Test Projects slider next/prev arrow clicks
    const nextBtn = page.locator('[class*="sliderNextBtn"]').first();
    if (await nextBtn.isVisible()) {
      const cardsContainer = page.locator('[class*="cardsContainer"]').first();
      const initialScroll = await cardsContainer.evaluate((el) => el.scrollLeft);
      await nextBtn.click();
      await page.waitForTimeout(1000);
      const scrolledScroll = await cardsContainer.evaluate((el) => el.scrollLeft);
      expect(scrolledScroll).toBeGreaterThan(initialScroll);
    }

    // 5. Scroll to Services Section
    await page.locator('#services').scrollIntoViewIfNeeded();
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();

    // Fetch the static absolute top of the services section wrapper once
    const servicesTop = await page.evaluate(() => {
      const services = document.querySelector('#services');
      if (services) {
        const spacer = services.parentElement || services;
        const rect = spacer.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return 0;
    });

    console.log(`FOUND SERVICES STATIC TOP: ${servicesTop}`);

    // Scroll programmatically down into the services active layout phase (past intro slides)
    // Add a 15px buffer to guarantee we clear intro slide boundaries and trigger layout visible
    await page.evaluate(({ top }) => {
      const target = top + window.innerHeight * 4 + 15;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target);
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }, { top: servicesTop });
    await page.waitForTimeout(3000);

    const layout = page.locator('[class*="layout"]').first();
    await expect(layout).toBeVisible();

    // Test timeline click navigation (Clicking chapter 4 timeline number)
    const timelineNum = page.locator('[class*="timelineNumWrapper"]').nth(3);
    await expect(timelineNum).toBeVisible();
    await timelineNum.click();
    
    // Smooth scroll matching timeline index 3, with 15px safety buffer
    await page.evaluate(({ top }) => {
      const scrollableDistance = 11 * window.innerHeight;
      const scrollProgress = 3 / 12 + (3 / 8) * (8 / 12);
      const targetScroll = top + scrollProgress * scrollableDistance + 15;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetScroll);
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }, { top: servicesTop });
    await page.waitForTimeout(3000);

    // Verify active index updated to 3 (chapter 4)
    const activeTimelineNum = page.locator('[class*="timelineNumWrapper"][class*="active"] [class*="timelineNum"]').first();
    await expect(activeTimelineNum).toHaveText('04');

    // Test desktop hover zoom interaction
    const imageContainer = page.locator('[class*="imageCol"]').first();
    
    // Debug computed styles of imageCol
    const stylesInfo = await imageContainer.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        parentVisibility: window.getComputedStyle(el.parentElement!).visibility,
        parentOpacity: window.getComputedStyle(el.parentElement!).opacity,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      };
    });
    console.log('imageCol styles debug after scroll:', stylesInfo);

    await expect(imageContainer).toBeVisible();
    await imageContainer.hover();
    await page.waitForTimeout(1000);
    
    // Scale on active image should zoom
    const activeImage = page.locator('[class*="imageItem"][class*="active"] img').first();
    const style = await activeImage.evaluate((el) => window.getComputedStyle(el).transform);
    expect(style).not.toBe('none');

    // Scroll to the end snap index (SBCC 09)
    const lastTimelineNum = page.locator('[class*="timelineNumWrapper"]').nth(8);
    await lastTimelineNum.click();
    
    // Smooth scroll matching SBCC snap position (index 8)
    await page.evaluate(({ top }) => {
      const scrollableDistance = 11 * window.innerHeight;
      const scrollProgress = 3 / 12 + (8 / 8) * (8 / 12);
      const targetScroll = top + scrollProgress * scrollableDistance + 15;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetScroll);
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }, { top: servicesTop });
    await page.waitForTimeout(3000);

    // Verify SBCC is visible
    const activeTitle = page.locator('[class*="titleItem"][class*="active"]').first();
    await expect(activeTitle).toHaveText('SBCC');
    await expect(activeTitle).toBeVisible();

    // Scroll programmatically further to trigger fade out outro and unpin
    await page.evaluate(({ top }) => {
      const target = top + window.innerHeight * 11.8;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target);
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }, { top: servicesTop });
    await page.waitForTimeout(3000);

    // 6. Reach Footer Section
    const footer = page.locator('footer[class*="footer"]').first();
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    
    const footerCta = page.locator('footer[class*="footer"] [class*="ctaTitle"]').first();
    await expect(footerCta).toBeVisible();
    await expect(footerCta).toContainText('HAVE AN IDEA');
  });

  test('should execute mobile user journey with accordions correctly', async ({ page }) => {
    // Set viewport to mobile Chrome width
    await page.setViewportSize({ width: 375, height: 812 });

    // 1. Visit Home Page
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Verify hero video container is visible on mobile
    const mobileVideo = page.locator('#hero-video-container');
    await expect(mobileVideo).toBeVisible();

    // 2. Scroll to Services Section
    const services = page.locator('#services');
    await services.scrollIntoViewIfNeeded();
    await expect(services).toBeVisible();

    // Verify mobile accordion container is rendered
    const accordionContainer = page.locator('[class*="accordionContainer"]').first();
    await expect(accordionContainer).toBeVisible();

    // Verify accordion items are present
    const accordionItems = page.locator('[class*="accordionItem"]');
    const count = await accordionItems.count();
    expect(count).toBe(9);

    // Verify first accordion is open by default
    const firstContent = page.locator('[class*="accordionContent"]').first();
    await expect(firstContent).toHaveClass(/expanded/);

    // Tap the second accordion header to toggle it
    const secondHeader = page.locator('[class*="accordionHeader"]').nth(1);
    await secondHeader.click();
    await page.waitForTimeout(1000);

    // Verify first is closed and second is open
    await expect(firstContent).not.toHaveClass(/expanded/);
    const secondContent = page.locator('[class*="accordionContent"]').nth(1);
    await expect(secondContent).toHaveClass(/expanded/);

    // 3. Scroll to Footer Section
    const footer = page.locator('footer[class*="footer"]').first();
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    const footerCta = page.locator('footer[class*="footer"] [class*="ctaTitle"]').first();
    await expect(footerCta).toBeVisible();
    await expect(footerCta).toContainText('HAVE AN IDEA');
  });
});
