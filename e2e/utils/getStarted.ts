import {element} from 'detox';

export const getStarted = async () => {
  const isGetStartedvisible = await waitFor(element(by.text('Get Started')))
    .toBeVisible()
    .withTimeout(1000)
    .catch(() => false);
  if (isGetStartedvisible) {
    return true;
  } else {
    return false;
  }
};
