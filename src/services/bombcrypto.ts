import fetch from 'node-fetch';
import { TEST_MODE } from '../config/constants';
import { bombcryptoMarketplaceMock } from '../mocks';
import { BombCryptoHeroListResponse } from '../models';

type GetMarketplaceHerosParams = {
  rarity: number[];
  ability: number[];
  page?: number;
  size?: number;
  order_by?: string;
  s_ability?: number;
  bomb_power?: number;
  stamina?: number;
};

export async function getMarketplaceHeros({
  page = 1,
  size = 50,
  order_by = 'asc%3Aamount',
  s_ability = 1,
  rarity,
  ability = [5],
  bomb_power,
  stamina,
}: GetMarketplaceHerosParams) {
  if (TEST_MODE) {
    console.log(`getMarketplaceHeros() Mock`);
    return bombcryptoMarketplaceMock;
  }

  const parsedAbilities = ability.map((n) => `&ability=${n}`).join('');
  const parsedRarity = rarity.map((n) => `&rarity=${n}`).join('');
  // @ts-ignore
  const params = new URLSearchParams({
    status: 'listing',
    page,
    size,
    order_by,
    s_ability,
    bomb_power,
    stamina,
  });
  const URL = `https://market-api.bombcrypto.io/api/v1/transactions/heroes/search?${params}${parsedRarity}${parsedAbilities}`;

  return fetch(URL, {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      Referer: 'https://market.bombcrypto.io/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    // body: null,
    method: 'GET',
  }).then((res) => res.json()) as Promise<BombCryptoHeroListResponse>;
}
