<template>
    <h6>N.° </h6>
    <p v-if="showData">{{pokemon.id}}</p>
    <p v-else>?</p>
    <h6>REGION </h6>
    <p v-if="showData">{{pokemonData.region}}</p>
    <p v-else>?</p>
    <h6>NAME </h6>
    <p v-if="showData">{{pokemon.name}}</p>
    <p v-else>?</p>
    <h6>TYPE </h6>
    <div v-if="showData">
        <span v-for="type in pokemon.types" :key="type.slot">{{type.type.name.toUpperCase()}}</span>
    </div>
    <p v-else>?</p>
    <h6>EVOLUTIONS </h6>
    <div v-if="showData">
        <div v-for="evolution in pokemonData.evolutions" :key="evolution.id">
            {{evolution.name}}
            <img :src="imgSrc(evolution.id)" alt="evolution">
        </div>
    </div>
    <p v-else>?</p>
</template>

<script>
export default {
    name: 'PokemonData',
    props: {
        pokemon: {
            type: Object,
            required: true
        },
        pokemonData: {
            type: Object,
            required: true
        },
        showData: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    computed: {//métodos que retornan información reactiva que se guarda en caché, que ayuda cuando necesito renderizar el resultado de éste método en varias partes del componente y se va a hacer el cálculo 1 SOLA VEZ, a menos de que algún dato del cálculo cambie. Su diferencia con los methods es el caché y en que son solo getters que retornan un valor dependiendo de una propiedad reactiva
        imgSrc(){//así se usa una propiedad computada con parametros
            return evolutionId => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolutionId}.svg`
        }
    }
}
</script>

<style>

</style>