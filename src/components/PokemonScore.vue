<template>
    <div class="score-container">
        <!-- el v-model conecta el valor de un input, textarea y select con un dato reactivo del componente -->
        <div class="row game-title">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                ¿WHO'S THAT POKEMON?
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 score-element">
                Score: {{score}}
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 max-score-element">
                Max Score: {{maxScore}}
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 filter-label">
                Filter:
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 select-element">
                <select v-model="generation" @change="$emit('selectedGeneration', generation)" id="select-generation">
                    <option value="0">All</option>
                    <option value="1">1st. Gen</option>
                    <option value="2">2nd. Gen</option>
                    <option value="3">3rd. Gen</option>
                    <option value="4">4th. Gen</option>
                    <option value="5">5th. Gen</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonScore',
    props: {
        score: {
            type: Number,
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        },
    },
    data(){
        return{
            generation: "0"
        }
    }
}
</script>

<style scoped>
    .score-container {
        color: white;
        background-color: #0079C4;
        text-shadow: 2px 1px 2px black;
    }

    .game-title{
        background-color: #E6DB9D;
        text-align: center;
        border-bottom: 5px solid #63687B;
    }

    .filter-label{
        text-align: right;
    }

    .score-element{
        padding-left: 1%;
    }

    .select-element{
        padding-right: 1%;
    }

    .max-score-element{
        text-align: center;
    }

    #select-generation{
        color: white;
        background-color: #6BC1CE;
        text-shadow: 2px 1px 2px black;
        width: 100%;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .filter-label{
            display: none;
        }

        .select-element{
            padding-left: 1%;
            padding-right: 1%;
        }
    }
    /* */
</style>