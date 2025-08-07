
const imageData = [
    {
        src: '../Images/img1.jpg',
        items: ['carpet', 'curtain', 'sofa', 'television', 'bookcase', 'table', 'coffee-table', 'chair', 'wardrobe', 'bed', 'blanket', 'pillow'],
        distractors: ['mango', 'pen', 'box', 'pizza']
    }
];

let selectedImageData;

document.addEventListener('DOMContentLoaded', () => {
    const randomIndex = Math.floor(Math.random() * imageData.length);
    selectedImageData = imageData[randomIndex];

    const mainImage = document.getElementById('main-image');
    mainImage.src = selectedImageData.src;

    let timeLeft = 5;
    const timer = document.getElementById('timer');
    const countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            startRecallStage();
        }
    }, 1000);
});

function startRecallStage() {
    const imageStage = document.getElementById('image-stage');
    imageStage.classList.add('hide');

    setTimeout(() => {
        const recallStage = document.getElementById('recall-stage');
        recallStage.classList.add('show');
    }, 800); 
}

document.getElementById('submit-answer').addEventListener('click', () => {
    const input = document.getElementById('user-input').value.trim().toLowerCase();

    const resultEl = document.getElementById('result');
    resultEl.textContent = ""; 

    if (!input) {
        resultEl.textContent = "Please type at least one word.";
        resultEl.style.color = "red";
        return;
    }

    const typedItems = input.split(/\s+/);
    const correctItems = selectedImageData.items;

    let matchedItems = [];

    typedItems.forEach(item => {
        if (correctItems.includes(item) && !matchedItems.includes(item)) {
            matchedItems.push(item);
        }
    });

    resultEl.style.color = "green";
    resultEl.textContent = `✅ You remembered ${matchedItems.length} item(s): ${matchedItems.join(', ')}`;
});

