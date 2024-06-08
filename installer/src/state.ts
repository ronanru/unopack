import { createStore } from 'solid-js/store';

export type State = {
  archivePath?: string;
  minecraftPath?: string;
  finished: boolean;
  error?: string;
};

export const [state, setState] = createStore<State>({
  finished: false
});
