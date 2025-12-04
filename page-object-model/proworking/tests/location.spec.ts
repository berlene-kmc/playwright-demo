import { test } from '../fixtures/authFixtures';
import { Location } from '../pages/Location';

test.describe('Location Page Tests', () => {

  test('Select Picadilly Star card with API assertion', async ({ dashboard, page }) => {
    const location = new Location(page);

    await dashboard.goToBoardroomLocation();

    await location.clickPicadillyStarCardWithAssertion(
      '/api/hub/buildings/3/packages/proworking'
    );
  });

  test('Boardroom API returns list', async ({ page }) => {
    const location = new Location(page);

    await location.assertBoardRoomList();
  });

});
