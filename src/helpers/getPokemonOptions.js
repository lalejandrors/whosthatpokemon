import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
    const positionsArr = Array.from(Array(649))//tengo un array de 649 posiciones undefined
    const pokemonsArr = positionsArr.map((_,index) => index + 1)//la primera posición del array, el indice

    return pokemonsArr
}

const getPokemonOptions = async (generation) => {
    const pokemonsArr = getPokemons()
    let generationArr = null

    switch(parseInt(generation)) {
    case 1:
        generationArr = pokemonsArr.slice(0,151)
        break;
    case 2:
        generationArr = pokemonsArr.slice(151,251)
        break;
    case 3:
        generationArr = pokemonsArr.slice(251,386)
        break;
    case 4:
        generationArr = pokemonsArr.slice(386,493)
        break;
    case 5:
        generationArr = pokemonsArr.slice(493,649)
        break;
    case 0://todas las generaciones
        generationArr = pokemonsArr
        break;  
    default:
        generationArr = pokemonsArr
    }
    
    const mixedPokemons = generationArr.sort(() => Math.random() - 0.5)//mezcla los números del array
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))//toma los primeros 4 elementos del mix
    
    return pokemons
}

const getPokemonNames = async ([a,b,c,d] = []) => {

    const promiseArr = [
        pokemonApi.get(`/${a}`),//pokemonApi es el elemento Axios que hace la petición al Api
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    const [p1,p2,p3,p4] = await Promise.all(promiseArr)
    
    return [
        {name: p1.data.name.toUpperCase(), id: p1.data.id},
        {name: p2.data.name.toUpperCase(), id: p2.data.id},
        {name: p3.data.name.toUpperCase(), id: p3.data.id},
        {name: p4.data.name.toUpperCase(), id: p4.data.id}
    ]
} 

export default getPokemonOptions