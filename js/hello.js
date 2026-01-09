import { clearSession, getCurrentUser, getSession } from "./auth.js";

const hello = document.getElementById("hello");
if (hello) {
  const user = getCurrentUser();
  if (user?.name) {
    hello.textContent = `Hi, ${user.name}`;
  } else {
    hello.textContent = "";
  }
}

const authLink = document.getElementById("authLink");
if (authLink) {
  const session = getSession();

  if (session?.email) {
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      window.location.href = "index.html";
    });
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
  }
}
