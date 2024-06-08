/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import i18n from '@/i18n';
import { serializedState } from '@/state';
import { encode } from 'js-base64';
import { For, Show, createSignal, onMount, type Component } from 'solid-js';

const getUrl = async (state: string) => {
  const urls = import.meta.env.DEV
    ? ['http://localhost:4000/getUrl']
    : [
        'https://unopackapi.uuuu.uno/getUrl',
        'https://reserv-unopack.vshte.media/getUrl',
      ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: state,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) return res.text();
    } catch {}
  }
  alert(i18n().downloadError);
};

const Download: Component = () => {
  const [url, setUrl] = createSignal<null | string>(
    import.meta.env.DEV ? 'TEST' : null
  );

  let link: HTMLAnchorElement;

  onMount(async () => {
    const url = await getUrl(serializedState());
    if (url) return setUrl(url);
  });

  const share = () => {
    navigator.clipboard.writeText(
    `${window.location.origin}#${encode(serializedState())}`
    );
    alert(i18n().linkCopied);
  };

  return (
    <div class="grid justify-items-center px-4">
      <Show
        when={url()}
        fallback={
          <>
            <h1 class="mb-4 text-center text-5xl font-bold text-zinc-400">
              {i18n().loadingText}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mt-12 animate-spin text-pink-300"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </>
        }
      >
        <h1 class="mb-4 text-center text-5xl font-bold text-white">
          {i18n().finishedText}
        </h1>
        <div class="grid w-full max-w-2xl gap-3 space-y-3">
          <div class="rounded-xl border-2 border-red-600 bg-red-500/30 p-3 text-center text-white ">
            {i18n().quiltWarning}
          </div>
          <div class="space-y-6 rounded-xl border border-zinc-900 bg-zinc-900/50 p-6  ">
            <For each={i18n().instructions}>
              {(instruction) => (
                <details class="w-full text-white">
                  <summary class="w-full text-xl">{instruction.name}</summary>
                  <span
                    class="mt-3 text-xl text-zinc-400"
                    innerHTML={instruction.text.replace(
                      '%INSTALLER_LINKS%',
                      () => `
                    <a
                      download="unopack-installer.exe"
                      href="https://storage.yandexcloud.net/unopack/apps/unopack-installer.exe"
                      class="underline mr-2"
                    >Windows</a>
                    <a
                      download="unopack-installer.AppImage"
                      href="https://storage.yandexcloud.net/unopack/apps/unopack-installer.AppImage"
                      class="underline"
                    >Linux</a>
                    `
                    )}
                  ></span>
                </details>
              )}
            </For>
          </div>
        </div>
        <a
          href="https://discord.gg/z9PGmWuhr7"
          class="mt-6 flex w-full max-w-2xl items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-8 py-3 text-center text-lg font-semibold text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 127.14 96.36"
            class="h-6 w-6 text-white"
          >
            <path
              fill="currentColor"
              class="cls-1"
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
            />
          </svg>
          <p>{i18n().discordInvite}</p>
        </a>
        <div class="mt-6 flex w-full max-w-2xl gap-3">
          <a
            class="btn flex w-full max-w-2xl items-center justify-center gap-2"
            href={url() as string}
            ref={link!}
            download="UnoPack.zip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-6 w-5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            {i18n().downloadPack}
          </a>
          <button
            class="btn-zinc flex items-center justify-center gap-2"
            onClick={share}
            aria-label={i18n().sharePack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
          </button>
        </div>
      </Show>
    </div>
  );
};

export default Download;
