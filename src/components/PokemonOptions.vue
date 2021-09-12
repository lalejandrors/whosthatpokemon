<template>
    <div class="options-container">
        <ul>
            <!-- el EMIT es una función de vue que permite establecer una comunicación con el componente padre para en éste caso en el evento click del 
            componente de la lista, ejecutar en el padre una función definida allí -->
            <li v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit('selectedPokemon', pokemon.id)">{{pokemon.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PokemonOptions',
    props: {
        pokemons: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
    /* Pokemon Options */
    ul {
        list-style-type: none;
    }
    li {
        background-color: white;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
        margin-bottom: 10px;
        width: 250px;
    }

    li:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .options-container {
        display: flex;
        justify-content: center;
    }
</style>