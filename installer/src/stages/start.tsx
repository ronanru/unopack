/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { invoke } from '@tauri-apps/api/tauri';
import { createSignal, type Component, Show } from 'solid-js';
import { setState } from '../state';

const Start: Component<{ onStart: () => void }> = props => {
  const [minecraftPath, setMinecraftPath] = createSignal<string | null>(null);
  const [archivePath, setArchivePath] = createSignal<string | null>(null);

  invoke('find_default_minecraft_path').then(setMinecraftPath);

  return (
    <>
      <div>
        <p class="text-lg">Minecraft folder (.minecraft)</p>
        <div class="flex gap-3 items-center text-lg">
          <p class="bg-zinc-800 text-white rounded-lg w-full px-8 py-3 overflow-x-auto">
            {minecraftPath() ?? 'No path selected'}
          </p>
          <button
            onClick={() => invoke('folder_picker').then(f => f && setMinecraftPath(f as string))}
            class="rounded-lg bg-pink-300 px-8 py-3 text-center hover:bg-purple-300 transition-colors text-xl font-bold text-zinc-950"
          >
            Select
          </button>
        </div>
      </div>
      <div>
        <p class="text-lg">UnoPack Archive</p>
        <div class="flex gap-3 items-center text-lg">
          <p class="bg-zinc-800 text-white rounded-lg w-full px-8 py-3 overflow-x-auto">
            {archivePath() ?? 'No path selected'}
          </p>
          <button
            onClick={() => invoke('zip_file_picker').then(setArchivePath)}
            class="rounded-lg bg-pink-300 px-8 py-3 text-center hover:bg-purple-300 transition-colors text-xl font-bold text-zinc-950"
          >
            Select
          </button>
        </div>
      </div>
      <Show when={minecraftPath() && archivePath()}>
        <button
          class="btn w-full !mt-6"
          onClick={() => {
            setState({
              minecraftPath: minecraftPath()!,
              archivePath: archivePath()!
            });
            props.onStart();
          }}
        >
          Install
        </button>
      </Show>
    </>
  );
};

export default Start;
