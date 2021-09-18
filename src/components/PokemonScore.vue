<template>
    <!-- el v-model conecta el valor de un input, textarea y select con un dato reactivo del componente -->
    <div class="row">
        <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            ¿WHO'S THAT POKEMON?
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            Max Score: 50
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <select id="generationsSelect" v-model="generation" @change="$emit('selectedGeneration', generation)">
                <option value="-1">All</option>
                <option value="0">1st. Gen to 4th Gen</option>
                <option value="1">1st. Gen</option>
                <option value="2">2nd. Gen</option>
                <option value="3">3rd. Gen</option>
                <option value="4">4th. Gen</option>
                <option value="5">5th. Gen</option>
                <option value="6">6th. Gen</option>
                <option value="7">7th. Gen</option>
                <option value="8">8th. Gen</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonScore',
    data(){//información reactiva
        return{
            generation: "-1"
        }
    }
}
</script>

<style>

</style>