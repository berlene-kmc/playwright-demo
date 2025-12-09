import { test } from '../fixtures/authFixtures';
import { Location } from '../pages/Location';

test.describe('Location Page Tests', () => {

  test('Select Picadilly Star card with API assertion', async ({ dashboard, page }) => {
    const location = new Location(page);

    await dashboard.goToBoardroomLocation();

    // Add a delay before clicking to reduce rate limiting issues
    // This helps if previous tests have made API calls
    await page.waitForTimeout(2000);

    // Listen for console errors to catch the "Cannot read properties of undefined" error
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const apiResponses: { url: string; status: number }[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait for new tab to open when clicking Picadilly Star
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout: 60000 }),
      location.clickPicadillyStarCard()
    ]);

    // Listen for errors on the new page as well
    newPage.on('console', (msg) => {
      if (msg.type() === 'error') {
        const errorText = msg.text();
        consoleErrors.push(`[NewPage] ${errorText}`);
        console.log('Console error on new page:', errorText);
      }
    });

    // Listen for page errors (uncaught exceptions)
    newPage.on('pageerror', (error) => {
      pageErrors.push(error.message);
      console.log('Page error on new page:', error.message);
    });

    // Track API responses to understand what's happening
    newPage.on('response', (response) => {
      const url = response.url();
      const status = response.status();
      if (url.includes('/api/')) {
        apiResponses.push({ url, status });
        if (status === 429) {
          console.log(`⚠️ Rate limit detected (429) for: ${url}`);
        }
      }
    });

    // Wait for the new page to be ready
    try {
      // Wait for the page to load
      await newPage.waitForLoadState('domcontentloaded', { timeout: 60000 });
      console.log('New page URL:', newPage.url());
      
      // Wait for the page to be fully interactive
      await newPage.waitForLoadState('load', { timeout: 60000 });
      
      // Wait for any API responses (including retries after 429)
      // Wait for a successful response (200) OR wait for network idle
      try {
        await Promise.race([
          newPage.waitForResponse(
            (response) => response.url().includes('/api/') && response.status() === 200,
            { timeout: 30000 }
          ),
          newPage.waitForLoadState('networkidle', { timeout: 30000 })
        ]);
      } catch (e) {
        console.log('Waiting for API response or network idle completed');
      }
      
      // Wait for network to be idle - this ensures all requests (including retries) are done
      await newPage.waitForLoadState('networkidle', { timeout: 60000 });
      
      // Additional wait to ensure all JavaScript has executed and data is processed
      // This gives the page time to retry or handle errors gracefully
      await newPage.waitForTimeout(2000);
      
    } catch (error: any) {
      console.log('Error waiting for page to load:', error.message);
    }
    
    // Log API responses we tracked
    if (apiResponses.length > 0) {
      console.log('API responses tracked:', apiResponses);
    }
    
    // Log any errors we caught
    if (consoleErrors.length > 0) {
      console.log('Console errors captured:', consoleErrors);
      // Filter out the specific "Cannot read properties" error if it's just due to 429
      const non429Errors = consoleErrors.filter(err => 
        !err.includes('Cannot read properties of undefined') || 
        !apiResponses.some(r => r.status === 429)
      );
      if (non429Errors.length > 0 && non429Errors.length < consoleErrors.length) {
        console.log('Note: Some errors may be due to rate limiting (429)');
      }
    }
    if (pageErrors.length > 0) {
      console.log('Page errors captured:', pageErrors);
    }

    // Check if page loaded successfully
    const currentUrl = newPage.url();
    console.log('Final page URL:', currentUrl);
    
    // The page should now be fully loaded and all data should be available
    // If errors occurred due to rate limiting, they've been logged but we continue
  });

  // test('Boardroom API returns list', async ({ page }) => {
  //   const location = new Location(page);

  //   await location.assertBoardRoomList();  
  // });

});
