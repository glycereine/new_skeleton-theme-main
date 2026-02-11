// product card (global) v7:
(function () {
  const SELECTORS = {
    productCard: 'js-product-card',
    productPicture: 'js-product-picture',
    btnSwatch: 'js-btn-swatch',
    isActive: 'is--active',
    isVisible: 'is--visible',
    addToCartBtn: 'js-btn-cart',
  };

  function updateProductCard(newStates, currentCard) {
    const { variantIdData } = newStates;

    const elements = {
      oldVisiblePictureEl: currentCard.querySelector(`.${SELECTORS.productPicture}.${SELECTORS.isVisible}`),
      newVisiblePictureEl: currentCard.querySelector(
        `.${SELECTORS.productPicture}[data-variant-id="${variantIdData}"]`,
      ),
      addToCartBtnEl: currentCard.querySelector(`.${SELECTORS.addToCartBtn}`),
    };

    const { oldVisiblePictureEl, newVisiblePictureEl, addToCartBtnEl } = elements;

    if (oldVisiblePictureEl) {
      oldVisiblePictureEl.classList.remove(SELECTORS.isVisible);
    }

    if (newVisiblePictureEl) {
      newVisiblePictureEl.classList.add(SELECTORS.isVisible);
    }

    if (addToCartBtnEl) {
      addToCartBtnEl.dataset.cartId = variantIdData;
    }
  }

  function handleSwatchClick(currentBtn) {
    const currentCard = currentBtn.closest(`.${SELECTORS.productCard}`);
    if (!currentCard) return;

    const oldActiveBtn = currentCard.querySelector(`.${SELECTORS.btnSwatch}.${SELECTORS.isActive}`);

    if (currentBtn.classList.contains(SELECTORS.isActive) || !oldActiveBtn) return;

    if (oldActiveBtn) {
      oldActiveBtn.classList.remove(SELECTORS.isActive);
    }
    currentBtn.classList.add(SELECTORS.isActive);

    const newStates = {
      variantIdData: currentBtn.dataset.variantId,
    };

    updateProductCard(newStates, currentCard);
  }

  function handleAddToCart(currentAddToCart) {
    const variantIdData = currentAddToCart.dataset.cartId;

    if (variantIdData) {
      let formData = {
        items: [
          {
            id: parseInt(variantIdData),
            quantity: 1,
          },
        ],
      };

      fetchAddToCart(variantIdData, formData, currentAddToCart);
    }
  }

  async function fetchAddToCart(variantIdData, formData, currentAddToCart) {
    if (currentAddToCart.hasAttribute('disabled')) return;
    currentAddToCart.setAttribute('disabled', '');

    try {
      const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`⚠️: ${response.status}, ${data.message}`);

        throw new Error(`⚠️: ${response.status}, ${data.description || data.message}`);
      }

      const successMessage = `✅ ${variantIdData}: Added to cart. Successful: (${response.status})`;
      alert(successMessage);

      console.log('success data:', data);
      console.log('success response:', response);

      return data;
    } catch (error) {
      alert(`❌ catch:  ${error.message}`);
    } finally {
      currentAddToCart.removeAttribute('disabled');
    }
  }

  function initProductCard() {
    document.addEventListener('click', function (event) {
      const currentBtnSwatch = event.target.closest(`.${SELECTORS.btnSwatch}`);
      if (currentBtnSwatch) {
        handleSwatchClick(currentBtnSwatch);
      }
      
      const currentAddToCart = event.target.closest(`.${SELECTORS.addToCartBtn}`);
      if (currentAddToCart) {
        handleAddToCart(currentAddToCart);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    initProductCard();
  });
})();
