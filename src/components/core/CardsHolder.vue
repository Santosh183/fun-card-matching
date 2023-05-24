<script lang="ts">
import { computed, ref } from 'vue';
import Card from './Card.vue';
import { CardType, DifficultyLevel } from '../../Utils/Types';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';



export default {
    components: { Card },
    props: {},
    emits: ['end-game'],
    setup(props, context) { 
        
        const cards = ref([]);
        const store = useStore();
        const router = useRouter();

        const openCards = computed( (newV, oldV)=> {
            return store.state.openCards ;
        });
        const currentUser = computed( (newV, oldV)=> {
            return store.state.currentUser ;
        });
        const difficultyLevel = computed( (newV, oldV)=> {
            return store.state.difficultyLevel ;
        });

        const setCards = () => {
            let limit: Number = 0;
            if(currentUser.value.trim() === '' || difficultyLevel.value === '') {
                router.push({name: 'home'})
            }
            if (difficultyLevel.value === DifficultyLevel.Easy) {
                limit = 8;
            } else if (difficultyLevel.value === DifficultyLevel.Medium) {
                limit = 16;
            } else if (difficultyLevel.value === DifficultyLevel.Hard) {
                limit = 32;
            }
            for( let i=1; i<= limit; i++) {
                cards.value.push({id: i, rotated: false});
                cards.value.push({id: i, rotated: false});
            }
        }
        setCards();

        const rotateCard = (card: CardType) => {
            if(card.rotated) {
                return;
            }
            card.rotated = true;
            const lastCard = openCards.value[openCards.value.length -1];
            if(lastCard) {
                if(openCards.value.length % 2 === 0 ) {
                    store.commit('addCard', card);   
                } else {
                    if(lastCard.id === card.id)  {
                        store.commit('addCard', card);
                    } else {
                        store.commit('removeCard');
                        setTimeout(()=> {
                            lastCard.rotated = false;
                            card.rotated = false;
                        },500);
                        return;
                    }
                }  
            } else {
                store.commit('addCard', card);
                return;
            }
            let finished = false;
            switch(difficultyLevel.value) {
                case DifficultyLevel.Easy: 
                    finished = openCards.value.length === 16;
                    break;
                case DifficultyLevel.Medium: 
                    finished = openCards.value.length === 32;
                    break;
                case DifficultyLevel.Hard: 
                    finished = openCards.value.length === 64;
                    break;
            }
            if(finished) {
                context.emit('end-game', false);
            }
        }

        const shuffledCards = computed( (newV, oldV)=> {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return cards.value.sort(() => Math.random() - 0.5);;
        });
        return {
            shuffledCards,
            rotateCard
        }
    }
    
    
}

</script>

<template>
    <div 
        class="cards-holder"
    >
       <card 
            v-for="card in shuffledCards"
            :key="card"
            :card="card"
            @click="rotateCard(card)"
       />
    </div>
</template>

<style lang="scss" scoped>
.cards-holder {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(12, minmax(100px, 1fr));
    gap: 20px;
    height: 85vh;
    border: 2px solid var(--white);
    width: 95%;
    margin: 0 auto;
    align-items: center;
    overflow: auto;
    grid-auto-rows: min-content; 
}
@media only screen and (max-width: 900px) {
    .cards-holder {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(7, minmax(36px, 1fr));
        gap: 10px;
    }
}
</style>