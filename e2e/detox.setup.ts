beforeAll(async () => {
  await device.launchApp();
  await device.setURLBlacklist([
    '.*firestore.googleapis.com/google.firestore.v1.Firestore.*',
    '.*cdn.pixabay.com.*',
  ]);
});

afterAll(async () => {
  await device.terminateApp();
});
