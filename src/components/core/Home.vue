<script lang="ts">

import { computed, ref, watch } from 'vue';
import {RouterLink, useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { DifficultyLevel } from '../../Utils/Types';
import ModalDialog from '../common/ModalDialog.vue';


export default {
    components: {RouterLink, ModalDialog}, //  ModalDialog, ConfirmationDialog
    props: {},
    emits: {},
    setup(props, context) { 
        const title = ref('Fun Card matching game');
        const showModal = ref(false);
        const userName = ref('');
        const difficultyLevel = ref(DifficultyLevel.Unselected);
        const router = useRouter();
        const store = useStore();


        
        const startEnabled = computed( (newV, oldV)=> {
            return  userName.value.trim().length  !== 0 && difficultyLevel.value;
        });

        const startGame = () => {
            store.commit('setUserName', userName.value);
            store.commit('setDifficultyLevel', difficultyLevel.value);
            showModal.value = false;
            router.push({name: 'newGame'})
        }

        watch(showModal, (curr, prev) => {
            if(!curr) {
                userName.value = '';
                difficultyLevel.value = DifficultyLevel.Unselected;
            }
        });

        return {
            title,
            showModal,
            startEnabled,
            difficultyLevel,
            userName,
            startGame,
            DifficultyLevel,
        }
    }
    
    
}

</script>

<template>
    <div class="nav-container">
        <h2> {{title}}</h2>
        <button @click="showModal=true">New Game </button>
        <RouterLink to="/score-history/Easy">Score History </RouterLink>
    </div>
    <modal-dialog
        v-model="showModal"
        :backdrop-close= "false"
    >
        <template v-slot:header>
            Enter Details!
        </template>
        <template v-slot:body>
            <div class="field-container">
                <label for="username">Player Name : </label>
                <input v-model="userName" id="username" name="username" type="text">
            </div>
            <div class="field-container">
                <label for="username">Difficulty Level : </label>
                <select  
                    id="difficulty-level"
                    name="difficulty-level"
                    v-model="difficultyLevel"
                >
                    <option :value="DifficultyLevel.Unselected"> Select Level </option>
                    <option :value="DifficultyLevel.Easy"> Easy </option>
                    <option :value="DifficultyLevel.Medium"> Medium </option>
                    <option :value="DifficultyLevel.Hard"> Hard </option>
                </select>
            </div>
        </template>
        <template v-slot:footer>
            <button :disabled="!startEnabled" @click="startGame()">Start Game</button>
        </template>
    </modal-dialog>
</template>

<style lang="scss" scoped>
.nav-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px;
    border-radius: 10px;
    min-height: 50%;
    background: var(--white);
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    h2 {
        margin:0;
        font-size: 30px;
        color: var(--theme);

    }
    a, button{
        background: linear-gradient(90deg, var(--gradient1) 0%,var(--gradient2) 19%,var(--gradient3) 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 10px;
        font-weight: bolder;
        font-size: 25px;
        text-decoration: none;
        outline: none;
        border: none;
        cursor: pointer;
    }
}
@media only screen and (max-width: 900px) {
    .nav-container {
        width: 85%;
        padding: 15px;
        h2 {
            margin:0;
            font-size: 25px;
            color: var(--theme);

        }
    }
    a, button {
        background: linear-gradient(90deg, var(--gradient1) 0%,var(--gradient2) 19%,var(--gradient3) 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: bolder;
        font-size: 25px;
        text-decoration: none;
        outline: none;
        border: none;
        cursor: pointer;
    }
}
.field-container {
    padding: 10px 0px;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    input, select {
        width: 50%;
    }
}
button:disabled {
    cursor: not-allowed !important;
    opacity: 0.6;
}

</style>