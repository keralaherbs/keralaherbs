document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksMenu = document.getElementById('nav-links-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = navLinksMenu.classList.toggle('active');
      
      // Force solid white background and dark text dynamically to bypass any caching
      if (isActive) {
        navLinksMenu.style.setProperty('background-color', '#ffffff', 'important');
        navLinksMenu.style.setProperty('background', '#ffffff', 'important');
        navLinksMenu.style.setProperty('opacity', '1', 'important');
        navLinksMenu.style.setProperty('visibility', 'visible', 'important');
        
        navLinks.forEach(link => {
          link.style.setProperty('color', '#1e293b', 'important');
        });
      } else {
        navLinksMenu.style.removeProperty('background-color');
        navLinksMenu.style.removeProperty('background');
        navLinksMenu.style.removeProperty('opacity');
        navLinksMenu.style.removeProperty('visibility');
        
        navLinks.forEach(link => {
          link.style.removeProperty('color');
        });
      }
      
      // Animate hamburger menu lines
      const spans = menuToggle.querySelectorAll('span');
      if (isActive) {
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
        
        // Reset dynamic styles
        navLinksMenu.style.removeProperty('background-color');
        navLinksMenu.style.removeProperty('background');
        navLinksMenu.style.removeProperty('opacity');
        navLinksMenu.style.removeProperty('visibility');
        
        navLinks.forEach(link => {
          link.style.removeProperty('color');
        });
        
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
  // 1b. Hero Slider Control
  // ==========================================
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  let currentSlideIndex = 0;
  let slideInterval;

  if (slides.length > 0) {
    // Generate navigation dots dynamically
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlideTimer();
      });
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (index + slides.length) % slides.length;
      slides[currentSlideIndex].classList.add('active');
      updateDots();
    };

    const nextSlide = () => {
      goToSlide(currentSlideIndex + 1);
    };

    const prevSlide = () => {
      goToSlide(currentSlideIndex - 1);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideTimer();
      });
    }

    // Auto rotate slides
    const startSlideTimer = () => {
      slideInterval = setInterval(nextSlide, 6000);
    };

    const resetSlideTimer = () => {
      clearInterval(slideInterval);
      startSlideTimer();
    };

    startSlideTimer();

    // CTA triggers from slides to filter tabs
    const filterTriggers = document.querySelectorAll('.js-filter-trigger');
    filterTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const filterVal = trigger.getAttribute('data-filter');
        const targetBtn = document.querySelector(`.filter-btn[data-category="${filterVal}"]`);
        if (targetBtn) {
          targetBtn.click();
          const productsSection = document.getElementById('products');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

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

  // ==========================================
  // 4. Modal WhatsApp Order Form
  // ==========================================
  const orderModal = document.getElementById('orderModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const orderForm = document.getElementById('orderForm');
  
  const modalProductName = document.getElementById('modalProductName');
  const modalTargetNumber = document.getElementById('modalTargetNumber');
  const modalProductOption = document.getElementById('modalProductOption');
  const modalOptionContainer = document.getElementById('modalOptionContainer');
  const modalQuantity = document.getElementById('modalQuantity');
  const customerName = document.getElementById('customerName');
  const customerPhone = document.getElementById('customerPhone');
  const customerAddress = document.getElementById('customerAddress');

  if (orderModal) {
    // Intercept click on any button with order-trigger class
    document.querySelectorAll('.order-trigger').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const product = button.getAttribute('data-product');
        const number = button.getAttribute('data-number');
        const optionsString = button.getAttribute('data-options');
        
        if (modalProductName) modalProductName.value = product;
        if (modalTargetNumber) modalTargetNumber.value = number;
        
        // Clear previous options
        if (modalProductOption) {
          modalProductOption.innerHTML = '';
          if (optionsString) {
            const options = optionsString.split(',');
            options.forEach(opt => {
              const el = document.createElement('option');
              el.value = opt.trim();
              el.textContent = opt.trim();
              modalProductOption.appendChild(el);
            });
            if (modalOptionContainer) modalOptionContainer.style.display = 'block';
          } else {
            if (modalOptionContainer) modalOptionContainer.style.display = 'none';
          }
        }
        
        // Open modal
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    // Close on clicking overlay background
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    // Submit and redirect to WhatsApp
    if (orderForm) {
      orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const product = modalProductName.value;
        const number = modalTargetNumber.value;
        const quantity = modalQuantity.value;
        const option = modalProductOption && modalProductOption.value ? ` (${modalProductOption.value})` : '';
        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();
        const address = customerAddress.value.trim();
        
        const textMessage = `🌿 NEW ORDER - KERALA HERBS 🌿
---------------------------------
Product: ${product}${option}
Quantity: ${quantity}

CUSTOMER DETAILS:
Name: ${name}
Phone: ${phone}
Delivery Address:
${address}
---------------------------------
Please confirm my order and share payment details. Thank you!`;
        
        const encodedText = encodeURIComponent(textMessage);
        const whatsappUrl = `https://wa.me/${number}?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank');
        
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
        orderForm.reset();
      });
    }
  }
});
