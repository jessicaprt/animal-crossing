export interface IItem {
  buyPrice: number;
  canCustomize: boolean;
  color1: string;
  color2: string;
  hhaConcept1: string;
  hhaConcept2: string;
  imageUri: string;
  isCatalog: boolean;
  isDiy: boolean;
  isInteractive: boolean;
  isOutdoor: boolean;
  name: string;
  pattern: string | null;
  sellPrice: number;
  source: string;
  tag: string;
  variant: string;
}

export interface IItemGroup {
  variations: IItem[];
}

export interface IFreebieGroup {
  id_long: string;
  id_short: string;
  data: IItemGroup[];
}