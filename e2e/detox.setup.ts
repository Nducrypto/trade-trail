let isAppLaunched = false;

beforeAll(async () => {
  if (!isAppLaunched) {
    await device.launchApp();
    await device.setURLBlacklist([
      '.*firestore.googleapis.com/google.firestore.v1.Firestore.*',
      '.*cdn.pixabay.com.*',
    ]);
    isAppLaunched = true;
  }
});

afterAll(async () => {
  await device.terminateApp();
});
