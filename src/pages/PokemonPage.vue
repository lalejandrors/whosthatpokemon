<template>
    <!-- Si necesito un agrupador para poner un condicional, no es necesario generar un div en mi plantilla, con la etiqueta template puedo crear el condicional sin generar divs adicionales -->
    <template v-if="!pokemon">
        <h1>Espere por favor...</h1>
    </template>
    <template v-else>
        <h1>Quién es es Pokemón?</h1>
        <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
        <!-- selectionPokemon lo puedo escribir como selection-pokemon aquí en el componente padre, en donde escucho lo que emite el hijo 
        (cuando se da click en la lista que se creó en el hijo, se ejecuta la función checkAnswer del padre). Puedo pasar parametros también cómo en el ejemplo 
        checkAnswer($event). No es necesario poner aquí el parámetro, ya que cuando es uno sólo, js infiere que es el que se va a recibir en checkAnswer -->
        <PokemonOptions :pokemons="pokemonArr" @selected-pokemon="checkAnswer" />
        <template v-if="showAnswer">
            <h2>{{message}}</h2>
            <button @click="newGame">Nuevo Juego</button>
        </template>
    </template>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data(){//información reactiva
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray(){//no asignamos directamente el valor en pokemonArr porque necesitabamos traer los datos con un método para poder resolver la promesa con el await
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId){
            this.showPokemon = true
            this.showAnswer = true

            if(selectedId === this.pokemon.id){
                this.message = `Bien!, ${this.pokemon.name}`
            }else{
                this.message = `Ups :S, era ${this.pokemon.name}`
            }
        },
        newGame(){
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.message = ''

            this.mixPokemonArray()
        }
    },
    mounted(){//evento de cuando se monta el componente, me llena con la info el data pokemonArr (uno de los momentos del ciclo de vida del componente)
        this.mixPokemonArray()
    }
}
</script>

<style>

</style>