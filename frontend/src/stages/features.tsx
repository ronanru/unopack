/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import CustomModModal from '@/components/customModModal';
import FeatureCard from '@/components/featureCard';
import Modal from '@/components/modal';
import { Feature, Pack, defaultFeatures, packs } from '@/features';
import i18n from '@/i18n';
import { getFeatureHoverImage } from '@/images';
import { setState, state } from '@/state';
import {
  For,
  Show,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from 'solid-js';
import { Transition } from 'solid-transition-group';

const FeaturesSelector: Component = () => {
  const [isCustomModModalOpen, setIsCustomModModalOpen] = createSignal(false);

  const [isDefaultFeaturesModalOpen, setIsDefaultFeaturesModalOpen] =
    createSignal(false);

  const isPackSelected = (pack: Pack) =>
    pack.id === 'default' ||
    pack.features.some((r) => state.features.includes(r.id));

  const [openPacks, setOpenPacks] = createSignal<string[]>([]);

  const toggleOpenPack = (id: string) =>
    setOpenPacks((p) =>
      p.includes(id) ? p.filter((r) => r !== id) : [...p, id]
    );

  const [isLoading, setIsLoading] = createSignal(true);

  onMount(() => queueMicrotask(() => setIsLoading(false)));

  const [mouseCords, setMouseCords] = createSignal<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const onMouseMove = (e: MouseEvent) =>
    setMouseCords({
      x: e.clientX,
      y: e.clientY,
    });

  onMount(() => window.addEventListener('mousemove', onMouseMove));

  onCleanup(() => window.removeEventListener('mousemove', onMouseMove));

  const [hoveredFeature, setHoveredFeature] = createSignal<string | null>(null);

  return (
    <section
      class="relative px-2 text-center transition-opacity delay-150"
      classList={{
        'opacity-0': isLoading(),
      }}
    >
      <Modal
        isOpen={isDefaultFeaturesModalOpen()}
        onClose={() => setIsDefaultFeaturesModalOpen(false)}
        title={i18n().packs.default.name}
        fullWidth
      >
        <div class="grid gap-3 md:grid-cols-2">
          <For each={defaultFeatures}>
            {(feature) => (
              <FeatureCard
                feature={feature}
                isSelected={true}
                isDefault={true}
              />
            )}
          </For>
        </div>
      </Modal>
      <CustomModModal
        onSubmit={(mod) => {
          setIsCustomModModalOpen(false);
          if (state.additionalMods.some(({ id }) => mod.id === id)) return;
          setState('additionalMods', (a) => [...a, mod]);
        }}
        isOpen={isCustomModModalOpen()}
        onClose={() => setIsCustomModModalOpen(false)}
      />
      <h1 class="w-full sticky text-center text-5xl font-bold">
        {i18n().chooseAdditionalFeatures}
      </h1>
      {/* <Show when={state.version === '1.20'}>
        <div class="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-red-500 bg-red-600/10 p-3 text-red-100 md:col-span-2">
          {i18n().earlyVersionWarning}
        </div>
      </Show> */}
      <div class="mt-6 grid flex-col gap-3">
        <div
          class="rounded-2xl border-2 border-zinc-900 bg-zinc-900/70 text-left cursor-default transition-colors"
          role="button"
        >
          <div class="w-full max-w-5xl items-center gap-3 md:flex">
            <div class="w-full items-center justify-between gap-3 p-4 md:flex">
              <div class="flex-1 p-3 md:p-0">
                <p class="flex flex-wrap items-center gap-2 text-2xl text-white">
                  <span class="rounded-md bg-pink-300 px-2 text-sm font-bold text-zinc-800">
                    {i18n().alwaysOn}
                  </span>
                  {i18n().packs.default.name}
                </p>
                <p>{i18n().packs.default.description}</p>
              </div>
              <button
                class="btn-pink flex w-full items-center justify-center gap-3 md:w-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDefaultFeaturesModalOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>{i18n().viewMods}</span>
              </button>
            </div>
          </div>
        </div>
        <For each={packs}>
          {(pack) => (
            <div class="bg-zinc-950/50 group ">
              <div
                tabIndex={0}
                class="relative z-10 flex md:p-4 cursor-pointer rounded-2xl border-2 border-zinc-900 text-left transition-colors hover:border-purple-300"
                role="button"
                aria-expanded={openPacks().includes(pack.id)}
                aria-controls={
                  openPacks().includes(pack.id)
                    ? `features-${pack.id}`
                    : undefined
                }
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === 'Space') &&
                  toggleOpenPack(pack.id)
                }
                onClick={() => toggleOpenPack(pack.id)}
                classList={{
                  'bg-zinc-900/70 border-pink-300': isPackSelected(pack),
                }}
              >
                <div class="overflow-hidden rounded-xl aspect-square">
                  <img
                    classList={{
                      'bg-gradient-yellow': pack.id === 'utility',
                      'bg-gradient-blue': pack.id === 'roleplay',
                      'bg-gradient-green': pack.id === 'graphics',
                      'bg-gradient-pink': pack.id === 'contentcreator',
                    }}
                    src={`/packs/${pack.id}.webp`}
                    alt={
                      i18n().packs[pack.id].imgAltText ||
                      i18n().packs[pack.id].name
                    }
                    class="aspect-square h-full w-full bg-zinc-800 object-contain transition-transform duration-500 md:h-32 md:w-32 md:object-cover group-hover:md:rotate-1 group-hover:md:scale-105"
                  />
                </div>
                <div class="w-full items-center gap-3 md:flex">
                  <div class="w-full items-center justify-between gap-3 p-3 md:flex">
                    <div class="flex-1 p-3 md:p-0">
                      <p class="text-2xl lg:text-3xl lg:font-bold text-white">
                        {i18n().packs[pack.id].name}
                      </p>
                      <p>{i18n().packs[pack.id].description}</p>
                    </div>
                    <div class="flex justify-end">
                      <button
                        class="btn-pink flex items-center justify-center gap-3 md:w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setState('features', (f) =>
                            (pack.features as Feature[]).every((fe) =>
                              fe.isRecommended
                                ? f.includes(fe.id)
                                : !f.includes(fe.id)
                            )
                              ? f.filter(
                                  (r) => !pack.features.some((f) => f.id === r)
                                )
                              : [
                                  ...f.filter(
                                    (r) =>
                                      !pack.features.some((f) => f.id === r)
                                  ),
                                  ...(pack.features as Feature[])
                                    .filter((d) => d.isRecommended)
                                    .map((f) => f.id),
                                ]
                          );
                          // setOpenedPack(pack.id);
                        }}
                      >
                        {i18n().enableRecommended}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={(el) =>
                  queueMicrotask(() =>
                    el.style.setProperty('--height', `${el?.scrollHeight}px`)
                  )
                }
              >
                <Transition
                  enterClass="h-0 scale-y-0"
                  enterToClass="transition-[height,transform] h-[var(--height)] ease-in"
                  exitClass="h-[var(--height)]"
                  exitToClass="h-0 scale-y-0 transition-[height,transform] ease-linear"
                >
                  <Show when={openPacks().includes(pack.id) || isLoading()}>
                    <div
                      class="-mt-4 grid max-w-5xl origin-top gap-3 rounded-b-2xl border-2 border-t-0 border-zinc-900 p-3 pt-7 md:grid-cols-2"
                      id={`features-${pack.id}`}
                    >
                      <For
                        each={packs.find(({ id }) => id === pack.id)?.features}
                      >
                        {(feature) => (
                          <FeatureCard
                            feature={feature}
                            isSelected={state.features.includes(feature.id)}
                            onToggle={() =>
                              setState('features', (features) =>
                                features.includes(feature.id)
                                  ? features.filter((f) => f !== feature.id)
                                  : [...features, feature.id]
                              )
                            }
                            onMouseEnter={() =>
                              feature.hasHoverImage &&
                              setHoveredFeature(feature.id)
                            }
                            onMouseLeave={() =>
                              feature.hasHoverImage && setHoveredFeature(null)
                            }
                          />
                        )}
                      </For>
                    </div>
                  </Show>
                </Transition>
              </div>
            </div>
          )}
        </For>
        <For each={state.additionalMods}>
          {(mod) => (
            <FeatureCard
              feature={mod}
              isSelected={true}
              onToggle={() =>
                setState('additionalMods', (mods) =>
                  mods.filter((m) => m.id !== mod.id)
                )
              }
            />
          )}
        </For>
        <button
          onClick={() => setIsCustomModModalOpen(true)}
          class="flex w-full max-w-5xl items-center justify-center gap-3 rounded-2xl border-2 border-zinc-900 bg-zinc-950/50 p-3  hover:border-purple-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>{' '}
          {i18n().addAnyMod}
        </button>
        <div class="flex w-full items-center justify-between gap-2">
          <button
            class="flex items-center gap-2 hover:underline"
            onClick={() => setState('stage', 'version')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <line x1="19" x2="5" y1="12" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {i18n().back}
          </button>
          <button class="btn" onClick={() => setState('stage', 'download')}>
            {i18n().next}
          </button>
        </div>
      </div>
      <Show when={hoveredFeature()}>
        <img
          src={getFeatureHoverImage(hoveredFeature()!)}
          alt=""
          style={{
            transform: `translate(${mouseCords().x - 25}px, ${
              mouseCords().y + 25
            }px)`,
          }}
          class="fixed p-2 bg-zinc-900/50 backdrop-blur left-0 top-0 z-20 hidden h-[200px] w-[200px] rounded-2xl border-2 border-zinc-900 shadow-lg md:block"
          aria-hidden
        />
      </Show>
    </section>
  );
};

export default FeaturesSelector;
