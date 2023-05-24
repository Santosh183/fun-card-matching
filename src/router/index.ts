import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/core/Home.vue';
import Game from '../components/core/Game.vue';
import ScoreHistory from '../components/core/ScoreHistory.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-game',
      name: 'newGame',
      component: Game
    },
    {
      path: '/score-history/:level',
      name: 'scoreHistory',
      component: ScoreHistory
    },
  ]
})

export default router
