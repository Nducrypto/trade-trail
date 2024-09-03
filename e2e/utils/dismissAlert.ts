import {device, element} from 'detox';

export const dismissAlertWithOk = async () => {
  if (device.getPlatform() === 'ios') {
    await element(by.label('OK')).atIndex(0).tap();
  } else {
    await device.pressBack();
  }
};

export const dismissAlertWithCancel = async () => {
  if (device.getPlatform() === 'ios') {
    await element(by.label('Cancel')).atIndex(1).tap();
  } else {
    await device.pressBack();
  }
};
