import axios from 'axios'//axios es una libería que se debe instalar, que facilita el trabajo en comparación a el Fetch

const generationApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/generation'
})

export default generationApi