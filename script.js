function checkPassword() {
    let password = document.getElementById("password").value;

    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("Use at least 8 characters");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Add uppercase letter");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("Add lowercase letter");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("Include a number");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("Include a special character");

    let oldPasswords = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    if (oldPasswords.includes(password)) {
        feedback.push("You have already used this password");
        score = 1;
    }

    let fill = document.getElementById("strength-fill");
    fill.className = "";

    let strength = "";

    if (password.length === 0) {
        document.getElementById("result").innerText = "";
        document.getElementById("feedback").innerHTML = "";
        fill.style.width = "0%";
        return;
    }

    if (score <= 2) {
        strength = "Weak";
        fill.style.width = "33%";
        fill.classList.add("weak");
    } else if (score <= 4) {
        strength = "Medium";
        fill.style.width = "66%";
        fill.classList.add("medium");
    } else {
        strength = "Strong";
        fill.style.width = "100%";
        fill.classList.add("strong");
    }

    let resultText = document.getElementById("result");
    resultText.innerText = "Strength: " + strength;

    if (strength === "Weak") resultText.style.color = "#d93025";
    else if (strength === "Medium") resultText.style.color = "#f9ab00";
    else resultText.style.color = "#188038";

    let feedbackList = document.getElementById("feedback");
    feedbackList.innerHTML = "";

    feedback.forEach(f => {
        let li = document.createElement("li");
        li.innerText = f;
        feedbackList.appendChild(li);
    });
}

function togglePassword() {
    let input = document.getElementById("password");
    let icon = document.getElementById("eyeIcon");

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = `<path d="M1 1l22 22"/>`;
    } else {
        input.type = "password";
        icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}

function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    let oldPasswords = JSON.parse(localStorage.getItem("passwordHistory")) || [];

    do {
        password = "";
        for (let i = 0; i < 12; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
    } while (oldPasswords.includes(password));

    oldPasswords.push(password);

    if (oldPasswords.length > 5) {
        oldPasswords.shift();
    }

    localStorage.setItem("passwordHistory", JSON.stringify(oldPasswords));

    document.getElementById("password").value = password;
    checkPassword();
}