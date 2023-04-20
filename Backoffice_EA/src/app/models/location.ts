export class Location {
    _id?: string;
    name: string;
    city: string;
    population: number;
    latitude: number;
    longitude: number;
    acts?: string[];

    constructor(name: string, city: string, population: number, latitude: number, longitude: number, acts: string[]) {
        this.name = name;
        this.city = city;
        this.population = population;
        this.latitude = latitude;
        this.longitude = longitude;
        this.acts = acts;
    }
}
