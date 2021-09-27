import axios from 'axios'//axios es una libería que se debe instalar, que facilita el trabajo en comparación a el Fetch

const speciesApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon-species'
})

export default speciesApi