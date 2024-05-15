const html = document.querySelector('html')

const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const comecarBotao = document.querySelector('.app__card-primary-butto-icon')

const temporizador = document.querySelector('#timer')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

focoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
})

curtoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
})

longoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})

temporizador.addEventListener('click', () => {
    html.setAttribute('timer', 'app__card-timer')
})

duracaoFoco = 1500
duracaoCurto = 300
duracaoLongo = 900