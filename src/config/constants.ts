import dotenv from 'dotenv';
dotenv.config();

export const MIN_PROFIT = process.env.MIN_PROFIT || 7;
export const MIN_PRICE = process.env.MIN_PRICE || 8;
export const MAX_PRICE = process.env.MAX_PRICE || 16;
export const BCOIN_PRICE = process.env.BCOIN_PRICE || 0;
export const REAIS_PRICE = process.env.REAIS_PRICE || 5;
/** in minutes */
export const CACHE_EXPIRES_IN = process.env.CACHE_EXPIRES_IN || 1;

export const TEST_MODE = false;
