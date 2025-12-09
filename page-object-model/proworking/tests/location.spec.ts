// import { test } from '../fixtures/authFixtures';
// import { Location } from '../pages/Location';

// test.describe('Location Page Tests', () => {

//   test('Select Picadilly Star card with API assertion', async ({ dashboard, page }) => {
//     const location = new Location(page);

//     await dashboard.goToBoardroomLocation();

//     // Add delay to reduce rate limiting
//     await page.waitForTimeout(5000);

//     const apiUrl = 'https://erp-hub-api-v2-new-checkout.azurewebsites.net/api/hub/buildings/3/packages/proworking';

//     // Set up API listener on the original page BEFORE clicking
//     // The API might be called from the original page before the new page loads
//     const originalPageApiPromise = page.waitForResponse(
//       (response) => response.url().includes(apiUrl),
//       { timeout: 60000 }
//     );

//     // Wait for new tab to open when clicking Picadilly Star
//     const [newPage] = await Promise.all([
//       page.context().waitForEvent('page', { timeout: 60000 }),
//       location.clickPicadillyStarCard()
//     ]);

//     // Also set up listener on the new page (API might be called there)
//     const newPageApiPromise = newPage.waitForResponse(
//       (response) => response.url().includes(apiUrl),
//       { timeout: 60000 }
//     );

//     // Wait for page to load
//     await newPage.waitForLoadState('domcontentloaded', { timeout: 60000 });
    
//     // Wait for the API call (could be on either page)
//     await Promise.race([originalPageApiPromise, newPageApiPromise]);

//     // Wait for network to be idle
//     await newPage.waitForLoadState('networkidle', { timeout: 60000 });
//   });

//   // test('Boardroom API returns list', async ({ page }) => {
//   //   const location = new Location(page);
//   //   await location.assertBoardRoomList();
//   // });

// });
