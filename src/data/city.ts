import {Map, Record} from "immutable";

export interface CityData {
  id: string;
  name: string;
  isFetching: boolean;
  imageUrl?: string;
  weather: {
    temperature: number;
    updatedAt: string;
  }
}

export interface ICity extends CityData, Map<string, any> {
};

export class City {
  static create(data : CityData) : ICity {
    const cityClass = Record(data);
    return (new cityClass()) as ICity;
  }
}
