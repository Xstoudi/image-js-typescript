import { decodeJpeg } from '../decodeJpeg';
import { decodeTiff } from '../decodeTiff';

test('without metadata', async () => {
  const buffer = testUtils.loadBuffer(`various/without-metadata.jpg`);
  const img = decodeJpeg(buffer);
  expect(img.meta).toBeUndefined();
});

test('with metadata', async () => {
  const buffer = testUtils.loadBuffer(`formats/grey6.jpg`);
  const img = decodeJpeg(buffer);
  expect(img.meta).toBeDefined();
});

test('with metadata 2', async () => {
  const buffer = testUtils.loadBuffer(`formats/tif/grey32.tif`);
  const img = decodeTiff(buffer);
  expect(img.meta).toBeDefined();
});
