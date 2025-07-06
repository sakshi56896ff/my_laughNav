document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "map.html";
    });
  }
});


