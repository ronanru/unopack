/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/


/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Show,
  createUniqueId,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js';
import { Transition } from 'solid-transition-group';

const Modal: Component<{
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[];
  title: string;
  disableClosing?: boolean;
  fullWidth?: boolean;
}> = (props) => {
  const id = createUniqueId();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !props.disableClosing && props.isOpen)
      props.onClose();
  };

  window.addEventListener('keydown', onKeyDown);
  onCleanup(() => window.removeEventListener('keydown', onKeyDown));

  return (
    <Transition
      enterClass="opacity-0"
      enterToClass="opacity-100 transition-opacity"
      exitClass="opacity-100"
      exitToClass="opacity-0 transition-opacity"
    >
      <Show when={props.isOpen}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          class="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black bg-opacity-75 p-4 backdrop-blur-sm"
        >
          <section
            class="w-full rounded-2xl border-2 border-zinc-700 bg-zinc-950 backdrop:backdrop-blur"
            classList={{
              'max-w-7xl': props.fullWidth,
              'max-w-xl': !props.fullWidth,
            }}
          >
            <div class="flex items-center justify-between border-b-2 border-zinc-600 p-4">
              <h1 class="text-xl font-bold" id={`${id}-title`}>
                {props.title}
              </h1>
              <Show when={!props.disableClosing}>
                <button
                  onClick={props.onClose}
                  class="relative -right-2 -top-2 p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="transition-all hover:rotate-12 hover:text-white"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </Show>
            </div>
            <div class="max-h-[90vh] overflow-auto p-4">{props.children}</div>
          </section>
        </div>
      </Show>
    </Transition>
  );
};

export default Modal;
