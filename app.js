// App State
const state = {
    currentLevel: 'A1',
    currentScreen: 'welcome',
    currentUnit: null,
    currentLesson: null,
    stats: {
        totalSessions: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        currentStreak: 0,
        lastStudyDate: null,
        studyDates: [] // Array of date strings
    },
    mistakes: [], // Store mistakes for review
    unitProgress: {}, // Track completion of units and lessons
    grammarProgress: 0,
    currentQuestionIndex: 0
};

// Course System Data
const courseData = {
    A1: [
        {
            id: 'A1-U1',
            icon: '🌱',
            title: '单元 1：基础问候',
            description: '学习基本的法语问候和自我介绍',
            lessons: 12
        },
        {
            id: 'A1-U2',
            icon: '🏠',
            title: '单元 2：日常生活',
            description: '家庭、房间和日常活动词汇',
            lessons: 10
        },
        {
            id: 'A1-U3',
            icon: '🍽️',
            title: '单元 3：食物与餐厅',
            description: '食物名称和餐厅用语',
            lessons: 10
        }
    ],
    A2: [
        {
            id: 'A2-U1',
            icon: '🚗',
            title: '单元 1：交通出行',
            description: '交通方式和问路表达',
            lessons: 12
        },
        {
            id: 'A2-U2',
            icon: '🏥',
            title: '单元 2：健康与医疗',
            description: '身体部位和医疗词汇',
            lessons: 10
        }
    ],
    B1: [
        {
            id: 'B1-U1',
            icon: '💼',
            title: '单元 1：职场法语',
            description: '工作场合的表达和词汇',
            lessons: 15
        },
        {
            id: 'B1-U2',
            icon: '📰',
            title: '单元 2：新闻与时事',
            description: '阅读新闻和讨论时事',
            lessons: 12
        }
    ],
    B2: [
        {
            id: 'B2-U1',
            icon: '🎭',
            title: '单元 1：文化艺术',
            description: '法语文化和艺术表达',
            lessons: 15
        }
    ],
    C1: [
        {
            id: 'C1-U1',
            icon: '📚',
            title: '单元 1：学术法语',
            description: '学术写作和正式表达',
            lessons: 18
        }
    ],
    C2: [
        {
            id: 'C2-U1',
            icon: '👑',
            title: '单元 1：高级应用',
            description: '母语水平的法语运用',
            lessons: 20
        }
    ]
};

// Learning Content Data
const learningData = {
    grammar: {
        A1: [
            {
                question: "Je ___ français. (être)",
                options: ["suis", "es", "est", "sommes"],
                correct: 0,
                explanation: "第一人称单数用 'suis'"
            },
            {
                question: "Tu ___ étudiant? (être)",
                options: ["suis", "es", "est", "êtes"],
                correct: 1,
                explanation: "第二人称单数用 'es'"
            },
            {
                question: "Nous ___ chinois. (être)",
                options: ["suis", "êtes", "sommes", "sont"],
                correct: 2,
                explanation: "第一人称复数用 'sommes'"
            },
            {
                question: "Elle ___ professeur. (être)",
                options: ["suis", "es", "est", "sommes"],
                correct: 2,
                explanation: "第三人称单数用 'est'"
            },
            {
                question: "Vous ___ français? (parler)",
                options: ["parle", "parles", "parlez", "parlent"],
                correct: 2,
                explanation: "第二人称复数或正式用语用 'parlez'"
            }
        ],
        A2: [
            {
                question: "Hier, je ___ au cinéma. (aller)",
                options: ["vais", "suis allé", "allais", "irai"],
                correct: 1,
                explanation: "过去时用复合过去时 passé composé"
            },
            {
                question: "Demain, nous ___ à Paris. (partir)",
                options: ["partons", "partirons", "partions", "sommes partis"],
                correct: 1,
                explanation: "表示将来用简单将来时"
            }
        ],
        B1: [
            {
                question: "Si j'avais de l'argent, je ___ cette voiture. (acheter)",
                options: ["achète", "achèterais", "achèterai", "achetais"],
                correct: 1,
                explanation: "条件式现在时表示假设"
            }
        ]
    },
    listening: {
        A1: [
            {
                text: "Bonjour, comment allez-vous?",
                question: "说话人在做什么？",
                options: ["打招呼", "道别", "道歉", "感谢"],
                correct: 0
            },
            {
                text: "Je m'appelle Marie.",
                question: "说话人在做什么？",
                options: ["介绍自己", "问路", "点餐", "购物"],
                correct: 0
            }
        ],
        A2: [
            {
                text: "Où est la gare, s'il vous plaît?",
                question: "说话人想去哪里？",
                options: ["火车站", "机场", "酒店", "餐厅"],
                correct: 0
            }
        ]
    },
    speaking: {
        A1: [
            {
                text: "Bonjour, comment allez-vous?",
                translation: "你好，你好吗？"
            },
            {
                text: "Je m'appelle Pierre.",
                translation: "我叫皮埃尔。"
            },
            {
                text: "Merci beaucoup!",
                translation: "非常感谢！"
            }
        ],
        A2: [
            {
                text: "Où est la gare?",
                translation: "火车站在哪里？"
            }
        ]
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeApp();
    updateStreakDisplay();

    // Show welcome screen if first time
    if (!state.currentLevel) {
        switchScreen('welcome');
    } else {
        switchScreen('course');
        renderCourseSystem();
    }
});

function initializeApp() {
    // Level selection buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.currentTarget.dataset.level;
            state.currentLevel = level;
            document.getElementById('currentLevelBadge').textContent = level;
            switchScreen('course');
            renderCourseSystem();
            saveState();
        });
    });

    // Skip test button
    document.getElementById('skipTestBtn')?.addEventListener('click', () => {
        switchScreen('skipTest');
    });

    // Level switch button
    document.getElementById('levelSwitchBtn')?.addEventListener('click', () => {
        switchScreen('welcome');
    });

    // Level badge click to switch
    document.getElementById('currentLevelBadge')?.addEventListener('click', () => {
        switchScreen('welcome');
    });

    // Streak display click
    document.getElementById('streakDisplay')?.addEventListener('click', () => {
        switchScreen('progress');
        renderProgressScreen();
    });

    // Bottom navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const screen = e.currentTarget.dataset.screen;
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            if (screen === 'course') {
                switchScreen('course');
                renderCourseSystem();
            } else if (screen === 'mistake') {
                switchScreen('mistake');
                renderMistakeList();
            } else if (screen === 'progress') {
                switchScreen('progress');
                renderProgressScreen();
            }
        });
    });

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.currentScreen === 'unit') {
                switchScreen('course');
                renderCourseSystem();
            } else {
                switchScreen('course');
                renderCourseSystem();
            }
        });
    });

    // Grammar submit
    document.getElementById('grammarSubmit')?.addEventListener('click', checkGrammarAnswer);

    // Listening
    document.getElementById('playAudio')?.addEventListener('click', playListeningAudio);
    document.getElementById('listeningSubmit')?.addEventListener('click', checkListeningAnswer);
    document.getElementById('showText')?.addEventListener('click', showAudioText);

    // Speaking
    document.getElementById('recordBtn')?.addEventListener('click', toggleRecording);

    // Word lookup - clickable text
    document.querySelectorAll('.clickable').forEach(el => {
        el.addEventListener('click', (e) => {
            const text = e.target.textContent;
            showWordModal(text);
        });
    });

    // Modal close
    document.getElementById('modalClose')?.addEventListener('click', () => {
        document.getElementById('wordModal').classList.remove('active');
    });

    // Reminder set button
    document.getElementById('setReminderBtn')?.addEventListener('click', setStudyReminder);
}

// Screen Navigation
function switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(`${screenName}Screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        state.currentScreen = screenName;
    }
}

// Course System Rendering
function renderCourseSystem() {
    const container = document.getElementById('unitsContainer');
    if (!container) return;

    container.innerHTML = '';
    const units = courseData[state.currentLevel] || courseData['A1'];

    units.forEach(unit => {
        const unitCard = createUnitCard(unit);
        container.appendChild(unitCard);
    });
}

function createUnitCard(unit) {
    const card = document.createElement('div');
    card.className = 'unit-card';

    // Calculate progress
    const progress = calculateUnitProgress(unit.id);

    card.innerHTML = `
        <div class="unit-header">
            <div class="unit-icon">${unit.icon}</div>
            <div class="unit-info">
                <div class="unit-title">${unit.title}</div>
                <div class="unit-description">${unit.description}</div>
            </div>
        </div>
        <div class="unit-progress">
            <div class="progress-label">
                <span>进度</span>
                <span>${progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
        <div class="lessons-grid" id="lessons-${unit.id}"></div>
    `;

    // Add lessons
    const lessonsGrid = card.querySelector(`#lessons-${unit.id}`);
    for (let i = 1; i <= unit.lessons; i++) {
        const lessonItem = createLessonItem(unit.id, i);
        lessonsGrid.appendChild(lessonItem);
    }

    return card;
}

function createLessonItem(unitId, lessonNum) {
    const item = document.createElement('div');
    item.className = 'lesson-item';

    const lessonId = `${unitId}-L${lessonNum}`;
    const isCompleted = state.unitProgress[lessonId] === true;
    const isLocked = lessonNum > 1 && !state.unitProgress[`${unitId}-L${lessonNum - 1}`];

    if (isCompleted) {
        item.classList.add('completed');
    }
    if (isLocked) {
        item.classList.add('locked');
    }

    // Determine lesson type
    const types = ['语法', '听力', '口语'];
    const type = types[(lessonNum - 1) % 3];

    item.innerHTML = `
        <div class="lesson-number">${lessonNum}</div>
        <div class="lesson-type">${type}</div>
        ${isCompleted ? '<div class="lesson-status">✅</div>' : ''}
        ${isLocked ? '<div class="lesson-status">🔒</div>' : ''}
    `;

    if (!isLocked) {
        item.addEventListener('click', () => {
            state.currentUnit = unitId;
            state.currentLesson = lessonNum;
            startLesson(unitId, lessonNum, type);
        });
    }

    return item;
}

function calculateUnitProgress(unitId) {
    const unit = courseData[state.currentLevel]?.find(u => u.id === unitId);
    if (!unit) return 0;

    let completed = 0;
    for (let i = 1; i <= unit.lessons; i++) {
        if (state.unitProgress[`${unitId}-L${i}`]) {
            completed++;
        }
    }

    return Math.round((completed / unit.lessons) * 100);
}

function startLesson(unitId, lessonNum, type) {
    recordStudySession();

    if (type === '语法') {
        startGrammarPractice();
    } else if (type === '听力') {
        startListeningPractice();
    } else if (type === '口语') {
        startSpeakingPractice();
    }
}

// Streak System
function updateStreakDisplay() {
    const today = new Date().toDateString();
    const lastDate = state.stats.lastStudyDate;

    let streak = state.stats.currentStreak || 0;

    if (lastDate) {
        const lastStudy = new Date(lastDate);
        const diffTime = new Date(today) - new Date(lastStudy.toDateString());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            // Streak broken
            streak = 0;
            state.stats.currentStreak = 0;
        }
    }

    document.getElementById('streakCount').textContent = streak;

    const fireIcon = document.getElementById('fireIcon');
    if (lastDate === today) {
        fireIcon.classList.remove('dimmed');
    } else {
        fireIcon.classList.add('dimmed');
    }
}

function recordStudySession() {
    const today = new Date().toDateString();

    if (state.stats.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (state.stats.lastStudyDate === yesterdayStr) {
            // Continue streak
            state.stats.currentStreak++;
        } else if (!state.stats.lastStudyDate) {
            // First day
            state.stats.currentStreak = 1;
        } else {
            // Streak broken, restart
            state.stats.currentStreak = 1;
        }

        state.stats.lastStudyDate = today;

        if (!state.stats.studyDates) {
            state.stats.studyDates = [];
        }
        if (!state.stats.studyDates.includes(today)) {
            state.stats.studyDates.push(today);
        }

        state.stats.totalSessions++;
        saveState();
        updateStreakDisplay();
    }
}

// Grammar Practice
function startGrammarPractice() {
    switchScreen('grammar');
    state.currentQuestionIndex = 0;
    state.grammarProgress = 0;
    loadGrammarQuestion();
}

function loadGrammarQuestion() {
    const questions = learningData.grammar[state.currentLevel] || learningData.grammar['A1'];
    const question = questions[state.currentQuestionIndex];

    if (!question) {
        // Finished all questions, mark lesson complete
        if (state.currentUnit && state.currentLesson) {
            const lessonId = `${state.currentUnit}-L${state.currentLesson}`;
            state.unitProgress[lessonId] = true;
            saveState();
        }

        // Go back to course
        setTimeout(() => {
            switchScreen('course');
            renderCourseSystem();
        }, 1500);
        return;
    }

    document.getElementById('grammarQuestion').innerHTML = `请选择正确的动词形式：<br><strong>${question.question}</strong>`;

    const optionsContainer = document.getElementById('grammarOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.index = index;
        btn.addEventListener('click', selectGrammarOption);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('grammarResult').classList.remove('show');
    document.getElementById('grammarSubmit').disabled = true;
}

function selectGrammarOption(e) {
    document.querySelectorAll('#grammarOptions .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    e.target.classList.add('selected');
    document.getElementById('grammarSubmit').disabled = false;
}

function checkGrammarAnswer() {
    const questions = learningData.grammar[state.currentLevel] || learningData.grammar['A1'];
    const question = questions[state.currentQuestionIndex];
    const selected = document.querySelector('#grammarOptions .option-btn.selected');

    if (!selected) return;

    const selectedIndex = parseInt(selected.dataset.index);
    const isCorrect = selectedIndex === question.correct;

    // Update stats
    state.stats.totalAnswers++;
    if (isCorrect) {
        state.stats.correctAnswers++;
    } else {
        // Add to mistakes
        state.mistakes.push({
            type: 'grammar',
            question: question.question,
            yourAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correct],
            date: new Date().toISOString()
        });
    }
    saveState();

    // Show result
    const resultDiv = document.getElementById('grammarResult');
    resultDiv.className = 'result show ' + (isCorrect ? 'correct' : 'incorrect');
    resultDiv.textContent = isCorrect ? '✅ 正确！' + question.explanation : '❌ 错误。' + question.explanation;

    // Highlight correct/incorrect
    document.querySelectorAll('#grammarOptions .option-btn').forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (btn.classList.contains('selected') && !isCorrect) {
            btn.classList.add('incorrect');
        }
        btn.style.pointerEvents = 'none';
    });

    // Update progress
    state.grammarProgress = ((state.currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('grammarProgress').style.width = state.grammarProgress + '%';

    // Next question
    setTimeout(() => {
        state.currentQuestionIndex++;
        loadGrammarQuestion();
    }, 2000);
}

// Listening Practice
let currentListeningQuestion = null;

function startListeningPractice() {
    switchScreen('listening');
    loadListeningQuestion();
}

function loadListeningQuestion() {
    const questions = learningData.listening[state.currentLevel] || learningData.listening['A1'];
    currentListeningQuestion = questions[Math.floor(Math.random() * questions.length)];

    document.getElementById('listeningQuestion').textContent = currentListeningQuestion.question;
    document.getElementById('audioText').textContent = currentListeningQuestion.text;
    document.getElementById('audioText').style.display = 'none';

    const optionsContainer = document.getElementById('listeningOptions');
    optionsContainer.innerHTML = '';

    currentListeningQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.index = index;
        btn.addEventListener('click', selectListeningOption);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('listeningResult').classList.remove('show');
    document.getElementById('listeningSubmit').disabled = true;
}

function selectListeningOption(e) {
    document.querySelectorAll('#listeningOptions .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    e.target.classList.add('selected');
    document.getElementById('listeningSubmit').disabled = false;
}

function playListeningAudio() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentListeningQuestion.text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);

        document.getElementById('playAudio').textContent = '🔊 播放中...';
        utterance.onend = () => {
            document.getElementById('playAudio').textContent = '▶️ 再次播放';
        };
    } else {
        alert('您的浏览器不支持语音播放功能');
    }
}

function showAudioText() {
    document.getElementById('audioText').style.display = 'block';
}

function checkListeningAnswer() {
    const selected = document.querySelector('#listeningOptions .option-btn.selected');
    if (!selected) return;

    const selectedIndex = parseInt(selected.dataset.index);
    const isCorrect = selectedIndex === currentListeningQuestion.correct;

    // Update stats
    state.stats.totalAnswers++;
    if (isCorrect) {
        state.stats.correctAnswers++;
    } else {
        state.mistakes.push({
            type: 'listening',
            question: currentListeningQuestion.question,
            yourAnswer: currentListeningQuestion.options[selectedIndex],
            correctAnswer: currentListeningQuestion.options[currentListeningQuestion.correct],
            date: new Date().toISOString()
        });
    }
    saveState();

    // Show result
    const resultDiv = document.getElementById('listeningResult');
    resultDiv.className = 'result show ' + (isCorrect ? 'correct' : 'incorrect');
    resultDiv.textContent = isCorrect ? '✅ 正确！' : '❌ 错误，正确答案是：' + currentListeningQuestion.options[currentListeningQuestion.correct];

    // Highlight correct/incorrect
    document.querySelectorAll('#listeningOptions .option-btn').forEach((btn, index) => {
        if (index === currentListeningQuestion.correct) {
            btn.classList.add('correct');
        } else if (btn.classList.contains('selected') && !isCorrect) {
            btn.classList.add('incorrect');
        }
        btn.style.pointerEvents = 'none';
    });

    // Mark lesson complete and go back
    if (state.currentUnit && state.currentLesson) {
        const lessonId = `${state.currentUnit}-L${state.currentLesson}`;
        state.unitProgress[lessonId] = true;
        saveState();
    }

    setTimeout(() => {
        switchScreen('course');
        renderCourseSystem();
    }, 2500);
}

// Speaking Practice
let recognition = null;
let isRecording = false;

function startSpeakingPractice() {
    switchScreen('speaking');
    loadSpeakingExercise();
    initializeSpeechRecognition();
}

function loadSpeakingExercise() {
    const exercises = learningData.speaking[state.currentLevel] || learningData.speaking['A1'];
    const exercise = exercises[Math.floor(Math.random() * exercises.length)];

    document.getElementById('targetText').textContent = exercise.text;
    document.getElementById('targetTranslation').textContent = exercise.translation;
    document.getElementById('speakingResult').classList.remove('show');
}

function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        document.getElementById('recordingStatus').textContent = '抱歉，您的浏览器不支持语音识别';
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const targetText = document.getElementById('targetText').textContent.toLowerCase();
        const similarity = calculateSimilarity(transcript.toLowerCase(), targetText);

        const resultDiv = document.getElementById('speakingResult');
        resultDiv.className = 'result show ' + (similarity > 0.7 ? 'correct' : 'incorrect');
        resultDiv.innerHTML = `
            <p>您说的是：${transcript}</p>
            <p>相似度：${Math.round(similarity * 100)}%</p>
            <p>${similarity > 0.7 ? '✅ 发音很好!' : '❌ 再试一次'}</p>
        `;

        if (similarity > 0.7) {
            state.stats.correctAnswers++;

            // Mark lesson complete
            if (state.currentUnit && state.currentLesson) {
                const lessonId = `${state.currentUnit}-L${state.currentLesson}`;
                state.unitProgress[lessonId] = true;
            }

            setTimeout(() => {
                switchScreen('course');
                renderCourseSystem();
            }, 2000);
        }
        state.stats.totalAnswers++;
        saveState();
    };

    recognition.onerror = (event) => {
        document.getElementById('recordingStatus').textContent = '识别错误：' + event.error;
        isRecording = false;
        document.getElementById('recordBtn').classList.remove('recording');
        document.getElementById('recordBtn').textContent = '🎤 开始录音';
    };

    recognition.onend = () => {
        isRecording = false;
        document.getElementById('recordBtn').classList.remove('recording');
        document.getElementById('recordBtn').textContent = '🎤 开始录音';
        document.getElementById('recordingStatus').textContent = '';
    };
}

function toggleRecording() {
    if (!recognition) {
        alert('语音识别未初始化');
        return;
    }

    if (isRecording) {
        recognition.stop();
    } else {
        isRecording = true;
        document.getElementById('recordBtn').classList.add('recording');
        document.getElementById('recordBtn').textContent = '⏹️ 停止录音';
        document.getElementById('recordingStatus').textContent = '正在录音...';
        recognition.start();
    }
}

function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Mistake Notebook
function renderMistakeList() {
    const container = document.getElementById('mistakeList');
    if (!container) return;

    if (state.mistakes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">暂无错题记录，继续努力学习吧！</p>';
        return;
    }

    container.innerHTML = '';

    // Show recent mistakes first
    const recentMistakes = [...state.mistakes].reverse().slice(0, 20);

    recentMistakes.forEach(mistake => {
        const item = document.createElement('div');
        item.className = 'mistake-item';

        const date = new Date(mistake.date).toLocaleDateString('zh-CN');

        item.innerHTML = `
            <div class="mistake-question">${mistake.type === 'grammar' ? '语法' : '听力'}：${mistake.question}</div>
            <div class="mistake-answer">你的答案：${mistake.yourAnswer}</div>
            <div class="mistake-answer" style="color: #2E7D32;">正确答案：${mistake.correctAnswer}</div>
            <div class="mistake-answer" style="font-size: 12px; color: #999;">${date}</div>
        `;

        container.appendChild(item);
    });
}

// Progress Screen
function renderProgressScreen() {
    // Update stats
    document.getElementById('totalStreak').textContent = state.stats.currentStreak || 0;
    document.getElementById('totalSessions').textContent = state.stats.totalSessions || 0;
    document.getElementById('correctAnswers').textContent = state.stats.correctAnswers || 0;

    const accuracy = state.stats.totalAnswers > 0
        ? Math.round((state.stats.correctAnswers / state.stats.totalAnswers) * 100)
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';

    // Render calendar
    renderStreakCalendar();
}

function renderStreakCalendar() {
    const container = document.getElementById('calendarGrid');
    if (!container) return;

    container.innerHTML = '';

    // Show last 28 days (4 weeks)
    const today = new Date();
    const studyDates = state.stats.studyDates || [];

    for (let i = 27; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();

        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';

        if (studyDates.includes(dateStr)) {
            dayEl.classList.add('active');
            dayEl.textContent = '🔥';
        } else {
            dayEl.classList.add('dimmed');
            dayEl.textContent = '⚪';
        }

        container.appendChild(dayEl);
    }
}

// Word Lookup Modal
function showWordModal(text) {
    const modal = document.getElementById('wordModal');
    const wordEl = document.getElementById('modalWord');
    const detailsEl = document.getElementById('wordDetails');

    wordEl.textContent = text;
    detailsEl.innerHTML = '<p>正在查询...</p>';

    modal.classList.add('active');

    // Simple mock dictionary (in real app, you'd call an API)
    setTimeout(() => {
        detailsEl.innerHTML = `
            <p><strong>发音：</strong> [示例发音]</p>
            <p><strong>词性：</strong> 动词/名词</p>
            <p><strong>释义：</strong> 示例释义</p>
            <p style="color: #666; font-size: 14px; margin-top: 10px;">提示：点击法语文本可查看详细信息</p>
        `;
    }, 500);
}

// Study Reminder
function setStudyReminder() {
    const time = document.getElementById('reminderTime').value;

    if ('Notification' in window && Notification.permission === 'granted') {
        localStorage.setItem('reminderTime', time);
        alert(`学习提醒已设置为每天 ${time}`);
    } else if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                localStorage.setItem('reminderTime', time);
                alert(`学习提醒已设置为每天 ${time}`);
            }
        });
    } else {
        alert('您的浏览器不支持通知功能');
    }
}

// State Management
function loadState() {
    const saved = localStorage.getItem('francaisAppState');
    if (saved) {
        try {
            Object.assign(state, JSON.parse(saved));
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }
}

function saveState() {
    try {
        localStorage.setItem('francaisAppState', JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
