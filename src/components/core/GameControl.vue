<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    props: { },
    emits: ['end-game'],
    setup(props, context) { 
        const timer = ref(0);
        const store = useStore();
        const computedTmer = computed( (newV, oldV)=> {
            return `${Math.floor(timer.value/60)} : ${timer.value%60}` ;
        });
        const startGame = () => {
            const id = setInterval(() => {
                timer.value = timer.value +1;
                store.commit('setTimer', timer.value);
            }, 1000);
            store.commit('setTimerId', id);
            
        }
        startGame();

        const abortGame = () => {
            context.emit('end-game', true );
        }

        return {
            computedTmer,
            abortGame
        }
    }
    
    
}

</script>

<template>
    <div 
        class="game-controls"
    >
        <div class="timer">
            <h2>
                {{ computedTmer }}
            </h2>
        </div>
        <div class="end-game">
            <button @click="abortGame()">Exit Game</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.game-controls {
    width: 95%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        background: var(--white);
        color: var(--theme);
        font-weight: bold;
        text-transform: uppercase;
        font-size: 15px;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
}

</style>