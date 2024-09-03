import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';
import {dismissAlertWithOk} from './utils/dismissAlert';

describe('Product Detail', () => {
  it('should launch the app and display Get Started screen', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  it('should display product categories correctly on the main screen', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
  });

  it('should navigate to Product Detail screen when a product is selected', async () => {
    await waitFor(
      element(by.id('2 In 1 Smart STOCK Jeans For Men- Black +Blue')),
    )
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('2 In 1 Smart STOCK Jeans For Men- Black +Blue')).tap();
  });

  it('should allow selecting different sizes for the product', async () => {
    await waitFor(element(by.text('Ndubuisi Alex')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('XS')).tap();
    await element(by.text('S')).tap();
    await element(by.text('M')).tap();
    await element(by.text('L')).tap();
  });

  it('should add product to the cart successfully', async () => {
    await element(by.text('Add to cart')).tap();

    await waitFor(element(by.text('Add to cart')))
      .toBeVisible()
      .withTimeout(13000);
  });

  it('should handle adding a product to the cart when it is already in the cart', async () => {
    await element(by.text('XS')).tap();
    await element(by.text('S')).tap();
    await element(by.text('Add to cart')).tap();
  });

  it('should dismiss alert with ok', async () => {
    await dismissAlertWithOk();
  });
});
