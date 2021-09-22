<template>
    <div class="options-container">
        <div class="row options-container">
            <!-- el EMIT es una función de vue que permite establecer una comunicación con el componente padre para en éste caso en el evento click del 
            componente de la lista, ejecutar en el padre una función definida allí -->
            <div v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit('selectedPokemon', pokemon.id)" class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pokemon-option">
                {{pokemon.name}}
            </div>
        </div>
    </div>
    <template v-if="showAnswer">
        <p>{{message}}</p>
        <button @click="$emit('newGame')">PLAY AGAIN</button>
    </template>
</template>

<script>
export default {
    name: 'PokemonOptions',
    props: {
        pokemons: {
            type: Array,
            required: true
        },
        showAnswer: {
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
    .pokemon-option {
        background-color: white;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .pokemon-option:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .options-container {
        padding: 30px;
    }
</style>