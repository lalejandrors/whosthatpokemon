<template>

    <div class="row">
      <div class="col-xl-1 col-xxl-2">
        
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-10 col-xxl-8 pokemonPage">
        <PokemonPage />
      </div>
      <div class="col-xl-1 col-xxl-2">
        
      </div>
    </div>

</template>

<script>
import PokemonPage from '@/pages/PokemonPage'

export default {
  name: 'App',
  components: {
    PokemonPage
  }
}
</script>

<style scoped>
  .pokemonPage {
    background-color: #fff;
  }
</style>
