<script lang="ts">
import { ref }  from 'vue';
export default {
    props: {
        modelValue: Boolean,
        backdropClose: Boolean,
        width: String
    },
    emits: ['update:modelValue','on-modal-close'],
    setup(props, context) { 
    
        const updateValue = (value: Boolean) => {
            context.emit('update:modelValue', value);
        }
        const handleBackDropClick = () => {
            if(props.backdropClose) {
                updateValue(false);
            }
        }

        const handleModalClick = (event) => {
            event.stopPropagation();
        }

        const closeModal = () => {
            updateValue(false);
            context.emit('on-modal-close');

        }

        const hasBody = ref(!!context.slots.body)
                    
        return {
            handleBackDropClick,
            handleModalClick,
            closeModal,
            hasBody
        }
    }
    
    
}

</script>

<template>
    <div 
        class="backfrop"
        v-if="modelValue"
        @click="handleBackDropClick()"
    >
        <div 
            class="modal"
            :style="{ 'width': width }"
            @click="handleModalClick($event)"
        >
            <div class="modal-header">
                <h2>
                    <slot name="header">This is header</slot>
                </h2>
                <button @click="closeModal()"> &#x2715; </button>
            </div>
            <div 
                class="modal-body"
                v-if="hasBody"
            >
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .backfrop {
        background: var(--backdrop);
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        .modal {
            min-width: 300px;
            box-shadow: 0px 0px 10px var(--border);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: var(--white);
            border-radius: 5px;
            .modal-header {
                display: flex;
                position: relative;
                padding: 20px;
                color: var(--theme);
                button {
                    border: none;
                    outline: none;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    background: var(--white);
                    font-size: 25px;
                }
            }
            .modal-body {
                border-bottom: 2px solid var(--border);
                border-top: 2px solid var(--border);
                padding: 20px;
            }
            .modal-footer {
                padding: 20px;
                ::v-deep button {
                    background: var(--theme);
                    color: var(--white);
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
        }

    }

</style>