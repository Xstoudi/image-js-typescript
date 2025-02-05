import { computeThreshold, threshold } from '../threshold';

test('threshold with a fixed value of 100', () => {
  const testImage = testUtils.load('opencv/test.png');
  const grey = testImage.convertColor('GREY');
  const th = threshold(grey, { threshold: 100 / 255 });

  const expected = testUtils.createMask([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ]);

  expect(th).toMatchMask(expected);
});

test('computeThreshold with OTSU', () => {
  const testImage = testUtils.load('opencv/test.png');

  const grey = testImage.convertColor('GREY');
  const thresholdValue = computeThreshold(grey, 'otsu');
  expect(thresholdValue).toBe(127);
});

test('computeThreshold with OTSU (2)', () => {
  const img = testUtils.load('various/grayscale_by_zimmyrose.png');
  const thresholdValue = computeThreshold(img, 'otsu');
  expect(thresholdValue).toBe(135);
});

test('computeThreshold default should be Otsu', () => {
  const img = testUtils.load('various/grayscale_by_zimmyrose.png');
  const thresholdValue = computeThreshold(img);
  expect(thresholdValue).toBe(135);
});

test('automatic threshold with OTSU', () => {
  const testImage = testUtils.load('opencv/test.png');

  const grey = testImage.convertColor('GREY');
  const th = threshold(grey, { algorithm: 'otsu' });
  const defaultThreshold = threshold(grey);

  const expected = testUtils.createMask([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  expect(th).toMatchMask(expected);
  expect(defaultThreshold).toMatchMask(expected);
});
test('threshold in percents', () => {
  const grey = testUtils.createGreyImage([
    [1, 2, 3],
    [10, 20, 30],
    [50, 60, 70],
  ]);

  const th = threshold(grey, { threshold: 0.1 });

  const expected = testUtils.createMask([
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ]);
  expect(th).toMatchMask(expected);
});

test('error too many channels', () => {
  const testImage = testUtils.load('opencv/test.png');

  expect(() => threshold(testImage, { algorithm: 'otsu' })).toThrow(
    /threshold can only be computed on images with one channel/,
  );
});
test('error threshold out of range', () => {
  const testImage = testUtils.load('opencv/test.png');

  expect(() => threshold(testImage, { threshold: 450 })).toThrow(
    /threshold must be a value between 0 and 1/,
  );
});
