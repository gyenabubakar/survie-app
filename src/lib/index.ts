import { PNG_JPEG_REGEX, TWO_MEGABYTES } from '$lib/constants';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isSupportedImageFile(data: unknown) {
  const isSupportedImage = data instanceof File && PNG_JPEG_REGEX.test(data.type);
  return isSupportedImage && data.size <= TWO_MEGABYTES;
}
