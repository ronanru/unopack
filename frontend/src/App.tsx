/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { Component, onMount } from 'solid-js';
import { Match, Show, Switch } from 'solid-js/web';
import LanguageSwitcher from './components/languageSwitcher';
import TranslationCredits from './components/translationCredits';
import i18n, { currentLanguage } from './i18n';
import { preloadImages } from './images';
import Download from './stages/download';
import FeaturesSelector from './stages/features';
import Landing from './stages/landing';
import { state } from './state';

const App: Component = () => {
  onMount(preloadImages);

  return (
    <Show when={i18n()} fallback="Loading">
      <header class="flex bg-zinc-950/70 z-30 backdrop-blur border-b border-zinc-950 sticky top-0 items-center gap-2 px-6 py-4 text-white">
        <a href="/" class="relative rounded-md text-4xl font-bold">
          <span class="bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
            Uno
          </span>
          Pack
        </a>
        <div class="flex-1"></div>
        <a
          href="https://discord.gg/z9PGmWuhr7"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md"
          aria-label="Discord"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-8 w-8">
            <path
              fill="currentColor"
              d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
            ></path>
          </svg>
        </a>
        <Show when={currentLanguage() === 'ru'}>
          <a
            href="https://boosty.to/unopack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Поддержать проект на Boosty"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 235.6 292.2"
              fill="currentColor"
              class="h-10 w-10"
            >
              <path d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z" />
            </svg>
          </a>
        </Show>
        <LanguageSwitcher />
      </header>
      <main class="container flex flex-1 flex-col">
        <Switch fallback={<Download />}>
          <Match when={state.stage === 'version'}>
            <Landing />
          </Match>
          <Match when={state.stage === 'features'}>
            <FeaturesSelector />
          </Match>
        </Switch>
      </main>
      <footer class="flex flex-col justify-end space-y-1 p-2 text-center text-xs text-zinc-400 md:text-right">
        <p>
          <a
            href="https://uptime.uuuu.uno/status/unopack"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-300 underline decoration-purple-400 decoration-dashed underline-offset-2 hover:decoration-wavy"
          >
            {i18n().status}
          </a>
        </p>
        <p class="flex justify-center gap-1 md:justify-end">
          {i18n().craftedBy}
          <a
            href="https://ronanru.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-300 underline decoration-purple-400 decoration-dashed underline-offset-2 hover:decoration-wavy"
          >
            RonanRU
          </a>{' '}
          {i18n().and}
          <a
            href="https://uuuu.uno"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-300 underline decoration-purple-400 decoration-dashed underline-offset-2 hover:decoration-wavy"
          >
            uuuuuno
          </a>
        </p>
        <TranslationCredits />
      </footer>
    </Show>
  );
};

export default App;
