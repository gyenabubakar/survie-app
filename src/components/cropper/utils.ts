import type { Data, ToolbarTool } from '#components/cropper/types';
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowsHorizontal,
  ArrowsOutCardinal,
  ArrowsVertical,
  Crop,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
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
