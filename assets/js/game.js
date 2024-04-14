document.addEventListener("DOMContentLoaded", function() {
  const openPopupButton = document.querySelector("#open-popup");
  if (openPopupButton) {
      openPopupButton.addEventListener("click", function() {
          document.body.classList.add("active-popup");
      });
  }

  const closePopupButton = document.querySelector(".popup .close-btn");
  if (closePopupButton) {
      closePopupButton.addEventListener("click", function() {
          document.body.classList.remove("active-popup");
      });
  }
});
