export interface Rank {
    date: string;
    rank: number;
}

export interface RankRange {
    min: number;
    max: number;
}

export enum RankBoundry {
    MIN = 0,
    MAX = 100,
}