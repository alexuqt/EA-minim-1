import { ObjectId } from "mongoose";

export interface Location {
    name: string;
    city: string;
    population: number;
    latitude: number;
    longitude: number;
    acts?: ObjectId[];
}