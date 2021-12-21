const holes$$ = document.querySelectorAll('.hole');
const score$$ = document.querySelector('.score');
const time$$ = document.querySelector('.time');
const moles$$ = document.querySelectorAll('.mole');
let lastMoleHole;
let timeUp = false;
let score = 0;
let time = 15;
let timeInterval;

const randomTimeMole = () => {
    return Math.round(Math.random() * (500) + 300); //Genero un tiempo entre 300 y 800 para el mole
}



const molePosition = () => {
    const moleHole = holes$$[Math.floor(Math.random() * holes$$.length)];    
    moleHole === lastMoleHole ? molePosition() : lastMoleHole = moleHole;   
    return moleHole;
}


const mole = () => {
    const timeMole = randomTimeMole();
    const moleHole = molePosition();

    moleHole.classList.add('up');
    setTimeout(() => {
        moleHole.classList.remove('up');
        if(!timeUp){
            mole();
        }else{
            clearInterval(timeInterval);
            alert(`Juego acabado: Conseguiste ${score} puntos`);
        }
    },timeMole);
}

function startGame() {
    score$$.textContent = 0;
    timeUp = false;
    score = 0;
    time = 15;
    time$$.textContent = time;
    mole();
    timeInterval = setInterval(() => {
        time--;
        time$$.textContent = time;
        if(time == 0){
            timeUp = true;
        }
    }, 1000) 
}

function wack(mole){
    score++;
    mole.parentNode.classList.remove('up');
    score$$.textContent = score;
}


for (let i = 0; i < moles$$.length; i++) {
    const mole = moles$$[i];
    mole.addEventListener('click', () => {wack(mole)})
}