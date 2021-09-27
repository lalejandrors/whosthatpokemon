import pokemonApi from '@/api/pokemonApi'
import speciesApi from '@/api/speciesApi'
import generationApi from '@/api/generationApi'
import evolutionApi from '@/api/evolutionApi'

const getPokemonData = async (pokemonId) => {

    const species = await speciesApi.get(`/${pokemonId}`)

    const generationId = getParamEndpoint(species.data.generation.url)
    const evolutionId = getParamEndpoint(species.data.evolution_chain.url)

    const generation = await generationApi.get(`/${generationId}`)

    const evolution = await evolutionApi.get(`/${evolutionId}`)
    let evolutions = null
    switch(checkTypeEvolutions(evolution)) {
        case 1:
            evolutions = await getEvolution1(evolution)
            break;
        case 2:
            evolutions = await getEvolution2(evolution)
            break;
        case 3:
            evolutions = await getEvolution3(evolution)
            break;
        case 4:
            evolutions = await getEvolution4(evolution)
            break;
        case 5:
            evolutions = await getEvolution5(evolution)
            break;
        case 6://todas las generaciones
            evolutions = await getEvolution6(evolution)
            break;
    }

    return {
        region: generation.data.main_region.name.toUpperCase(), 
        evolutions: evolutions
    }
}

const checkTypeEvolutions = (evolution) => {

    let typeEvolution = null

    if(evolution.data.chain.evolves_to.length == 0){
        typeEvolution = 1;
    }
    
    if(evolution.data.chain.evolves_to.length == 1 && evolution.data.chain.evolves_to[0].evolves_to.length == 0){
        typeEvolution = 2;
    }

    if(evolution.data.chain.evolves_to.length == 1 && evolution.data.chain.evolves_to[0].evolves_to.length == 1){
        typeEvolution = 3;
    }

    if(evolution.data.chain.evolves_to.length > 1 && evolution.data.chain.evolves_to[0].evolves_to.length == 0){
        typeEvolution = 4;
    }

    if(evolution.data.chain.evolves_to.length == 1 && evolution.data.chain.evolves_to[0].evolves_to.length > 1){
        typeEvolution = 5;
    }

    if(evolution.data.chain.evolves_to.length > 1 && evolution.data.chain.evolves_to[0].evolves_to.length == 1){
        typeEvolution = 6;
    }
    
    return typeEvolution;
}

const getEvolution1 = async (evolution) => {//cuando es única forma (146 moltres)
    const baseId = getParamEndpoint(evolution.data.chain.species.url)//la forma base
    const base = await pokemonApi.get(`/${baseId}`)

    return [
        {name: base.data.name.toUpperCase(), id: base.data.id},
    ]
}

const getEvolution2 = async (evolution) => {//cuando es de 2 niveles (58 growlithe)
    const baseId = getParamEndpoint(evolution.data.chain.species.url)
    const base = await pokemonApi.get(`/${baseId}`)

    const e1Id = getParamEndpoint(evolution.data.chain.evolves_to[0].species.url)
    const e1 = await pokemonApi.get(`/${e1Id}`)

    return [
        {name: base.data.name.toUpperCase(), id: base.data.id},
        {name: e1.data.name.toUpperCase(), id: e1.data.id}
    ]
}

const getEvolution3 = async (evolution) => {//cuando es de 3 niveles (4 charmander)
    const baseId = getParamEndpoint(evolution.data.chain.species.url)
    const base = await pokemonApi.get(`/${baseId}`)
    
    const e1Id = getParamEndpoint(evolution.data.chain.evolves_to[0].species.url)
    const e1 = await pokemonApi.get(`/${e1Id}`)

    const e2Id = getParamEndpoint(evolution.data.chain.evolves_to[0].evolves_to[0].species.url)
    const e2 = await pokemonApi.get(`/${e2Id}`)

    return [
        {name: base.data.name.toUpperCase(), id: base.data.id},
        {name: e1.data.name.toUpperCase(), id: e1.data.id},
        {name: e2.data.name.toUpperCase(), id: e2.data.id}
    ]
}

const getEvolution4 = async (evolution) => {//cuando es de 2 niveles y el segundo tiene otras formas (133 evee)
    let eArray = []

    const baseId = getParamEndpoint(evolution.data.chain.species.url)
    const base = await pokemonApi.get(`/${baseId}`)

    eArray.push({name: base.data.name.toUpperCase(), id: base.data.id})

    evolution.data.chain.evolves_to.forEach(async(item, index) => {
        let eId = getParamEndpoint(item.species.url)
        let e = await pokemonApi.get(`/${eId}`)

        eArray.push({name: e.data.name.toUpperCase(), id: e.data.id})
    });

    return eArray;
}

const getEvolution5 = async (evolution) => {//cuando es de 3 niveles y el tercero tiene otras formas (43 odish)
    let eArray = []

    const e1Id = getParamEndpoint(evolution.data.chain.evolves_to[0].species.url)
    const e1 = await pokemonApi.get(`/${e1Id}`)
    eArray.push({name: e1.data.name.toUpperCase(), id: e1.data.id})

    evolution.data.chain.evolves_to[0].evolves_to.forEach(async(item, index) => {
        let eId = getParamEndpoint(item.species.url)
        let e = await pokemonApi.get(`/${eId}`)

        eArray.push({name: e.data.name.toUpperCase(), id: e.data.id})
    });

    return eArray;
}

const getEvolution6 = async (evolution) => {//cuando es de 3 niveles y el segundo tiene otras formas (265 wurmple)
    let eArray = []

    evolution.data.chain.evolves_to.forEach(async(item, index) => {
        let eId = getParamEndpoint(item.species.url)
        let e = await pokemonApi.get(`/${eId}`)

        eArray.push({name: e.data.name.toUpperCase(), id: e.data.id})

        let e2Id = getParamEndpoint(item.evolves_to[0].species.url)
        let e2 = await pokemonApi.get(`/${e2Id}`)

        eArray.push({name: e2.data.name.toUpperCase(), id: e2.data.id})
    });

    return eArray;
}

const getParamEndpoint = (endpointUrl) => {

    const urlArr = endpointUrl.split("/")
    const param = urlArr[6]

    return param
}

export default getPokemonData