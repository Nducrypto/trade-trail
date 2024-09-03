import {expect, element} from 'detox';
import {getStarted} from './utils/getStarted';

describe('Beauty and Fashion Navigation and Interaction', () => {
  it('should display and navigate from the Get Started screen', async () => {
    const isGetStartedvisible = await getStarted();
    if (isGetStartedvisible) {
      await element(by.id('get-started-button')).tap();
    }
  });

  it('should display Beauty and Fashion categories on the products screen', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
  });

  // ===Beauty===
  it('should navigate to the Beauty screen and check for visibility of elements', async () => {
    await element(by.text('Beauty')).tap();
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await expect(element(by.id('beauty-Back-btn'))).toBeVisible();
  });

  it('should navigate to the search results screen from the Beauty screen', async () => {
    await element(by.text('Face Mask')).tap();
    await expect(element(by.id('searchResult-Back-btn'))).toBeVisible();
  });

  it('should navigate back to the Beauty screen from the search results screen', async () => {
    await element(by.id('searchResult-Back-btn')).tap();
  });

  it('should filter products on the Beauty screen based on selected categories', async () => {
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await element(by.text('SKINCARE')).tap();
    await element(by.text('FRAGRANCES')).tap();
    await element(by.id('custom-title-scrollview')).scrollTo('right');
    await element(by.text('MAKEUP')).tap();
    await element(by.text('HAIR CARE')).tap();
  });

  it('should navigate back to the products screen from the Beauty screen', async () => {
    await expect(element(by.id('beauty-Back-btn'))).toBeVisible();

    await element(by.id('beauty-Back-btn')).tap();
  });

  // ===Fashion===
  it('should navigate to the Fashion screen and verify visibility of elements', async () => {
    await element(by.text('Fashion')).tap();
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await expect(element(by.id('fashion-Back-btn'))).toBeVisible();
  });

  it('should navigate to the search results screen from the Fashion screen', async () => {
    await element(by.text('Flats')).tap();
    await expect(element(by.id('searchResult-Back-btn'))).toBeVisible();
  });

  it('should navigate back to the Fashion screen from the search results screen', async () => {
    await element(by.id('searchResult-Back-btn')).tap();
  });

  it('should filter products on the Fashion screen based on selected categories', async () => {
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await element(by.text('CLOTHING')).tap();
    await element(by.text('FOOTWEAR')).tap();
    await element(by.id('custom-title-scrollview')).scrollTo('right');
    await element(by.text('ACCESSORIES')).tap();
    await element(by.text('LINGERIE')).tap();
  });

  it('should scroll through the Accessories category on the Fashion screen', async () => {
    await element(by.text('ACCESSORIES')).tap();
    await element(by.id('flatlist')).scrollTo('top');
    await element(by.id('flatlist')).scrollTo('bottom');
    await element(by.id('flatlist')).scrollTo('top');
  });

  it('should navigate back to the products screen from the Fashion screen', async () => {
    await expect(element(by.id('fashion-Back-btn'))).toBeVisible();
    await element(by.id('fashion-Back-btn')).tap();
  });
});
