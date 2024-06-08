/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { Feature } from '@/features';
import i18n from '@/i18n';
import { getFeatureIcon } from '@/images';
import { type Component } from 'solid-js';

const FeatureCard: Component<{
  feature: Feature;
  isSelected: boolean;
  onToggle?: (feature_id: string) => void;
  isDefault?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = (props) => {
  return (
    <button
      type="button"
      aria-pressed={props.isSelected}
      aria-disabled={props.feature.id === 'default'}
      onClick={() => props.onToggle?.(props.feature.id)}
      classList={{
        '!bg-zinc-900/70 border-purple-300': props.isSelected,
      }}
      class="flex w-full gap-3 rounded-2xl border-2 border-zinc-900 bg-zinc-950/50 p-3 text-left  transition-colors hover:border-purple-300"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <img
        class="aspect-square h-16 w-16 rounded-lg bg-zinc-600 object-cover"
        src={props.feature.icon || getFeatureIcon(props.feature.id)}
        alt={props.feature.name}
        loading={props.isDefault ? 'lazy' : undefined}
      />
      <div>
        <p class="leading- flex flex-wrap items-center gap-x-2 overflow-hidden truncate pb-1 text-2xl text-white [word-break:break-word]">
          <span
            class="rounded-md px-2 text-sm font-bold text-zinc-800"
            classList={{
              'bg-indigo-300': props.feature.type === 'mod',
              'bg-pink-300': props.feature.type === 'resourcePack',
              'bg-violet-300': props.feature.type === 'shaders',
            }}
          >
            {i18n().featureTypes[props.feature.type]}
          </span>{' '}
          {props.feature.name}{' '}
          <a
            class="text-base text-zinc-500 underline"
            href={props.feature.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n().by} {props.feature.author}
          </a>
        </p>
        {props.feature.description ||
          i18n().descriptions[
            props.feature.id as keyof ReturnType<typeof i18n>['descriptions']
          ]}
      </div>
    </button>
  );
};

export default FeatureCard;
