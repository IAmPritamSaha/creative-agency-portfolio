const nav = document.getElementById('nav');
const checkbox = document.querySelector('.hamburger input');

checkbox.addEventListener('change', () => {
    nav.classList.toggle('active', checkbox.checked);
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        checkbox.checked = false;
    });
});


      // ================= HERO TYPEWRITER =================
const slogans = [
  "Capture Moments. Create Magic.",
  "Where Art Meets Photography.",
  "Transforming Vision Into Reality.",
  "Your Story, Beautifully Told.",
  "Excellence In Every Frame.",
  "Creating Timeless Memories."
];

const heroTextElement = document.getElementById("heroText");

let sloganIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = slogans[sloganIndex];

  if (!isDeleting) {
    charIndex++;
    heroTextElement.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      // Pause at end
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 150);
  } else {
    charIndex--;
    heroTextElement.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      sloganIndex = (sloganIndex + 1) % slogans.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 25);
  }
}
window.__SITE_LOCK__ = {
    key: "Pritam",
    alive: true,
    ts: Date.now()
};

(function () {

    // PART-1 dependency check
    if (!window.__SITE_LOCK__ || !window.__SITE_LOCK__.alive) {
        hardKill("Lock missing");
        return;
    }

    const EXPECTED = window.__SITE_LOCK__.key;
    const designer = document.getElementById("designer");

    // If designer line is deleted
    if (!designer) {
        hardKill("Designer removed");
        return;
    }

    function hardKill(reason) {
        console.error("SITE LOCKED:", reason);

        // Stop scrolling permanently
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        // Freeze page
        const blocker = document.createElement("div");
        blocker.style.cssText = `
            position:fixed;
            inset:0;
            background:#000;
            color:#f00;
            font-size:22px;
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:999999;
        `;
        blocker.innerText = "⚠ Website Locked: Unauthorized Entry";
        document.body.appendChild(blocker);

        // Continuous break
        setInterval(() => {
            debugger;
            console.warn("Website locked");
        }, 500);
    }

    // Initial validation
    if (designer.textContent.trim() !== EXPECTED) {
        hardKill("Name changed");
        return;
    }

    // Live tamper detection
    const observer = new MutationObserver(() => {
        if (
            !document.getElementById("designer") ||
            designer.textContent.trim() !== EXPECTED
        ) {
            hardKill("Live tampering detected");
        }
    });

    observer.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true
    });

})();

// Start typing after page load
if (heroTextElement) {
  typeLoop();
}


        // Portfolio filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
   

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
        // Smooth scroll animation for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // ================= Lightbox (Portfolio Preview) =================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCat = document.getElementById('lightboxCat');

function openLightbox({ src, title, category }) {
    if (!lightbox) return;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Project Preview';
    if (lightboxCat) lightboxCat.textContent = category || 'Portfolio';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    // Close actions
    if (e.target.closest('[data-close="true"]')) {
        closeLightbox();
    }
});

// Esc to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});



// ================= Portfolio V2 (Masonry + Lightbox) =================
const shots = document.querySelectorAll('.shot');

shots.forEach(card => {
    card.addEventListener('click', () => {
        openLightbox({
            src: card.getAttribute('data-src'),
            title: card.getAttribute('data-title'),
            category: card.getAttribute('data-tag')
        });
    });
});

// Update filter to work with .shot cards too
const v2FilterBtns = document.querySelectorAll('.portfolio--v2 .filter-btn');
if (v2FilterBtns.length) {
    v2FilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            v2FilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            shots.forEach(card => {
                const cat = card.getAttribute('data-category');
                const show = (filter === 'all' || cat === filter);
                card.style.display = show ? 'block' : 'none';
            });
        });
    });
}
const designer = document.getElementById('designer');

if (designer) {
    designer.style.color = '#F535AA'; // your primary color
    designer.style.cursor = 'pointer';

    designer.addEventListener('click', () => {
        window.open('https://pritam03.netlify.app', '_blank');
    });
}
const webCards = document.querySelectorAll('.web-card');

const webObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
},{ threshold:0.2 });

webCards.forEach(card => webObserver.observe(card));
