const row = document.querySelector('.board')
const h2 = document.querySelectorAll('h2')
const btn = document.querySelectorAll('button')

const dice = document.querySelectorAll('.dice-cube')

const celebration = document.getElementById('celebration')
const winnerText = document.getElementById('winner-text')
const confettiField = document.getElementById('confetti-field')

const turnIndicator = document.getElementById('turn-indicator')

let user1 = 0
let user2 = 0

const myDice = () => Number((parseInt(Math.random() * 6)) + 1)

// تابع کمکی: تعداد نقطه‌های وجه جلوی تاس رو بر اساس عدد رول شده آپدیت می‌کنه
function updateDiceFace(cubeEl, number) {
    const front = cubeEl.querySelector('.front')
    front.className = 'face front face-' + number
    front.innerHTML = ''
    for (let i = 0; i < number; i++) {
        const pip = document.createElement('span')
        pip.classList.add('pip')
        front.appendChild(pip)
    }
}

// تابع کمکی: ساخت بارش کانفتی رنگی
function spawnConfetti() {
    const colors = ['#f472b6', '#c084fc', '#60a5fa', '#fbbf24', '#34d399']
    confettiField.innerHTML = ''

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('span')
        piece.classList.add('confetti-piece')
        piece.style.left = Math.random() * 100 + '%'
        piece.style.background = colors[Math.floor(Math.random() * colors.length)]
        piece.style.animationDuration = (2 + Math.random() * 2) + 's'
        piece.style.animationDelay = (Math.random() * 1.5) + 's'
        confettiField.appendChild(piece)
    }
}

// تابع اعلام برنده و نمایش صفحه جشن
function showWinner(playerName) {
    winnerText.innerText = '👑 ' + playerName + ' wins! 👑'
    celebration.classList.remove('hidden')
    spawnConfetti()
    row.setAttribute('inert', 'inert')
}

// تابع کمکی: آپدیت بنر نوبت بر اساس دکمه‌ای که فعاله
function updateTurnIndicator() {
    if (!btn[0].hasAttribute('disabled')) {
        turnIndicator.innerText = 'Player turn1🎲'
        turnIndicator.className = 'turn-indicator turn-indicator--p1'
    } else {
        turnIndicator.innerText = 'Player turn2🎲'
        turnIndicator.className = 'turn-indicator turn-indicator--p2'
    }
}

// پیش فرض
let turn = parseInt(Math.random() * 2)
if (turn) {
    btn[1].setAttribute('disabled', 'disabled')
} else {
    btn[0].setAttribute('disabled', 'disabled')
}
updateTurnIndicator()
// پیش فرض


function roll(user) {
    if (user == 'user1') {

        // انیمیشن چرخش تاس
        dice[0].classList.remove('rolling')
        void dice[0].offsetWidth
        dice[0].classList.add('rolling')

        setTimeout(() => {

            let temp = myDice()
            updateDiceFace(dice[0], temp)
            dice[0].classList.remove('rolling')

            if (temp != 6) {
                btn[0].setAttribute('disabled', 'disabled')
                btn[1].removeAttribute('disabled')
            }
            updateTurnIndicator()
            btn[0].innerText = '🎲 Roll Dice ' + temp
            user1 += temp
            h2[0].innerText = user1

            if (user1 >= 10) {
                showWinner('Player 1')
            }

        }, 1000);


    } else {

        // انیمیشن چرخش تاس
        dice[1].classList.remove('rolling')
        void dice[1].offsetWidth
        dice[1].classList.add('rolling')

        setTimeout(() => {

            let temp = myDice()
            updateDiceFace(dice[1], temp)
            dice[1].classList.remove('rolling')

            if (temp != 6) {
                btn[1].setAttribute('disabled', 'disabled')
                btn[0].removeAttribute('disabled')
            }
            updateTurnIndicator()
            btn[1].innerText = '🎲 Roll Dice ' + temp
            user2 += temp
            h2[1].innerText = user2

            if (user2 >= 10) {
                showWinner('Player 2')
            }

        }, 1000);
    }
}