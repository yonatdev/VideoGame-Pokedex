import { computed, onMounted, ref } from "vue";
import { GameStatus, Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import  confetti from "canvas-confetti";

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOption = ref<Pokemon[]>([]);
  const pokemonLive = ref<boolean[]>([true, true, true, true, true]);
  const counter = ref<number>(0)
  const isInformation = ref<boolean>(false)


  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(() => pokemonOption.value[Math.floor(Math.random()*pokemonOption.value.length)])

  const getPokemonsById = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>(`/?limit=150`);

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlPaths = pokemon.url.split("/");
      const id = urlPaths[urlPaths.length - 2] ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOption.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      counter.value++;
      return;
    } else {
      console.log(hasWon, "hasWon");

      const lastIndexPoke = pokemonLive.value.lastIndexOf(true)
      if (lastIndexPoke !== -1) {
        pokemonLive.value[lastIndexPoke] = false
      }
      if (!pokemonLive.value.includes(true)) {
        isInformation.value = true
        if (!isInformation.value) {
          
        location.reload();
        }
      }
    gameStatus.value = GameStatus.Lost;
      return pokemonLive
            
    }

  }

  onMounted(async () => {
    pokemons.value = await getPokemonsById();

    getNextRound();
    console.log(pokemonOption.value);
    
  });
  
 


  return {
    gameStatus,
    isLoading,
    pokemonOption,
    randomPokemon,
    pokemonLive,
   isInformation,
    // Methods
    counter,
    getNextRound,
    checkAnswer,
  };
};
