import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо елементи форми
const form = document.querySelector(".form");
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

// Обробник сабміту форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Отримуємо значення затримки і обраного стану
  const delay = parseInt(delayInput.value, 10);
  const selectedState = [...stateRadios].find((radio) => radio.checked)?.value;

  if (!selectedState || isNaN(delay)) {
    iziToast.error({
      title: "Error",
      message: "Please provide a valid delay and state.",
      position: "topRight",
    });
    return;
  }

  // Створюємо проміс
  createPromise(delay, selectedState)
    .then((delay) => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Failure",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
