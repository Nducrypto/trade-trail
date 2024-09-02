import {device, expect, element} from 'detox';

const dismisskeyBoard = async (textFieldId: string) => {
  if (device.getPlatform() === 'ios') {
    await element(by.id(textFieldId)).tapReturnKey();
  } else {
    await device.pressBack();
  }
};

describe('Example', () => {
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

  it('should render products correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.id('search-icon'))).toBeVisible();
  });

  it('search for exiting product type', async () => {
    await element(by.id('input')).typeText('Jeans');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('Jeans');
    await element(by.id('search-icon')).tap();
  });

  it('search for non-exiting product type', async () => {
    await element(by.id('input')).clearText();
    await element(by.id('input')).typeText('cap');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('cap');
    await element(by.id('search-icon')).tap();

    await element(by.id('input')).clearText();
  });

  it('should scroll to bottom', async () => {
    await dismisskeyBoard('input');
    await element(by.id('scrollView')).scrollTo('top');
    await element(by.id('scrollView')).scrollTo('bottom');
    await element(by.id('scrollView')).scrollTo('top');
  });
});
