const openMenu = () => {
   
    document.querySelector('aside').classList.add('active');
}

const closeMenu = () => {
   
    document.querySelector('aside').classList.remove('active');
}


document.querySelector('#menu').addEventListener("click", function(e) {
    e.preventDefault();
    openMenu();
});

document.querySelector('aside button.close').addEventListener("click", function() {
    closeMenu();
});

document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener('scroll', () => {
    const direction = window.scrollY - document.lastScrollPosition > 0 ? 'down' : 'up';
    const sections = [...document.querySelectorAll('section')];

    if (document.onWayTo === null) {
        const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;
        if (destIndex >= 0 && destIndex < sections.length) {
            document.onWayTo = destIndex;
            window.scroll(0, sections[destIndex].offsetTop);
        }
    }

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            document.lastCentered = index;
            section.classList.add('active');
            if (document.onWayTo === index) {
                document.onWayTo = null;
            }
        } else {
            section.classList.remove('active');
        }
    });

    document.lastScrollPosition = window.scrollY;
});
