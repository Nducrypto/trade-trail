import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';
import {dismissAlertWithCancel, dismissAlertWithOk} from './utils/dismissAlert';
import {dismisskeyBoard} from './utils/dismisskeyBoard';

describe('Profile', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it('should launch the app and render Get Started screen correctly', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  it('should display product categories correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
  });

  it('should navigate to Product Detail screen when a product is selected', async () => {
    await waitFor(element(by.text('Ladies Flat Shoe - Black')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.text('Ladies Flat Shoe - Black')).tap();
  });

  it('should navigate to Seller Profile screen from Product Detail screen', async () => {
    await waitFor(element(by.text('Chi chi')))
      .toBeVisible()
      .withTimeout(4000);
    await element(by.text('Seller')).tap();
  });

  it('should attempt to follow the seller when user is not logged in', async () => {
    await waitFor(element(by.text('Connect')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.text('Connect')).tap();
  });

  it('should display alert and dismiss with cancel when trying to follow seller while not logged in', async () => {
    const signInAlertVisible = await waitFor(
      element(by.text('Sign in to continue')),
    )
      .toBeVisible()
      .withTimeout(6000)
      .catch(() => false);

    if (signInAlertVisible) {
      await dismissAlertWithCancel();
    }
  });

  it('should display alert and dismiss with ok to proceed to Sign-In screen', async () => {
    await element(by.text('Connect')).tap();
    const signInAlertVisible = await waitFor(
      element(by.text('Sign in to continue')),
    )
      .toBeVisible()
      .withTimeout(6000)
      .catch(() => false);

    if (signInAlertVisible) {
      await dismissAlertWithOk();
    }
  });

  it('should log in and navigate back to Profile screen on successful Sign-In', async () => {
    await element(by.id('email-text-field')).typeText('Ndubinho9@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).typeText('oliver');
    await dismisskeyBoard('password-text-field');
    await element(by.id('sign-in-button')).tap();
  });

  it('should handle follow or unfollow action for Seller when user is logged in', async () => {
    const isNotFollowingSeller = await waitFor(element(by.text('Connect')))
      .toBeVisible()
      .withTimeout(3000)
      .catch(() => false);

    if (isNotFollowingSeller) {
      await element(by.text('Connect')).tap();
    } else {
      await element(by.text('Disconnect')).tap();
    }
  });

  it('should navigate to Seller Album screen', async () => {
    await waitFor(element(by.text('View all')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('View all')).tap();
  });

  it('should scroll through Seller Album to view more content', async () => {
    await waitFor(element(by.id('albums-Back-btn')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.id('albums-flatlist')).scrollTo('top');
    await element(by.id('albums-flatlist')).scrollTo('bottom');
  });

  it('should navigate back to Profile screen from Album screen', async () => {
    await element(by.id('albums-flatlist')).scrollTo('top');
    await element(by.id('albums-Back-btn')).tap();
  });

  it('should navigate to Chat Screen from Profile screen', async () => {
    await waitFor(element(by.text('Message')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('Message')).tap();
  });

  it('should send a message to the seller in Chat Screen', async () => {
    await waitFor(element(by.id('chatScreen-Back-btn')))
      .toBeVisible()
      .withTimeout(3000);

    await element(by.id('chat-input')).typeText('hello');
    await dismisskeyBoard('chat-input');
    await expect(element(by.id('chat-input'))).toHaveText('hello');
    await element(by.id('button')).tap();
    await element(by.id('chat-input')).clearText();
  });

  it('should verify if message is delivered successfully in Chat Screen', async () => {
    await waitFor(element(by.text('hello')))
      .toBeVisible()
      .withTimeout(6000);
  });

  it('should navigate back to Profile screen from Chat Screen', async () => {
    await element(by.id('chatScreen-Back-btn')).tap();
  });
});
