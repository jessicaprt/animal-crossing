export interface ICreature {
  kind: string;
  id: string;
  isAllDay: boolean;
  isAllYear: boolean;
  location: string;
  monthsAvailable_northern: string[];
  monthsAvailable_southern: string[];
  monthsAvailable_northern_int: number[];
  monthsAvailable_southern_int: number[];
  timeAvailable: number[];
  timeString: string;
  iconUri: string;
  imageUri: string;
  museumInfo: string;
  name: string;
  price: number;
  price_cj: string | null;
  price_flick: string | null;
  shadow: string;
}