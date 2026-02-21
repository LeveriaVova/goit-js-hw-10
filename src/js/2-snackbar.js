// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDelay = document.querySelector("[name=delay]");
const inputState = document.querySelectorAll("[name=state]");
/* const inputFulfilled = document.querySelector("[name=state][value=fulfilled]");
const inputRejected = document.querySelector("[name=state][value=rejected]"); */

console.log(inputState);

form.addEventListener("submit", handleSubmit)

function handleSubmit(event) {
  event.preventDefault();

  const formDelay = event.target;
  const delay = formDelay.elements.delay.value;
  const state = formDelay.elements.state.value;  

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
       
          resolve(delay);
      } else if (state === "rejected") {
        
          reject(delay);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        title: "Hey",
        message: `✅ Fulfilled promise in ${value}ms`,
      })
    })
    .catch(error => {
      iziToast.show({
        title: "Hey",
        message: `❌ Rejected promise in ${error}ms`,
      })
    })

};

