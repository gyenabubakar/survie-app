import { PNG_JPEG_REGEX, TWO_MEGABYTES } from '$lib/constants';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isSupportedImageFile(data: unknown) {
  const isSupportedImage = data instanceof File && PNG_JPEG_REGEX.test(data.type);
  return isSupportedImage && data.size <= TWO_MEGABYTES;
}

export function getInitials(name: string) {
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase() + words[0].charAt(1);
  }
  return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
}
