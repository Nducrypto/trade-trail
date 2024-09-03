import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';
import {dismisskeyBoard} from './utils/dismisskeyBoard';

describe('Product Component', () => {
  it('should launch the app and display Get Started screen', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  it('should display product categories and search text-field correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.id('search-icon'))).toBeVisible();
  });

  it('should search for an existing product type and display results', async () => {
    await element(by.id('input')).typeText('Jeans');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('Jeans');
    await element(by.id('search-icon')).tap();
  });

  it('should handle search for a non-existing product type and clear the search input', async () => {
    await element(by.id('input')).clearText();
    await element(by.id('input')).typeText('cap');
    await dismisskeyBoard('input');
    await expect(element(by.id('input'))).toHaveText('cap');
    await element(by.id('search-icon')).tap();

    await element(by.id('input')).clearText();
  });

  it('should scroll through the product list from top to bottom and back to top', async () => {
    await dismisskeyBoard('input');
    await element(by.id('scrollView')).scrollTo('top');
    await element(by.id('scrollView')).scrollTo('bottom');
    await element(by.id('scrollView')).scrollTo('top');
  });
});
