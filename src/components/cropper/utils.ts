import {
  CropIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  MoveIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@lucide/svelte';
import type { Data, ToolbarTool } from '#components/cropper/types';

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
    icon: MoveIcon,
    action: 'move',
  },
  {
    name: 'Crop',
    icon: CropIcon,
    action: 'crop',
  },
  {
    name: 'Zoom In (I)',
    icon: ZoomInIcon,
    action: 'zoom-in',
  },
  {
    name: 'Zoom Out (O)',
    icon: ZoomOutIcon,
    action: 'zoom-out',
  },
  {
    name: 'Rotate Left (L)',
    icon: RotateCcwIcon,
    action: 'rotate-left',
  },
  {
    name: 'Rotate Right (R)',
    icon: RotateCwIcon,
    action: 'rotate-right',
  },
  {
    name: 'Flip Horizontal (H)',
    icon: FlipHorizontalIcon,
    action: 'flip-horizontal',
  },
  {
    name: 'Flip Vertical (V)',
    icon: FlipVerticalIcon,
    action: 'flip-vertical',
  },
];
