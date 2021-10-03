<template>
    <div class="brands-container">
        <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 logo-app">
                <img src="@/assets/img/vue.png" class="img-fluid" alt="logo1"/>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 logo-app">
                <img src="@/assets/img/pokeapi.png" class="img-fluid" alt="logo2"/>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 logo-app">
                <img src="@/assets/img/bootstrap.png" class="img-fluid" alt="logo3"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonBrands',
}
</script>

<style scoped>
    .brands-container{
        margin: 1%;
        background-color: #FEF3EF;
        padding: 2%;
        border-radius: 6px;
        border-top: 10px solid #7A8194;
        border-left: 5px solid #FFEBD6;
        border-right: 5px solid #FFEBD6;
        border-bottom: 5px solid #FFEBD6;
    }

    .logo-app{
        padding:1%;
    }

    /* media querys */
    /* X-Small devices (portrait phones, less than 576px) */
    @media screen and (max-width: 576px) {/*X-Small None*/
        .brands-container{
            display: none;
        }
    }
    /* */
</style>