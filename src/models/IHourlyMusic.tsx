export interface IHourlyMusic {
  id: string;
  hour: number;
  variations: IWeatherMusic[];
}

export interface IWeatherMusic {
  weather: string;
  musicUri: string;
}