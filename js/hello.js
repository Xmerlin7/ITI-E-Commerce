import { getCurrentUser } from "./auth.js";

const hello = document.getElementById("hello");
if (hello) {
  const user = getCurrentUser();
  if (user?.name) {
    hello.textContent = `Hi, ${user.name}`;
  } else {
    hello.textContent = "";
  }
}
