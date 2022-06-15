import { generateWorkbook, readFileData, writeDataToFile } from '.';
import {
  MIN_PRICE,
  MAX_PRICE,
  REAIS_PRICE,
  BCOIN_PRICE,
  CACHE_EXPIRES_IN,
} from '../config/constants';
import {
  AbilityDict,
  AbilityEnum,
  BombCryptoHeroListResponse,
  RarityDict,
  RarityEnum,
} from '../models';
import { getMarketplaceHeros } from '../services';

function formatDecimal(number = 0) {
  return Number(number.toFixed(2));
}

function formatAmount(amount: string) {
  return Number(amount.slice(0, -18));
}

export function generateHerosReport(
  data: BombCryptoHeroListResponse,
  sortBy: 'profit' | 'payback' = 'profit'
) {
  if (!Array.isArray(data.transactions)) {
    console.log('Dados invalidos...\n\n', { data });
    return;
  }

  const upToMaxPrice = (data.transactions || []).filter(
    (i) =>
      formatAmount(i.amount) >= MIN_PRICE && formatAmount(i.amount) <= MAX_PRICE
  );
  const formatted = upToMaxPrice.map(
    ({
      amount,
      token_id,
      rarity,
      abilities,
      stamina,
      speed,
      bomb_count,
      bomb_power,
      bomb_range,
    }) => {
      const price = formatAmount(amount);

      const priceUSD = formatDecimal(price * Number(BCOIN_PRICE));
      const priceBRL = formatDecimal(priceUSD * Number(REAIS_PRICE));

      return {
        priceBCOIN: price,
        priceUSD,
        priceBRL,
        stamina,
        speed,
        bomb_power,
        bomb_range,
        bomb_count,
        rarity: RarityDict[rarity as RarityEnum],
        abilities: abilities
          .map((ab) => AbilityDict[ab as AbilityEnum])
          .sort()
          .join(', '),
        url: 'https://market.bombcrypto.io/market/bhero/' + String(token_id),
      };
    }
  );

  /** remove 1/1/1 heros and sort by price */
  let filtered = formatted
    .filter((i) => i.speed > 1 && i.bomb_power > 1 && i.stamina > 1)
    .sort((a, b) => a.priceBCOIN - b.priceBCOIN);

  // if (sortByPayback) {
  //   filtered = filtered.sort((a, b) => a.paybackEmDias - b.paybackEmDias);
  // } else if (sortByProfit) {
  //   filtered = filtered.sort((a, b) => b.LePorHora - a.LePorHora);
  // }

  console.log({
    'Registros encontrados no range de min/max price': upToMaxPrice.length,
    'Registros filtrados pelos outros parametros': filtered.length,
  });
  if (!filtered.length) {
    return console.log(
      '\n\n',
      'Zero registros encontrados com o filtro selecionado!',
      '\n\n'
    );
  }
  writeDataToFile(filtered, 'src/reports/Bombcrypto_Heros_Report.json');
  generateWorkbook(filtered, 'src/reports/Bombcrypto_Heros_Report.xlsx');
}

export async function runHerosReport(
  params: Parameters<typeof getMarketplaceHeros>['0']
) {
  try {
    console.log('Parametros encontrados:', {
      MIN_PRICE,
      MAX_PRICE,
      // MIN_PROFIT,
      BCOIN_PRICE,
    });
    let datajson: any = {};
    try {
      // @ts-ignore
      datajson = JSON.parse(readFileData('./src/reports/data.json'));
    } catch (error) {}

    const lastUpdateDate = datajson.date ? new Date(datajson.date) : undefined;

    const cacheTimeLimit = Number(CACHE_EXPIRES_IN) * 60 * 1000;
    const mustGetFromCache =
      lastUpdateDate &&
      lastUpdateDate.getTime() > new Date().getTime() - cacheTimeLimit;

    if (mustGetFromCache) {
      console.log(
        `O cache eh recente (${CACHE_EXPIRES_IN} minutos). Usando ele ao inves de chamar API.`
      );
      return generateHerosReport(datajson.data);
    }

    console.log(
      `O cache NAO eh mais recente que ${CACHE_EXPIRES_IN} minutos. Chamando API pra guardar os dados...`
    );

    const response = await getMarketplaceHeros(params);
    // console.log('\n\n 🔴 response', response, '\n');

    // if (!Array.isArray(response.size)) {
    //   return console.error(
    //     `Os dados encontrados são inválidos\n`?.bgRed?.black,
    //     {
    //       response,
    //     }
    //   );
    // }
    generateHerosReport(response);
    writeDataToFile(
      { data: response, date: new Date() },
      'src/reports/data.json'
    );
  } catch (error) {
    console.error('===========\n\n', error, '\n\n=============');
  }
}
