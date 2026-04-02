// ------------------------------------------------
// Lenis intialize
// ------------------------------------------------

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

const lenis = new Lenis({
    autoRaf: true,
});

lenis.scrollTo(0, { immediate: true });
lenis.stop();


// ------------------------------------------------
// Loader animation
// ------------------------------------------------

const loadertl = gsap.timeline({
    defaults: { ease: "power4.out" }
});

const loaderPaths = gsap.utils.toArray("[loader] path");

loaderPaths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
    });

    loadertl.to(path, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: .5
    }, "<");
});

loadertl.to('[loader] svg', {
    opacity: 0,
});

loadertl.to('[loader]', {
    opacity: 0,
    display: 'none',
    onComplete: () => {
        lenis.start();
    }
});

loadertl.from('[haroEle]', {
    opacity: 0,
    y: 150,
    stagger: .2,
    ease: "power2.out",
});

if (document.querySelector('#cursor-container')) {

    loadertl.from('#cursor-container', {
        opacity: 0
    });

}

loadertl.from('[second_sec]', {
    opacity: 0
});

if (document.querySelector('.own_cursor')) {

    loadertl.to('.own_cursor', {
        opacity: 1
    });

}

// ------------------------------------------------
// Custom cursor effect
// ------------------------------------------------

gsap.registerPlugin();

const cursor = document.querySelector("#myCursor");

let mouseX = 0, mouseY = 0;

if (cursor) {
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0
        });
    });
}

const hero = document.getElementById('hero');

if (hero) {
    hero.addEventListener("mouseleave", () => {
        gsap.set([cursor], { opacity: 0 });
    });

    hero.addEventListener("mouseenter", () => {
        gsap.set([cursor], { opacity: 1 });
    });
}

// ------------------------------------------------
// Offcanvas menu
// ------------------------------------------------

const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-menu");

let isOpen = false;

const tl = gsap.timeline({ paused: true });

tl.to(menu, {
    x: 0,
    duration: 0.4,
    ease: "power3.out",
    onStart: () => menu.classList.remove("invisible")
})
    .to(overlay, {
        opacity: 1,
        duration: 0.3,
        onStart: () => overlay.classList.add("active")
    }, "<");

openBtn.addEventListener("click", () => {
    if (isOpen) return;
    tl.play();
    isOpen = true;
});

function closeMenu() {
    if (!isOpen) return;
    tl.reverse();
    overlay.classList.remove("active");
    isOpen = false;
}

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);


// ------------------------------------------------
// Counter
// ------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".counter").forEach(counter => {
    let target = +counter.dataset.target;

    gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// ------------------------------------------------
// Industries swiper
// ------------------------------------------------

var swiper = new Swiper(".industriesSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true,
    breakpoints: {
        768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
        },
        1400: {
            slidesPerView: 3.2,
            spaceBetween: 32,
        },
    },
});

// ------------------------------------------------
// Get current year
// ------------------------------------------------

document.querySelector('#currentYear').innerHTML = new Date().getFullYear();

// ------------------------------------------------
// Stick header
// ------------------------------------------------

let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('bg-white/80', 'header_sticked')
    }
    if (currentScroll < 100) {
        header.classList.remove('bg-white/80', 'header_sticked')
    }
    if (currentScroll <= 0) {
        gsap.to(header, { y: 0, duration: 0.3 });
    }
    else if (currentScroll > lastScroll) {
        gsap.to(header, { y: -105, duration: 0.3 });
    }
    else {
        gsap.to(header, { y: 0, duration: 0.3 });
    }

    lastScroll = currentScroll;
});

// ------------------------------------------------
// Back to top
// ------------------------------------------------

const btn = document.getElementById('backToTop')
let isVisible = false

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 300 && !isVisible) {
        isVisible = true
        gsap.to(btn, { opacity: 1, y: 0, pointerEvents: 'auto' })
    }

    if (scroll <= 300 && isVisible) {
        isVisible = false
        gsap.to(btn, { opacity: 0, y: 20, pointerEvents: 'none' })
    }
})

btn.addEventListener('click', () => {
    lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
    })
})

// ------------------------------------------------
// Multiple cursor simulation
// ------------------------------------------------

const mockUsers = [
    { id: 'u1', name: 'Designer', color: '#FF6900' },
    { id: 'u2', name: 'Developer', color: '#2B7FFF' },
];

const container = document.getElementById('cursor-container');

const getCursorSVG = (color) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.1868 12.8532L16.8428 14.3189C15.6435 14.7187 14.6841 15.6515 14.2844 16.8774L12.8186 21.2214C11.566 24.9791 6.28925 24.8991 5.11664 21.1414L0.186332 5.28449C-0.77308 2.13975 2.1318 -0.791784 5.24989 0.194278L21.1335 5.12459C24.8645 6.2972 24.9178 11.6006 21.1868 12.8532Z" fill="${color}"/></svg>`;

if (container) {
    mockUsers.forEach(user => {
        const cursorEl = document.createElement('div');
        cursorEl.className = 'cursor';

        cursorEl.innerHTML = `
        <div class="cursor-icon">${getCursorSVG(user.color)}</div>
        <div class="cursor-label" style="background-color: ${user.color}">${user.name}</div>
    `;

        container.appendChild(cursorEl);

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        gsap.set(cursorEl, { x: startX, y: startY });

        animateCursor(cursorEl);
    });
}

function animateCursor(cursorEl) {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;

    const nextX = gsap.utils.random(0, maxX);
    const nextY = gsap.utils.random(0, maxY);

    const moveDuration = gsap.utils.random(0.8, 2.5);
    const restDelay = gsap.utils.random(0.1, 1.5);

    gsap.to(cursorEl, {
        x: nextX,
        y: nextY,
        duration: moveDuration,
        delay: restDelay,
        ease: "power2.inOut",
        onComplete: () => animateCursor(cursorEl)
    });
}


// ------------------------------------------------
// SlideUp animation
// ------------------------------------------------
gsap.utils.toArray("[slideUp]").forEach((slideUp) => {
    gsap.to(slideUp, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: slideUp,
            start: "top 100%"
        }
    });
});


// ------------------------------------------------
// fadeIn animation
// ------------------------------------------------
gsap.utils.toArray("[fadeIn]").forEach((fadeIn) => {
    gsap.to(fadeIn, {
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: fadeIn,
            start: "top 70%",
            end: "top 30%",
        }
    });
});


// ------------------------------------------------
// ScaleUp animation
// ------------------------------------------------
gsap.to('[scaleUp]', {
    opacity: 1,
    scale: 1,
    ease: "power4.out",
    stagger: .2,
    scrollTrigger: {
        trigger: '[scaleUp]',
        start: "top 80%",
        end: "top 30%",
    }
});


// ------------------------------------------------
// Card animation
// ------------------------------------------------
gsap.utils.toArray("[card]").forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        scaleY: .5,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
        }
    });
});


// ------------------------------------------------
// Glass effect animation
// ------------------------------------------------
gsap.utils.toArray(".glass_effect").forEach((glass_effect) => {
    gsap.from(glass_effect, {
        left: '100%',
        duration: .5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: glass_effect,
            start: "top 80%",
            end: "top 30%",
        }
    });
});


// ------------------------------------------------
// Fill path animation
// ------------------------------------------------
gsap.registerPlugin(ScrollTrigger);
const paths = gsap.utils.toArray(".abstract_svg path");
paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
    });
    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".abstract_svg",
            start: "top 60%",
            end: "top 30%",
            toggleActions: "play none none none",
        }
    });
});


gsap.utils.toArray("[slideLeft]").forEach((card) => {
    gsap.to(card, {
        opacity: 1,
        right: 0,
        ease: "power4.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none none", // key change
        }
    });
});


// ------------------------------------------------
// fadeIn animation
// ------------------------------------------------

gsap.from('[menu] li', {
    y: 50,
    opacity: 0,
    ease: "power4.out",
    stagger: .1,
    scrollTrigger: {
        trigger: '[menu]',
        start: "top 70%",
        end: "top 30%",
    }
});


// ------------------------------------------------
// Testimonial swiper
// ------------------------------------------------

if (document.querySelector('.testimonialSwiper')) {

    var swiper = new Swiper(".testimonialSwiper", {
        loop: true,
        navigation: {
            prevEl: ".testimonial-prev-btn",
            nextEl: ".testimonial-next-btn",
        },
    });

}


// ------------------------------------------------
// Insights swiper
// ------------------------------------------------

if (document.querySelector('.insightsSwiper')) {

    var swiper = new Swiper(".insightsSwiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
            992: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 2.2,
                spaceBetween: 40,
            },
            1600: {
                slidesPerView: 2.2,
                spaceBetween: 60,
            },
            1800: {
                slidesPerView: 2.2,
                spaceBetween: 80,
            },
        },
    });

}

// ------------------------------------------------
// Accordion animation
// ------------------------------------------------

const items = document.querySelectorAll(".accordion-item");

items.forEach((item, index) => {
    const content = item.querySelector(".accordion-content");
    const text = content.firstElementChild;

    // INITIAL STATE
    if (item.classList.contains("open")) {
        content.style.height = text.scrollHeight + "px";
    } else {
        content.style.height = "0px";
    }

    // CLICK HANDLER
    const title = item.querySelector(".accordion-title");

    title.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // CLOSE ALL
        items.forEach(otherItem => {
            const otherContent = otherItem.querySelector(".accordion-content");

            gsap.to(otherContent, {
                height: 0,
                duration: 0.3
            });

            otherItem.classList.remove("open");
        });

        // OPEN CURRENT (if it was closed)
        if (!isOpen) {
            const content = item.querySelector(".accordion-content");
            const text = content.firstElementChild;

            gsap.to(content, {
                height: text.scrollHeight,
                duration: 0.3,
                onComplete: () => {
                    content.style.height = "auto";
                }
            });

            item.classList.add("open");
        }
    });
});

// ------------------------------------------------
// Tab animation
// ------------------------------------------------

const buttons = document.querySelectorAll(".tab-buttons button");
const panels = document.querySelectorAll(".tab-panel");

let activeTab = document.querySelector(".tab-panel.active");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        if (activeTab.dataset.tab === target) return; // avoid useless work

        const newPanel = document.querySelector(`.tab-panel[data-tab="${target}"]`);

        // Animate OUT current
        gsap.to(activeTab, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                activeTab.classList.remove("active");

                // Animate IN new
                newPanel.classList.add("active");

                gsap.fromTo(newPanel,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4 }
                );

                activeTab = newPanel;
            }
        });

        // Update button state
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// ------------------------------------------------
// Inject map
// ------------------------------------------------

const map = document.querySelector("#world_map");

if (map) {
    fetch("assets/images/world-map.svg")
        .then(res => res.text())
        .then(svg => {
            map.innerHTML = svg;
        });
}

// ------------------------------------------------
// Upload file
// ------------------------------------------------

const fileInput = document.getElementById('resumeInput');
const uploadText = document.getElementById('uploadText');

if (fileInput) {
    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            uploadText.textContent = this.files[0].name;
        }
    });
}