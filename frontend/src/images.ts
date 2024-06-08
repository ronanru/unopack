/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { packs } from './features';

const preloadImage = (src: string) => (new Image().src = src);

export const preloadImages = () => {
  preloadImage(`/packs/default.webp`);
  for (const pack of packs) {
    preloadImage(`/packs/${pack.id}.webp`);
    for (const feature of pack.features) {
      preloadImage(getFeatureIcon(feature.id));
      if (feature.hasHoverImage) preloadImage(getFeatureHoverImage(feature.id));
    }
  }
};

export const getFeatureIcon = (id: string) =>
  `https://storage.yandexcloud.net/unopack/modicons/${id}.webp`;

export const getFeatureHoverImage = (id: string) =>
  `https://storage.yandexcloud.net/unopack/videos/${id}.webp`;
