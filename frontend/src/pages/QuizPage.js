import React, { useState } from 'react';

const QUESTIONS_BANK = [
  // === PERCENTAGE ===
  {
    category: "Percentage",
    difficulty: "easy",
    question: "If a number is increased by 20%, it becomes 72. What was the original number?",
    correct_answer: "60",
    incorrect_answers: ["50", "55", "65"],
    explanation: "Let original = x. 1.2x = 72 ⇒ x = 72 / 1.2 = 60."
  },
  {
    category: "Percentage",
    difficulty: "medium",
    question: "What is 30% of 250?",
    correct_answer: "75",
    incorrect_answers: ["65", "80", "70"],
    explanation: "30% of 250 = (30/100) × 250 = 75."
  },
  {
    category: "Percentage",
    difficulty: "hard",
    question: "The population of a town increased from 1,75,000 to 2,62,500 in a decade. What is the average percent increase per year?",
    correct_answer: "5%",
    incorrect_answers: ["4%", "6%", "7%"],
    explanation: "Total increase = 87,500. % increase = (87500/175000)×100 = 50% over 10 years ⇒ 5% per year."
  },

  // === TIME & WORK ===
  {
    category: "Time & Work",
    difficulty: "easy",
    question: "A can complete a work in 10 days and B in 15 days. If they work together, how many days will they take?",
    correct_answer: "6",
    incorrect_answers: ["5", "7", "8"],
    explanation: "A's 1-day work = 1/10, B's = 1/15. Combined = 1/10 + 1/15 = (3+2)/30 = 1/6 ⇒ 6 days."
  },
  {
    category: "Time & Work",
    difficulty: "medium",
    question: "P and Q can do a job in 12 days. Q alone can finish it in 30 days. In how many days can P alone finish the job?",
    correct_answer: "20",
    incorrect_answers: ["18", "24", "15"],
    explanation: "(P+Q) = 1/12, Q = 1/30 ⇒ P = 1/12 - 1/30 = (5-2)/60 = 3/60 = 1/20 ⇒ 20 days."
  },
  {
    category: "Time & Work",
    difficulty: "hard",
    question: "A can do a piece of work in 12 days, B in 20 days. C is twice as efficient as B. How many days will A, B and C working together take to finish the work?",
    correct_answer: "30/7 days (approx 4.29)",
    incorrect_answers: ["5 days", "4 days", "6 days"],
    explanation: "A:1/12, B:1/20, C = 2*(1/20)=1/10. Sum = 1/12+1/20+1/10 = (5+3+6)/60 =14/60=7/30 ⇒ time = 30/7 ≈ 4.29 days."
  },

  // === PROFIT & LOSS ===
  {
    category: "Profit & Loss",
    difficulty: "easy",
    question: "If an item is sold at ₹450 with a profit of 20%, what was the cost price?",
    correct_answer: "₹375",
    incorrect_answers: ["₹360", "₹400", "₹420"],
    explanation: "Let CP = x. Selling price = x + 20% of x = 1.2x = 450 ⇒ x = 450 / 1.2 = 375."
  },
  {
    category: "Profit & Loss",
    difficulty: "medium",
    question: "A trader marks his goods 25% above cost price and allows 10% discount on marked price. Find his profit percentage.",
    correct_answer: "12.5%",
    incorrect_answers: ["10%", "15%", "7.5%"],
    explanation: "Let CP=100 ⇒ MP = 125. Selling price = 125 - 12.5 = 112.5 ⇒ Profit = 12.5 on 100 ⇒ 12.5%."
  },
  {
    category: "Profit & Loss",
    difficulty: "hard",
    question: "A shopkeeper sells two watches for ₹1000 each, one at a profit of 10% and the other at a loss of 10%. What is his overall profit or loss?",
    correct_answer: "1% loss",
    incorrect_answers: ["No profit no loss", "1% profit", "2% loss"],
    explanation: "When SP is same and profit% = loss%, there is always a loss of (x²/100)% = (10²/100) = 1% loss."
  },

  // === RATIO & PROPORTION ===
  {
    category: "Ratio & Proportion",
    difficulty: "easy",
    question: "Divide 240 in the ratio 3:5. What is the larger part?",
    correct_answer: "150",
    incorrect_answers: ["90", "120", "160"],
    explanation: "Total parts = 3+5 =8. Larger part = (5/8)*240 = 150."
  },
  {
    category: "Ratio & Proportion",
    difficulty: "medium",
    question: "If a:b = 3:4 and b:c = 2:5, what is a:c?",
    correct_answer: "3:10",
    incorrect_answers: ["6:20", "3:8", "5:12"],
    explanation: "From a:b =3:4 and b:c=2:5 ⇒ scale b to common value: b = LCM(4,2)=4. So m=2. Then c = 5m =10 and a =3k where k=1 ⇒ a:c =3:10."
  },
  {
    category: "Ratio & Proportion",
    difficulty: "hard",
    question: "The ratio of incomes of A and B is 5:4 and the ratio of their expenditures is 3:2. If each saves ₹1000, what is A’s income?",
    correct_answer: "₹2500",
    incorrect_answers: ["₹2000", "₹3000", "₹1500"],
    explanation: "Let income = 5x, 4x; expenditure = 3y, 2y. Then 5x - 3y = 1000, 4x - 2y = 1000. Solving: x=500 ⇒ A’s income = 5×500 = ₹2500."
  },

  // === SIMPLE INTEREST ===
  {
    category: "Simple Interest",
    difficulty: "easy",
    question: "What is the simple interest on ₹2000 at 5% per annum for 2 years?",
    correct_answer: "₹200",
    incorrect_answers: ["₹150", "₹250", "₹180"],
    explanation: "SI = (P×R×T)/100 = (2000×5×2)/100 = 200."
  },
  {
    category: "Simple Interest",
    difficulty: "medium",
    question: "What is the simple interest on ₹5000 at 5% per annum for 3 years?",
    correct_answer: "₹750",
    incorrect_answers: ["₹650", "₹800", "₹700"],
    explanation: "SI = (5000×5×3)/100 = 750."
  },
  {
    category: "Simple Interest",
    difficulty: "hard",
    question: "A sum of money becomes ₹1200 in 2 years and ₹1320 in 4 years at simple interest. What is the principal?",
    correct_answer: "₹1080",
    incorrect_answers: ["₹1000", "₹1100", "₹1150"],
    explanation: "Interest for 2 years = 1320 - 1200 = ₹120 ⇒ per year = ₹60. So in 2 years, interest = ₹120. Principal = 1200 - 120 = ₹1080."
  },

  // === ALGEBRA ===
  {
    category: "Algebra",
    difficulty: "easy",
    question: "If 3x + 5 = 20, find x.",
    correct_answer: "5",
    incorrect_answers: ["4", "6", "7"],
    explanation: "3x = 15 ⇒ x = 5."
  },
  {
    category: "Algebra",
    difficulty: "medium",
    question: "Solve for x: 2(x + 3) = 16",
    correct_answer: "5",
    incorrect_answers: ["4", "6", "7"],
    explanation: "2x + 6 = 16 ⇒ 2x = 10 ⇒ x = 5."
  },
  {
    category: "Algebra",
    difficulty: "hard",
    question: "If x + 1/x = 5, find x² + 1/x².",
    correct_answer: "23",
    incorrect_answers: ["25", "20", "24"],
    explanation: "(x + 1/x)² = x² + 2 + 1/x² = 25 ⇒ x² + 1/x² = 25 - 2 = 23."
  },

  // === TIME, SPEED & DISTANCE ===
  {
    category: "Time, Speed & Distance",
    difficulty: "easy",
    question: "A train runs at 60 km/hr. How long will it take to cover 150 km?",
    correct_answer: "2.5 hours",
    incorrect_answers: ["2 hours", "3 hours", "2 hours 45 minutes"],
    explanation: "Time = distance / speed = 150 / 60 = 2.5 hours = 2 hours 30 minutes."
  },
  {
    category: "Time, Speed & Distance",
    difficulty: "medium",
    question: "A car covers 400 km in 5 hours. What is its average speed?",
    correct_answer: "80 km/h",
    incorrect_answers: ["70 km/h", "85 km/h", "75 km/h"],
    explanation: "Speed = Distance / Time = 400 / 5 = 80 km/h."
  },
  {
    category: "Time, Speed & Distance",
    difficulty: "hard",
    question: "A cyclist covers 36 km at uniform speed. If speed had been 4 km/h more, he'd have taken 1 hour less. Find his speed.",
    correct_answer: "12 km/h",
    incorrect_answers: ["9 km/h", "10 km/h", "15 km/h"],
    explanation: "Let speed = v. Time = 36/v. With v+4, time = 36/(v+4). Given 36/v - 36/(v+4) = 1 ⇒ 36*4/(v(v+4))=1 ⇒ 144 = v² + 4v ⇒ v = 12 (positive root)."
  }
];

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getNextDifficulty = (current, isCorrect) => {
  const levels = ['easy', 'medium', 'hard'];
  const idx = levels.indexOf(current);
  if (isCorrect) {
    return idx < 2 ? levels[idx + 1] : 'hard';
  } else {
    return idx > 0 ? levels[idx - 1] : 'easy';
  }
};

const AptitudeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('setup');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [amount, setAmount] = useState(10);
  const [adaptiveMode, setAdaptiveMode] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [topicStats, setTopicStats] = useState({});
  const [isAdaptive, setIsAdaptive] = useState(false);
  const [questionsTarget, setQuestionsTarget] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());
  const [currentAdaptiveDifficulty, setCurrentAdaptiveDifficulty] = useState('medium');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const loadNextAdaptiveQuestion = () => {
    const candidates = QUESTIONS_BANK.filter(q => {
      if (topic && q.category !== topic) return false;
      return q.difficulty === currentAdaptiveDifficulty;
    });

    const fallback = topic
      ? QUESTIONS_BANK.filter(q => q.category === topic)
      : [...QUESTIONS_BANK];

    const pool = candidates.length > 0 ? candidates : fallback;
    const unused = pool.filter(q => !usedQuestionIds.has(q.question));
    const finalPool = unused.length > 0 ? unused : pool;

    const randomIndex = Math.floor(Math.random() * finalPool.length);
    const question = finalPool[randomIndex];

    const newUsed = new Set(usedQuestionIds);
    newUsed.add(question.question);
    setUsedQuestionIds(newUsed);

    setTopicStats(prev => ({
      ...prev,
      [question.category]: {
        correct: prev[question.category]?.correct || 0,
        total: (prev[question.category]?.total || 0) + 1
      }
    }));

    const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
    setShuffledAnswers(answers);

    return question;
  };

  const startQuiz = () => {
    const filtered = QUESTIONS_BANK.filter(q => {
      if (topic && q.category !== topic) return false;
      if (!adaptiveMode && difficulty && q.difficulty !== difficulty) return false;
      return true;
    });

    let finalQuestions = filtered;
    if (filtered.length < amount) {
      const fallback = QUESTIONS_BANK.filter(q => {
        if (topic && q.category !== topic) return false;
        return true;
      });
      finalQuestions = fallback;
    }

    if (finalQuestions.length === 0) {
      alert('No questions available. Try different filters.');
      return;
    }

    const initialTopicStats = {};
    if (!adaptiveMode) {
      finalQuestions.forEach(q => {
        if (!initialTopicStats[q.category]) initialTopicStats[q.category] = { correct: 0, total: 0 };
        initialTopicStats[q.category].total++;
      });
    }

    setFilteredQuestions(finalQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTopicStats(initialTopicStats);
    setQuestionsTarget(amount);
    setIsAdaptive(adaptiveMode);
    setQuestionsAsked(0);
    setUsedQuestionIds(new Set());

    if (adaptiveMode) {
      const startDiff = difficulty || 'medium';
      setCurrentAdaptiveDifficulty(startDiff);
      const firstQ = loadNextAdaptiveQuestion();
      setCurrentQuestion(firstQ);
    } else {
      const firstQ = finalQuestions[0];
      setCurrentQuestion(firstQ);
      setShuffledAnswers(shuffleArray([...firstQ.incorrect_answers, firstQ.correct_answer]));
    }

    setCurrentScreen('quiz');
  };

  const handleAnswer = (chosen, questionObj) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(chosen);

    const isCorrect = chosen === questionObj.correct_answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setTopicStats(prev => ({
        ...prev,
        [questionObj.category]: {
          ...prev[questionObj.category],
          correct: (prev[questionObj.category]?.correct || 0) + 1
        }
      }));
    }

    if (isAdaptive) {
      const nextDiff = getNextDifficulty(currentAdaptiveDifficulty, isCorrect);
      setCurrentAdaptiveDifficulty(nextDiff);
    }
  };

  const nextQuestion = () => {
    if (isAdaptive) {
      if (questionsAsked + 1 < questionsTarget) {
        setQuestionsAsked(prev => prev + 1);
        setSelectedAnswer(null);
        const nextQ = loadNextAdaptiveQuestion();
        setCurrentQuestion(nextQ);
      } else {
        showResults();
      }
    } else {
      if (currentIndex < filteredQuestions.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextQ = filteredQuestions[nextIndex];
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setCurrentQuestion(nextQ);
        setShuffledAnswers(shuffleArray([...nextQ.incorrect_answers, nextQ.correct_answer]));
      } else {
        showResults();
      }
    }
  };

  const showResults = () => {
    setCurrentScreen('results');
  };

  const restartSame = () => {
    setCurrentIndex(0);
    setScore(0);
    setTopicStats({});
    setQuestionsAsked(0);
    setUsedQuestionIds(new Set());
    if (isAdaptive) {
      const startDiff = difficulty || 'medium';
      setCurrentAdaptiveDifficulty(startDiff);
      const firstQ = loadNextAdaptiveQuestion();
      setCurrentQuestion(firstQ);
    } else {
      const firstQ = filteredQuestions[0];
      setCurrentQuestion(firstQ);
      setShuffledAnswers(shuffleArray([...firstQ.incorrect_answers, firstQ.correct_answer]));
    }
    setCurrentScreen('quiz');
  };

  const getResourcesForTopic = (topic) => {
    const resources = {
      "Percentage": [
        { title: "Khan Academy — Percent", url: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic/percent-word-problems" },
        { title: "Practice Problems — Percentage (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/percentage/" }
      ],
      "Time & Work": [
        { title: "Time & Work Theory (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/time-and-work/" },
        { title: "YouTube — Time & Work tutorials", url: "https://www.youtube.com/results?search_query=time+and+work+problems" }
      ],
      "Profit & Loss": [
        { title: "Profit & Loss (IndiaBIX)", url: "https://www.indiabix.com/aptitude/profit-and-loss/" },
        { title: "GeeksforGeeks — Profit & Loss", url: "https://www.geeksforgeeks.org/profit-and-loss/" }
      ],
      "Time, Speed & Distance": [
        { title: "Time Speed Distance (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/time-speed-and-distance/" }
      ],
      "Ratio & Proportion": [
        { title: "Ratio and Proportion (Khan Academy)", url: "https://www.khanacademy.org/math/arithmetic/arith-review-ratios-prop" }
      ],
      "Simple Interest": [
        { title: "Simple Interest (Cuemath)", url: "https://www.cuemath.com/interest/simple-interest/" }
      ],
      "Algebra": [
        { title: "Algebra basics (Khan Academy)", url: "https://www.khanacademy.org/math/algebra" }
      ]
    };
    return resources[topic] || [{ title: "General Aptitude Practice", url: "https://www.geeksforgeeks.org/aptitude/" }];
  };

  const renderQuestion = () => {
    if (!currentQuestion) return React.createElement('div', null, 'Loading...');

    const isAnswered = selectedAnswer !== null;

    const answerElements = shuffledAnswers.map((answer, index) => {
      let className = "answer";
      if (isAnswered) {
        if (answer === currentQuestion.correct_answer) className += " correct";
        else if (answer === selectedAnswer) className += " incorrect";
      }
      return React.createElement(
        'button',
        {
          key: index,
          className: className,
          onClick: () => !isAnswered && handleAnswer(answer, currentQuestion),
          disabled: isAnswered,
          dangerouslySetInnerHTML: { __html: answer }
        }
      );
    });

    return React.createElement(
      'div',
      { className: 'question-card' },
      React.createElement(
        'div',
        { className: 'question-header' },
        React.createElement('span', { className: 'category' }, currentQuestion.category),
        React.createElement('span', { className: `difficulty ${currentQuestion.difficulty}` }, 
          currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)
        )
      ),
      React.createElement('div', { 
        className: 'question', 
        dangerouslySetInnerHTML: { __html: currentQuestion.question } 
      }),
      React.createElement('div', { className: 'answers' }, answerElements),
      isAnswered && React.createElement(
        'div',
        { className: 'explanation' },
        React.createElement('strong', null, 'Explanation:'),
        ' ' + currentQuestion.explanation
      ),
      isAnswered && React.createElement(
        'button',
        { className: 'btn', onClick: nextQuestion },
        ((isAdaptive && questionsAsked + 1 >= questionsTarget) ||
          (!isAdaptive && currentIndex === filteredQuestions.length - 1))
          ? 'View Results' : 'Next'
      )
    );
  };

  const renderResults = () => {
  const total = isAdaptive ? questionsTarget : filteredQuestions.length;
  const incorrect = total - score;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  let performanceMessage = '';
  if (accuracy >= 90) performanceMessage = '🏆 Outstanding! Keep up the excellent work!';
  else if (accuracy >= 75) performanceMessage = '🎯 Great job! A bit more practice and you\'re perfect.';
  else if (accuracy >= 50) performanceMessage = '👍 Good effort! Focus on weak topics below.';
  else performanceMessage = '📚 Keep practicing — review the suggested resources below.';

  // 🔥 Show ALL weak topics (no limit)
  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => (stats.correct || 0) / stats.total < 0.7)
    .map(([topic]) => topic);

  const resourceElements = weakTopics.map(topic => {
    const resources = getResourcesForTopic(topic);
    const links = resources.map((res, idx) =>
      React.createElement(
        'div',
        { key: idx },
        React.createElement('a', { href: res.url.trim(), target: '_blank', rel: 'noopener noreferrer' }, res.title.trim())
      )
    );
    return React.createElement(
      'div',
      { key: topic, className: 'resource-item' },
      React.createElement('h4', null, topic),
      ...links
    );
  });

  const topicStatElements = Object.entries(topicStats).map(([topic, stats]) => {
    const topicAccuracy = Math.round(((stats.correct || 0) / stats.total) * 100);
    return React.createElement(
      'div',
      { key: topic, className: 'topic-stat' },
      React.createElement('span', { className: 'topic-name' }, topic),
      React.createElement('span', { className: 'topic-accuracy' }, `${topicAccuracy}%`)
    );
  });

  return React.createElement(
    'div',
    { className: 'results-card' },
    React.createElement('h2', null, 'Quiz Results'),
    React.createElement(
      'div',
      { className: 'score-summary' },
      React.createElement('div', { className: 'final-score' }, `${score} / ${total}`),
      React.createElement('div', { className: 'performance-message' }, performanceMessage),
      React.createElement(
        'div',
        { className: 'stats' },
        React.createElement(
          'div',
          { className: 'stat' },
          React.createElement('span', { className: 'stat-value' }, score),
          React.createElement('span', { className: 'stat-label' }, 'Correct')
        ),
        React.createElement(
          'div',
          { className: 'stat' },
          React.createElement('span', { className: 'stat-value' }, incorrect),
          React.createElement('span', { className: 'stat-label' }, 'Incorrect')
        ),
        React.createElement(
          'div',
          { className: 'stat' },
          React.createElement('span', { className: 'stat-value' }, `${accuracy}%`),
          React.createElement('span', { className: 'stat-label' }, 'Accuracy')
        )
      )
    ),
    // 🔥 Horizontal layout: Performance (left) | Resources (right)
    React.createElement(
      'div',
      { className: 'results-horizontal' },
      React.createElement(
        'div',
        { className: 'topic-performance' },
        React.createElement('h3', null, 'Topic-wise Performance'),
        ...topicStatElements
      ),
      weakTopics.length > 0
        ? React.createElement(
            'div',
            { className: 'resources-section' },
            React.createElement('h3', null, 'Recommended Resources'),
            React.createElement('div', { className: 'resources-grid' }, ...resourceElements)
          )
        : React.createElement('div', { className: 'resources-section' }, 
            React.createElement('p', null, '✅ Excellent! No weak topics found.')
          )
    ),
    React.createElement(
  'div',
  { className: 'results-actions' },
  React.createElement('button', { className: 'btn retry-btn', onClick: restartSame }, 'Try Again'),
  React.createElement('button', { 
    className: 'btn home-btn', 
    onClick: () => {
      // 🔥 Navigate to the actual home page of your project
      window.location.href = '/';
    } 
  }, 'Back to Home')
)
  );
};

  const renderSetup = () => {
    const topicOptions = [
      { value: "", label: "All Topics" },
      { value: "Percentage", label: "Percentage" },
      { value: "Time & Work", label: "Time & Work" },
      { value: "Profit & Loss", label: "Profit & Loss" },
      { value: "Time, Speed & Distance", label: "Time, Speed & Distance" },
      { value: "Ratio & Proportion", label: "Ratio & Proportion" },
      { value: "Simple Interest", label: "Simple Interest" },
      { value: "Algebra", label: "Algebra" }
    ].map(opt =>
      React.createElement('option', { key: opt.value, value: opt.value }, opt.label)
    );

    const difficultyOptions = [
      { value: "", label: "All Levels" },
      { value: "easy", label: "Easy" },
      { value: "medium", label: "Medium" },
      { value: "hard", label: "Hard" }
    ].map(opt =>
      React.createElement('option', { key: opt.value, value: opt.value }, opt.label)
    );

    const amountOptions = [5, 10, 15, 20].map(val =>
      React.createElement('option', { key: val, value: val }, `${val} Questions`)
    );

    return React.createElement(
      'div',
      { className: 'setup-screen active' },
      React.createElement(
        'h1',
        { className: 'logo' },
        React.createElement('img', {
          src: "https://cdn-icons-png.flaticon.com/512/2702/2702069.png",
          alt: "Book Logo",
          className: "logo-book"
        }),
        " Aptitude Quiz"
      ),
      React.createElement('p', null, 'Test your quantitative aptitude skills with this adaptive quiz system.'),
      React.createElement(
        'div',
        { className: 'setup-options' },
        React.createElement(
          'div',
          { className: 'control-group' },
          React.createElement('label', { htmlFor: 'topic' }, 'Topic:'),
          React.createElement(
            'select',
            {
              id: 'topic',
              value: topic,
              onChange: (e) => setTopic(e.target.value)
            },
            ...topicOptions
          )
        ),
        React.createElement(
          'div',
          { className: 'control-group' },
          React.createElement('label', { htmlFor: 'difficulty' }, 'Difficulty:'),
          React.createElement(
            'select',
            {
              id: 'difficulty',
              value: difficulty,
              onChange: (e) => setDifficulty(e.target.value)
            },
            ...difficultyOptions
          )
        ),
        React.createElement(
          'div',
          { className: 'control-group' },
          React.createElement('label', { htmlFor: 'amount' }, 'Number of Questions:'),
          React.createElement(
            'select',
            {
              id: 'amount',
              value: amount,
              onChange: (e) => setAmount(parseInt(e.target.value))
            },
            ...amountOptions
          )
        ),
        React.createElement(
          'div',
          { className: 'control-group checkbox-group' },
          React.createElement('label', { htmlFor: 'adaptiveMode' },
            React.createElement('input', {
  type: 'checkbox',
  id: 'adaptiveMode',
  checked: adaptiveMode,
  onChange: (e) => setAdaptiveMode(e.target.checked),
  style: { width: '20px', height: '20px', marginRight: '10px' } // 🔥 Larger checkbox
}),
            ' Enable Adaptive Learning Mode'
          )
        )
      ),
      React.createElement('button', { className: 'btn start-btn', onClick: startQuiz }, 'Start Quiz')
    );
  };

  const renderQuizHeader = () => {
    const total = isAdaptive ? questionsTarget : filteredQuestions.length;
    const current = isAdaptive ? Math.min(questionsAsked + 1, total) : (currentIndex + 1);
    const progress = total > 0 ? ((isAdaptive ? questionsAsked : currentIndex) / total) * 100 : 0;

    return React.createElement(
      'div',
      { className: 'quiz-header' },
      React.createElement('span', { className: 'question-counter' }, `Question ${current} of ${total}`),
      React.createElement('span', { className: 'score' }, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'progress-bar' },
        React.createElement('div', { className: 'progress', style: { width: `${progress}%` } })
      )
    );
  };

  let content = null;
  if (currentScreen === 'setup') {
    content = renderSetup();
  } else if (currentScreen === 'quiz') {
    content = React.createElement(
      'div',
      { className: 'quiz-screen active' },
      renderQuizHeader(),
      renderQuestion()
    );
  } else if (currentScreen === 'results') {
    content = React.createElement('div', { className: 'results-screen active' }, renderResults());
  }

  const globalStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: 
        linear-gradient(rgba(25, 62, 56, 0.88), rgba(43, 240, 200, 0.92)),
        url('https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85') center/cover no-repeat;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      overflow-x: hidden;
    }

    .container {
      max-width: 1050px;
      width: 94%;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
      padding: 48px;
      text-align: center;
      margin: 0 auto;
    }

    /* 🔥 Wider setup screen */
    .container:has(.setup-screen.active) {
  max-width: 1800px !important;
  padding-left: 80px !important;
  padding-right: 80px !important;
}
    .logo {
      font-size: 2.6rem;
      font-weight: 800;
      margin-bottom: 24px;
      background: linear-gradient(45deg, #ffcc00, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }

    .setup-screen, .quiz-screen, .results-screen { display: none; }
    .setup-screen.active, .quiz-screen.active, .results-screen.active { display: block; }

    .setup-options {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 30px;
    }

    .control-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.28);
      padding: 18px 28px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.12);
      gap: 20px;
    }

    .checkbox-group {
      justify-content: flex-start;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
      color: #f8f8f8;
    }

    .control-group label {
      flex: 1;
      text-align: left;
      font-weight: 600;
      color: #f8f8f8;
      font-size: 1.05rem;
    }

    select, input {
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255,255,255,0.22);
      color:black;
      padding: 12px 16px;
      border-radius: 12px;
      min-width: 180px;
      font-size: 1.05rem;
    }

    .btn {
      background: linear-gradient(45deg, #ffcc00, #00d4ff);
      border: none;
      border-radius: 16px;
      padding: 14px 28px;
      color: #0a0a1a;
      font-weight: 800;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 20px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      gap:20px;
    }

    .start-btn {
      margin-top: 40px;
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 212, 255, 0.45);
    }

    /* Quiz & Results Styles */
    .quiz-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.32);
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.12);
    }

    .question-card {
      background: rgba(0, 0, 0, 0.28);
      border-radius: 18px;
      padding: 30px;
      min-height: 260px;
      border: 1px solid rgba(255,255,255,0.12);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
    }

    .category {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 22px;
      font-size: 14px;
      font-weight: 800;
      background: linear-gradient(45deg, #ffcc00, #00d4ff);
      color: #0f0f1f;
      margin-bottom: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .difficulty {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 18px;
      font-size: 13px;
      font-weight: 800;
      margin-left: 16px;
      color: #fff;
    }

    .difficulty.easy { background: rgba(50, 200, 120, 0.92); }
    .difficulty.medium { background: rgba(255, 165, 0, 0.92); }
    .difficulty.hard { background: rgba(255, 70, 70, 0.92); }

    .question {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 20px;
      line-height: 1.45;
      color: #f0f0ff;
    }

    .answers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-top: 12px;
    }

    .answer {
      background: rgba(10, 10, 20, 0.45);
      padding: 16px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.18);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.25s ease;
      text-align: left;
      font-size: 1.05rem;
      color: #f5f5ff;
    }

    .answer:hover {
      transform: translateY(-4px);
      background: rgba(30, 30, 50, 0.6);
      border-color: rgba(255,255,255,0.35);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .answer.correct {
      background: rgba(50, 200, 120, 0.55);
      border-color: rgba(50, 200, 120, 0.8);
      color: #000;
    }

    .answer.incorrect {
      background: rgba(255, 70, 70, 0.55);
      border-color: rgba(255, 70, 70, 0.8);
      color: #000;
    }

    .explanation {
      margin-top: 20px;
      background: rgba(0, 0, 0, 0.38);
      padding: 18px;
      border-radius: 12px;
      text-align: left;
      line-height: 1.55;
      font-size: 1.02rem;
      color: #e0e0ff;
    }

    .explanation strong {
      display: block;
      margin-bottom: 8px;
      color: #ffcc00;
      font-size: 1.15rem;
    }

        .results-card {
      background: rgba(0, 0, 0, 0.28);
      padding: 24px;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.12);
    }

    .final-score {
      font-size: 3rem;
      font-weight: 900;
      background: linear-gradient(45deg, #ffcc00, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 12px 0;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
    }

    .stat {
      background: rgba(0, 0, 0, 0.35);
      padding: 14px 18px;
      border-radius: 12px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.4rem;
      font-weight: 800;
      color: #00d4ff;
      display: block;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* 🔥 HORIZONTAL LAYOUT FOR RESULTS */
    .results-horizontal {
      display: flex;
      gap: 30px;
      margin-top: 24px;
    }

    .topic-performance, .resources-section {
      flex: 1;
      background: rgba(0, 0, 0, 0.3);
      padding: 16px;
      border-radius: 14px;
      text-align: left;
    }

    .topic-performance h3, .resources-section h3 {
      text-align: center;
      margin-bottom: 12px;
      font-size: 1.2rem;
    }

    .topic-stat {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      margin: 6px 0;
      font-size: 0.95rem;
    }

    .resources-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .resource-item {
      background: rgba(255, 204, 0, 0.15);
      padding: 12px;
      border-radius: 10px;
    }

    .resource-item h4 {
      margin-bottom: 6px;
      color: white;
      font-size: 1.05rem;
    }

    .resource-item a {
      color: #98f107ff;
      text-decoration: none;
      font-size: 0.95rem;
      display: block;
      margin: 2px 0;
    }

    .resource-item a:hover {
      text-decoration: underline;
    }

    .results-actions {
  margin-top: 32px;
  display: flex;
  gap: 24px; /* 🔥 Adds space between buttons */
  justify-content: center;
}

    @media (max-width: 900px) {
      .results-horizontal {
        flex-direction: column;
      }
    }

    .logo-book {
      width: 68px;
      height: 68px;
      vertical-align: middle;
      margin-right: 16px;
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
    }
      .btn retry-btn{
      padding:10px 20px;
      }
      .btn home-btn{
      margin-left:30px;
      }
  `;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'page' },
      React.createElement('div', { className: 'container' }, content)
    ),
    React.createElement(
      'style',
      { dangerouslySetInnerHTML: { __html: globalStyles } }
    )
  );
};

export default AptitudeApp;