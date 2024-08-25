<template>
    <section class=" mt-5 flex items-center justify-center flex-wrap">
        <button 
            v-for="{ id, name} in options" 
            :key="id" :class="['capitalize disabled:shadow-none disabled:bg-gray-400',{
                'correct': id === currectAnswer && blockSelection, 
                'incorrect': id !== currectAnswer && blockSelection
            }]" 
            @click="$emit('selectedOption', id)"
            :disabled="blockSelection"
        >
        {{ name }}
        </button>
    </section>
</template>
<script lang="ts" setup>
import { Pokemon } from '../interfaces';

interface Props {
    options: Pokemon[]
    blockSelection: boolean
    currectAnswer: number
}

defineProps<Props>()
defineEmits<{
    selectedOption: [id: number];
}>()

</script>
<style scoped>
button {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all 
}

.correct {
    @apply bg-blue-300 text-white;
}

.incorrect {
    @apply bg-red-300 text-white;
}
</style>