export class Boiler {
    constructor(public name: string, 
        public fuel: string,
        public NOx: number, 
        public SO2: number, 
        public CO: number,
        public CO2: number,
        public yearData: number[]
        ){}
}