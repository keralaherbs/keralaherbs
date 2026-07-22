document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksMenu = document.getElementById('nav-links-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      
      // Animate hamburger menu lines
      const spans = menuToggle.querySelectorAll('span');
      if (navLinksMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Active Link on Scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, footer');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Product Category Filtering
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Dynamic animation transition
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // matches transition time
        }
      });
    });
  });

  // ==========================================
  // 3. Floating WhatsApp Support Popup Widget
  // ==========================================
  const waWidget = document.getElementById('whatsapp-widget');
  const waBtnToggle = document.getElementById('wa-btn-toggle');
  const waPopupPanel = document.getElementById('wa-popup-panel');
  const waPopupCloseBtn = document.getElementById('wa-popup-close-btn');
  const waBadge = document.getElementById('wa-badge');
  const chatTimeStamp = document.getElementById('chat-time-stamp');

  // Set real-time timestamp for the WhatsApp chat message
  const setChatTime = () => {
    if (chatTimeStamp) {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      
      // Pad single digits with zero
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      
      chatTimeStamp.textContent = `${hours}:${minutes}`;
    }
  };
  setChatTime();

  if (waBtnToggle && waPopupPanel) {
    // Toggle popup visibility on clicking the green circular button
    waBtnToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = waPopupPanel.classList.toggle('active');
      
      // Hide red notification dot when opened
      if (isActive && waBadge) {
        waBadge.style.display = 'none';
      }
    });

    // Close popup on clicking the header X button
    if (waPopupCloseBtn) {
      waPopupCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waPopupPanel.classList.remove('active');
      });
    }

    // Close popup when clicking anywhere else on the screen
    document.addEventListener('click', (e) => {
      if (!waWidget.contains(e.target)) {
        waPopupPanel.classList.remove('active');
      }
    });

    // Prevent closing when clicking inside the popup panel
    waPopupPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Auto-popup after 3 seconds delay to catch attention (if not already opened/interacted)
    setTimeout(() => {
      if (!waPopupPanel.classList.contains('active')) {
        waPopupPanel.classList.add('active');
        // Hide red notification dot since it popped up
        if (waBadge) {
          waBadge.style.display = 'none';
        }
      }
    }, 3000);
  }
});
