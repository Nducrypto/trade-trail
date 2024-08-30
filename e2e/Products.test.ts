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
  });

  it('should render Products correctly', async () => {
    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
  });

  it('should render products correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.id('search-icon'))).toBeVisible();
  });

  it('should navigate to beauty screen when clicked', async () => {
    await element(by.text('Beauty')).tap();
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await expect(element(by.id('beauty-Back-btn'))).toBeVisible();

    await element(by.id('beauty-Back-btn')).tap();
  });

  it('should navigate to fashion screen when clicked', async () => {
    await element(by.text('Fashion')).tap();

    await expect(element(by.id('fashion-Back-btn'))).toBeVisible();

    await element(by.id('fashion-Back-btn')).tap();
  });

  it('search for exiting product type', async () => {
    await element(by.id('input')).typeText('Jeans');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('Jeans');
    await element(by.id('search-icon')).tap();
  });

  it('search for non-exiting product type', async () => {
    await element(by.id('input')).clearText();
    await element(by.id('input')).typeText('doesnt exist');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('doesnt exist');
    await element(by.id('search-icon')).tap();

    await element(by.id('input')).clearText();
  });

  it('should navigate to product-detail', async () => {
    await dismisskeyBoard('input');
    await element(by.id('2 In 1 Smart STOCK Jeans For Men- Black +Blue')).tap();

    await element(by.id('productDetail-Back-btn')).tap();
    await element(by.id('scrollView')).scrollTo('top');
    await element(by.id('scrollView')).scrollTo('bottom');
  });
});
