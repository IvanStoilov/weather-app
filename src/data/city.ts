import {Map} from "immutable";

export interface CityData {
  id: string;
  name: string;
  isFetching: boolean;
  imageUrl?: string;
  weather: {
    temperature: number;
    updatedAt: Date;
  }
}

export interface City extends CityData, Map<string, any> {
};
