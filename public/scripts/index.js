import { login, register, getUserRole, updateUserRole } from "./auth.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

const showRegisterBtn = document.getElementById("showRegister");
const showLoginBtn = document.getElementById("showLogin");

showRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  try {
    const userCredential = await login(email, password);
    const user = userCredential.user;

    if (email === "admin123@gmail.com") {
      await updateUserRole(user.uid, "admin");
      window.location.href = "admin.html";
    } else {
      const role = await getUserRole(user.uid);
      window.location.href = role === "admin" ? "admin.html" : "dashboard.html";
    }
  } catch (error) {
    loginMessage.textContent = getFriendlyErrorMessage(error.code);
    loginMessage.className = "message error";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;
  const confirmPassword = document.getElementById("regPassConfirm").value;

  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";
    registerMessage.className = "message error";
    return;
  }

  try {
    await register(email, password);
    registerMessage.textContent = "Registration successful! You can now log in.";
    registerMessage.className = "message success";
    registerForm.reset();
  } catch (error) {
    registerMessage.textContent = getFriendlyErrorMessage(error.code);
    registerMessage.className = "message error";
  }
});

function getFriendlyErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please log in.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    default:
      console.error(errorCode);
      return "An unexpected error occurred. Please try again.";
  }
}