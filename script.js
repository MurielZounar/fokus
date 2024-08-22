const html = document.querySelector("html")
const focoBtn = document.querySelector(".app__card-button--foco")
const curtoBtn = document.querySelector(".app__card-button--curto")
const longoBtn = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const startPause = document.querySelector("#start-pause")
const musicaFoco = document.querySelector("#alternar-musica")
const statrtPauseBtn = document.querySelector("#start-pause span")
const startPauseImg = document.querySelector(".app__card-primary-butto-icon")
const tempoTela = document.querySelector("#timer")
const musica = new Audio("./sons/luna-rise-part-one.mp3")
const start = new Audio("./sons/play.wav")
const pause = new Audio("./sons/pause.mp3")
const beep = new Audio("./sons/beep.mp3")

let tempoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFoco.addEventListener("change", () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener("click", () => {
    tempoEmSegundos = 1500
    alterarContexto("foco")
    focoBtn.classList.add("active")
})

curtoBtn.addEventListener("click", () => {
    tempoEmSegundos = 300
    alterarContexto("descanso-curto")
    curtoBtn.classList.add("active")
})

longoBtn.addEventListener("click", () => {
    tempoEmSegundos = 900
    alterarContexto("descanso-longo")
    longoBtn.classList.add("active")
})

function alterarContexto(contexto) {
    mostraTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br />
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
        default:
            break
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        beep.play()
        alert("tempo finalizado")
        zerar()
        return
    }
    tempoEmSegundos--
    mostraTempo()
}

startPause.addEventListener("click", iniciarPausar)

function iniciarPausar() {
    if (intervaloId) {
        pause.play()
        zerar()
        return
    }

    start.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    statrtPauseBtn.textContent = "Pausar"
    startPauseImg.setAttribute("src", "./imagens/pause.png")
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null

    if (tempoEmSegundos == 0) {
        tempoEmSegundos = 5
        statrtPauseBtn.textContent = "Começar"
        startPauseImg.setAttribute("src", "./imagens/play_arrow.png")
    } else {
        statrtPauseBtn.textContent = "Continuar"
        startPauseImg.setAttribute("src", "./imagens/play_arrow.png")
    }
}

function mostraTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
        minute: "2-digit",
        second: "2-digit",
    })

    tempoTela.innerHTML = `${tempoFormatado}`
}

mostraTempo()
