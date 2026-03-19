// ============================================================
//  VIBE CHECK MACHINE — index.js
//  We will write ALL of this together during the lecture!
// ============================================================

// SESSION 1 ─── Data & Types
// We'll define: questions (const), score (let), currentIndex (let)

let score = 0;
let currentIndex = 0;
let selectChoice = null;

const questions = [
  {
    text: "🌅 It's Saturday morning. What are you doing?",

    choices: [
      { label: "Still in bed. Obviously.", points: 0 },
      { label: "Making an elaborate breakfast.", points: 1 },
      { label: "Already at the gym.", points: 2 },
      { label: "Reorganising my bookshelf.", points: 3 },
    ],
  },
  {
    text: "📱 Your phone battery hits 10%. You...",

    choices: [
      { label: "Panic immediately.", points: 0 },
      { label: "Calmly find a charger.", points: 1 },
      { label: "Enable low power mode & carry on.", points: 2 },
      { label: "Don't notice. It dies.", points: 3 },
    ],
  },

  {
    text: "🍕 You ordered pizza but got the wrong one. You...",

    choices: [
      { label: "Eat it anyway. Food is food.", points: 0 },
      { label: "Call and complain politely.", points: 1 },
      { label: "Leave a very detailed review.", points: 2 },
      { label: "Blog about it.", points: 3 },
    ],
  },

  {
    text: "🎶 Your go-to study soundtrack?",

    choices: [
      { label: "Complete silence.", points: 0 },
      { label: "Lo-fi beats.", points: 1 },
      { label: "Full movie soundtracks.", points: 2 },
      { label: "Chaos. Anything loud.", points: 3 },
    ],
  },

  {
    text: "🌈 Pick a vibe for your ideal weekend trip:",

    choices: [
      { label: "Cozy cabin in the mountains.", points: 0 },
      { label: "Busy city with a packed itinerary.", points: 1 },
      { label: "Beach — no plans, just vibes.", points: 2 },
      { label: "Fictional universe. I need options.", points: 3 },
    ],
  },
];
// SESSION 2 ─── Traditional Functions
// We'll write: startQuiz(), showQuestion(), selectChoice()

// const btnstart = document.getElementById("start-btn")

function startQuiz() {
  score = 0;
  currentIndex = 0;
  selectChoice = null;

  switchScreen("screen-start", "screen-quiz");
  showQuestion();
}

function switchScreen(hideId, showId) {
  (document.getElementById(hideId).classList.add("hidden"),
    document.getElementById(showId).classList.remove("hidden"));
}

function showQuestion() {
  const question = questions[currentIndex];
  console.log(question);

  const progresspercent = ((currentIndex + 1) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = progresspercent + "%";
  const qcounterelement = document.getElementById("question-counter");
  qcounterelement.textContent =
    "Question " + (currentIndex + 1) + " of " + questions.length;

  const qText = document.getElementById("question-text");
  const qChoices = document.getElementById("choices-container");

  qText.textContent = question.text;
  qChoices.innerHTML = "";
  selectChoice = null;

  const labels = ["A", "B", "C", "D"];

  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class = "choice-tag"> ${labels[i]}</span>${choice.label}`;
    btn.addEventListener("click", function () {
      selectedChoice(btn, choice.points);
    });

    qChoices.appendChild(btn);
  }
}

function selectedChoice(btn, points) {
  const allchoices = document.querySelectorAll(".choice-btn");
  allchoices.forEach(function (abtnn) {
    abtnn.classList.remove("selected");
  });

  btn.classList.add("selected");
  selectChoice = points;

  score += selectChoice;
  currentIndex += 1;

  if (currentIndex < questions.length) showQuestion();
  else showResult();
}

function showResult(){
const result1=   ComputeVibe(score);
document.getElementById("result-emoji").textContent=result1.emoji;
document.getElementById("result-title").textContent=result1.title;
document.getElementById("result-desc").textContent=result1.desc;

switchScreen("screen-quiz","screen-result")

}

function ComputeVibe(totalscore) {
  if (totalscore <= 3)
    return {
      emoji: "🛋️",
      title: "The Cozy Sloth",
      desc: "Comfort is your superpower. You know exactly what you like and you protect your peace fiercely. Zero apologies.",
    };
  else if (totalscore <= 6)
    return {
      emoji: "🌿",
      title: "The Balanced Sage",
      desc: "You have this rare gift of going with the flow without losing yourself. People love being around you.",
    };
  else if (totalscore <= 9)
    return {
      emoji: "⚡",
      title: "The Chaotic Star",
      desc: "You run on spontaneity and vibes. Every day is an adventure. Your energy is contagious — and exhausting (lovingly).",
    };
  else if (totalscore > 9)
    return {
      emoji: "🚀",
      title: "The Galaxy Brain",
      desc: "Your thoughts move faster than your words. You're always three steps ahead. Maybe slow down? No? Fair.",
    };
}

function restart(){
  switchScreen("screen-result", "screen-start")
}

// SESSION 3 ─── Arrow Functions
// We'll refactor helpers and write: showResult(), restart()

// SESSION 4 ─── `this` intuition
// We'll build a QuizMaster object and discover the arrow vs
// traditional function difference the hard way
