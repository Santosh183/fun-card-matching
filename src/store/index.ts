import { DifficultyLevel, type CardType } from '@/Utils/Types';
import { createStore } from 'vuex';

interface State {
    currentUser: String;
    openCards: CardType[];
    difficultyLevel: DifficultyLevel;
    timerId: Number | null;
    timer: number;
}


const state: State = {
    currentUser: '',
    openCards: [],
    difficultyLevel: DifficultyLevel.Unselected,
    timerId: null,
    timer: 0,
};

export const store = createStore({
  state () {
    return state;
  },
  mutations: {
    setTimer(state: State, time:number) {
      state.timer = time;
  },
    addCard(state: State, card:CardType) {
        state.openCards.push(card);
    },
    removeCard(state: State) {
      state.openCards.pop();
    },
    clearCards(state: State) {
        state.openCards = [];
    },
    setUserName(state: State, userName: String) {
        state.currentUser = userName;
    },
    setDifficultyLevel(state: State, level: DifficultyLevel) {
      state.difficultyLevel = level;
    },
    setTimerId(state: State, id: Number) {
      state.timerId = id;
    }
  }
})