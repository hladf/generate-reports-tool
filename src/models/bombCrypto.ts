export interface BombCryptoHero {
  id: number;
  tx_hash: string;
  block_number: number;
  block_timestamp: string;
  status: string;
  seller_wallet_address: string;
  buyer_wallet_address: string;
  amount: string;
  token_id: number;
  rarity: number;
  level: number;
  color: number;
  skin: number;
  stamina: number;
  speed: number;
  bomb_skin: number;
  bomb_count: number;
  bomb_power: number;
  bomb_range: number;
  updated_at: string;
  abilities: number[];
  abilities_hero_s: number[];
  nft_block_number: number;
}

export interface BombCryptoHeroListResponse {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
  transactions: BombCryptoHero[];
}

export enum RarityEnum {
  'Common',
  'Rare',
  'Super_Rare',
  'Epic',
  'Legend',
  'SP_Legend',
}

export const RarityDict = {
  [RarityEnum.Common]: 'Common',
  [RarityEnum.Rare]: 'Rare',
  [RarityEnum.Super_Rare]: 'Super_Rare',
  [RarityEnum.Epic]: 'Epic',
  [RarityEnum.Legend]: 'Legend',
  [RarityEnum.SP_Legend]: 'SP_Legend',
};

export enum AbilityEnum {
  'ChestExplode' = 1,
  'PrisonExplode',
  'ExplodeThrBlocks',
  'ManaShield',
  'ManaRegen',
  'ThrBombs',
  'ThrBlocks',
}

export const AbilityDict = {
  [AbilityEnum.ChestExplode]: 'ChestExplode',
  [AbilityEnum.PrisonExplode]: 'PrisonExplode',
  [AbilityEnum.ExplodeThrBlocks]: 'ExplodeThrBlocks',
  [AbilityEnum.ManaShield]: 'ManaShield',
  [AbilityEnum.ManaRegen]: 'ManaRegen',
  [AbilityEnum.ThrBombs]: 'ThrBombs',
  [AbilityEnum.ThrBlocks]: 'ThrBlocks',
};
