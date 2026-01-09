import {
  getUsers,
  setSession,
  normalizeEmail,
  isValidEmail,
  isValidPassword,
  downloadUsersJson,
  importUsersJsonFile,
} from "./auth.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("loginError");
const exportBtn = document.getElementById("exportUsersBtn");
const importFile = document.getElementById("importUsersFile");

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
  const email = normalizeEmail(fd.get("email"));
  const password = String(fd.get("password") || "");

  if (!isValidEmail(email)) {
    showError("Please enter a valid email");
    return;
  }

  if (!isValidPassword(password)) {
    showError("Password must be at least 6 characters");
    return;
  }

  const users = getUsers();
  const user = users.find(
    (u) =>
      normalizeEmail(u?.email) === email &&
      String(u?.password || "") === password
  );

  if (!user) {
    showError("Email or password is wrong. You can register below.");
    return;
  }

  setSession({ email });
  window.location.href = "index.html";
});

exportBtn?.addEventListener("click", () => {
  downloadUsersJson("users.json");
});

importFile?.addEventListener("change", async () => {
  clearError();
  try {
    const file = importFile.files?.[0];
    const count = await importUsersJsonFile(file);
    showError(`Imported ${count} users. You can login now.`);
  } catch (err) {
    showError(err?.message || "Import failed");
  } finally {
    importFile.value = "";
  }
});
