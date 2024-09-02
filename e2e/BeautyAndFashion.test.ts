import {device, expect, element} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.setURLBlacklist([
      '.*firestore.googleapis.com/google.firestore.v1.Firestore/Listen.*',
    ]);
  });

  it('should render products correctly', async () => {
    await expect(element(by.text('Beauty'))).toBeVisible();
    await expect(element(by.text('Fashion'))).toBeVisible();
    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.id('search-icon'))).toBeVisible();
  });

  // ===Beauty===
  it('should navigate to beauty screen', async () => {
    await element(by.text('Beauty')).tap();
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await expect(element(by.id('beauty-Back-btn'))).toBeVisible();
  });

  it('Should navigate to search result screen', async () => {
    await element(by.text('Face Mask')).tap();
    await expect(element(by.id('searchResult-Back-btn'))).toBeVisible();
  });

  it('Should navigate back to beauty screen from search result screen', async () => {
    await element(by.id('searchResult-Back-btn')).tap();
  });

  it('filter products in beauty screen based on selected title', async () => {
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await element(by.text('SKINCARE')).tap();
    await element(by.text('FRAGRANCES')).tap();
    await element(by.id('custom-title-scrollview')).scrollTo('right');
    await element(by.text('MAKEUP')).tap();
    await element(by.text('HAIR CARE')).tap();
  });

  it('Should navigate back to products screen from beauty screen', async () => {
    await expect(element(by.id('beauty-Back-btn'))).toBeVisible();

    await element(by.id('beauty-Back-btn')).tap();
  });

  // ===Fashion===
  it('should navigate to fashion screen', async () => {
    await element(by.text('Fashion')).tap();
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await expect(element(by.id('fashion-Back-btn'))).toBeVisible();
  });

  it('Should navigate to search result screen', async () => {
    await element(by.text('Flats')).tap();
    await expect(element(by.id('searchResult-Back-btn'))).toBeVisible();
  });

  it('Should navigate back to fashion screen from search result screen', async () => {
    await element(by.id('searchResult-Back-btn')).tap();
  });

  it('filter products in fashion screen based on selected title', async () => {
    await expect(element(by.text('POPULAR'))).toBeVisible();
    await element(by.text('CLOTHING')).tap();
    await element(by.text('FOOTWEAR')).tap();
    await element(by.id('custom-title-scrollview')).scrollTo('right');
    await element(by.text('ACCESSORIES')).tap();
    await element(by.text('LINGERIE')).tap();
  });

  it('should scroll to the bottom in accessories', async () => {
    await element(by.text('ACCESSORIES')).tap();
    await element(by.id('flatlist')).scrollTo('top');
    await element(by.id('flatlist')).scrollTo('bottom');
    await element(by.id('flatlist')).scrollTo('top');
  });

  it('Should navigate back to products screen from fashion screen', async () => {
    await expect(element(by.id('fashion-Back-btn'))).toBeVisible();
    await element(by.id('fashion-Back-btn')).tap();
  });
});
