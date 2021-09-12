import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
    const pokemonsArr = Array.from(Array(649))//tengo un array de 650 posiciones undefined
    
    return pokemonsArr.map((_,index) => index + 1)//la primera posición del array, el indice
}

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)//mezcla los números del array
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))//toma los primeros 4 elementos del mix
    
    return pokemons
}

const getPokemonNames = async ([a,b,c,d] = []) => {//los desestructuro

    const promiseArr = [
        pokemonApi.get(`/${a}`),//pokemonApi es el elemento Axios que hace la petición al Api
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    const [p1,p2,p3,p4] = await Promise.all(promiseArr)
    
    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id}
    ]
} 

export default getPokemonOptions