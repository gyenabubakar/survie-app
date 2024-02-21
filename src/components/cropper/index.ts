/**
 * Most of the code in this directory was ported from a Vue/JavaScript project.
 * Find it here — https://github.com/fengyuanchen/photo-editor.
 * */

import type { ComponentType, SvelteComponent } from 'svelte';
import {
  type IconContextProps,
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowsOutCardinal,
  ArrowsVertical,
  Crop,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  ArrowsHorizontal,
} from 'phosphor-svelte';

export const defaultData: Data = {
  cropped: false,
  cropping: false,
  loaded: false,
  name: '',
  previousUrl: '',
  type: '',
  url: '',
};

export const toolbarActions: ToolbarTool[] = [
  {
    name: 'Move',
    icon: ArrowsOutCardinal,
    action: 'move',
  },
  {
    name: 'Crop',
    icon: Crop,
    action: 'crop',
  },
  {
    name: 'Zoom In (I)',
    icon: MagnifyingGlassPlus,
    action: 'zoom-in',
  },
  {
    name: 'Zoom Out (O)',
    icon: MagnifyingGlassMinus,
    action: 'zoom-out',
  },
  {
    name: 'Rotate Left (L)',
    icon: ArrowCounterClockwise,
    action: 'rotate-left',
  },
  {
    name: 'Rotate Right (R)',
    icon: ArrowClockwise,
    action: 'rotate-right',
  },
  {
    name: 'Flip Horizontal (H)',
    icon: ArrowsHorizontal,
    action: 'flip-horizontal',
  },
  {
    name: 'Flip Vertical (V)',
    icon: ArrowsVertical,
    action: 'flip-vertical',
  },
];

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

export type ToolbarTool = {
  name: string;
  icon: ComponentType<SvelteComponent<IconContextProps['values']>>;
  action: EditorToolbarAction;
};

export { default as ImageEditor } from './ImageEditor.svelte';
export { default as Loader } from './Loader.svelte';
export { default as Navbar } from './Navbar.svelte';
export { default as Cropper } from './Cropper.svelte';
