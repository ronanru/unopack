/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { type Component } from 'solid-js';
import cat from '../assets/cat.webp';

const Success: Component = () => {
  return (
    <div class="container">
      <h1 class="mb-4 text-center text-5xl font-bold text-zinc-400">All done</h1>
      <p class="text-lg text-center mt-6">The installation was successful</p>
      <img src={cat} alt="funny cat" class="!mt-6 mx-auto" />
    </div>
  );
};

export default Success;
