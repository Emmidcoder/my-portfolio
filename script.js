'use strict'

const navLinks = document.querySelectorAll('.navigation__link');
const checkbox = document.querySelector('.navigation__checkbox');

const ctaBtn = document.querySelector('.navigation__btn');
const ctaNavBtn = document.querySelector('.navigation__nav--btn');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const xmark = document.querySelector('.xmark');
const navbar = document.querySelector('.navigation');
const header = document.querySelector('.header');


const forms = document.querySelectorAll('.form');
const formBtns = document.querySelectorAll('.form__btn');


////////////////////////////////////////
///////////////////////////////////////
// Remove navigation backgound on small screen
navLinks.forEach(navLink => navLink.addEventListener('click', function () {
    if (checkbox.checked) checkbox.checked = false
}))

ctaNavBtn.addEventListener('click', function () {
    if (checkbox.checked) checkbox.checked = false
})

// Show and Remove Get-Quote function
const toggleCTA = function (btn) {

    btn.addEventListener('click', function () {
        popup.classList.toggle('hidden')
        overlay.classList.toggle('hidden')
    });
}
toggleCTA(ctaBtn)
toggleCTA(ctaNavBtn)
toggleCTA(overlay)
toggleCTA(xmark)


//The sticky Navigation
const navHeight = navbar.getBoundingClientRect().height

const stickyNavBar = function (entries) {
    const [entry] = entries

    if (!entry.isIntersecting) navbar.classList.add('navigation--sticky')
    else navbar.classList.remove('navigation--sticky')
}

new IntersectionObserver(stickyNavBar,
    {
        root: null,
        threshold: 0.2,
        rootMargin: `-${navHeight}px`
    }).observe(header)

const myCont = document.querySelector("#form");

///////////////////////////////////////
//////////////////////////////////////
//Scrollslide up Sections Function
const allSections = document.querySelectorAll('.section');
const slidesUp = document.querySelectorAll('.slide-up');


const scrollSlide = function (name, num) {
    const revealSection = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section__hidden');

        observer.unobserve(entry.target)
    }

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: num,
    })


    name.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section__hidden');
    })

}
scrollSlide(allSections, 0.05)
scrollSlide(slidesUp, 0.1)


///////////////////////////////////////
//////////////////////////////////////
//Testimonies slide
const slides = document.querySelectorAll('.testimony__slide')
const btnLeft = document.querySelector('.testimony__btn--left')
const btnRight = document.querySelector('.testimony__btn--right')
const dotsContainer = document.querySelector('.testimony__dots')


let curslide = 0
const maxslide = slides.length - 1;

const createDots = function () {
    slides.forEach((_, ind) => dotsContainer.insertAdjacentHTML(
        'beforeend', `<button class="testimony__dots__dot" data-slide="${ind}"></button>`)
    )
}
createDots()

const acticeDots = function (slide) {
    document
        .querySelectorAll('.testimony__dots__dot')
        .forEach(dot => dot.classList.remove('testimony__dots__dot--active'));

    document
        .querySelector(`.testimony__dots__dot[data-slide="${slide}"]`)
        .classList.add('testimony__dots__dot--active');
}
acticeDots(0)

const goToSlide = function (slide) {
    slides.forEach((sl, ind) =>
        sl.style.transform = `translateX(${100 * (ind - slide)}%)`
    )
}
goToSlide(0)

const nextSlide = function () {
    if (curslide === maxslide) {
        curslide = 0
    } else {
        curslide++
    }
    goToSlide(curslide)
    acticeDots(curslide)

}

const prevSlide = function () {
    if (curslide === 0) {
        curslide = maxslide
    } else {
        curslide--
    }
    goToSlide(curslide)
    acticeDots(curslide)

}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains("testimony__dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide)
        acticeDots(slide)
    }
})


///////////////////////////////////////
//////////////////////////////////////
//Message Request
forms.forEach(form => form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dataArr = [...new FormData(this)];
    const data = Object.fromEntries(dataArr);

    fetch("https://emmybest.com/emailhandler/index.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data),
    }).then(res => {
        return res.json()
    }).then(data => {
        alert(`Thank for contacting me. You message was sent succefully. ${data.name}`)
    });
}))
