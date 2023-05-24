<script lang="ts">
import { PropType, ref } from 'vue';
import { CardType }  from '../../Utils/Types';

export default {
    props: {
        card: {
            type: Object as PropType<CardType>,
        }
    },
    emits: {},
    setup(props, context) { 

    }
    
    
}

</script>

<template>
    <div 
        class="card"
        :class="{
            'open': card.rotated,
        }"
    >
        <div class="card__side card__side--front">
           
        </div>
        <div class="card__side card__side--back">
            <img 
                :src="`/assets/cards/${card.id}.svg`" 
                alt="card"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    perspective: 1500px;
    -moz-perspective: 1500px;
    -webkit-perspective: 1500px;
    position: relative;
    height: 150px;
    cursor: pointer;
    &__side {
        height: 100%;
        width: 100%;
        transition: all .5s ease;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

        &--front {
            background: var(--card-back);
        }   
        &--back { 
            transform: rotateY(-180deg);
            img {
                height: 100%;
                width: 100%;
            }
        }
    }

    
    &.open &__side--front{ 
        transform: rotateY(180deg); 
    }
    &.open &__side--back{
        transform: rotateY(0deg); 
    }
}
@media only screen and (max-width: 900px) {
    .card {
       height: 75px;
    }
}

</style>