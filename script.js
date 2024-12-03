const GameContainer = document.getElementById("game-container")
const ScoreDisplay = document.getElementById("score")
const GameOverDisplay = document.getElementById("game-over")
let score = 0
let GameActive = true

function CreateBalloon() {
    if (!GameActive) return;
    const Balloon = document.createElement("div")
    Balloon.classList.add("balloon")
    Balloon.style.left = Math.random() * 90 + "%"
    Balloon.style.bottom = "-100px"
    Balloon.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
    GameContainer.appendChild(Balloon)
    let MoveInterval = setInterval(() => {
        let CurrentBottom = parseInt(window.getComputedStyle(Balloon).bottom)
        if (CurrentBottom >= window.innerHeight) {
            clearInterval(MoveInterval)
            GameContainer.removeChild(Balloon)
            if (GameActive) {
                GameOver()
            }
        } else {
            Balloon.style.bottom = CurrentBottom + 2 + "px"
        }
    }, 20)
    Balloon.addEventListener("click", () => {
        score++
        ScoreDisplay.textContent = `SCORE: ${score}`
        Balloon.remove()
        clearInterval(MoveInterval)
    })
}

function GameOver() {
    GameActive = false
    GameOverDisplay.style.display = "block"
}

function RestartGame() {
    score = 0
    GameActive = true
    ScoreDisplay.textContent = "Score: 0"
    GameOverDisplay.style.display = "none"
    document.querySelectorAll(".balloon").forEach((Balloon) => Balloon.remove())

    StartGame()
}

function StartGame() {
    setInterval(CreateBalloon, 300)
}
StartGame()
