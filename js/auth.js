const USERS_KEY = "users";
const SESSION_KEY = "session";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  const users = raw ? safeJsonParse(raw, []) : [];
  return Array.isArray(users) ? users : [];
}

export function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  const session = raw ? safeJsonParse(raw, null) : null;
  return session && typeof session === "object" ? session : null;
}

export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session?.email) return null;
  const email = String(session.email).toLowerCase();
  return (
    getUsers().find((u) => String(u.email).toLowerCase() === email) || null
  );
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function isValidPassword(password) {
  // minimal rule: 6+ chars
  return /^.{6,}$/.test(String(password || ""));
}

export function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}
