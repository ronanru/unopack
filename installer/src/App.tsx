/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { Match, Switch } from 'solid-js';
import { setState, state } from './state';
import Start from './stages/start';
import Loading from './stages/loading';
import Success from './stages/success';
import Error from './stages/error';
import { invoke } from '@tauri-apps/api/tauri';

const App = () => {
  const install = () =>
    invoke('install', {
      minecraftPathString: state.minecraftPath,
      archivePath: state.archivePath
    })
      .then(() => {
        setState({ ...state, finished: true });
      })
      .catch(error => {
        setState({ ...state, error });
      });

  return (
    <Switch fallback={<Loading />}>
      <Match when={!state.minecraftPath && !state.archivePath}>
        <Start onStart={install} />
      </Match>
      <Match when={state.error}>
        <Error />
      </Match>
      <Match when={state.finished}>
        <Success />
      </Match>
    </Switch>
  );
};

export default App;
