export const TWO_MEGABYTES = 1024 * 1024 * 2;

export const PNG_JPEG_REGEX = /^image\/(png|jpe?g)$/;

export const SUPER_FORM_COMMON_OPTIONS = {
  resetForm: false,
  dataType: 'json' as const,
  invalidateAll: false,
  validationMethod: 'oninput' as const,
};
