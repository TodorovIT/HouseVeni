


document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-menu');
  const navMenu = document.getElementById('nav-menu');
  const backToTopButton = document.getElementById('back-to-top');

  // Показване/скриване на бургер менюто
  burger.addEventListener('click', function (event) {
      event.stopPropagation(); // предотвратява затварянето при самото цъкане
      navMenu.classList.toggle('active');
  });

  // Скриване на менюто при клик или плъзгане извън него
  document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
          navMenu.classList.remove('active');
      }
  });

  document.addEventListener('touchstart', function (event) {
      if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
          navMenu.classList.remove('active');
      }
  });

  // Scroll поведение на бутона
  window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Показване на бутона, ако е скролнато над 300px
      if (scrollTop > 300) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }

      // Ако сме на дъното на страницата — правим бутона полупрозрачен
      if (scrollTop + windowHeight >= fullHeight - 33) {
          backToTopButton.style.opacity = '0.3';
      } else {
          backToTopButton.style.opacity = '1';
      }
  });

  // Скролване към горе при натискане
  backToTopButton.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  

  // ================= Галерия (ако имаш такава) =================
  const images = Array.from(document.querySelectorAll('.gallery img'));
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const closeBtn = document.getElementById('closeBtn');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  let currentIndex = 0;

  function showImage(index) {
      if (index >= 0 && index < images.length) {
          currentIndex = index;
          overlayImg.src = images[currentIndex].src;
          overlayImg.classList.remove('fade-in');
          void overlayImg.offsetWidth;
          overlayImg.classList.add('fade-in');

          prevBtn.style.display = (currentIndex === 0) ? 'none' : 'block';
          nextBtn.style.display = (currentIndex === images.length - 1) ? 'none' : 'block';
      }
  }

  images.forEach((img, index) => {
      img.addEventListener('click', () => {
          showImage(index);
          overlay.classList.add('active');
      });
  });

  closeBtn?.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlayImg.src = '';
  });

  overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
          overlay.classList.remove('active');
          overlayImg.src = '';
      }
  });

  nextBtn?.addEventListener('click', () => {
      showImage((currentIndex + 1) % images.length);
  });

  prevBtn?.addEventListener('click', () => {
      showImage((currentIndex - 1 + images.length) % images.length);
  });

  document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'Escape') closeBtn.click();
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');

  // Валидация на името
  function validateName(name) {
    const namePattern = /^[a-zA-Zа-яА-Я]+( [a-zA-Zа-яА-Я]+)*$/; // Позволява само букви и интервали между имената
    if (name.length < 2) {
      return "Името трябва да съдържа поне 2 знака.";
    }
    if (name.length > 50) {
      return "Името не трябва да бъде по-дълго от 50 знака.";
    }
    if (!namePattern.test(name)) {
      return "Името може да съдържа само букви и интервали.";
    }
    return "";
  }

  // Валидатор за имейл
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return "Моля, въведете валиден имейл адрес.";
    }
    return "";
  }


  // Превенция на букви при въвеждане на телефон
  phoneInput.addEventListener('input', function (e) {
    // Отстраняваме всичко, което не е цифра
    this.value = this.value.replace(/\D/g, '');
    
    // Ако има повече от 10 цифри, спираме въвеждането
    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
    }
  });

  // Валидация при въвеждане в полето за имейл
  emailInput.addEventListener('input', function () {
    const email = emailInput.value.trim();
    const errorMessage = validateEmail(email);
    if (errorMessage) {
      emailError.textContent = errorMessage;
      emailError.style.display = 'block';
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
    }
  });

  // Валидация при въвеждане в полето за име
  nameInput.addEventListener('input', function () {
    const name = nameInput.value.trim();
    const errorMessage = validateName(name);
    if (errorMessage) {
      nameError.textContent = errorMessage;
      nameError.style.display = 'block';
    } else {
      nameError.textContent = '';
      nameError.style.display = 'none';
    }
  });

  // Валидация при изпращане на формата
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    const nameErrorMessage = validateName(name);
    const emailErrorMessage = validateEmail(email);
    const phoneErrorMessage = validatePhone(phone);

    // Проверка за грешки
    if (nameErrorMessage) {
      nameError.textContent = nameErrorMessage;
      nameError.style.display = 'block';
    } else {
      nameError.textContent = '';
      nameError.style.display = 'none';
    }

    if (emailErrorMessage) {
      emailError.textContent = emailErrorMessage;
      emailError.style.display = 'block';
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
    }

    if (phoneErrorMessage) {
      phoneError.textContent = phoneErrorMessage;
      phoneError.style.display = 'block';
    } else {
      phoneError.textContent = '';
      phoneError.style.display = 'none';
    }

    // Ако всички проверки са успешни, изпращаме формата
    if (!nameErrorMessage && !emailErrorMessage && !phoneErrorMessage) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Изпраща се...";

      // Симулира изпращане
      setTimeout(() => {
        form.reset();
        successMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = "Изпрати";

        // Скриване на съобщението след 4 сек.
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 4000);
      }, 2000);
    }
  });
});








document.addEventListener('DOMContentLoaded', function () {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const closeBtn = document.getElementById('closeBtn');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  let currentIndex = 0;

  let scale = 1;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function updateTransform() {
    overlayImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
  }

  function resetTransform(animated = true) {
    if (animated) {
      overlayImg.style.transition = 'transform 0.3s ease';
    } else {
      overlayImg.style.transition = 'none';
    }
    scale = 1;
    currentX = 0;
    currentY = 0;
    updateTransform();
    if (animated) {
      // Премахваме transition след края му
      overlayImg.addEventListener('transitionend', function handler() {
        overlayImg.style.transition = 'none';
        overlayImg.removeEventListener('transitionend', handler);
      });
    }
  }

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      currentIndex = index;
      overlayImg.src = images[currentIndex].src;
      overlay.classList.add('active');

      resetTransform(false);

      prevBtn.style.display = (currentIndex === 0) ? 'none' : 'block';
      nextBtn.style.display = (currentIndex === images.length - 1) ? 'none' : 'block';

      // Блокираме скрола на body, докато overlay е отворен
      document.body.style.overflow = 'hidden';
    }
  }

  function closeOverlay() {
    overlay.classList.remove('active');
    overlayImg.src = '';
    resetTransform(false);
    // Възстановяваме скрола на body
    document.body.style.overflow = '';
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      showImage(index);
    });
  });

  closeBtn?.addEventListener('click', () => {
    closeOverlay();
  });

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  nextBtn?.addEventListener('click', () => {
    showImage((currentIndex + 1) % images.length);
  });

  prevBtn?.addEventListener('click', () => {
    showImage((currentIndex - 1 + images.length) % images.length);
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  });

  // --- Драг с мишка ---

  overlayImg.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    dragStartX = e.clientX - currentX;
    dragStartY = e.clientY - currentY;
    overlayImg.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    overlayImg.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.clientX - dragStartX;
    currentY = e.clientY - dragStartY;
    updateTransform();
  });

  // --- Драг с пръст (за телефони) ---

  let lastTouchX = 0;
  let lastTouchY = 0;
  let isTouchDragging = false;

  overlayImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isTouchDragging = true;
      lastTouchX = e.touches[0].clientX - currentX;
      lastTouchY = e.touches[0].clientY - currentY;
    }
  }, { passive: false });

  overlayImg.addEventListener('touchmove', (e) => {
    if (!isTouchDragging) return;
    if (e.touches.length !== 1) return;
    e.preventDefault();
    currentX = e.touches[0].clientX - lastTouchX;
    currentY = e.touches[0].clientY - lastTouchY;
    updateTransform();
  }, { passive: false });

  overlayImg.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
      isTouchDragging = false;
    }
  });

  // --- Zoom с колелце и с пинч (пръсти) ---

  // Колелце за zoom компютър
  overlay.addEventListener('wheel', (e) => {
    e.preventDefault();

    const zoomIntensity = 0.1;
    const delta = -e.deltaY || e.wheelDelta;

    let prevScale = scale;

    if (delta > 0) {
      scale += zoomIntensity;
    } else {
      scale -= zoomIntensity;
      if (scale < 1) {
        scale = 1;
      }
    }
    scale = Math.min(Math.max(1, scale), 5);

    // Плавно приближаваме към центъра при zoom out
    if (scale < prevScale) {
      const approachFactor = 0.2;
      currentX = currentX - currentX * approachFactor;
      currentY = currentY - currentY * approachFactor;
    }

    updateTransform();
  }, { passive: false });

  // Пинч за zoom телефон
  let initialPinchDistance = null;
  let initialScale = 1;

  overlay.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
    }
  }, { passive: false });

  overlay.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      let newScale = initialScale * (currentDistance / initialPinchDistance);

      newScale = Math.min(Math.max(1, newScale), 5);

      // При zoom out плавно приближаваме към центъра
      if (newScale < scale) {
        const approachFactor = 0.2;
        currentX = currentX - currentX * approachFactor;
        currentY = currentY - currentY * approachFactor;
      }

      scale = newScale;
      updateTransform();
    }
  }, { passive: false });

  overlay.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialPinchDistance = null;
    }
  });

  function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
});
