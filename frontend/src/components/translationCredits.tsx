/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import i18n from '@/i18n';
import { For, createSignal, type Component } from 'solid-js';
import Modal from './modal';

const translators = [
  {
    language: 'cz',
    name: 'realdivided',
    url: 'https://t.me/realdivided',
  },
  {
    language: 'ua',
    name: 'weever',
    url: 'https://t.me/synthdev',
  },
  {
    language: 'be',
    name: '8ISKUP',
    url: 'https://t.me/biskuperaklad',
  },
  {
    language: 'fi',
    name: 'Plømni',
    url: 'https://t.me/Selvanakijakisa',
  },
] as const;

const TranslationCredits: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div>
      <Modal
        title={i18n().translationCredits}
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <For each={translators}>
            {({ language, name, url }) => (
              <p class="text-left text-lg">
                {i18n().languages[language]}
                {'  '}
                {i18n().translationBy}{' '}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline decoration-purple-400 decoration-dashed underline-offset-2 hover:decoration-wavy"
                >
                  {name}
                </a>
              </p>
            )}
          </For>
        </div>
      </Modal>
      <button
        onClick={() => setIsOpen(true)}
        class="underline decoration-purple-400 decoration-dashed underline-offset-2 hover:decoration-wavy md:text-right"
      >
        {i18n().translationCredits}
      </button>
    </div>
  );
};

export default TranslationCredits;
