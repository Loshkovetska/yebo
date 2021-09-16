{
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.navigation__list');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger--close');
        navList.classList.toggle('navigation__list--show')
    });
}