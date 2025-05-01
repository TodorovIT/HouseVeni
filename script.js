


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

  // Валидатор за телефон
  const phonePattern = /^[0-9]{10}$/; // Телефон с точно 10 цифри
  function validatePhone(phone) {
    return phonePattern.test(phone) ? "" : "Телефонът трябва да съдържа точно 10 цифри.";
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
