/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import SelectorPage from '@/components/selectorPage';
import i18n from '@/i18n';
import { resourcePacks } from '@/resources';
import { setState, state } from '@/state';
import { type Component } from 'solid-js';

const ResourcePacksSelector: Component = () => {
  return (
    <SelectorPage
      options={resourcePacks.map((pack) => ({
        ...pack,
        selected: pack.selected || state.resourcepacks?.includes(pack.id),
      }))}
      title={i18n().stages.resourcepacks}
      onContinue={(resourcepacks) =>
        setState({
          ...state,
          resourcepacks,
          stage: 'download',
        })
      }
      onBack={() =>
        setState({
          ...state,
          stage: 'mods',
        })
      }
      isFinalPage
    />
  );
};

export default ResourcePacksSelector;
