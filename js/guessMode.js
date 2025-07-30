const imageData = [
    {
        src: '../Images/img1.jpg',
        items: ['carpet', 'curtain', 'sofa', 'television', 'bookcase', 'table', 'coffee-table', 'chair', 'wardrobe', 'bed', 'blanket', 'pillow'],
        distractors: ['mango', 'pen', 'box', 'pizza']
    }
];

// Select random image
const selected = imageData[Math.floor(Math.random() * imageData.length)];

// DOM elements
const imageElement = document.getElementById('guess-image');
const timerElement = document.getElementById('timer');
const imageStage = document.getElementById('image-stage');
const choiceStage = document.getElementById('choice-stage');
const resultStage = document.getElementById('result-stage');
const optionsForm = document.getElementById('options-form');
const submitBtn = document.getElementById('submit-guess');
const scoreSpan = document.getElementById('score');

// Setup
let timeLeft = 5;
imageElement.src = selected.src;
choiceStage.style.display = 'none';
resultStage.style.display = 'none';
timerElement.textContent = timeLeft;

// Countdown
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        imageStage.classList.add('hide'); // triggers CSS slide-left

        setTimeout(() => {
            imageStage.style.display = 'none';
            showChoices();
        }, 1000); // match transition duration
    }
}, 1000);

// Show checkboxes
function showChoices() {
    choiceStage.style.display = 'block';

    // Clear any existing options
    optionsForm.innerHTML = '';

    const allOptions = [...selected.items, ...selected.distractors];
    shuffleArray(allOptions);

    allOptions.forEach(item => {
        const label = document.createElement('label');
        label.classList.add('option-label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item;

        const span = document.createElement('span');
        span.textContent = item;
        span.classList.add('option-text');

        label.appendChild(checkbox);
        label.appendChild(span);

        optionsForm.appendChild(label);
    });
}

// On submit
submitBtn.addEventListener('click', () => {
    const selectedOptions = Array.from(document.querySelectorAll('#options-form input:checked')).map(cb => cb.value);

    let correct = 0;
    selectedOptions.forEach(opt => {
        if (selected.items.includes(opt)) correct++;
    });

    const scoreText = `${correct} out of ${selected.items.length}`;
    scoreSpan.textContent = scoreText;

    choiceStage.style.display = 'none';
    resultStage.style.display = 'block';
});

// Shuffle helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
