/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { decode } from 'js-base64';
import { createStore } from 'solid-js/store';
import { array, object, parse, string } from 'valibot';
import { Feature } from './features';

type Stage = 'version' | 'features' | 'download';

export type State = {
  features: string[];
  version?: string;
  additionalMods: Feature[];
  fromShare: boolean;
  stage: Stage;
};

const defaultState: State = {
  stage: 'version',
  fromShare: false,
  features: [],
  additionalMods: [],
};

const serializedStateSchema = object({
  features: array(string()),
  additional_mods: array(string()),
  version: string(),
});

export const deserializeState = (serialized: string) => {
  try {
    const { additional_mods, features, version } = parse(
      serializedStateSchema,
      JSON.parse(serialized)
    );
    const additionalMods = additional_mods.slice(0, 5).map((id) =>
      Promise.all([
        fetch(`https://api.modrinth.com/v2/project/${id}`).then((res) =>
          res.json()
        ),
        fetch(`https://api.modrinth.com/v2/project/${id}/members`).then((res) =>
          res.json()
        ),
      ]).then(
        ([mod, team]) =>
          ({
            id: mod.slug,
            name: mod.title,
            type: 'mod',
            author: team[0].user.username,
            url: `https://www.modrinth.com/mod/${mod.slug}`,
            icon: mod.icon_url,
          }) as Feature
      )
    );
    return {
      features,
      version,
      stage: 'version',
      fromShare: true,
    } as State;
  } catch {
    location.hash = '';
    return defaultState;
  }
};

export const [state, setState] = createStore<State>(
  location.hash
    ? deserializeState(decode(location.hash.slice(1)))
    : defaultState
);

export const serializedState = () =>
  JSON.stringify({
    features: state.features?.sort() ?? [],
    additional_mods:
      state.additionalMods
        ?.map(({ id }) => id)
        .sort()
        .slice(0, 5) ?? [],
    version: state.version,
  });
