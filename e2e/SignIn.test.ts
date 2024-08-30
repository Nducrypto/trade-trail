import {device, expect, element} from 'detox';

const dismissAlert = async () => {
  if (device.getPlatform() === 'ios') {
    await element(by.label('OK')).atIndex(0).tap();
  } else {
    await device.pressBack();
  }
};
const dismisskeyBoard = async (textFieldId: string) => {
  if (device.getPlatform() === 'ios') {
    await element(by.id(textFieldId)).tapReturnKey();
  } else {
    await device.pressBack();
  }
};

describe('Sign In component', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should open sidebar and navigate to sign in correctly', async () => {
    await element(by.id('open-menu')).tap();
    await element(by.id('SignIn')).tap();
  });

  it('should render sign in correctly', async () => {
    await expect(element(by.text('Sign in with'))).toBeVisible();
    await expect(element(by.text('Github'))).toBeVisible();
    await expect(element(by.text('Google'))).toBeVisible();
    await expect(element(by.text('or sign in the classic way'))).toBeVisible();
    await expect(
      element(by.text(`Don't have an Account? Sign Up`)),
    ).toBeVisible();
    await expect(element(by.id('email-text-field'))).toBeVisible();
    await expect(element(by.id('password-text-field'))).toBeVisible();
    await expect(element(by.id('sign-in-button'))).toBeVisible();
    await expect(element(by.id('google-login-icon'))).toBeVisible();
  });

  it('should navigate to sign up screen', async () => {
    await element(by.text(`Don't have an Account? Sign Up`)).tap();
    await expect(element(by.id('signUp-Back-btn'))).toBeVisible();

    await element(by.id('signUp-Back-btn')).tap();
  });

  it('should show an error message for invalid credentials', async () => {
    await element(by.id('email-text-field')).clearText();
    await element(by.id('email-text-field')).typeText(
      'invaliduser@example.com',
    );
    await dismisskeyBoard('email-text-field');
    await element(by.id('password-text-field')).clearText();

    await element(by.id('password-text-field')).typeText('wrongpassword');
    await dismisskeyBoard('password-text-field');
    await element(by.id('sign-in-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();

    await waitFor(element(by.text('User not found')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate to home screen on successful sign-in', async () => {
    await dismissAlert();
    await element(by.id('email-text-field')).clearText();
    await element(by.id('email-text-field')).typeText('Chi@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).clearText();

    await element(by.id('password-text-field')).typeText('chichi');
    await dismisskeyBoard('password-text-field');

    await element(by.id('sign-in-button')).tap();
  });
});
