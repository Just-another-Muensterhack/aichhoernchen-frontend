import {Finder} from "@/api/models/Finder";
import {LostPropertyOffice} from "@/api/models/LostPropertyOffice";

export type FoundObject = {
    shortTitle: string,
    longTitle: string,
    description: string,
    lat: number,
    long: number,
    timestamp: Date,
    finder: Finder,
    deposit: LostPropertyOffice,
}