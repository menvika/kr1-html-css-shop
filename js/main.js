(function () {
  "use strict";

  var toastTimer = null;
  
  function showToast(message) {
  var toast = document.getElementById("toast");
  var toastText = document.getElementById("toast-text");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 2500);
}

  function initCartButtons() {
  document.querySelectorAll(".cart-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.add("is-added");
      window.setTimeout(function () {
        btn.classList.remove("is-added");
      }, 600);
      var card = btn.closest(".product-card");
      showToast("Товар добавлен в корзину");
    });
  });
}

  function initProductDialog() {
    var dialog = document.getElementById("product-dialog");
    var detailButtons = document.querySelectorAll(
      ".product-card__details, .product-card__button"
    );

    if (!detailButtons.length) return;

    detailButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".product-card");
        if (!card) return;

        if (!dialog || !card.dataset.title) {
          window.location.href = "catalog.html";
          return;
        }

        document.getElementById("product-dialog-title").textContent = card.dataset.title;
        document.getElementById("product-dialog-description").textContent =
          card.dataset.description || "";
        document.getElementById("product-dialog-price").textContent =
          card.dataset.price || "";

        var image = document.getElementById("product-dialog-image");
        if (image) {
          image.src = card.dataset.image || "";
          image.alt = card.dataset.title || "";
        }

        dialog.showModal();
      });
    });

    var closeBtn = document.getElementById("close-product-dialog");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dialog.close();
      });
    }
  }

  function initContactDialog() {
    var dialog = document.getElementById("contact-order-dialog");
    var openBtn = document.getElementById("open-order-dialog");
    var closeBtn = document.getElementById("close-contact-order-dialog");
    var form = document.getElementById("contact-order-form");

    if (!dialog || !openBtn || !form) return;

    openBtn.addEventListener("click", function () {
      dialog.showModal();
    });

    closeBtn.addEventListener("click", function () {
      dialog.close();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      dialog.close();
      form.reset();
      window.alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    });
  }

  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.removeAttribute("open");
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCartButtons();
    initProductDialog();
    initContactDialog();
    initFaq();
  });
})();
