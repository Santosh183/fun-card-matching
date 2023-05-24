<script lang="ts">
import GameControl from './GameControl.vue';
import CardsHolder from './CardsHolder.vue';
import { useStore } from 'vuex';
import { DifficultyLevel } from '../../Utils/Types';
import ConfirmationDialog from '../common/ConfirmationDialog.vue';
import ModalDialog from '../common/ModalDialog.vue';
import { computed, ref } from 'vue';
import { timeToString, getMaxScore, logScore } from '../../Utils/Methods';
import { onBeforeRouteLeave, useRouter } from 'vue-router';



export default {
    components: { GameControl, CardsHolder, ModalDialog, ConfirmationDialog},
    props: {},
    emits: {},
    setup(props, context) { 

        const store = useStore();
        const router = useRouter();
        const showScoreModal = ref(false);
        const showAbortConfirmation = ref(false);
        const currentUser = computed( (curr, prev) => {
            return store.state.currentUser;
        });

        const gameTime = computed( (curr, prev) => {
            return store.state.timer;
        });

        const difficultyLevel = computed( (curr, prev) => {
            return store.state.difficultyLevel;
        });

        const highestScore = computed( (curr, prev) => {
            return (getMaxScore(difficultyLevel.value).time < gameTime.value ? getMaxScore(difficultyLevel.value).time: gameTime.value);
        });

        const endGame = (aborted: boolean) => {
            if(aborted) {
                showAbortConfirmation.value = true;
            } else {
                logScore({userName: currentUser.value, time: gameTime.value, date: new Date().toLocaleString() }, 
                    difficultyLevel.value);
                const timerId = store.state.timerId;
                clearInterval(timerId);
                showAbortConfirmation.value = false;
                showScoreModal.value = true;
            }
        }

        const abortConfirmed = (confirmed: boolean) => {
            if(confirmed) {
                cleanUp();
                router.push({name: 'home'});
            } 
            showAbortConfirmation.value = false;
        }

        const cleanUp = () => {
            const timerId = store.state.timerId;
            clearInterval(timerId);
            showAbortConfirmation.value = false;
            showScoreModal.value = false;
            store.commit('setUserName', '');
            store.commit('setTimerId', null);
            store.commit('clearCards');
            store.commit('setDifficultyLevel', DifficultyLevel.Unselected);
        }

        const closeScoreModal = () => {
            cleanUp();
            showScoreModal.value = false;
            router.push({name: 'home'});
        }
        onBeforeRouteLeave((to, from, next) => {
            if(from.name === 'newGame') {
                if(store.state.timerId !== null) {
                    showAbortConfirmation.value = true;
                } else {
                    next();
                }
            } else {
                next();
            }
        });

        return {
            endGame,
            showScoreModal,
            closeScoreModal,
            timeToString,
            showAbortConfirmation,
            highestScore,
            gameTime,
            abortConfirmed
        }
    }
    
    
}

</script>

<template>
    <div class="game-container">
        <game-control
            @end-game="endGame"
        />
        <cards-holder
            @end-game="endGame"
        />
        <modal-dialog
            v-model="showScoreModal"
            :backdrop-close= "false"
            @on-modal-close="closeScoreModal"
        >
            <template v-slot:header>
                Score Card
            </template>
            <template v-slot:body>
                <div class="score">
                    <label > Your Score : </label>
                    <span> {{ timeToString(gameTime) }} </span>
                </div>
                <div class="score">
                    <label > Highest Score : </label>
                    <span> {{ timeToString(highestScore) }} </span>
                </div>
            </template>
            <template v-slot:footer>
                <button @click="closeScoreModal()">Ok</button>
            </template>
        </modal-dialog>
        <confirmation-dialog
            v-if="!showScoreModal"
            v-model="showAbortConfirmation"
            :backdrop-close="false"
            :confirm-text= "'Abort'"
            :cancel-text= "'Cancel'"
            :title="'Do you want to abort current game?'"
            @on-submit="abortConfirmed"
        />

        
    </div>
</template>

<style lang="scss" scoped>
.score {
    display: flex;
    align-items: center;
    gap: 15px;
    label {
        font-weight: bold;
    }
}
</style>