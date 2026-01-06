// CEO Test Quiz Data
const quizData = {
    categories: [
        {
            id: 1,
            title: "Strategy Development",
            description: "Can you develop a simple plan for strategy? Effective leaders can distill their strategy into simple, clear terms that their team can understand and execute.",
            questions: [
                "I can explain our company strategy in simple terms that anyone on my team can understand and repeat back to me.",
                "Our strategic plan focuses on clear outcomes rather than just listing priorities or activities.",
                "I ruthlessly edit and simplify our vision, removing complexity and jargon so everyone understands where we're headed.",
                "Our goals are ambitious and push us beyond our comfort zone rather than playing it safe.",
                "When team members are asked about our strategy, they give consistent, aligned answers."
            ]
        },
        {
            id: 2,
            title: "Culture Building",
            description: "Can you make the culture real and matter? Are you walking the talk? Can you create a high-performance, high-trust culture?",
            questions: [
                "I actively define, model, and enforce our company culture on a regular basis.",
                "I walk the talk: my actions consistently align with the cultural values I espouse.",
                "We have built a workplace where high performance and high trust coexist.",
                "I make tough decisions to remove cultural misfits and toxic overachievers, even when they deliver results.",
                "I regularly assess whether our culture is supporting or hindering our goals."
            ]
        },
        {
            id: 3,
            title: "Team Building",
            description: "Can you build teams that are true teams? CEOs need to be able to assemble and motivate a high-performing team to execute their vision.",
            questions: [
                "My leadership team understands how their collective purpose is greater than any individual role.",
                "I have the right people in the right seats, and I don't tolerate substandard performance.",
                "I actively coach my team on how to work together more effectively.",
                "Our team creates outcomes that no individual could achieve alone.",
                "I invest significant time in building team cohesion and improving team dynamics."
            ]
        },
        {
            id: 4,
            title: "Leading Transformation",
            description: "Can you lead transformation? The status quo is enormously powerful, and it's the enemy of change.",
            questions: [
                "I regularly question our traditions and ask how they serve us today.",
                "I communicate transparently and frequently during times of change to reduce uncertainty.",
                "I identify and inspire key multipliers who can champion change throughout the organization.",
                "I successfully overcome resistance to change and break through the status quo.",
                "I can articulate how our company's DNA translates into today's context and tomorrow's opportunities."
            ]
        },
        {
            id: 5,
            title: "Listening & Awareness",
            description: "Can you really listen? Danger signals can be faint, and bad news travels slowly.",
            questions: [
                "I understand how different parts of our organization interconnect and how changes in one area affect others.",
                "I have built a culture where people are rewarded for giving me critical feedback openly.",
                "I actively listen for weak signals and early warning signs rather than waiting for crises.",
                "I seek out information that challenges my assumptions rather than only hearing what confirms them.",
                "Bad news travels quickly to me because people trust they won't be punished for sharing it."
            ]
        },
        {
            id: 6,
            title: "Crisis Management",
            description: "Can you deal with crises? When unexpected disasters strike, successful CEOs need to be able to lead effectively, making hard decisions quickly and efficiently.",
            questions: [
                "When crises hit, I show up visibly, communicate widely, and remain calm while projecting confidence.",
                "I focus on fixing root causes rather than just putting out fires.",
                "I use crises as opportunities to make necessary changes that would be difficult in normal times.",
                "I can make hard decisions quickly and efficiently under pressure.",
                "I regularly ask myself: \"If I were building this company from scratch today, what would I do differently?\""
            ]
        },
        {
            id: 7,
            title: "Mastering the Inner Game",
            description: "Can you master the inner game of being a CEO? Successful CEOs manage the psychological challenges of leadership, including self-doubt, loneliness, and the constant pressure to perform.",
            questions: [
                "I comfortably hold contradictions: being confident yet humble, compassionate yet demanding, optimistic yet realistic.",
                "I work with a coach or trusted advisor to develop deeper self-awareness.",
                "I regularly take pauses to recharge and gain perspective.",
                "I am building systems and people so the company can run without me for periods of time.",
                "I manage my own self-doubt, loneliness, and pressure effectively without letting them compromise my leadership."
            ]
        }
    ],
    scoring: {
        category: {
            exceptional: { min: 22, max: 25, label: "Exceptional strength" },
            strong: { min: 18, max: 21, label: "Strong capability" },
            adequate: { min: 14, max: 17, label: "Room for improvement" },
            development: { min: 10, max: 13, label: "Development needed" },
            critical: { min: 0, max: 9, label: "Critical gap" }
        },
        overall: [
            { min: 150, max: 175, level: "Exceptional", message: "You demonstrate exceptional CEO capabilities across all dimensions. Continue refining your craft and consider how you can mentor other leaders." },
            { min: 125, max: 149, level: "Strong", message: "You're performing well as a CEO with clear strengths. Focus on your lowest-scoring areas for targeted development." },
            { min: 100, max: 124, level: "Developing", message: "You have a solid foundation but significant room for growth. Consider working with a coach to address your development areas." },
            { min: 75, max: 99, level: "Emerging", message: "You're facing meaningful challenges in several areas. Prioritize the lowest-scoring categories and seek support immediately." },
            { min: 0, max: 74, level: "Struggling", message: "You may be experiencing significant difficulties in your role. Honest assessment and intensive support are needed." }
        ]
    }
};

// Quiz State
let currentSection = 0;
let answers = {};
let userData = {};

// Initialize answers object
function initAnswers() {
    quizData.categories.forEach((category, catIndex) => {
        category.questions.forEach((_, qIndex) => {
            const questionId = `q${catIndex}_${qIndex}`;
            answers[questionId] = null;
        });
    });
}

// Show a specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// Start the quiz
function startQuiz() {
    initAnswers();
    currentSection = 0;
    showScreen('quiz');
    renderSection();
}

// Render current section
function renderSection() {
    const category = quizData.categories[currentSection];

    // Update header
    document.getElementById('categoryTitle').textContent = category.title;
    document.getElementById('categoryDescription').textContent = category.description;
    document.getElementById('currentSection').textContent = `Test ${currentSection + 1}`;

    // Update progress bar
    const progress = ((currentSection + 1) / quizData.categories.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Render questions
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    category.questions.forEach((question, index) => {
        const questionId = `q${currentSection}_${index}`;
        const questionNum = (currentSection * 5) + index + 1;

        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.innerHTML = `
            <p class="question-text"><span class="question-number">${questionNum}.</span> ${question}</p>
            <div class="rating-labels">
                <span>1 Rarely</span>
                <span>2 Sometimes</span>
                <span>3 Often</span>
                <span>4 Consistently</span>
                <span>5 Always</span>
            </div>
            <div class="rating-options">
                ${[1, 2, 3, 4, 5].map(value => `
                    <label class="rating-option ${answers[questionId] === value ? 'selected' : ''}">
                        <input type="radio" name="${questionId}" value="${value}"
                            ${answers[questionId] === value ? 'checked' : ''}
                            onchange="selectAnswer('${questionId}', ${value})">
                        <span class="rating-value">${value}</span>
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionEl);
    });

    // Update navigation buttons
    document.getElementById('prevBtn').style.display = currentSection === 0 ? 'none' : 'block';

    const isLastSection = currentSection === quizData.categories.length - 1;
    document.getElementById('nextBtn').textContent = isLastSection ? 'Submit' : 'Next';
}

// Select an answer
function selectAnswer(questionId, value) {
    answers[questionId] = value;

    // Update visual selection
    const options = document.querySelectorAll(`input[name="${questionId}"]`);
    options.forEach(option => {
        option.closest('.rating-option').classList.remove('selected');
        if (option.checked) {
            option.closest('.rating-option').classList.add('selected');
        }
    });
}

// Validate current section
function validateSection() {
    const category = quizData.categories[currentSection];
    for (let i = 0; i < category.questions.length; i++) {
        const questionId = `q${currentSection}_${i}`;
        if (answers[questionId] === null) {
            return false;
        }
    }
    return true;
}

// Next section
function nextSection() {
    if (!validateSection()) {
        alert('Please answer all questions before continuing.');
        return;
    }

    if (currentSection < quizData.categories.length - 1) {
        currentSection++;
        renderSection();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showScreen('email-capture');
    }
}

// Previous section
function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        renderSection();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Submit email and show results
async function submitEmail(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;

    userData = {
        email: document.getElementById('email').value
    };

    try {
        // Send to newsletter API
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to subscribe');
        }

        console.log('Subscription successful:', result);
        console.log('Quiz answers:', answers);

        // Show results
        calculateAndShowResults();

    } catch (error) {
        console.error('Subscription error:', error);
        // Still show results even if subscription fails
        // User has completed the quiz, don't block them
        calculateAndShowResults();
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Calculate scores
function calculateScores() {
    const categoryScores = quizData.categories.map((category, catIndex) => {
        let score = 0;
        for (let i = 0; i < 5; i++) {
            const questionId = `q${catIndex}_${i}`;
            score += answers[questionId] || 0;
        }
        return {
            id: catIndex,
            title: category.title,
            score: score,
            interpretation: getCategoryInterpretation(score)
        };
    });

    const totalScore = categoryScores.reduce((sum, cat) => sum + cat.score, 0);
    const overallInterpretation = getOverallInterpretation(totalScore);

    return {
        categoryScores,
        totalScore,
        overallInterpretation
    };
}

// Get category interpretation
function getCategoryInterpretation(score) {
    const scoring = quizData.scoring.category;
    if (score >= scoring.exceptional.min) return scoring.exceptional;
    if (score >= scoring.strong.min) return scoring.strong;
    if (score >= scoring.adequate.min) return scoring.adequate;
    if (score >= scoring.development.min) return scoring.development;
    return scoring.critical;
}

// Get overall interpretation
function getOverallInterpretation(score) {
    return quizData.scoring.overall.find(level => score >= level.min && score <= level.max);
}

// Calculate and show results
function calculateAndShowResults() {
    const results = calculateScores();

    // Show screen first
    showScreen('results');

    // Animate score counter
    animateScore(0, results.totalScore, 1500);

    // Update level and message
    document.getElementById('scoreLevel').textContent = results.overallInterpretation.level;
    document.getElementById('scoreMessage').textContent = results.overallInterpretation.message;
    document.getElementById('scoreLevel').className = `score-level level-${results.overallInterpretation.level.toLowerCase()}`;

    // Animate score ring
    animateScoreRing(results.totalScore, 175);

    // Render radar chart
    renderRadarChart(results.categoryScores);

    // Render category bars (initially at 0 width)
    const categoryBarsContainer = document.getElementById('categoryBars');
    categoryBarsContainer.innerHTML = results.categoryScores.map(cat => `
        <div class="category-bar-item">
            <div class="category-bar-header">
                <span class="category-bar-title">${cat.title}</span>
                <span class="category-bar-score">${cat.score}/25</span>
            </div>
            <div class="category-bar">
                <div class="category-bar-fill" data-width="${(cat.score / 25) * 100}" data-level="${cat.interpretation.label}"></div>
            </div>
            <span class="category-bar-label">${cat.interpretation.label}</span>
        </div>
    `).join('');

    // Sort categories by score for strengths/weaknesses
    const sortedCategories = [...results.categoryScores].sort((a, b) => b.score - a.score);

    // Top 3 strengths
    const strengthsList = document.getElementById('strengthsList');
    strengthsList.innerHTML = sortedCategories.slice(0, 3).map((cat, i) =>
        `<li style="animation-delay: ${0.6 + i * 0.1}s"><strong>${cat.title}</strong> <span class="score-badge">${cat.score}/25</span></li>`
    ).join('');

    // Bottom 3 development areas
    const developmentList = document.getElementById('developmentList');
    developmentList.innerHTML = sortedCategories.slice(-3).reverse().map((cat, i) =>
        `<li style="animation-delay: ${0.6 + i * 0.1}s"><strong>${cat.title}</strong> <span class="score-badge">${cat.score}/25</span></li>`
    ).join('');

    // Animate bars after delay
    setTimeout(() => {
        document.querySelectorAll('.category-bar-fill').forEach((bar, i) => {
            setTimeout(() => {
                bar.style.width = bar.dataset.width + '%';
            }, i * 100);
        });
    }, 400);
}

// Animate score counter
function animateScore(start, end, duration) {
    const scoreEl = document.getElementById('totalScore');
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease out cubic
        const current = Math.round(start + (end - start) * easeProgress);
        scoreEl.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Animate score ring
function animateScoreRing(score, maxScore) {
    const ring = document.getElementById('scoreRing');
    const circumference = 2 * Math.PI * 85;
    const percentage = score / maxScore;
    const offset = circumference - (percentage * circumference);

    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    setTimeout(() => {
        ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        ring.style.strokeDashoffset = offset;
    }, 100);
}

// Render radar chart
function renderRadarChart(categoryScores) {
    const svg = document.getElementById('radarChart');
    const centerX = 275;
    const centerY = 200;
    const maxRadius = 130;
    const levels = 5;
    const categories = categoryScores.length;

    // Clear previous
    svg.innerHTML = '';

    // Draw grid circles
    for (let i = 1; i <= levels; i++) {
        const radius = (maxRadius / levels) * i;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', radius);
        circle.setAttribute('class', 'radar-grid');
        svg.appendChild(circle);
    }

    // Draw axis lines and labels
    const angleStep = (2 * Math.PI) / categories;
    categoryScores.forEach((cat, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;

        // Axis line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('class', 'radar-axis');
        svg.appendChild(line);

        // Label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 40);
        const labelY = centerY + Math.sin(angle) * (maxRadius + 40);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('class', 'radar-label');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');

        // Use full category names
        text.textContent = cat.title;
        svg.appendChild(text);
    });

    // Calculate data points
    const points = categoryScores.map((cat, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const value = cat.score / 25; // normalize to 0-1
        const radius = value * maxRadius;
        return {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
        };
    });

    // Draw data polygon
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');
    polygon.setAttribute('points', pointsString);
    polygon.setAttribute('class', 'radar-data');
    svg.appendChild(polygon);

    // Draw data points
    points.forEach((point, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 6);
        circle.setAttribute('class', 'radar-point');
        circle.style.animationDelay = `${0.5 + i * 0.1}s`;
        svg.appendChild(circle);
    });

    // Render legend
    const legendContainer = document.getElementById('radarLegend');
    legendContainer.innerHTML = categoryScores.map(cat => `
        <div class="radar-legend-item">
            <span class="radar-legend-dot"></span>
            <span class="radar-legend-label">${cat.title}</span>
            <span class="radar-legend-score">${cat.score}/25</span>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAnswers();
});
