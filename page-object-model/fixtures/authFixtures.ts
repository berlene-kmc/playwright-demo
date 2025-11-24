import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Dashboard } from '../pages/Dashboard';
import { Location } from '../pages/Location';
import { RoomSelection } from '../pages/RoomSelection';   

type AuthFixtures = {
  loginPage: LoginPage;
  dashboard: Dashboard;
  location: Location; 
  roomSelection: RoomSelection;           
};

export const test = baseTest.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage); // Same function with return
  },

  dashboard: async ({ page }, use) => {
    const dashboard = new Dashboard(page);
    await use(dashboard); // Same function with return
  },

  location: async ({ page }, use) => {
    const location = new Location(page);
    await use(location); // Same function with return
  },

  roomSelection: async ({ page }, use) => {
    const roomSelection = new RoomSelection(page);
    await use(roomSelection); // Same function with return
  }
});
