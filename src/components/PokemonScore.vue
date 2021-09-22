<template>
    <!-- el v-model conecta el valor de un input, textarea y select con un dato reactivo del componente -->
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 title-game">
            ¿WHO'S THAT POKEMON?
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            Score: {{score}}
        </div>
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            Max Score: {{maxScore}}
        </div>
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 filter-label">
            Filter:
        </div>
        <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <select id="generationsSelect" v-model="generation" @change="$emit('selectedGeneration', generation)">
                <option value="0">All</option>
                <option value="1">1st. Gen</option>
                <option value="2">2nd. Gen</option>
                <option value="3">3rd. Gen</option>
                <option value="4">4th. Gen</option>
                <option value="5">5th. Gen</option>
            </select>
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
    .title-game{
        text-align: center;
    }

    .filter-label{
        text-align: right;
    }
</style>