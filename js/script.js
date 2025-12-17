// ===== Trivia Clothing JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnnouncementSlider();
    initHeroSlider();
    initProductSlider();
    initSearch();
    initMobileNav();
    initMegaMenu();
    initWishlist();
    initNewsletterForm();
    initSmoothScroll();
    initScrollAnimations();
});

// ===== Announcement Bar Slider =====
function initAnnouncementSlider() {
    const slides = document.querySelectorAll('.announcement-slide');
    const prevBtn = document.querySelector('.announcement-nav.prev');
    const nextBtn = document.querySelector('.announcement-nav.next');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    startAutoSlide();
}

// ===== Hero Slider =====
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const dotsContainer = document.querySelector('.hero-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
            resetAutoSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
            resetAutoSlide();
        }
    }

    startAutoSlide();
}

// ===== Products Slider =====
function initProductSlider() {
    const slider = document.querySelector('.products-slider');
    if (!slider) return;

    const track = slider.querySelector('.products-track');
    const cards = track.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentPosition = 0;
    const cardWidth = cards[0].offsetWidth + 20; // including gap
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    const maxPosition = -(cards.length - visibleCards) * cardWidth;

    function updateSlider() {
        track.style.transform = `translateX(${currentPosition}px)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPosition = Math.min(currentPosition + cardWidth * 2, 0);
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - cardWidth * 2, maxPosition);
            updateSlider();
        });
    }

    // Touch support
    let isDragging = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX;
        scrollLeft = currentPosition;
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
    });

    track.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 1.5;
        currentPosition = Math.min(0, Math.max(maxPosition, scrollLeft + walk));
        updateSlider();
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
        const newVisibleCards = Math.floor(slider.offsetWidth / cardWidth);
        const newMaxPosition = -(cards.length - newVisibleCards) * cardWidth;
        currentPosition = Math.min(0, Math.max(newMaxPosition, currentPosition));
        updateSlider();
    });
}

// ===== Search Functionality =====
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    if (!searchBtn || !searchOverlay) return;

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Search form submission
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `collection.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}

// ===== Mobile Navigation =====
function initMobileNav() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const submenuToggles = document.querySelectorAll('.mobile-nav-list .has-submenu > a');

    if (!menuToggle || !mobileNav) return;

    function openMobileNav() {
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);
    mobileNavOverlay.addEventListener('click', closeMobileNav);

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.preventDefault();
            const parent = toggle.parentElement;
            parent.classList.toggle('open');
        });
    });
}

// ===== Mega Menu =====
function initMegaMenu() {
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');

    navItems.forEach(item => {
        const megaMenu = item.querySelector('.mega-menu');
        const dropdownMenu = item.querySelector('.dropdown-menu');

        if (megaMenu || dropdownMenu) {
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
            });
        }
    });
}

// ===== Wishlist Functionality =====
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    let wishlist = JSON.parse(localStorage.getItem('trivia_wishlist')) || [];

    function updateWishlistCount() {
        const badges = document.querySelectorAll('.icon-link .badge');
        badges.forEach(badge => {
            if (badge.closest('.icon-link').getAttribute('aria-label') === 'Wishlist') {
                badge.textContent = wishlist.length;
            }
        });
    }

    wishlistBtns.forEach(btn => {
        const productCard = btn.closest('.product-card');
        if (!productCard) return;

        const productId = productCard.dataset.productId || Math.random().toString(36).substr(2, 9);
        productCard.dataset.productId = productId;

        // Check if already in wishlist
        if (wishlist.includes(productId)) {
            btn.classList.add('active');
            btn.querySelector('i').classList.remove('far');
            btn.querySelector('i').classList.add('fas');
        }

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                if (!wishlist.includes(productId)) {
                    wishlist.push(productId);
                }
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                wishlist = wishlist.filter(id => id !== productId);
            }

            localStorage.setItem('trivia_wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
        });
    });

    updateWishlistCount();
}

// ===== Newsletter Form =====
function initNewsletterForm() {
    const forms = document.querySelectorAll('#newsletterForm, .footer-newsletter');

    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const email = input.value.trim();

            if (validateEmail(email)) {
                // Simulate form submission
                alert('Thank you for subscribing! You\'ll receive our latest updates soon.');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.product-card, .blog-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS class for animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== Cart Functionality =====
const cart = {
    items: JSON.parse(localStorage.getItem('trivia_cart')) || [],
    
    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && item.size === product.size
        );
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        
        this.save();
        this.updateUI();
    },
    
    removeItem(productId, size) {
        this.items = this.items.filter(item => 
            !(item.id === productId && item.size === size)
        );
        this.save();
        this.updateUI();
    },
    
    updateQuantity(productId, size, quantity) {
        const item = this.items.find(item => 
            item.id === productId && item.size === size
        );
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId, size);
            } else {
                this.save();
                this.updateUI();
            }
        }
    },
    
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    save() {
        localStorage.setItem('trivia_cart', JSON.stringify(this.items));
    },
    
    updateUI() {
        const badges = document.querySelectorAll('.icon-link .badge');
        badges.forEach(badge => {
            if (badge.closest('.icon-link').getAttribute('aria-label') === 'Cart') {
                badge.textContent = this.getCount();
            }
        });
    }
};

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateUI();
});

// ===== Filter Functionality (for collection page) =====
function initFilters() {
    const filterGroups = document.querySelectorAll('.filter-group');
    
    filterGroups.forEach(group => {
        const header = group.querySelector('h4');
        if (header) {
            header.addEventListener('click', () => {
                group.classList.toggle('open');
            });
        }
    });
}

// ===== Size Selector (for product page) =====
function initSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option:not(.disabled)');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// ===== Product Gallery (for product page) =====
function initProductGallery() {
    const thumbs = document.querySelectorAll('.thumb-item');
    const mainImage = document.querySelector('.gallery-main img');
    
    if (!thumbs.length || !mainImage) return;
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.querySelector('img').src;
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== Sticky Header =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ===== Product Quick View Modal =====
function openQuickView(productId) {
    // This would typically fetch product data and show a modal
    console.log('Quick view for product:', productId);
}

// ===== Initialize Page-Specific Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if on collection page
    if (document.querySelector('.filters-sidebar')) {
        initFilters();
    }
    
    // Check if on product page
    if (document.querySelector('.product-gallery')) {
        initProductGallery();
        initSizeSelector();
    }
    
    initLazyLoading();
});

// ===== Utility Functions =====
function formatPrice(price) {
    return '₹ ' + price.toLocaleString('en-IN');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
