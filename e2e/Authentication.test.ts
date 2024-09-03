import {expect, element} from 'detox';
import {dismissAlertWithOk} from './utils/dismissAlert';
import {dismisskeyBoard} from './utils/dismisskeyBoard';
import {getStarted} from './utils/getStarted';

describe('Sign-up and Sign-in', () => {
  it('should render Get Started screen correctly', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  // ====SINGUP==
  it('should open sidebar menu and navigate to sign-up screen', async () => {
    await element(by.id('open-menu')).tap();
    await element(by.id('SignUp')).tap();
  });

  it('should render all elements on the sign-up screen', async () => {
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

  it('should display "Weak" password strength indicator for weak passwords', async () => {
    await element(by.id('username-text-field')).typeText('Chi chi');
    await dismisskeyBoard('username-text-field');

    await element(by.id('email-text-field')).typeText('Chi@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).typeText('chich');
    await dismisskeyBoard('password-text-field');
    await expect(element(by.text('Weak'))).toBeVisible();
  });

  it('should display "Strong" password strength indicator for strong passwords', async () => {
    await element(by.id('password-text-field')).clearText();
    await element(by.id('password-text-field')).typeText('chichi');
    await dismisskeyBoard('password-text-field');
    await expect(element(by.text('Strong'))).toBeVisible();
  });

  it('should show an error message if the username is already in use', async () => {
    await element(by.id('check-box')).tap();
    await element(by.id('sign-up-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();

    await waitFor(element(by.text('Username already in use')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should show an error message if the email is already in use', async () => {
    await dismissAlertWithOk();
    await element(by.id('username-text-field')).clearText();
    await element(by.id('username-text-field')).typeText('test test');
    await dismisskeyBoard('username-text-field');
    await element(by.id('sign-up-button')).tap();
    await waitFor(element(by.id('activity-indicator'))).toBeVisible();

    await waitFor(element(by.text('Email already in use')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should navigate to home screen after successful sign-up', async () => {
    await dismissAlertWithOk();
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
  it('should log out and navigate back to the Get Started screen', async () => {
    await waitFor(element(by.id('test@gmail.com')))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id('open-menu')).tap();
    await element(by.id('Log Out')).tap();
  });

  it('should render Get Started screen correctly to handle Sign In', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });
  // ====SIGN IN==
  it('should open sidebar menu and navigate to sign-in screen', async () => {
    await waitFor(element(by.text('Fashion')))
      .toBeVisible()
      .withTimeout(6000);

    await element(by.id('open-menu')).tap();
    await element(by.id('SignIn')).tap();
  });

  it('should render all elements on the sign-in screen', async () => {
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

  it('should navigate to sign-up screen when prompted', async () => {
    await element(by.text(`Don't have an Account? Sign Up`)).tap();
    await expect(element(by.id('signUp-Back-btn'))).toBeVisible();

    await element(by.id('signUp-Back-btn')).tap();
  });

  it('should show an error message for invalid sign-in credentials', async () => {
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

  it('should navigate to home screen after successful sign-in', async () => {
    await dismissAlertWithOk();
    await element(by.id('email-text-field')).clearText();
    await element(by.id('email-text-field')).typeText('Chi@gmail.com');
    await dismisskeyBoard('email-text-field');

    await element(by.id('password-text-field')).clearText();

    await element(by.id('password-text-field')).typeText('chichi');
    await dismisskeyBoard('password-text-field');

    await element(by.id('sign-in-button')).tap();
  });
});
