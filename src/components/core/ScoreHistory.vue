<script lang="ts">

import { computed, Ref, ref, watch } from 'vue';
import {RouterLink, useRouter} from 'vue-router';
import { useRoute } from 'vue-router';
import { DifficultyLevel } from '../../Utils/Types';
import { timeToString, getTopTenScores } from '../../Utils/Methods';


export default {
    components: {RouterLink}, //  ModalDialog, ConfirmationDialog
    props: {},
    emits: {},
    setup(props, context) { 
        const title = ref('Top 10 scores');
        const route = useRoute();
        const router = useRouter();
        const level: Ref<DifficultyLevel> = computed((curr, prev) => {
            return route.params.level as DifficultyLevel ;
        });

        watch(level, (curr, prev) => {
            if(![DifficultyLevel.Easy, DifficultyLevel.Medium, DifficultyLevel.Hard].includes(curr)) {
                router.push({name: 'home'});
            }
        })

        const scores = computed((curr, prev) => {
            return getTopTenScores(level.value);
        });

        return {
            title,
            timeToString,
            scores,
            DifficultyLevel,
        }
    }
    
    
}

</script>

<template>
    <div class="nav-container">
        <h2> {{title}}</h2>
        <div class="links">
            <div class="level-nav">
                <RouterLink :to="{ name: 'scoreHistory', params: { level: DifficultyLevel.Easy }}" >{{DifficultyLevel.Easy}} </RouterLink>
                <RouterLink :to="{ name: 'scoreHistory', params: { level: DifficultyLevel.Medium }}">{{DifficultyLevel.Medium}} </RouterLink>
                <RouterLink :to="{ name: 'scoreHistory', params: { level: DifficultyLevel.Hard }}"> {{DifficultyLevel.Hard}} </RouterLink>
            </div>
            <RouterLink class="home" to="/">Home </RouterLink>
        </div>
        <div 
            class="scores"
        >
            <table
                v-if="scores.length > 0"
                border="1"
            >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(score, index) in scores"
                        :key="score.date+score.time+score.userName"
                    >
                        <td> {{index+1}}</td>
                        <td> {{score.userName}} </td>
                        <td> {{timeToString(score.time)}} </td>
                        <td> {{score.date}} </td>
                    </tr>
                </tbody>
            </table>
            <h4 v-else> 
                No scores available!
            </h4>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.nav-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px;
    border-radius: 10px;
    min-height: 50%;
    background: var(--white);
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .links {
        display: flex;
        align-items: center;
        gap: 15px;
        .level-nav {
            display: flex;
            gap: 5px;
            a.router-link-active {
                color: var(--gradient3);
                text-decoration: underline;
            }
        }
        .home {
            background: var(--theme);
            color: var(--white);
            border-radius: 5px;
        }
        
    }
    .scores {
        width: 50%;
        display: flex;
        justify-content: center;
        table {
            width: 100%;
            border-collapse: collapse;
            td, th {
                padding: 5px 7px;
            }
        }
    }
    h2 {
        margin:0;
        font-size: 30px;
        color: var(--theme);

    }
    a, button{

        color: var(--theme);;
        padding: 7px 10px;
        font-weight: bolder;
        font-size: 20px;
        text-decoration: none;
        outline: none;
        border: none;
        cursor: pointer;
    }
}
@media only screen and (max-width: 900px) {
    .nav-container {
        width: 90%;
        padding: 15px;
        h2 {
            margin:0;
            font-size: 25px;
            color: var(--theme);

        }
        .links {
            display: flex;
            align-items: center;
            gap: 15px;
            .level-nav {
                display: flex;
                gap: 5px;
            }
            .home {
                background: var(--theme);
                color: var(--white);
                border-radius: 5px;
            }
            
        }
        .scores {
            width: 100%;
            display: flex;
            justify-content: center;
            table {
                width: 100%;
                border-collapse: collapse;
                td, th {
                    padding: 5px 7px;
                }
            }
        }
    }
    a, button {
        color: var(--theme);;
        padding: 5px 7px;
        font-weight: bolder;
        font-size: 14px;
        text-decoration: none;
        outline: none;
        border: none;
        cursor: pointer;
    }
}


</style>