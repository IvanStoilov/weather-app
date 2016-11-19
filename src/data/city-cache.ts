import * as lscache from "lscache";
import {ICity, City} from "./city";
import {CityList} from "./city-list";
import {List} from "immutable";

export class CityCache {
    static getCity(cityName: string) : City {
        return City.create(lscache.get(this.cityKey(cityName)));
    }

    static getAllCities() : CityList {
        const cityNames = lscache.get(this.allCitiesKey()) || [];
        const cities : City[] = cityNames.map((cityName: string) => this.getCity(cityName));
        return List.of.apply(List, cities);
    }

    static setCity(city : ICity) : void {
        // save city data
        lscache.set(this.cityKey(city.name), city);

        // save city in the list of cities
        const allCities = lscache.get(this.allCitiesKey()) || [];
        allCities.push(city.name);
        lscache.set(this.allCitiesKey(), allCities);
    }

    static setCities(cities : CityList) : void {
        // save city in the list of cities
        lscache.set(this.allCitiesKey(), cities.map(city => city.name));
        cities.forEach(city => lscache.set(this.cityKey(city.name), city));
    }

    static cityKey(cityName: string) : string {
        return `city-${cityName}`
    }

    static allCitiesKey() : string {
        return `all-cities`;
    }
}
