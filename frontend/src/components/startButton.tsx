/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import i18n, { currentLanguage } from '@/i18n';
import { setState, state } from '@/state';
import {
  For,
  Show,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  type Component,
} from 'solid-js';
import { Transition } from 'solid-transition-group';

const versions = ['1.20.1', '1.19.4'];

const languagesWhereButtonsAreSwapped = ['az'];

const StartButton: Component<{ buttonText: string; secondary?: true }> = (
  props
) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [hoveredVersion, setHoveredVersion] = createSignal(0);
  const [selectedVersion, setSelectedVersion] = createSignal(0);
  const id = createUniqueId();

  let listbox: HTMLUListElement;
  let containerDiv: HTMLDivElement;

  const open = () => {
    setIsOpen(true);
    setHoveredVersion(0);
    listbox.focus();
  };

  const onListboxKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case 'Space':
        setSelectedVersion(hoveredVersion());
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHoveredVersion((hoveredVersion() + 1) % versions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHoveredVersion(
          hoveredVersion() - 1 < 0 ? versions.length - 1 : hoveredVersion() - 1
        );
        break;
      case 'Tab':
        e.preventDefault();
        break;
      case 'Home':
        e.preventDefault();
        setHoveredVersion(0);
        break;
      case 'End':
        e.preventDefault();
        setHoveredVersion(versions.length - 1);
        break;
    }
  };

  const onWindowClick = (e: MouseEvent) =>
    !containerDiv.contains(e.target as Node) && setIsOpen(false);

  onMount(() => document.addEventListener('click', onWindowClick));

  onCleanup(() => document.removeEventListener('click', onWindowClick));

  return (
    <div
      ref={containerDiv!}
      class="relative flex rounded-xl text-center text-xl font-bold shadow"
      classList={{
        'from-pink-300 bg-gradient-to-r via-purple-400 to-indigo-300 text-zinc-950':
          !props.secondary,
        'bg-zinc-800 text-white': props.secondary,
        'flex-row-reverse': languagesWhereButtonsAreSwapped.includes(
          currentLanguage()
        ),
      }}
    >
      <button
        onClick={() =>
          setState({
            ...state,
            version: versions[selectedVersion()],
            stage: 'features',
          })
        }
        class="rounded-l-lg bg-white bg-opacity-0 px-2.5 py-3 pl-4 pr-2 uppercase transition-colors hover:bg-opacity-20"
      >
        {props.buttonText}
        <span class="sr-only">{versions[selectedVersion()]}</span>
      </button>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-controls={isOpen() ? `${id}-listbox` : undefined}
        aria-expanded={isOpen() ? 'true' : undefined}
        onClick={() => (isOpen() ? setIsOpen(false) : open())}
        id={id}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Space') && open()}
        aria-label={i18n().chooseVersion}
        class="relative flex items-center rounded-r-lg bg-opacity-30 px-2.5 pl-2 pr-2 transition-colors hover:bg-opacity-60"
        classList={{
          'bg-purple-300': !props.secondary,
          'bg-zinc-600': props.secondary,
        }}
      >
        {versions[selectedVersion()]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-8 w-8"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <Transition
        enterClass="opacity-0"
        enterToClass="opacity-100 transition-opacity"
        exitClass="opacity-100"
        exitToClass="opacity-0 transition-opacity"
      >
        <Show when={isOpen()}>
          <ul
            ref={listbox!}
            class="absolute inset-x-0 top-16 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-white"
            role="listbox"
            aria-labelledby={id}
            tabIndex={0}
            aria-orientation="vertical"
            id={`${id}-listbox`}
            onKeyDown={onListboxKeyDown}
          >
            <For each={versions}>
              {(version, i) => (
                <li
                  role="option"
                  tabIndex={-1}
                  aria-selected={selectedVersion() === i()}
                  onMouseOver={() => setHoveredVersion(i())}
                  class="cursor-pointer rounded-lg px-2 py-1"
                  classList={{
                    'bg-zinc-950/50': hoveredVersion() === i(),
                  }}
                  onClick={() => {
                    setSelectedVersion(i());
                    setIsOpen(false);
                  }}
                >
                  {version}
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Transition>
    </div>
  );
};

export default StartButton;
