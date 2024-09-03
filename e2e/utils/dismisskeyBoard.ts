import {device, element} from 'detox';

export const dismisskeyBoard = async (textFieldId: string) => {
  if (device.getPlatform() === 'ios') {
    await element(by.id(textFieldId)).tapReturnKey();
  } else {
    await device.pressBack();
  }
};
