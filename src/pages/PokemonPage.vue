<template>
    <PokemonScore :score="score" :max-score="maxScore" @selected-generation="changeGeneration" />
    <!-- Si necesito un agrupador para poner un condicional, no es necesario generar un div en mi plantilla, con la etiqueta template puedo crear el condicional sin generar divs adicionales -->
    <template v-if="!pokemon">
        <p>Please wait...</p>
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
import PokemonScore from '@/components/PokemonScore'

import getPokemonOptions from '@/helpers/getPokemonOptions'
import getAnswerVoice from '@/helpers/getAnswerVoice'

export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions,
        PokemonData,
        PokemonScore
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            selectedGeneration: 0,//la elegida en el select para la partida
            generation: null,//la generación real del pokemon correcto
            score: 0,
            maxScore : 0
        }
    },
    computed: {//métodos que retornan información reactiva que se guarda en caché, que ayuda cuando necesito renderizar el resultado de éste método en varias partes del componente y se va a hacer el cálculo 1 SOLA VEZ, a menos de que algún dato del cálculo cambie. Su diferencia con los methods es el caché
        getScore(){
            let scorePokemon = null

            switch(this.generation) {
            case 1:
                scorePokemon = 5
                break;
            case 2:
                scorePokemon = 6
                break;
            case 3:
                scorePokemon = 7
                break;
            case 4:
                scorePokemon = 8
                break;
            case 5:
                scorePokemon = 10
                break;
            }

            return scorePokemon
        }
    },
    methods: {
        async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions(this.selectedGeneration)

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        async checkAnswer(selectedId){
            this.showPokemon = true
            this.showAnswer = true

            this.makeMessage(selectedId)
            
            if(this.selectedGeneration != 0){
                this.generation = this.selectedGeneration
            }else{
                const genScore = this.checkGenerationScore(this.pokemon.id)
                this.generation = genScore
            }

            this.setScore(selectedId)

            await getAnswerVoice(this.message)
        },
        restartData(){
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.message = ''
        },
        newGame(){
            this.restartData()
            this.mixPokemonArray()
        },
        changeGeneration(selectedGeneration){
            this.selectedGeneration = selectedGeneration
            this.restartData()
            this.mixPokemonArray()
        },
        checkGenerationScore(pokemonId){
            let generationPokemon = null

            if(pokemonId > 0 && pokemonId < 152){
                generationPokemon = 1
            }else if(pokemonId > 151 && pokemonId < 252){
                generationPokemon = 2
            }else if(pokemonId > 251 && pokemonId < 387){
                generationPokemon = 3
            }else if(pokemonId > 386 && pokemonId < 494){
                generationPokemon = 4
            }else if(pokemonId > 493 && pokemonId < 650){
                generationPokemon = 5
            }

            return generationPokemon
        },
        makeMessage(selectedId){
            this.message = (['a', 'e', 'i', 'o', 'u'].indexOf((this.pokemon.name)[0].toLowerCase()) !== -1) ? `It's an ${this.pokemon.name}!` : `It's a ${this.pokemon.name}!`
            if(selectedId === this.pokemon.id){
                this.message = `You right, ${this.message}`
            }else{
                this.message = `Sorry, ${this.message}`
            }
        },
        setScore(selectedId){
            if(selectedId === this.pokemon.id){
                this.score = this.score + this.getScore
                
                let maxScore = parseInt(localStorage.getItem('maxScore'))

                if(this.score > maxScore){
                    this.maxScore = localStorage.setItem('maxScore', this.score)
                }

                this.maxScore = parseInt(localStorage.getItem('maxScore', this.score))
            }else{
                this.score = 0
            }
        }
    },
    mounted(){//evento de cuando se monta el componente, me llena con la info el data pokemonArr (uno de los momentos del ciclo de vida del componente)
        this.maxScore = (localStorage.getItem("maxScore") === null) ? 0 : parseInt(localStorage.getItem("maxScore"))
        this.mixPokemonArray()
    }
}
</script>

<style>

</style>