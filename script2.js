const navLinks = document.querySelectorAll('.menu a');

function normalize(str) {
    return str
        .replace(/\.html$/i, '')
        .replace(/^.*\/\/[^\/]+/, '') // domain strip (www.cosmo.com/about → /about)
        .replace(/\/index$/i, '')
        .replace(/\/$/, '')
        .toLowerCase()
        .trim()
        || '/';
}

const currentClean = normalize(window.location.href);

navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const absolute = new URL(href, window.location.href).href;
    const linkClean = normalize(absolute);

    if (linkClean === currentClean) {
        link.classList.add('active');

        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
            const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
            if (parentToggle) parentToggle.classList.add('active');
        }
    }
});