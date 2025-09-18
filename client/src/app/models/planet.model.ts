export interface Planet {
    id: number;
    planetName: string;
    planetColor: string;
    planetRadiusKM: number;
    distInMillionsKM: {
        fromEarth: number;
        fromSun: number;
    }
    imageName: string;
    imageUrl: string;
    description: string;
}
