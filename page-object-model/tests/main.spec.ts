import { test } from '../fixtures/authFixtures';
import { AssertEndpoint } from '../utils/assertEndpoint';
import { Signup } from '../pages/Signup';
import { LoginPage } from '../pages/LoginPage';
import { Location } from '../pages/Location';
import { RoomSelection } from '../pages/RoomSelection';
import { Billing, BillingData } from '../pages/Billing';

test.describe('Full KMC E2E Flow', () => {

  test('Signup → Login → Dashboard → Location → Room Selection → Billing', async ({
    page,
    loginPage,
    dashboard,
    assertEndpoint
  }) => {

    const signup = new Signup(page);
    await page.goto('https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/auth/sign-up');
    await signup.completeSignup(
      'berlene.bernabe+e2e@kmc.solutions',
      'Berlene',
      'Bernabe',
      'Software Engineer',
      'StrongPassword123!',
      'StrongPassword123!'
    );

    await loginPage.goto();
    await assertEndpoint.assertEndpoint(
      "/api/Hub/login",
      200,
      async () => {
        await loginPage.login("berlene.bernabe@kmc.solutions", "StrongPassword123!");
      }
    );

    await dashboard.goto();
    await dashboard.clickSolutionsDropdown();
    await dashboard.clickMeetingRoomsButton();
    await dashboard.clickGetStarted();
    await dashboard.clickBoardRoom();

    const location = new Location(page);
    await dashboard.goToBoardroomLocation();
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'), 
      location.clickPicadillyStarCardWithAssertion(
        '/api/hub/buildings/packages/board-room/list'
      )
    ]);

    const roomSelection = new RoomSelection(newPage);
    await roomSelection.goto();
    await assertEndpoint.assertEndpoint(
      '/api/Hub/checkout',
      200,
      async () => {
        await roomSelection.completeReservationFlow('berlene.bernabe+e2e@kmc.solutions');
      }
    );

    const billing = new Billing(newPage);
    await billing.goto();

    const billingData: BillingData = {
      meetingPurpose: "Team Meeting",
      firstName: "Berlene",
      lastName: "Bernabe",
      tin: "123456789",
      email: "berlene.bernabe+e2e@kmc.solutions",
      phone: "09123456789",
      address: "123 Main St",
      city: "Makati",
      state: "Metro Manila",
      country: "Philippines",
      zip: "1234",
      agreeTerms: true,
    };

    await billing.fillBillingForm(billingData);
    await billing.clickContinue();

    console.log('✅ Full E2E Flow Completed Successfully');
  });

});
