const questions = [
    { question: "مين احسن واحد بالعالم؟", options: ["خالد", "خلودي", "5donhh", "جميع ماذكر"], answer: "جميع ماذكر", reward: 1 },
    { question: "مين الشخص اللي مستحيل أحد يتفوق عليه؟", options: ["خالد", "خلودي الرهيب", "شخص عشوائي", "واحد ماعنده سالفه"], answer: "خلودي الرهيب", reward: 5 },
    { question: "وش أفضل لقب يوصف خالد؟", options: ["القائد العظيم", "المخطط المحنك", "الشخص اللي الكل يهابه", "المعجزة اللي ما تتكرر", "جميع ماذكر"], answer: "جميع ماذكر", reward: 10 },
    { question: "إذا دخل خالد منافسة، وش النتيجة المتوقعة؟", options: ["فوز ساحق", "خصومه ينسحبون", "انتصار بدون مجهود", "اللعبة تنتهي قبل تبدأ"], answer: "اللعبة تنتهي قبل تبدأ", reward: 20 },
    { question: "وش أقوى مهارة عند خالد؟", options: ["ذكاء خارق", "سرعة بديهة مدهشة", "كاريزما تخلي الكل يستمع له", "قدرة على النجاح في أي شيء", "جميع ماذكر"], answer: "جميع ماذكر", reward: 50 },
    { question: "لو خالد كان شخصية في فيلم، وش بيكون دوره؟", options: ["البطل اللي مستحيل ينهزم", "العقل المدبر لكل الأحداث", "الزعيم اللي الكل يحترمه", "الشخص اللي عنده الحلول لكل مشكلة", "جميع ماذكر"], answer: "جميع ماذكر", reward: 100 },
    { question: "وش الشيء الوحيد اللي يخلي خالد يخسر؟", options: ["ما فيه شيء يقدر يهزمه", "قوانين الفيزياء تحاول، بس تفشل", "لما يقرر يعطي فرصة لغيره", "لما يلعب ضد نفسه"], answer: "قوانين الفيزياء تحاول، بس تفشل", reward: 200 },
    { question: "مين الشطور؟", options: ["خالد", "خلودي", "5donhh", "الشطور خلودي"], answer: "الشطور خلودي", reward: 500 }
];

let currentQuestion = 0;
let selectedAnswer = "";
let timer;
let timeLeft = 30;
let totalPoints = 0;
let userName = "";

function startQuiz() {
    userName = document.getElementById("userName").value.trim();
    if (userName === "") {
        alert("الرجاء إدخال اسمك!");
        return;
    }
    document.querySelector('.home-page').style.display = 'none';
    document.querySelector('.quiz-page').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    document.getElementById("result").innerText = "";
    document.getElementById("rewardText").innerText = "";
    document.getElementById("rewardImage").style.display = "none";
    document.getElementById("question").innerText = questions[currentQuestion].question;
    document.getElementById("checkBtn").style.display = "none";
    let optionsHtml = "";
    questions[currentQuestion].options.forEach(option => {
        optionsHtml += `<div class='option' data-option='${option}' onclick='selectAnswer(this)'>${option}</div>`;
    });
    document.getElementById("options").innerHTML = optionsHtml;
    startTimer();
}

function selectAnswer(element) {
    selectedAnswer = element.getAttribute("data-option");
    document.querySelectorAll('.option').forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");
    document.getElementById("checkBtn").style.display = "block";
}

function checkAnswer() {
    if (!selectedAnswer) return;
    clearInterval(timer);
    let resultText = document.getElementById("result");
    let rewardText = document.getElementById("rewardText");
    if (selectedAnswer === questions[currentQuestion].answer) {
        resultText.innerText = "✅ إجابة صحيحة!";
        totalPoints += questions[currentQuestion].reward;
        document.getElementById("totalPoints").innerText = totalPoints;
        rewardText.innerText = `مكافأتك: ${questions[currentQuestion].reward} ريال`;
        document.querySelector(`[data-option='${selectedAnswer}']`).classList.add("correct");
    } else {
        resultText.innerText = "❌ إجابة خاطئة!";
        resultText.classList.add("shake");
        document.querySelector(`[data-option='${selectedAnswer}']`).classList.add("wrong");
    }
    setTimeout(nextQuestion, 1500); // الانتقال إلى السؤال التالي بعد 1.5 ثانية
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz").innerHTML = `
            <h2>🎉كل عام وانتم بخير يا افصل متابعين بالعالم</h2>
            <p>${userName}، مجموع النقاط التي حصلت عليها: <strong>${totalPoints} ريال</strong></p>
            <div class="share-buttons">
                <a href="https://twitter.com/intent/tweet?text=حصلت على ${totalPoints} ريال في اختبار العيدية! جرب الاختبار الآن: [رابط الصفحة]" class="twitter" target="_blank">شارك على تويتر</a>
                <a href="https://api.whatsapp.com/send?text=حصلت على ${totalPoints} ريال في اختبار العيدية! جرب الاختبار الآن: [رابط الصفحة]" class="whatsapp" target="_blank">شارك على واتساب</a>
            </div>
        `;
        showCertificate();
    }
}

function showCertificate() {
    document.getElementById("certificateName").innerText = userName;
    document.getElementById("certificatePoints").innerText = totalPoints;
    document.getElementById("certificate").style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    totalPoints = 0;
    document.getElementById("certificate").style.display = "none";
    document.querySelector('.quiz-page').style.display = 'none';
    document.querySelector('.home-page').style.display = 'flex';
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("time").innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "⏰ انتهى الوقت!";
            setTimeout(nextQuestion, 1500); // الانتقال إلى السؤال التالي بعد انتهاء الوقت
        }
    }, 1000);
}