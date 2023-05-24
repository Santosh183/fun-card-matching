export enum DifficultyLevel {
    Unselected = '',
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard'
}

export type CardType = {
    id: Number;
    rotated: Boolean;
}

export type Score = {
    userName: string;
    time: number;
    date: string;
}