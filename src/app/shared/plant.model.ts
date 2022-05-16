import { Boiler } from "./boiler.model";

export class Plant {
 constructor(public name: string, public boilers: Boiler[], public coalQuarters: number[], public ngQuarters: number[] ){}
}