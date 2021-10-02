<template>
    <div class="options-container">
        <div v-if="!showData" class="row options-container">
            <!-- el EMIT es una función de vue que permite establecer una comunicación con el componente padre para en éste caso en el evento click del 
            componente de la lista, ejecutar en el padre una función definida allí -->
            <div v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit('selectedPokemon', pokemon.id)" class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pokemon-option">
                {{pokemon.name}}
            </div>
        </div>
        <template v-else>
            <p>{{message}}</p>
            <button @click="$emit('newGame')">PLAY AGAIN</button>
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
    .options-container {
        padding: 2%;
        background-color: #FEF3EF;
        text-shadow: 2px 1px 2px gray;
    }

    .pokemon-option {
        cursor: pointer;
        margin-bottom: 1%;
    }

    button {
        font-family: 'pokeFont';
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: #000;
        text-shadow: 2px 1px 2px gray;
    }

    .pokemon-option:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>