import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';
import {dismisskeyBoard} from './utils/dismisskeyBoard';
import {verifyTextVisibility} from './utils/verifyTextVisibility';

describe('Profile', () => {
  it('should launch the app and render Get Started screen correctly', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  it('should display product categories correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
  });

  it('should navigate to Notification screen when the icon is clicked', async () => {
    await element(by.id('productsScreen-notification-icon')).tap();
  });

  it('should check if user is not signed in and proceed to Sign-In screen when clicked', async () => {
    const isSignedIn = await verifyTextVisibility('Sign in to continue');
    if (isSignedIn) {
      await element(by.id('sign-in-btn')).tap();
    }
  });

  it('should log in and navigate back to Notification screen on successful Sign-In', async () => {
    const isSignInScreen = await verifyTextVisibility('Sign in with');

    if (isSignInScreen) {
      await element(by.id('email-text-field')).typeText('Ndubinho9@gmail.com');
      await dismisskeyBoard('email-text-field');

      await element(by.id('password-text-field')).typeText('oliver');
      await dismisskeyBoard('password-text-field');
      await element(by.id('sign-in-button')).tap();
    }
  });

  it('should navigate to Profile Screen when a sender is selected', async () => {
    const isEmpty = await verifyTextVisibility('No notification at the moment');

    if (!isEmpty) {
      await waitFor(element(by.id('follower-1')))
        .toBeVisible()
        .withTimeout(4000);

      await element(by.id('follower-1')).tap();
    }
  });
  it('should navigate back to Notification screen from Profile Screen', async () => {
    const isEmpty = await verifyTextVisibility('No notification at the moment');
    if (!isEmpty) {
      await waitFor(element(by.id('profile-Back-btn')))
        .toBeVisible()
        .withTimeout(4000);

      await element(by.id('profile-Back-btn')).tap();
    }
  });

  it('should navigate to Cart Screen when the cart icon is selected', async () => {
    await waitFor(element(by.id('follower-1')))
      .toBeVisible()
      .withTimeout(4000);

    await element(by.id('notificationScreen-cart-icon')).tap();
  });

  it('should navigate back to Notification screen from Cart Screen', async () => {
    await waitFor(element(by.id('cart-Back-btn')))
      .toBeVisible()
      .withTimeout(4000);

    await element(by.id('cart-Back-btn')).tap();
  });
});
