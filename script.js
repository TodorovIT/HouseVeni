document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger-menu');
  const navMenu = document.getElementById('nav-menu');

  burger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // ТУК добавяме кода за бутона
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  });

  backToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});



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
    
        // Показване/скриване на бутоните
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

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlayImg.src = '';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        overlayImg.src = '';
      }
    });

    nextBtn.addEventListener('click', () => {
      showImage((currentIndex + 1) % images.length);
    });

    prevBtn.addEventListener('click', () => {
      showImage((currentIndex - 1 + images.length) % images.length);
    });

    // по желание: клавиатурна навигация
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'Escape') closeBtn.click();
    });