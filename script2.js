
    const navLinks = document.querySelectorAll('.menu a');
    let currentPage = window.location.pathname.split('/').pop();

    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        const linkClean = linkPage ? linkPage.replace('.html', '').toLowerCase() : '';
        const currentClean = currentPage.replace('.html', '').toLowerCase();

        if (linkClean === currentClean || linkPage === currentPage) {
            link.classList.add('active');

            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (parentToggle) {
                    parentToggle.classList.add('active');
                }
            }
        }
    });