document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const menuOverlay = document.getElementById('menu-overlay');

    // Mở / Đóng menu chính khi bấm vào nút 3 gạch (Hamburger)
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active'); // Đổi icon thành dấu X
        navMenu.classList.toggle('active');  // Kéo thanh menu trượt ra/vào
        if (menuOverlay) menuOverlay.classList.toggle('active'); // Hiển thị màng mờ đen
    });

    // Mở / Đóng menu con (Danh mục cây thuốc) trên điện thoại
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            // Chỉ bắt sự kiện này ở giao diện màn hình nhỏ (Mobile/Tablet)
            if (window.innerWidth <= 768) {
                // Kiểm tra xem User có click vào đúng chữ "Danh mục cây thuốc" (link đầu tiên của khối thẻ) không
                const targetAnchor = e.target.closest('a');
                if (targetAnchor && this.firstElementChild === targetAnchor) {
                    // Ngừng việc nhảy link của mục chính để bung (Mở) danh mục Accordion ra
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            }
        });
    });

    // Tự động đóng Menu khi click vào 1 liên kết trên Mobile (trừ cái danh mục con)
    const normalLinks = document.querySelectorAll('.nav > ul > li:not(.dropdown) > a, .dropdown-menu a');
    normalLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
            }
        });
    });

    // Đóng Mobile Menu khi người dùng click ra ngoài khu vực của Menu
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
        }
    });

    // ============================================
    // 2. TÌM KIẾM NHANH (LIVE FILTER / SEARCH)
    // ============================================
    // Lấy ô input trên Header (Desktop) và trong Menu Sidebar (Mobile)
    const searchInputs = [document.getElementById('searchInput'), document.getElementById('searchInputMobile')];
    const herbCards = document.querySelectorAll('.herb-card');
    const noResults = document.getElementById('no-results');

    // Hàm xử lý tìm kiếm
    function performSearch(searchTerm) {
        // Chuyển toàn bộ từ khoá về chữ thường và xóa khoảng trắng 2 đầu
        const keyword = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        herbCards.forEach(card => {
            // Lấy thông tin cây thuốc (thuộc tính data-name và đoạn văn p)
            const herbName = card.getAttribute('data-name').toLowerCase();
            const herbDesc = card.querySelector('p').textContent.toLowerCase();

            // Nếu keyword nằm trong tên HOẶC trong mô tả
            if (herbName.includes(keyword) || herbDesc.includes(keyword)) {
                card.style.display = 'flex'; // Trả lại block theo thiết kế (ở stylesheet là flex)
                visibleCount++;
            } else {
                card.style.display = 'none'; // Ẩn card không khớp
            }
        });

        // Hiển thị thông báo khi không có card nào khớp điều kiện (bọc if chặn lỗi trên trang con)
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }

        // Cập nhật động dòng Tiêu đề (Danh mục cây thuốc) để khớp với thứ đang lọc
        const categoryTitle = document.querySelector('#categories .section-title');
        if (categoryTitle) {
            if (keyword === '') {
                categoryTitle.textContent = "Cây thuốc nổi bật";
            } else if (keyword === 'trị ho') {
                categoryTitle.textContent = "Cây thuốc Trị Ho";
            } else if (keyword === 'trị cảm') {
                categoryTitle.textContent = "Cây thuốc Trị Cảm";
            } else if (keyword === 'trị đau bụng') {
                categoryTitle.textContent = "Cây thuốc Trị Đau Bụng";
            } else {
                // Nếu gõ tìm kiếm bất kỳ (vd: gừng, bạc hà) -> Hiển thị từ khoá tìm kiếm
                categoryTitle.textContent = `Kết quả tìm kiếm: "${searchTerm.trim()}"`;
            }
        }
    }

    // Lắng nghe thao tác gõ phím trên tất cả các thanh tìm kiếm
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keyup', (e) => {
                const value = e.target.value;
                performSearch(value); // Gọi bộ lọc

                // Đồng bộ nội dung nếu cả 2 thanh input cùng tồn tại trên DOM
                searchInputs.forEach(otherInput => {
                    if (otherInput !== input && otherInput) {
                        otherInput.value = value;
                    }
                });
            });
        }
    });

    // ============================================
    // 3. HIỆU ỨNG XUẤT HIỆN DẦN KHI CUỘN (FADE-IN SHROLL)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        // Tính toán tọa độ chân màn hình để kích hoạt (85% màn hình)
        const triggerBottom = window.innerHeight * 0.85;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top; // Vị trí điểm đỉnh của thẻ so với viewport

            // Nếu vị trí của thẻ (đang cuộn tới) nhỏ hơn mức trigger => Hiện nó lên
            if (elementTop < triggerBottom) {
                element.classList.add('visible'); // Thêm class chứa animation (vị trí cũ, opaticy: 1)
            }
        });
    };

    // Theo dõi thao tác cuộn chuột
    window.addEventListener('scroll', checkFade);

    // Gọi ngay hàm 1 lần để các thẻ xuất hiện ở màn hình đầu tiên (VD Banner) hiển thị luôn
    checkFade();

    // ============================================
    // 4. BANNER SLIDER TỰ ĐỘNG LƯỚT QUY MỖI GIÂY
    // ============================================
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        // Cứ 2000 mili-giây (2 giây) thì thực hiện đổi ảnh
        setInterval(() => {
            slides[currentSlide].classList.remove('active'); // Ẩn ảnh cũ đi
            currentSlide = (currentSlide + 1) % slides.length; // Chọn ảnh kế tiếp
            slides[currentSlide].classList.add('active'); // Hiện ảnh mới
        }, 2000);
    }

    // ============================================
    // 5. HIỆU ỨNG THU NHỎ HEADER KHI CUỘN
    // ============================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Kích hoạt khi vị trí thanh cuộn vượt quá 50px so với đỉnh trang
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // ============================================
    // 6. TÍNH NĂNG CLICK PHÂN LOẠI TỪ DROPDOWN MENU
    // ============================================
    // Xử lý bộ lọc sản phẩm dựa vào sự thay đổi Hash trên thanh URL (#tri-ho, #tri-cam...)
    function checkHashFilter() {
        const hash = window.location.hash;
        let shouldScrollToGrid = false;

        if (hash === '#tri-ho') {
            performSearch('trị ho');
            shouldScrollToGrid = true;
        } else if (hash === '#tri-cam') {
            performSearch('trị cảm');
            shouldScrollToGrid = true;
        } else if (hash === '#tri-dau-bung') {
            performSearch('trị đau bụng');
            shouldScrollToGrid = true;
        } else if (hash === '#categories' || hash === '#home' || hash === '') {
            // Chỉ xóa tìm kiếm nếu có danh sách card trên trang này
            if (herbCards.length > 0) performSearch('');
            if (hash === '#categories') shouldScrollToGrid = true;
        }

        // Nếu truy cập đúng hash cần xem danh sách thì cuộn trang thẳng xuống đó
        if (shouldScrollToGrid) {
            const gridSection = document.getElementById('categories');
            if (gridSection) {
                // Dùng setTimeout tạo độ trễ nhỏ đảm bảo trang đã load và lọc xong
                setTimeout(() => {
                    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            }
        }
    }

    // Tự động kiểm tra ngay khi mở Website đầu tiên
    checkHashFilter();

    // Tiếp tục lắng nghe nếu người dùng bấm tiếp các tùy chọn
    window.addEventListener('hashchange', checkHashFilter);

});
