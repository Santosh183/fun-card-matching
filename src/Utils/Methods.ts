import { DifficultyLevel, type Score } from "./Types";

export const timeToString = (time: number) => {
    return `${Math.floor(time/60)} min ${time%60} secs` ;
}

export const getScores = (level: DifficultyLevel) => {
    if(![DifficultyLevel.Easy, DifficultyLevel.Medium, DifficultyLevel.Hard].includes(level)) {
        return [];
    }
    const scores: Score[] = JSON.parse(localStorage.getItem(`${level}_scores`) as string) || [];
    return scores;
}

export const getTopTenScores = (level: DifficultyLevel) => {
    const scores: Score[] = getScores(level);
    return scores.sort( (e1, e2) => e1.time- e2.time).filter((score, index)=> {
        return index < 10;
    })
}

export const getMaxScore = (level: DifficultyLevel) => {
    if(![DifficultyLevel.Easy, DifficultyLevel.Medium, DifficultyLevel.Hard].includes(level)) {
        return [];
    }
    const scores = getScores(level);
    const minTime: number = Math.min.apply(null, scores.map(e => e.time));
    if(!minTime) {
        return {
            userName: '',
            time: Infinity
        };
    }
    return scores.find( e => e.time === minTime);
}

export const logScore = (score:Score, level: DifficultyLevel) => {
    const scores = getScores(level);
    scores.push(score);
    localStorage.setItem(`${level}_scores`, JSON.stringify(scores));
    
}