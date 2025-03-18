import {element} from 'detox';

export const verifyTextVisibility = async (text: string) => {
  const isVisisble = await waitFor(element(by.text(text)))
    .toBeVisible()
    .withTimeout(6000)
    .catch(() => false);
  if (isVisisble) {
    return true;
  } else {
    return false;
  }
};
