import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';
import {dismisskeyBoard} from './utils/dismisskeyBoard';
import {verifyTextVisibility} from './utils/verifyTextVisibility';
import {CHITESTEMAIL, CHITESTPASS} from '@env';

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

  it('should navigate to ChatList screen when the chat icon is clicked', async () => {
    await element(by.id('notificationScreen-chat-icon')).tap();
  });

  it('should check if user is not signed in and proceed to Sign-In screen when clicked', async () => {
    const isSignedIn = await verifyTextVisibility('Sign in to continue');
    if (isSignedIn) {
      await element(by.id('sign-in-btn')).tap();
    }
  });

  it('should log in and navigate back to ChatList screen on successful Sign-In', async () => {
    const isSignInScreen = await verifyTextVisibility('Sign in with');

    if (isSignInScreen) {
      await element(by.id('email-text-field')).typeText(CHITESTEMAIL);
      await dismisskeyBoard('email-text-field');

      await element(by.id('password-text-field')).typeText(CHITESTPASS);
      await dismisskeyBoard('password-text-field');
      await element(by.id('sign-in-button')).tap();
    }
  });

  it('should navigate to Chat Screen when a sender is selected', async () => {
    const isEmpty = await verifyTextVisibility('You have no message');
    if (!isEmpty) {
      await waitFor(element(by.id('sender-1')))
        .toBeVisible()
        .withTimeout(4000);

      await element(by.id('sender-1')).tap();
    }
  });

  it('should send a message to the seller in Chat Screen', async () => {
    const isEmpty = await verifyTextVisibility('You have no message');
    if (!isEmpty) {
      await waitFor(element(by.id('chatScreen-Back-btn')))
        .toBeVisible()
        .withTimeout(3000);

      await element(by.id('chat-input')).typeText('how may i help you');
      await dismisskeyBoard('chat-input');
      await expect(element(by.id('chat-input'))).toHaveText(
        'how may i help you',
      );
      await element(by.id('button')).tap();
      await element(by.id('chat-input')).clearText();
    }
  });

  it('should verify if message is delivered successfully in Chat Screen', async () => {
    const isEmpty = await verifyTextVisibility('You have no message');
    if (!isEmpty) {
      await waitFor(element(by.text('how may i help you')))
        .toBeVisible()
        .withTimeout(6000);
    }
  });

  it('should navigate back to ChatList screen from Chat Screen', async () => {
    await element(by.id('chatScreen-Back-btn')).tap();
  });
});
