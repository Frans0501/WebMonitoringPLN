const loginText = document.querySelector(".title-text .admin");
const loginForm = document.querySelector("form.admin");
const loginBtn = document.querySelector("label.admin");
const signupBtn = document.querySelector("label.user");
const signupLink = document.querySelector("form .user-link a");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
//   loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
//   loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};