const html = document.querySelector('html')

const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const comecarBotao = document.querySelector('.app__card-primary-butto-icon')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBotao = document.querySelector('#start-pause')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const tempoFinalizado = new Audio ('/sons/beep.mp3')
const play = new Audio ('/sons/play.wav')
const pause = new Audio ('/sons/pause.mp3')
const iniciarOuPausarBotao = document.querySelector('#start-pause span')
const iniciarOuPausarImagem =  document.querySelector('.app__card-primary-butto-icon')
const temporizador = document.querySelector('#timer')

intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else {
        musica.pause()
    }
})

focoBotao.addEventListener('click', () => {
    tempoEmSegundos = 10
    alterarContexto('foco')
    focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`    
            break
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        tempoFinalizado.play()
        //alert('Tempo finalizado.')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}

startPauseBotao.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBotao.textContent = "Pausar"
    iniciarOuPausarImagem.setAttribute('src', './imagens/pause.png')
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBotao.textContent = "Começar" //text.content insere apenas textos
    iniciarOuPausarImagem.setAttribute('src', './imagens/play.arrow.png')
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
} 

mostrarTempo()

//temporizador.addEventListener('click', () => {
//   html.setAttribute('timer', 'app__card-timer')})
//duracaoFoco = 1500
//duracaoCurto = 300
//duracaoLongo = 900