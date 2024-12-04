const GameContainer = document.getElementById("game-container")
const ScoreDisplay = document.getElementById("score")
const GameOverDisplay = document.getElementById("game-over")
const LevelDisplay = document.getElementById("level-id")
const PopSound = document.getElementById("pop-sound")
const EndSound = document.getElementById("end-sound")
let score = 0;
let GameActive = true;
let BalloonInterval;
let BalloonSpeed = 2
let SpawnRate = 1000
let Level = 1

function CreateBalloon() {
    if (!GameActive) return;
    const Balloon = document.createElement("div")
    Balloon.classList.add("balloon")
    Balloon.style.left = Math.random() * 90 + "%"
    Balloon.style.bottom = "-100px"
    Balloon.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
    GameContainer.appendChild(Balloon);

    let MoveInterval = setInterval(() => {
        if (!GameActive) {
            clearInterval(MoveInterval)
            Balloon.remove()
            return
        }
        let CurrentBottom = parseInt(window.getComputedStyle(Balloon).bottom);

        if (CurrentBottom >= window.innerHeight) {
            clearInterval(MoveInterval)
            GameContainer.removeChild(Balloon)
            if (GameActive) {
                GameOver()
            }
        } else {
            Balloon.style.bottom = CurrentBottom + BalloonSpeed + "px"
        }
    }, 20)
    Balloon.addEventListener("click", () => {
        score++
        ScoreDisplay.textContent = `SCORE: ${score}`
        Balloon.remove()
        PopSound.currentTime = 0
        PopSound.play()
        clearInterval(MoveInterval)
        if (score % 10 === 0) {
            LevelUp()
        }
    })
}

function LevelUp() {
    Level++;
    LevelDisplay.textContent = `Level: ${Level}`
    BalloonSpeed += 1
    SpawnRate -= 100
    clearInterval(BalloonInterval)
    BalloonInterval = setInterval(CreateBalloon, Math.max(SpawnRate, 300))
}

function GameOver() {
    GameActive = false;
    GameOverDisplay.style.display = "block";
    clearInterval(BalloonInterval);
    EndSound.currentTime = 0
    EndSound.play()
}

function RestartGame() {
    score = 0
    Level = 1
    BalloonSpeed = 2
    SpawnRate = 1000
    GameActive = true
    ScoreDisplay.textContent = "Score: 0"
    GameOverDisplay.style.display = "none"
    LevelDisplay.textContent = "Level: 1"
    document.querySelectorAll(".balloon").forEach((Balloon) => Balloon.remove())

    StartGame()
}

function StartGame() {
    BalloonInterval = setInterval(CreateBalloon, 700)
}
StartGame()