const normalizeProductName = (value) => value.trim().toLowerCase();
const productDialog = document.getElementById('product-dialog');
const closeProductDialogButton = document.getElementById('close-product-dialog');
const productDialogImage = document.getElementById('product-dialog-image');
const productDialogTitle = document.getElementById('product-dialog-title');
const productDialogDescription = document.getElementById('product-dialog-description');
const productDialogPrice = document.getElementById('product-dialog-price');
const productDialogOrderButton = document.getElementById('product-dialog-order');

const detailButtons = document.querySelectorAll('.product-card__details');

detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    if (!card || !productDialog || !productDialogImage || !productDialogTitle || !productDialogDescription || !productDialogPrice || !productDialogOrderButton) {
      return;
    }

    const title = card.dataset.title || card.querySelector('h3')?.textContent?.trim() || 'Букет';
    const description = card.dataset.description || card.querySelector('p')?.textContent?.trim() || '';
    const price = card.dataset.price || card.querySelector('.product-price')?.textContent?.trim() || 'Цена по запросу';
    const image = card.dataset.image || card.querySelector('img')?.src || '';

    productDialogTitle.textContent = title;
    productDialogDescription.textContent = description;
    productDialogPrice.textContent = price;
    productDialogImage.src = image;
    productDialogImage.alt = title;
    productDialogOrderButton.dataset.product = title;
    productDialog.showModal();
  });
});

if (closeProductDialogButton && productDialog) {
  closeProductDialogButton.addEventListener('click', () => {
    productDialog.close();
  });
}

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderButtons.length) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product || 'Букет';
      window.location.href = `catalog.html?product=${encodeURIComponent(productName)}`;
    });
  });
}

document.querySelectorAll('.cart-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

if (productDialogOrderButton) {
  productDialogOrderButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (productDialog) {
      productDialog.close();
    }
  });
}

const productParam = new URLSearchParams(window.location.search).get('product');
if (document.body.dataset.page === 'catalog') {
  const cards = document.querySelectorAll('.product-card');
  const currentProduct = cards
    .find((card) => normalizeProductName(card.dataset.title || card.querySelector('h3')?.textContent || '') === normalizeProductName(productParam || ''));

  if (currentProduct) {
    currentProduct.classList.add('product-card--selected');
  }

  const productBreadcrumb = document.getElementById('breadcrumbs-product');
  const productSeparator = document.getElementById('breadcrumbs-product-separator');

  if (productParam && productBreadcrumb && productSeparator) {
    productBreadcrumb.textContent = productParam;
    productBreadcrumb.hidden = false;
    productSeparator.hidden = false;
  }
}

if (window.location.pathname.toLowerCase().endsWith('contacts.html')) {
  const contactProductInput = document.getElementById('selected-product');
  const contactProductField = document.getElementById('contact-product');
  const contactForm = document.getElementById('contact-order-form');
  const openOrderDialogButton = document.getElementById('open-order-dialog');
  const contactOrderDialog = document.getElementById('contact-order-dialog');
  const closeContactOrderDialogButton = document.getElementById('close-contact-order-dialog');
  const modalSelectedProductInput = document.getElementById('modal-selected-product');
  const modalProductField = document.getElementById('modal-order-product');

  if (productParam && contactProductInput) {
    contactProductInput.value = productParam;
  }

  if (contactProductField) {
    if (productParam) {
      contactProductField.value = productParam;
    } else {
      contactProductField.value = 'Не выбран';
    }
  }

  if (modalSelectedProductInput && modalProductField) {
    const selectedProductValue = productParam || contactProductField?.value || 'Не выбран';
    modalSelectedProductInput.value = selectedProductValue;
    modalProductField.value = selectedProductValue;
  }

  if (openOrderDialogButton && contactOrderDialog && modalSelectedProductInput && modalProductField) {
    openOrderDialogButton.addEventListener('click', () => {
      const selectedProductValue = productParam || contactProductField?.value || 'Не выбран';
      modalSelectedProductInput.value = selectedProductValue;
      modalProductField.value = selectedProductValue;
      contactOrderDialog.showModal();
    });
  }

  if (closeContactOrderDialogButton && contactOrderDialog) {
    closeContactOrderDialogButton.addEventListener('click', () => {
      contactOrderDialog.close();
    });
  }

  const contactModalForm = document.getElementById('contact-order-form-modal');
  if (contactModalForm) {
    contactModalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formElements = Array.from(contactModalForm.elements);
      formElements.forEach((element) => {
        if (element.willValidate) {
          element.removeAttribute('aria-invalid');
        }
      });

      if (!contactModalForm.checkValidity()) {
        formElements.forEach((element) => {
          if (element.willValidate && !element.checkValidity()) {
            element.setAttribute('aria-invalid', 'true');
          }
        });

        contactModalForm.reportValidity();
        return;
      }

      alert('Заявка отправлена!');
      contactModalForm.reset();
      if (contactOrderDialog) {
        contactOrderDialog.close();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formElements = Array.from(contactForm.elements);
      formElements.forEach((element) => {
        if (element.willValidate) {
          element.removeAttribute('aria-invalid');
        }
      });

      if (!contactForm.checkValidity()) {
        formElements.forEach((element) => {
          if (element.willValidate && !element.checkValidity()) {
            element.setAttribute('aria-invalid', 'true');
          }
        });

        contactForm.reportValidity();
        return;
      }

      alert('Заявка отправлена!');
      contactForm.reset();
      if (contactProductField) {
        contactProductField.value = productParam || 'Не выбран';
      }
    });
  }
}

const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    alert('Заявка отправлена!');
    orderForm.reset();
    if (orderDialog) {
      orderDialog.close();
    }
  });
}
