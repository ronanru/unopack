/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { Feature } from '@/features';
import i18n from '@/i18n';
import { state } from '@/state';
import {
  For,
  Show,
  createSignal,
  createUniqueId,
  type Component,
} from 'solid-js';
import Modal from './modal';

const CustomModModal: Component<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mod: Feature) => void;
}> = (props) => {
  let input: HTMLInputElement;
  let updateOptionsTimeout: number | null = null;
  let containerDiv: HTMLDivElement;

  const id = createUniqueId();

  const [options, setOptions] = createSignal<Feature[]>([]);
  const [hoveredOption, setHoveredOption] = createSignal(0);
  const [selectedOption, setSelectedOption] = createSignal<Feature | null>(
    null
  );

  const onInput = (e: Event & { currentTarget: HTMLInputElement }) => {
    if (updateOptionsTimeout) clearTimeout(updateOptionsTimeout);
    const query = e.currentTarget.value;
    if (query.length < 3) return setOptions([]);
    updateOptionsTimeout = setTimeout(
      () => getOptions(query).then(setOptions),
      500
    );
  };

  const selectOption = (option: Feature | null) => {
    setSelectedOption(option);
    input.value = option?.name || '';
    setOptions([]);
  };

  const closeOptions = () => {
    input.value = selectedOption()?.name || '';
    setOptions([]);
  };

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case 'Space':
        e.preventDefault();
        selectOption(options()[hoveredOption()]);
        break;
      case 'Escape':
        e.preventDefault();
        closeOptions();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHoveredOption((hoveredOption() + 1) % options().length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHoveredOption(
          hoveredOption() - 1 < 0 ? options().length - 1 : hoveredOption() - 1
        );
        break;
      case 'Home':
        e.preventDefault();
        setHoveredOption(0);
        break;
      case 'End':
        e.preventDefault();
        setHoveredOption(options().length - 1);
        break;
    }
  };

  const closeDialog = () => {
    props.onClose();
    input.value = '';
    setOptions([]);
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const option = selectedOption();
    input.value = '';
    if (!option) return;
    props.onSubmit(option);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={closeDialog} title={i18n().addAnyMod}>
      <form action="dialog" onSubmit={onSubmit}>
        <div class="space-y-3 text-left">
          <div class="relative space-y-1 px-1" ref={containerDiv!}>
            <label for={id}>{i18n().modName}</label>
            <input
              ref={input!}
              required
              aria-controls={options().length ? `${id}-listbox` : undefined}
              type="text"
              class="w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-xl px-2 py-1.5"
              id={id}
              role="combobox"
              aria-autocomplete="list"
              aria-activedescendant={`${id}-option-${hoveredOption()}`}
              aria-expanded={!!options().length}
              onInput={onInput}
              onKeyDown={onInputKeyDown}
            />
            <Show when={options().length}>
              <ul
                class="absolute inset-x-0 top-16 rounded-md bg-zinc-700 p-2 text-white"
                role="listbox"
                id={`${id}-listbox`}
                aria-labelledby={id}
                aria-orientation="vertical"
              >
                <For each={options()}>
                  {(option, i) => (
                    <li
                      id={`${id}-option-${i()}`}
                      role="option"
                      tabIndex={0}
                      class="cursor-pointer rounded px-2 py-1"
                      classList={{
                        'bg-zinc-800': hoveredOption() === i(),
                      }}
                      aria-selected={selectedOption()?.id === option.id}
                      onMouseOver={() => setHoveredOption(i())}
                      onClick={() => selectOption(option)}
                    >
                      {option.name}
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </div>
          <p class="text-red-200">{i18n().addAnyModNotice}</p>
          <div class="flex items-baseline justify-between">
            <button
              type="button"
              class="text-zinc-400 underline underline-offset-2"
              onClick={closeDialog}
            >
              {i18n().cancel}
            </button>
            <button
              disabled={!selectedOption()}
              class="rounded-lg bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-300 px-4 py-1.5 text-center font-bold uppercase text-zinc-950 shadow"
            >
              {i18n().continue}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

const getOptions = (query: string): Promise<Feature[]> =>
  fetch(
    `https://api.modrinth.com/v2/search?query=${encodeURIComponent(
      query
    )}&limit=5&facets=${encodeURIComponent(
      `[["versions:${state.version}"],["categories:quilt","categories:fabric"],["project_type:mod"]]`
    )}`
  )
    .then((res) => res.json())
    .then((res) =>
      res.hits.map(
        (hit: Record<string, string>) =>
          ({
            name: hit.title,
            id: hit.slug,
            icon: hit.icon_url,
            description: hit.description,
            author: hit.author,
            url: `https://modrinth.com/mod/${hit.slug}`,
            type: 'mod',
          }) as Feature
      )
    );

export default CustomModModal;
