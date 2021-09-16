{
    document.querySelector('.navigation__list').addEventListener('click', (e) => {
        if (e.target.nodeName === 'A') {
            e.preventDefault();
            document.querySelector(`${e.target.getAttribute("href")}`).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}