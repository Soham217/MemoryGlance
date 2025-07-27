
// 1. Image + answer data
const imageData = [
    {
        src: '/Images/img1.jpg',
        items: ['carpet', 'curtain', 'sofa', 'television', 'bookcase', 'table', 'coffee-table', 'chair', 'wardrobe', 'bed', 'blanket', 'pillow'],
        distractors: ['mango', 'pen', 'box', 'pizza']
    }
];

let selectedImageData;

// 2. Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Pick random image
    const randomIndex = Math.floor(Math.random() * imageData.length);
    selectedImageData = imageData[randomIndex];

    // Show image
    const mainImage = document.getElementById('main-image');
    mainImage.src = selectedImageData.src;

    // Start countdown
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

// 3. Transition to input section
function startRecallStage() {
    // Slide image out
    const imageStage = document.getElementById('image-stage');
    imageStage.classList.add('hide');

    // Show recall input after slight delay
    setTimeout(() => {
        const recallStage = document.getElementById('recall-stage');
        recallStage.classList.add('show');
    }, 800); // matches CSS transition timing
}

// 4. Check user's recalled items
document.getElementById('submit-answer').addEventListener('click', () => {
    const input = document.getElementById('user-input').value.trim().toLowerCase();

    const resultEl = document.getElementById('result');
    resultEl.textContent = ""; // clear old result

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
