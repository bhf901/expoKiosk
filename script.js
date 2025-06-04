let ethnicity;
let num;
let recordingLength;

let countdown = 9;
let countdownInt;

const answers = [
    '12-18',
    '12-18',
    '19-35',
    '36-64',
    '65+',
    '36-64',
    '65+',
    '19-35',
    '6-11',
    '6-11'
];

const ashAvg = 7.97;
const otherAvg = 7.02;

document.addEventListener('DOMContentLoaded', () => {
    toPage(0);
})

function toPage(num) {
    for (let i = 0; i < 4; i++) {
        if (i !== num) {
            document.getElementById(`page-${i}`).style.display = 'none';
        } else {
            document.getElementById(`page-${i}`).style.display = 'block';
        }
    }
}

function validateAnswer(num) {
    if (num === 0) {
        if (!document.getElementById('ethnicity').value) {
            addError('All fields are required.');
            return;
        }
        toPage(2)
        setNum();
    } else {
        if (!document.getElementById('guess').value) {
            addError('All fields are required.');
            return;
        }
        calculateAnswer();
    }
}

function addError(msg) {
    document.getElementById('error').textContent = msg;
    setTimeout(() => {
        document.getElementById('error').textContent = '';
    }, 2000);
}

function skipEthnicity() {
    toPage(2);
    ethnicity = undefined;
}

function playRecording() {
    document.getElementById('recording').play();
    document.getElementById('play-square').classList.add('play-disabled');
    document.getElementById('play-square').disabled = true;
    setTimeout(() => {
        document.getElementById('age-guess').style.display = 'block';
        document.getElementById('play-square').classList.remove('play-disabled');
        document.getElementById('play-square').disabled = false
    }, document.getElementById('recording').duration * 1000);
}

function setNum() {
    num = Math.ceil(Math.random() * 9);
    document.getElementById('age-guess').style.display = 'none';
    document.getElementById('recording').src = `speaker/speaker_${num}.m4a`;
    recordingLength = document.getElementById('recording').duration;
}

function calculateAnswer() {
    toPage(3);
    const userAnswer = document.getElementById('guess').value;
    if (userAnswer === answers[num - 1]) {
        document.getElementById('result-start').textContent = 'Great job';
        document.getElementById('result-status').textContent = 'correct';
    } else {
        document.getElementById('result-start').textContent = 'Sorry';
        document.getElementById('result-status').textContent = 'incorrect';
    }
    if (document.getElementById('ethnicity').value === 'ashkenazi') {
        document.getElementById('secondary-result').textContent = `Your group got average ${ashAvg} of these questions out of 10 correct.`
    } else if (document.getElementById('ethnicity').value === 'non-ashkenazi') {
        document.getElementById('secondary-result').textContent = `Your group got average ${otherAvg} of these questions out of 10 correct.`
    }
    countdownInt = setInterval(countdownToReset, 1000);
}

function countdownToReset() {
    document.getElementById('home-countdown').textContent = `${countdown}`;
    if (countdown !== 0) {
        countdown -= 1;
    } else {
        window.location.reload();
    }
}