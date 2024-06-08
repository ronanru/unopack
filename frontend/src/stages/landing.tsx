/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import StartButton from '@/components/startButton';
import i18n from '@/i18n';
import { setState, state } from '@/state';
import { For, JSXElement, Show, type Component } from 'solid-js';

const Landing: Component = () => {
  return (
    <div class="mx-auto flex h-full flex-1 flex-col items-center justify-center gap-8 p-8">
      <h1 class="text-center text-5xl font-bold text-white text-balance">
        {state.fromShare ? i18n().shareTagline : i18n().tagline}
      </h1>
      <Show
        when={!state.fromShare}
        fallback={
          <>
            <p class="text-center text-xl font-medium">
              {i18n().landing.shortDescrition}
            </p>
            <div class="gap-3 space-y-3 md:flex md:space-y-0">
              <button
                class="btn w-full md:w-auto"
                onClick={() => setState('stage', 'download')}
              >
                Download
              </button>
              <StartButton secondary buttonText={i18n().landing.editButton} />
            </div>
          </>
        }
      >
        <div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <For each={i18n().landing.cards}>
            {(card, i) => (
              <LandingCard
                color={
                  ['text-purple-300', 'text-indigo-300', 'text-pink-300'][i()]
                }
                icon={
                  [
                    <>
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                    </>,
                    <>
                      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"></path>
                      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"></path>
                      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"></path>
                      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"></path>
                    </>,
                    <>
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </>,
                  ][i()]
                }
                title={card.title}
                text={card.text}
                className={
                  i() == 2
                    ? 'md:col-span-2 md:mx-auto md:w-1/2 lg:col-span-1 lg:w-full'
                    : undefined
                }
              />
            )}
          </For>
        </div>
        <StartButton buttonText={i18n().landing.generateButton} />
      </Show>
    </div>
  );
};

const LandingCard: Component<{
  title: string;
  icon: JSXElement;
  text: string;
  color: string;
  className?: string;
}> = ({ title, icon, text, color, className }) => (
  <div
    class={`rounded-xl border border-zinc-900 bg-zinc-900/50 p-6  shadow${
      className ? ` ${className}` : ''
    }`}
  >
    <div class="flex items-center gap-4 text-3xl font-semibold text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={`h-8 w-8 ${color}`}
      >
        {icon}
      </svg>
      {title}
    </div>
    <p class="mt-6">{text}</p>
  </div>
);

export default Landing;
