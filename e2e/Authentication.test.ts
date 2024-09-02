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

describe('Sign-up and sign-in', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.setURLBlacklist([
      '.*firestore.googleapis.com/google.firestore.v1.Firestore/Listen.*',
    ]);
  });

  it('should render Get Started screen correctly', async () => {
    await expect(
      element(by.text('Your ultimate shopping destination')),
    ).toBeVisible();
    await expect(element(by.text('Get Started'))).toBeVisible();
    await element(by.id('get-started-button')).tap();
  });

  // ====SINGUP==
  it('should open sidebar and navigate to sign-up correctly', async () => {
    await element(by.id('open-menu')).tap();
    await element(by.id('SignUp')).tap();
  });

  it('should render sign-up correctly', async () => {
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

  it('should check Weak password', async () => {
    await element(by.id('username-text-field')).typeText('Chi chi');
    await dismisskeyBoard('username-text-field');

    await element(by.id('email-text-field')).typeText('Chi@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).typeText('chich');
    await dismisskeyBoard('password-text-field');
    await expect(element(by.text('Weak'))).toBeVisible();
  });

  it('should check Strong password', async () => {
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

  // ===LOGOUT==
  it('should open sidebar and navigate to sign in correctly', async () => {
    await element(by.id('open-menu')).tap();
    await element(by.id('Log Out')).tap();
    await element(by.id('get-started-button')).tap();
  });

  // ====SIGN IN==
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
