// State management
let currentQuestion = 1;
let correctAnswers = 0;

// Screen elements
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const timerScreen = document.getElementById('timerScreen');
const messageScreen = document.getElementById('messageScreen');
const finalScreen = document.getElementById('finalScreen');
const successModal = document.getElementById('successModal');
const loveDeclaration = document.getElementById('loveDeclaration');

// Button elements
const startBtn = document.getElementById('startBtn');
const submitHobbies = document.getElementById('submitHobbies');
const submitBirthday = document.getElementById('submitBirthday');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initializeEventListeners();
});

// Create floating hearts animation
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.opacity = '0.1';
        heart.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    startBtn.addEventListener('click', startQuiz);
    
    // Question 1 - Color options
    const colorOptions = document.querySelectorAll('#question1 .option-btn');
    colorOptions.forEach(btn => {
        btn.addEventListener('click', () => handleColorAnswer(btn));
    });
    
    // Question 2 - Hobbies
    submitHobbies.addEventListener('click', handleHobbiesAnswer);
    
    // Question 3 - Birthday
    submitBirthday.addEventListener('click', handleBirthdayAnswer);
    
    // Next button
    nextBtn.addEventListener('click', showFinalScreen);
    
    // Final buttons
    yesBtn.addEventListener('click', handleYesAnswer);
    noBtn.addEventListener('click', handleNoAnswer);
}

// Start quiz
function startQuiz() {
    switchScreen(welcomeScreen, quizScreen);
}

// Handle color answer (Question 1)
function handleColorAnswer(selectedBtn) {
    const answer = selectedBtn.getAttribute('data-answer');
    const allButtons = document.querySelectorAll('#question1 .option-btn');
    
    allButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    if (answer === 'Red') {
        selectedBtn.classList.add('correct');
        correctAnswers++;
        setTimeout(() => {
            moveToNextQuestion();
        }, 1000);
    } else {
        selectedBtn.classList.add('wrong');
        setTimeout(() => {
            // Reset and allow retry
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('wrong', 'correct');
            });
        }, 1500);
    }
}

// Handle hobbies answer (Question 2)
function handleHobbiesAnswer() {
    const checkboxes = document.querySelectorAll('#question2 input[type="checkbox"]');
    const selectedHobbies = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedHobbies.push(checkbox.value);
        }
    });
    
    const correctHobbies = ['Gaming', 'Guitar', 'Singing'];
    const isCorrect = correctHobbies.length === selectedHobbies.length &&
                     correctHobbies.every(hobby => selectedHobbies.includes(hobby));
    
    if (isCorrect) {
        correctAnswers++;
        submitHobbies.textContent = 'Correct! ✓';
        submitHobbies.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        setTimeout(() => {
            moveToNextQuestion();
        }, 1000);
    } else {
        submitHobbies.textContent = 'Try Again!';
        submitHobbies.style.background = 'linear-gradient(135deg, #f44336, #c62828)';
        setTimeout(() => {
            submitHobbies.textContent = 'Submit';
            submitHobbies.style.background = 'linear-gradient(135deg, var(--primary-red), var(--deep-rose))';
            checkboxes.forEach(cb => cb.checked = false);
        }, 1500);
    }
}

// Handle birthday answer (Question 3)
function handleBirthdayAnswer() {
    const birthdayInput = document.getElementById('birthdayInput');
    const selectedDate = new Date(birthdayInput.value);
    
    // Check if date is April 17, 2007
    if (selectedDate.getMonth() === 3 && // April (0-indexed)
        selectedDate.getDate() === 17 &&
        selectedDate.getFullYear() === 2007) {
        correctAnswers++;
        submitBirthday.textContent = 'Correct! ✓';
        submitBirthday.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        setTimeout(() => {
            showSuccessModal();
        }, 1000);
    } else {
        submitBirthday.textContent = 'Try Again!';
        submitBirthday.style.background = 'linear-gradient(135deg, #f44336, #c62828)';
        setTimeout(() => {
            submitBirthday.textContent = 'Submit';
            submitBirthday.style.background = 'linear-gradient(135deg, var(--primary-red), var(--deep-rose))';
            birthdayInput.value = '';
        }, 1500);
    }
}

// Move to next question
function moveToNextQuestion() {
    const currentCard = document.querySelector('.question-card.active');
    currentCard.classList.remove('active');
    
    currentQuestion++;
    const nextCard = document.getElementById(`question${currentQuestion}`);
    if (nextCard) {
        nextCard.classList.add('active');
    }
}

// Show success modal
function showSuccessModal() {
    successModal.classList.add('active');
    
    // Auto close after 3 seconds and show timer
    setTimeout(() => {
        successModal.classList.remove('active');
        showTimerScreen();
    }, 3000);
}

// Show timer screen
function showTimerScreen() {
    switchScreen(quizScreen, timerScreen);
    startCountdown();
}

// Start countdown
function startCountdown() {
    const countdownNumber = document.getElementById('countdownNumber');
    const progressCircle = document.querySelector('.countdown-progress');
    const circumference = 2 * Math.PI * 90; // radius is 90
    
    let timeLeft = 5;
    
    const interval = setInterval(() => {
        timeLeft--;
        countdownNumber.textContent = timeLeft;
        
        // Update circle progress
        const offset = circumference - (timeLeft / 5) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            showMessageScreen();
        }
    }, 1000);
}

// Show message screen
function showMessageScreen() {
    switchScreen(timerScreen, messageScreen);
}

// Show final screen
function showFinalScreen() {
    switchScreen(messageScreen, finalScreen);
}

// Handle Yes answer
function handleYesAnswer() {
    loveDeclaration.classList.add('active');
    createConfetti();
}

// Handle No answer - button moves randomly
function handleNoAnswer() {
    const button = noBtn;
    const maxX = window.innerWidth - button.offsetWidth - 50;
    const maxY = window.innerHeight - button.offsetHeight - 50;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.position = 'fixed';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.transition = 'all 0.3s ease';
}

// Helper function to switch screens
function switchScreen(currentScreen, nextScreen) {
    currentScreen.classList.remove('active');
    setTimeout(() => {
        nextScreen.classList.add('active');
    }, 300);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF1744', '#FFB3C6', '#FFE5EC', '#FFD700', '#FF69B4'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const endX = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) translateX(${endX}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Add some sparkle effects to the love declaration
function addSparkles() {
    const sparkleContainer = document.querySelector('.sparkles');
    if (sparkleContainer) {
        setInterval(() => {
            const sparkle = document.createElement('span');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, 300);
    }
}

// Initialize sparkles when love declaration is shown
yesBtn.addEventListener('click', () => {
    setTimeout(addSparkles, 500);
});