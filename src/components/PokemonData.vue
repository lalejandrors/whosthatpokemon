<template>
    <div class="data-container">
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">N.° </h6>
                <p v-if="showData">{{pokemon.id}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">NAME </h6>
                <p v-if="showData">{{pokemon.name}}</p>
                <p v-else>?</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">REGION </h6>
                <p v-if="showData">{{pokemonData.region}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">TYPE </h6>
                <div v-if="showData">
                    <span v-for="type in pokemon.types" :key="type.slot">{{type.type.name.toUpperCase()}}</span>
                </div>
                <p v-else>?</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">HEIGHT </h6>
                <p v-if="showData">{{heightCM}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <h6 class="label-data">WEIGHT </h6>
                <div v-if="showData">
                    <p v-if="showData">{{weightKG}}</p>
                </div>
                <p v-else>?</p>
            </div>
        </div>

        <div class="evolutions-container">
            <h6 class="label-data">EVOLUTIONS </h6>
            <div v-if="showData">
                <div class="row">
                    <template v-for="evolution in pokemonData.evolutions" :key="evolution.id">
                        <div v-if="evolution.id < 650" class="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 evolution-container">
                            <p class="evolution-name">{{evolution.name}}</p>
                            <img :src="imgSrc(evolution.id)" alt="evolution" class="fade-in img-fluid">
                        </div>
                    </template>
                </div>
            </div>
            <p v-else>?</p>
        </div>
    </div>
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
        },
        heightCM(){//de decimetros a centimetros
            return `${this.pokemon.height * 10} CM`
        },
        weightKG(){//de hectogramos a kilogramos
            return `${this.pokemon.weight / 10} KG`
        }
    }
}
</script>

<style scoped>
    .data-container {
        background-color: #FFEBD6;
        padding: 5%;
        height: 100%;
        text-shadow: 2px 1px 2px gray;
    }

    .label-data {
        color: white;
        text-shadow: 2px 1px 2px black;
    }

    .evolution-container {
        padding: 3%;
    }

    img {
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .evolutions-container{
            display: none;
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) {
        .evolution-name{
            font-size: 1.5vw;
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .evolution-name{
            font-size: 1vw;
        }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) {
        .evolution-name{
            font-size: 0.8vw;
        }
    }

    /* X-Large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .evolution-name{
            font-size: 0.7vw;
        }
    }

    /* XX-Large devices (larger desktops, 1400px and up) */
    @media (min-width: 1400px) {
        .evolution-name{
            font-size: 0.6vw;
        }
    }
    /* */
</style>