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

describe('Sign Up component', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should open sidebar and navigate to sign-up correctly', async () => {
    await element(by.id('open-menu')).tap();
    await element(by.id('SignUp')).tap();
  });

  it('should render sign-in correctly', async () => {
    await expect(element(by.text('Sign up with'))).toBeVisible();
    await expect(element(by.text('Github'))).toBeVisible();
    await expect(element(by.text('Google'))).toBeVisible();
    await expect(element(by.text('or sign up the classic way'))).toBeVisible();

    await expect(element(by.id('username-text-field'))).toBeVisible();
    await expect(element(by.id('email-text-field'))).toBeVisible();
    await expect(element(by.id('password-text-field'))).toBeVisible();
    await expect(element(by.id('sign-up-button'))).toBeVisible();
    await expect(element(by.id('google-login-btn'))).toBeVisible();
  });

  it('should check Weak password strength', async () => {
    await element(by.id('username-text-field')).typeText('Chi chi');
    await dismisskeyBoard('username-text-field');

    await element(by.id('email-text-field')).typeText('Chi@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).typeText('chich');
    await dismisskeyBoard('password-text-field');
    await expect(element(by.text('Weak'))).toBeVisible();
  });

  it('should check Strong password strength', async () => {
    await element(by.id('password-text-field')).clearText();
    await element(by.id('password-text-field')).typeText('chichi');
    await dismisskeyBoard('password-text-field');
    await expect(element(by.text('Strong'))).toBeVisible();
  });

  it('should show a message if user-name alread exist', async () => {
    await element(by.id('check-box')).tap();
    await element(by.id('sign-up-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();

    await waitFor(element(by.text('Username already in use')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should show a message if email alread exist', async () => {
    await dismissAlert();
    await element(by.id('username-text-field')).clearText();
    await element(by.id('username-text-field')).typeText('test test');
    await dismisskeyBoard('username-text-field');

    await element(by.id('sign-up-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();

    await waitFor(element(by.text('Email already in use')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should navigate to home screen on successful sign-up', async () => {
    await dismissAlert();
    await element(by.id('username-text-field')).clearText();
    await element(by.id('username-text-field')).typeText('test');
    await dismisskeyBoard('username-text-field');

    await element(by.id('email-text-field')).clearText();

    await element(by.id('email-text-field')).typeText('test@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).clearText();

    await element(by.id('password-text-field')).typeText('test-password');
    await dismisskeyBoard('password-text-field');
    await element(by.id('sign-up-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();
  });
});
