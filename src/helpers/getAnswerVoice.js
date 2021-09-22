import Speech from 'speak-tts'

let speech = null

const initSpeech = async () => {
    speech = new Speech()
    if(speech.hasBrowserSupport()) {
        console.log("speech synthesis supported")
    }

    await speech.init({
        'volume': 1,
        'lang': 'en-US',
        'rate': 0.8,
        'pitch': 1.3,
        'voice':'Google US English',
        'splitSentences': true,
        'listeners': {
            'onvoiceschanged': (voices) => {
                console.log("Event voiceschanged", voices)
            }
        }
    }).then((data) => {
        console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    })
}

const getAnswerVoice = async (message) => {

    if(speech === null){
        await initSpeech()
    }

    speech.speak({
        text: message,
    }).then(() => {
        console.log("Success!")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
}

export default getAnswerVoice
