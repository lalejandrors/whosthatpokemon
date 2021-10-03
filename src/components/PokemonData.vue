<template>
    <div class="data-container">
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">N.°</p> 
                </div>
                <p class="data-span" v-if="showData">{{pokemon.id}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">NAME</p> 
                </div>
                <p class="data-span" v-if="showData">{{pokemon.name}}</p>
                <p v-else>?</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">REGION</p> 
                </div>
                <p class="data-span" v-if="showData">{{pokemonData.region}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">TYPES</p> 
                </div>
                <div class="types-span" v-if="showData">
                    <span v-for="type in pokemon.types" :key="type.slot" :class="type.type.name + ' type-span'">{{type.type.name.toUpperCase()}}</span>
                </div>
                <p v-else>?</p>
            </div>
        </div>

        <div class="row measure-row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">HEIGHT</p> 
                </div>
                <p class="data-span" v-if="showData">{{heightCM}}</p>
                <p v-else>?</p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">WEIGHT</p> 
                </div>
                <div v-if="showData">
                    <p class="data-span" v-if="showData">{{weightKG}}</p>
                </div>
                <p v-else>?</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div class="container-label-data">
                    <div class="div-label-data"></div>
                    <p class="text-label-data">ABILITIES</p> 
                </div>
                <div v-if="showData">
                    <span v-for="ability in pokemon.abilities" :key="ability.slot" class="ability-span">{{ability.ability.name.toUpperCase()}}</span>
                </div>
                <p v-else>?</p>
            </div>
        </div>

        <div class="evolutions-container">
            <div class="container-label-data">
                <div class="div-label-data"></div>
                <p class="text-label-data">EVOLUTIONS</p> 
            </div>
            <div class="evolutions-span" v-if="showData">
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
        background: linear-gradient(
            to bottom,
            #FFCBA9,
            #FFCBA9 52%,
            #FEAE93 48%,
            #FEAE93
        );
        background-size: 100% 1.3%;
        padding: 5%;
        height: 100%;
        text-shadow: 2px 1px 2px gray;
        border-left: 5px solid #FFEBD6;
        border-top: 5px solid #FFEBD6;
    }

    .container-label-data{
        width: 90%;
        display: grid;
        height: 30px;
    }

    .div-label-data {
        background-color: #7A8194;
        border-radius: 10px;
        grid-area: 1 / 1;
    }

    .text-label-data {
        color: white;
        text-shadow:
            -2px -2px 0 #7A8194,  
            2px -2px 0 #7A8194,
            -2px 2px 0 #7A8194,
            2px 2px 0 #7A8194;
        text-align: center;
        grid-area: 1 / 1;
        z-index: 100;
    }

    .evolution-container {
        padding: 3%;
    }

    .evolutions-container{
        margin-top: 5%;
    }

    img {
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    }

    .data-span{
        background-color: #FEF3EF;
        padding: 1%;
        margin-right: 3%;
        margin-left: 3%;
        border-radius: 5px;
    }

    .type-span{
        background-color: #000;
        padding: 2%;
        margin-right: 1%;
        margin-left: 1%;
        border-radius: 5px;
        color: white;
        text-shadow: 2px 1px 2px black;
    }

    .types-span{
        background-color: #FEF3EF;
        padding: 3%;
        margin-right: 3%;
        margin-left: 3%;
        border-radius: 5px;
    }

    .ability-span{
        background-color: white;
        padding: 1%;
        margin-right: 1%;
        margin-left: 1%;
        border-radius: 5px;
        font-weight: bold;
    }

    .evolutions-span{
        background-color: #FEF3EF;
        border-radius: 5px;
    }

    .normal{
        background-color: #A8A878;
        border-top-color: #D8D8D0;
        border-bottom-color: #705848;
    }

    .fire{
        background-color: #F08030;
        border-top-color: #F8D030;
        border-bottom-color: #C03028;
    }

    .water{
        background-color: #6890F0;
        border-top-color: #98D8D8;
        border-bottom-color: #807870;
    }

    .grass{
        background-color: #78C850;
        border-top-color: #C0F860;
        border-bottom-color: #588040;
    }

    .electric{
        background-color: #F8D030;
        border-top-color: #F8F878;
        border-bottom-color: #B8A038;
    }

    .ice{
        background-color: #98D8D8;
        border-top-color: #D0F8E8;
        border-bottom-color: #9090A0;
    }

    .fighting{
        background-color: #C03028;
        border-top-color: #F08030;
        border-bottom-color: #484038;
    }

    .poison{
        background-color: #A040A0;
        border-top-color: #D880B8;
        border-bottom-color: #483850;
    }

    .ground{
        background-color: #E0C068;
        border-top-color: #F8F878;
        border-bottom-color: #886830;
    }

    .flying{
        background-color: #A890F0;
        border-top-color: #C8C0F8;
        border-bottom-color: #705898;
    }

    .psychic{
        background-color: #F85888;
        border-top-color: #F8C0B0;
        border-bottom-color: #789010;
    }

    .bug{
        background-color: #A8B820;
        border-top-color: #D8E030;
        border-bottom-color: #A8B820;
    }

    .rock{
        background-color: #B8A038;
        border-top-color: #E0C068;
        border-bottom-color: #886830;
    }

    .ghost{
        background-color: #705898;
        border-top-color: #A890F0;
        border-bottom-color: #483850;
    }

    .dark{
        background-color: #705848;
        border-top-color: #A8A878;
        border-bottom-color: #484038;
    }

    .dragon{
        background-color: #7038F8;
        border-top-color: #B8A0F8;
        border-bottom-color: #483890;
    }

    .steel{
        background-color: #B8B8D0;
        border-top-color: #D8D8C0;
        border-bottom-color: #807870;
    }

    .fairy{
        background-color: #F0B6BC;
        border-top-color: #F5CAD1;
        border-bottom-color: #905F63;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .evolutions-container{
            display: none;
        }

        .type-span, .ability-span{
            font-size: 1.5vw;
        }

        .data-span, .types-span{
            margin-right: 0;
            margin-left: 0;
        }
        
        .measure-row{
            margin-top: 5%;
        }

        .container-label-data{
            width: 100%;
        }

        .div-label-data {
            height: 14px;
            transform: translateY(40%);
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) {
        .evolution-name{
            font-size: 0.9vw;
        }

        .type-span{
            font-size: 1.1vw;
        }

        .ability-span{
            font-size: 0.9vw;
        }

        .div-label-data {
            height: 15px;
            transform: translateY(45%);
        }

        .data-span{
            font-size: 1.8vw;
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .evolution-name{
            font-size: 0.9vw;
        }

        .type-span{
            font-size: 1.1vw;
        }

        .ability-span{
            font-size: 0.9vw;
        }

        .div-label-data {
            height: 16px;
            transform: translateY(50%);
        }

        .data-span{
            font-size: 1.7vw;
        }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) {
        .evolution-name{
            font-size: 0.9vw;
        }

        .type-span{
            font-size: 1vw;
        }

        .ability-span{
            font-size: 0.9vw;
        }

        .div-label-data {
            height: 17px;
            transform: translateY(50%);
        }

        .data-span{
            font-size: 1.5vw;
        }
    }

    /* X-Large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .evolution-name{
            font-size: 0.7vw;
        }

        .type-span, .ability-span{
            font-size: 0.8vw;
        }

        .div-label-data {
            height: 17px;
            transform: translateY(50%);
        }

        .data-span{
            font-size: 1.2vw;
        }
    }

    /* XX-Large devices (larger desktops, 1400px and up) */
    @media (min-width: 1400px) {
        .evolution-name{
            font-size: 0.6vw;
        }

        .type-span{
            font-size: 0.7vw;
        }

        .ability-span{
            font-size: 0.6vw;
        }

        .div-label-data {
            height: 17px;
            transform: translateY(50%);
        }

        .data-span{
            font-size: 1vw;
        }
    }
    /* */
</style>