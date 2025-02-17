const routes = {
    '/': 'src/views/home.html',
    '/blogs': 'src/views/blogs.html',
    '/marketplace': 'src/views/marketplace.html',
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || 'src/views/home.html';
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('app').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

document.addEventListener('DOMContentLoaded', handleLocation);