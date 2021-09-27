import axios from 'axios'//axios es una libería que se debe instalar, que facilita el trabajo en comparación a el Fetch

const evolutionApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/evolution-chain'
})

export default evolutionApi