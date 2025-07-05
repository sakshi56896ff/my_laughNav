document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "../mainpage/indexm.html";
    });
  }
});


