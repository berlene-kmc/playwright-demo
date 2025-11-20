// import { test, expect } from '@playwright/test';

// const API_BASE = 'https://pokeapi.co/api/v2';
// const POKEMONS = ['pikachu', 'bulbasaur', 'charmander'];

// for (const POKEMON of POKEMONS) {
//   test(`GET ${POKEMON} returns 200`, async ({ request }) => {
//     const res = await request.get(`${API_BASE}/pokemon/${POKEMON}`);
//     console.log(`${POKEMON} status:`, res.status());
//     expect(res.status()).toBe(200); 
//   });
// }

// test('Invalid Pokémon returns non-200', async ({ request }) => {
//   const res = await request.get(`${API_BASE}/pokemon/unknownpokemon`);
//   console.log('unknownpokemon status:', res.status());
//   expect(res.status()).not.toBe(200);
// });


import { test, expect } from '@playwright/test';

const API_BASE = 'https://pokeapi.co/api/v2';
const POKEMONS = ['pikachu', 'bulbasaur', 'charmander', 'metapods'];

for (const POKEMON of POKEMONS) {
  test(`GET ${POKEMON} status check`, async ({ request }) => {
    const res = await request.get(`${API_BASE}/pokemon/${POKEMON}`);

    if (res.status() === 200) {
      console.log(`${POKEMON} is OK Status: ${res.status()}`);

    } else {
      console.warn(`${POKEMON} returned a different status Status: ${res.status()}`);
    }

    expect(res.status()).toBe(200)
  });
}
