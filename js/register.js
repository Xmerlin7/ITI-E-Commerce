import {
  getUsers,
  setUsers,
  setSession,
  normalizeEmail,
  isValidEmail,
  isValidPassword,
} from "./auth.js";

const form = document.getElementById("registerForm");
const errorEl = document.getElementById("registerError");

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.textContent = "";
  errorEl.hidden = true;
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const fd = new FormData(form);
  const name = String(fd.get("name") || "").trim();
  const email = normalizeEmail(fd.get("email"));
  const password = String(fd.get("password") || "");

  if (!name) {
    showError("Name is required");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email");
    return;
  }

  if (!isValidPassword(password)) {
    showError("Password must be at least 6 characters");
    return;
  }

  const users = getUsers();
  const exists = users.some((u) => normalizeEmail(u?.email) === email);
  if (exists) {
    showError("Email already registered. Please login.");
    return;
  }

  users.push({ name, email, password });
  setUsers(users);
  setSession({ email });
  window.location.href = "index.html";
});
