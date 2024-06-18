import type { ComponentType, SvelteComponent } from 'svelte';
import type { IconContextProps } from 'phosphor-svelte';

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
