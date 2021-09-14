<template>
    <!-- Si necesito un agrupador para poner un condicional, no es necesario generar un div en mi plantilla, con la etiqueta template puedo crear el condicional sin generar divs adicionales -->
    <template v-if="!pokemon">
        <p>Espere por favor...</p>
    </template>
    <template v-else>
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <PokemonData />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <!-- selectionPokemon lo puedo escribir como selection-pokemon aquí en el componente padre, en donde escucho lo que emite el hijo 
                (cuando se da click en la lista que se creó en el hijo, se ejecuta la función checkAnswer del padre). Puedo pasar parametros también cómo en el ejemplo 
                checkAnswer($event). No es necesario poner aquí el parámetro, ya que cuando es uno sólo, js infiere que es el que se va a recibir en checkAnswer -->
                <PokemonOptions :pokemons="pokemonArr" :show-answer="showAnswer" :message="message" @new-game="newGame" @selected-pokemon="checkAnswer" />
            </div>
        </div>
    </template>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import PokemonData from '@/components/PokemonData'

import getPokemonOptions from '@/helpers/getPokemonOptions'
import getAnswerVoice from '@/helpers/getAnswerVoice'

export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions,
        PokemonData
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
        async checkAnswer(selectedId){
            this.showPokemon = true
            this.showAnswer = true

            //si empieza por vocal, poner 'an' y si es por consonante 'a'
            this.message = (['a', 'e', 'i', 'o', 'u'].indexOf((this.pokemon.name)[0].toLowerCase()) !== -1) ? `It's an ${this.pokemon.name}!` : `It's a ${this.pokemon.name}!`
            this.message = (selectedId === this.pokemon.id) ? `You right, ${this.message}` : `Sorry, ${this.message}`

            await getAnswerVoice(this.message)
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