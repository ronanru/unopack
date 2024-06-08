/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import i18n, {
  LangCode,
  currentLanguage,
  languages,
  setLanguage,
} from '@/i18n';
import {
  For,
  Show,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  type Component,
} from 'solid-js';

const LanguageSwitcher: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [hoveredLang, setHoveredLang] = createSignal(0);
  let listbox: HTMLUListElement;
  let containerDiv: HTMLDivElement;
  const id = createUniqueId();

  const open = () => {
    setIsOpen(true);
    listbox.focus();
    setHoveredLang(Object.keys(languages).indexOf(currentLanguage()));
  };

  const setLangAndClose = (lang: LangCode) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const onListboxKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case 'Space':
        setLangAndClose(Object.keys(languages)[hoveredLang()] as LangCode);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHoveredLang((hoveredLang() + 1) % Object.keys(languages).length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHoveredLang(
          hoveredLang() - 1 < 0
            ? Object.keys(languages).length - 1
            : hoveredLang() - 1
        );
        break;
      case 'Tab':
        e.preventDefault();
        break;
      case 'Home':
        e.preventDefault();
        setHoveredLang(0);
        break;
      case 'End':
        e.preventDefault();
        setHoveredLang(Object.keys(languages).length - 1);
        break;
    }
  };

  const onWindowClick = (e: MouseEvent) =>
    !containerDiv.contains(e.target as Node) && setIsOpen(false);

  onMount(() => document.addEventListener('click', onWindowClick));

  onCleanup(() => document.removeEventListener('click', onWindowClick));

  return (
    <div class="relative" ref={containerDiv!}>
      <button
        type="button"
        aria-controls={isOpen() ? `${id}-listbox` : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen() ? 'true' : undefined}
        onClick={() => (isOpen() ? setIsOpen(false) : open())}
        id={id}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Space') && open()}
        aria-label={i18n().changeLang}
        class="rounded-md"
      >
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
          <path d="m5 8 6 6"></path>
          <path d="m4 14 6-6 2-3"></path>
          <path d="M2 5h12"></path>
          <path d="M7 2h1"></path>
          <path d="m22 22-5-10-5 10"></path>
          <path d="M14 18h6"></path>
        </svg>
      </button>
      <Show when={isOpen()}>
        <ul
          class="absolute -right-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-2"
          role="listbox"
          aria-labelledby={id}
          tabIndex={0}
          aria-orientation="vertical"
          ref={listbox!}
          onKeyDown={onListboxKeyDown}
          id={`${id}-listbox`}
        >
          <For each={Object.entries(languages)}>
            {([code, name], i) => (
              <li
                role="option"
                tabIndex={-1}
                aria-selected={currentLanguage() === code}
                onMouseOver={() => setHoveredLang(i())}
                class="cursor-pointer rounded-lg px-3 py-1"
                classList={{
                  'bg-zinc-950/50': hoveredLang() === i(),
                }}
                onClick={() => setLangAndClose(code as LangCode)}
              >
                {name}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default LanguageSwitcher;
