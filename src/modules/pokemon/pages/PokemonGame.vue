<template>
    <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center h-screen">
        <h1 class="text-3xl font-bold">Pokemon Game</h1>
        <h3 class=" animate-pulse">cargando pokemon</h3>
    </section>
    <section v-else class="flex flex-col justify-center items-center h-screen">
        <div class="flex  flex-col  lg:w-[800px] w-full">
            <div class="flex justify-between px-8">
                <div class="flex flex-col items-center justify-center gap-2">
                    <h3 class="text-2xl text-gray-200 font-bold">Puntos optenidos</h3>
                    <p class="text-3xl text-blue-300 font-bold">{{ counter }}</p>
                </div>
                <div class=" flex gap-2">
                    <svg v-for="(poke, index) in pokemonLive" :key="index" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32" viewBox="0 0 512 512">
                        <path :fill="poke === true ? '#FF0000' : '#FFFFFF'"
                            d="M480.25 156.355c0 161.24-224.25 324.43-224.25 324.43S31.75 317.595 31.75 156.355c0-91.41 70.63-125.13 107.77-125.13c77.65 0 116.48 65.72 116.48 65.72s38.83-65.73 116.48-65.73c37.14.01 107.77 33.72 107.77 125.14" />
                    </svg>
                </div>
            </div>
            <h1 class="text-3xl font-bold m-5 text-gray-100 text-center">¿Quién es este Pókemon?</h1>

        </div>
        <div class="h-20">
            <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound(4)"
                class=" bg-blue-500  text-white p-2 rounded-md hover:bg-blue-800 transition-all">
                Gira la ruleta </button>
        </div>
        <!-- Pokemon Picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
        <!-- Pokemon Options -->
        <PokemonOptions :options="pokemonOption" :block-selection="gameStatus !== GameStatus.Playing"
            :currect-answer="randomPokemon.id" @selected-option="checkAnswer" />
    </section>
    <section v-if="isInformation" :is-show="isInformation"
        class="w-screen h-screen bg-[#000000c0] absolute top-0 left-0 flex justify-center items-center">
        >
        <div class="w-[300px] h-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 p-4 rounded-lg shadow-lg text-white flex flex-col items-center justify-center text-center">
            <h1 class="text-3xl font-bold mb-4">Has perdido</h1>
            <h2 class="text-xl mb-6">Puntos obtenidos: {{ counter }}</h2>
            <button @click="reniciar" class="bg-white text-gray-500 font-bold border border-gray-500 px-4 py-2 rounded-full hover:bg-gray-300 transition-all duration-300">
                Reiniciar el juego
            </button>
        </div>

    </section>

</template>
<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';
import { useModalGame } from '../composables/useModalGame';

const { isLoading, randomPokemon, gameStatus, pokemonOption, checkAnswer, getNextRound, counter, pokemonLive, isInformation } = usePokemonGame();

const { reniciar } = useModalGame();

</script>
<style scoped>
.live {
    /* @apply fi */
}
</style>