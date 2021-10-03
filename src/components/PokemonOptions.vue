<template>
    <div class="options-container">
        <div v-if="!showData" class="row">
            <!-- el EMIT es una función de vue que permite establecer una comunicación con el componente padre para en éste caso en el evento click del 
            componente de la lista, ejecutar en el padre una función definida allí -->
            <div v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit('selectedPokemon', pokemon.id)" class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="row pokemon-option">
                    <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 selector-container">
                        <span class="selector-option">►</span>
                    </div>
                    <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">
                        {{pokemon.name}}
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <p>{{message}}</p>
            <button @click="$emit('newGame')">
                ► PLAY AGAIN
            </button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'PokemonOptions',
    props: {
        pokemons: {
            type: Array,
            required: true
        },
        showData: {
            type: Boolean,
            required: true,
            default: false
        },
        message: {
            type: String,
            required: true,
            default: ""
        },
    }
}
</script>

<style scoped>
    .options-container{
        margin: 1%;
        background-color: #FEF3EF;
        padding: 2%;
        border-radius: 6px;
        border-top: 10px solid #7A8194;
        border-left: 5px solid #FFEBD6;
        border-right: 5px solid #FFEBD6;
        border-bottom: 5px solid #FFEBD6;
        text-shadow: 2px 1px 2px gray;
    }

    .pokemon-option {
        cursor: pointer;
        margin-bottom: 1%;
    }

    .selector-container{
        text-align: center;
    }

    .selector-option{
        display: none;
    }

    .pokemon-option:hover > .selector-container > .selector-option {
        display: inline;
    }

    button {
        font-family: 'pokeFont';
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: #000;
        text-shadow: 2px 1px 2px gray;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .pokemon-option:hover > .selector-container > .selector-option {
            display: none;
        }
    }
    /* */
</style>