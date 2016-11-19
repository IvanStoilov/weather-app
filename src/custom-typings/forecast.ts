export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id?: any;
    localtime_epoch: number;
    localtime: string;
}

export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface CurrentForecastCondition {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
}

export interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    condition: WeatherCondition;
}

export interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
}

export interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    will_it_snow: number;
}

export interface Forecastday {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour: Hour[];
}

export interface ForecastFuture {
    forecastday: Forecastday[];
}

export interface Forecast {
    location: Location;
    current: CurrentForecastCondition;
    forecast: ForecastFuture;
}