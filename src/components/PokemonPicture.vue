<template>
    <div class="pokemon-container">
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <p v-if="showData">N.°{{pokemon.id}}</p>
                <p v-else>N.°</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 head-name">
                <p v-if="showData">{{pokemon.name}}</p>
                <p v-else>?</p>
            </div>
        </div>
        <div class="picture-container">
            <!-- los dos puntos (:) me permiten escribir js en los valores de las propiedades -->
            <img v-if="!showData" :src="imgSrc" class="hidden-pokemon img-fluid" alt="pokemon">
            <img v-else :src="imgSrc" class="fade-in img-fluid" alt="pokemon">
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonPicture',
    props: {
        pokemon: {
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
        imgSrc(){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemon.id}.svg`
        }
    }
}
</script>

<style scoped>
    .pokemon-container {
        background-color: #CEABEF;
        padding: 2%;
        height: 100%;
        color: white;
        text-shadow: 2px 1px 2px black;
    }

    .head-name {
        text-align: right;
    }

    .picture-container {
        background-color: #F0EBEF;
        height: 85%;
    }

    .hidden-pokemon {
        filter: brightness(0);
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        max-height: 80%;
        max-width: 80%;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .head-name{
            display: none;
        }
    }
    /* */
</style>>