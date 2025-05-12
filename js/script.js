document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .page-transition-link');
    const pages = document.querySelectorAll('.page');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header'); 

    function showPage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetPage = document.getElementById(targetId);
        const targetLink = document.querySelector(`.nav-link[href="#${targetId}"]`); // Find specific nav link

        if (targetPage) {
            targetPage.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        } else {
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
             if(correspondingNavLink) {
                 correspondingNavLink.classList.add('active');
             }
        }

        if (mainNav.classList.contains('nav-open')) {
             mainNav.classList.remove('nav-open');
         }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault(); 
                const targetId = href.substring(1); 
                showPage(targetId);
            }
        });
    });

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const currentHash = window.location.hash;
    let initialPageId = 'home';
    if (currentHash && currentHash.length > 1) {
        const hashId = currentHash.substring(1);
        if (document.getElementById(hashId)) {
             initialPageId = hashId;
        }
    }
    showPage(initialPageId);

    window.addEventListener('popstate', () => {
       const hash = window.location.hash;
       let pageId = 'home';
       if(hash && hash.length > 1) {
         pageId = hash.substring(1);
        }
       showPage(pageId);
    });

});