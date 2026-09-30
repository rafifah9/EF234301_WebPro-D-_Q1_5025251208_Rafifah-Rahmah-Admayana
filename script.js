// Menyimpan pemetaan rute URL ke ID elemen (section) di HTML
const routes = {
    '/quiz1': 'section-home',
    '/quiz1/': 'section-home',
    '/quiz1/profile': 'section-profile',
    '/quiz1/hometown': 'section-hometown',
    '/quiz1/food': 'section-food',
    '/quiz1/tourist': 'section-tourist'
};

// Mengubah URL browser tanpa reload dan memicu pergantian tampilan halaman
function navigateTo(path) {
    window.history.pushState({}, "", path);
    renderPage(path);
}

// Menyembunyikan semua section, lalu menampilkan section yang sesuai dengan URL aktif
function renderPage(path) {
    let cleanPath = path.endsWith('/') && path !== '/quiz1/' ? path.slice(0, -1) : path;
    
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const sectionId = routes[cleanPath] || 'section-home';
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        targetSection.classList.add('active');
    }

    window.scrollTo(0, 0);
}

// Menangkap klik pada link navigasi agar pindah halaman tanpa reload (mencegah aksi bawaan link)
document.addEventListener('click', function(e) {
    const link = e.target.closest('.nav-route');
    if (link) {
        e.preventDefault(); 
        const path = link.getAttribute('href');
        navigateTo(path);
    }
});

// Menyesuaikan tampilan halaman saat user menekan tombol back/forward di browser
window.addEventListener('popstate', function() {
    renderPage(window.location.pathname);
});

// Merender section yang tepat berdasarkan URL saat web pertama kali dimuat/di-refresh
document.addEventListener('DOMContentLoaded', function() {
    renderPage(window.location.pathname);
});