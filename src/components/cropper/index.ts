export type NavAction = 'crop' | 'clear' | 'restore' | 'remove' | 'save';
export type EditorToolbarAction =
  | 'move'
  | 'crop'
  | 'zoom-in'
  | 'zoom-out'
  | 'rotate-left'
  | 'rotate-right'
  | 'flip-horizontal'
  | 'flip-vertical';

export interface Data {
  loaded: boolean;
  name: string;
  type: string;
  url: string;
  cropped: boolean;
  cropping: boolean;
  previousUrl: string;
}

export const defaultData: Data = {
  cropped: false,
  cropping: false,
  loaded: false,
  name: '',
  previousUrl: '',
  type: '',
  url: '',
};

export { default as ImageEditor } from './ImageEditor.svelte';
export { default as Loader } from './Loader.svelte';
export { default as Navbar } from './Navbar.svelte';
export { default as Cropper } from './Cropper.svelte';
