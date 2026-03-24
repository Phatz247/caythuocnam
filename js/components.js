
const isRoot = !window.location.pathname.includes('/html/');
const base = isRoot ? '' : '../';

// Header
function renderHeader(activePage = '') {
    const pages = {
        home: { label: 'Trang chủ', href: `${base}index.html` },
        gioithieu: { label: 'Giới thiệu', href: `${base}html/gioithieu.html` },
        lienhe: { label: 'Liên hệ', href: `${base}html/lienhe.html` },
    };

    const navLink = (key) =>
        `<li><a href="${pages[key].href}"${activePage === key ? ' style="color:var(--primary-color)"' : ''}>${pages[key].label}</a></li>`;

    const headerHTML = `
    <header class="header">
        <div class="container header-container">
            <div class="logo">
                <a href="${base}index.html">
                    <h1><i class="fa-solid fa-leaf"></i> Cây Thuốc Nam</h1>
                </a>
            </div>

            <div class="search-box desktop-search">
                <input type="text" id="searchInput" placeholder="Tìm kiếm cây thuốc...">
                <button><i class="fa-solid fa-search"></i></button>
            </div>

            <div class="menu-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>

            <nav class="nav" id="nav-links">
                <div class="search-box mobile-search">
                    <input type="text" id="searchInputMobile" placeholder="Tìm kiếm cây thuốc...">
                </div>
                <ul>
                    ${navLink('home')}
                    ${navLink('gioithieu')}
                    <li class="dropdown">
                        <a href="${base}index.html#categories">Danh mục cây thuốc <i class="fa-solid fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="${base}index.html#tri-ho">Cây thuốc trị ho</a></li>
                            <li><a href="${base}index.html#tri-cam">Cây thuốc trị cảm</a></li>
                            <li><a href="${base}index.html#tri-dau-bung">Cây thuốc trị đau bụng</a></li>
                        </ul>
                    </li>
                    ${navLink('lienhe')}
                </ul>
            </nav>

            <div class="menu-overlay" id="menu-overlay"></div>
        </div>
    </header>`;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) placeholder.outerHTML = headerHTML;
}

// Footer
function renderFooter() {
    const footerHTML = `
    <footer id="contact" class="footer">
        <div class="container footer-content fade-in">
            <div class="footer-col">
                <h3>Về Chúng Tôi</h3>
                <p>Cung cấp kiến thức về cách sống khỏe mạnh thông qua Y Học Cổ Truyền và Cây Thuốc Nam.</p>
            </div>
            <div class="footer-col">
                <h3>Thông Tin Liên Hệ</h3>
                <p><i class="fa-solid fa-location-dot"></i> TPHCM, Việt Nam</p>
                <p><i class="fa-solid fa-phone"></i> 1800 1568</p>
                <p><i class="fa-solid fa-envelope"></i> contact@thuocnam.vn</p>
            </div>
            <div class="footer-col">
                <h3>Cộng đồng</h3>
                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Cây Thuốc Nam. Bản quyền thuộc về cộng đồng Thảo Dược Việt.</p>
        </div>
    </footer>`;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) placeholder.outerHTML = footerHTML;
}
