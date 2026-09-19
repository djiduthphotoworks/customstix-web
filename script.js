let cart = [];

// Fungsi Carousel Ready Stock
function scrollCarousel(direction) {
    const container = document.getElementById('carousel-container');
    const scrollAmount = 320;
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Fungsi Dark / Light Mode
function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeIcon.innerText = '🌙';
    } else {
        htmlElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    }
}

// Tombol Scroll-to-Top
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 300) {
        scrollBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
        scrollBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollBtn.classList.remove('opacity-100', 'translate-y-0');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle FAQ Accordion
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('span:last-child');
    content.classList.toggle('hidden');
    if (content.classList.contains('hidden')) {
        icon.innerText = '+';
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.innerText = '-';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Toggle Modal Keranjang
function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

// Tambah Produk ke Keranjang
function addToCart(name, price, spec) {
    const existingItem = cart.find(item => item.name === name && item.spec === spec);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name, price, spec, qty: 1 });
    }
    
    updateCartUI();
    alert(`"${name}" berhasil ditambahkan ke keranjang!`);
}

// Update Tampilan UI Keranjang
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    let totalQty = 0;
    let totalPrice = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-neutral-500 text-sm text-center py-8">Keranjang kamu masih kosong.</p>`;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            totalQty += item.qty;
            totalPrice += item.price * item.qty;
            
            cartItemsContainer.innerHTML += `
                <div class="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 p-3 rounded-xl">
                    <div>
                        <h4 class="font-bold text-sm">${item.name}</h4>
                        <p class="text-xs text-neutral-500">${item.spec}</p>
                        <p class="text-xs text-amber-500 font-semibold">Rp ${item.price.toLocaleString('id-ID')} x ${item.qty}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 text-xs px-2 py-1 font-semibold">Hapus</button>
                </div>
            `;
        });
    }
    
    cartCount.innerText = totalQty;
    cartTotal.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// Hapus Item dari Keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Fungsi Checkout ke Shopee / Pembayaran
function checkoutShopee() {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
    }
    // Ganti dengan link toko atau produk Shopee Anda
    const shopeeURL = "https://shopee.co.id/toko-anda"; 
    window.open(shopeeURL, '_blank');
}

// Kirim Pesanan Kustom ke WhatsApp
function sendToWhatsApp(event) {
    event.preventDefault();
    const size = document.getElementById('stick-size').value;
    const wood = document.getElementById('wood-type').value;
    const customText = document.getElementById('custom-text').value;
    const qty = document.getElementById('quantity').value;
    const clientNotes = document.getElementById('client-notes').value;

    const adminPhoneNumber = "6281234567890"; // Ganti dengan nomor WA Anda

    let message = `Halo Admin CustomStick.id, saya ingin memesan setik drum custom:\n\n` +
                  `*Ukuran:* ${size}\n` +
                  `*Bahan:* ${wood}\n` +
                  `*Teks Cetak:* "${customText}"\n` +
                  `*Jumlah:* ${qty} Pasang\n`;

    if (clientNotes.trim() !== "") {
        message += `*Catatan/Pertanyaan:* ${clientNotes}\n`;
    }

    message += `\nMohon info ketersediaan dan total pembayarannya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`, '_blank');
}

// Terjemahan Bahasa (ID & EN)
const translations = {
    id: {
        navReady: "Ready Stock",
        navPortfolio: "Portofolio",
        navTestimoni: "Testimoni",
        navFaq: "FAQ",
        navCustom: "Pesan Custom",
        heroTitle: "Cetak Nama, Band, atau Logo di Setik Drum Anda.",
        heroDesc: "Kayu pilihan berkualitas tinggi dengan hasil grafir laser permanen. Cocok untuk musisi panggung, merchandise band, maupun kado spesial.",
        heroBtn: "Mulai Desain Sekarang",
        readyTitle: "Galeri Produk Ready Stock",
        readyDesc: "Stok siap kirim hari ini tanpa perlu menunggu proses kustomisasi.",
        portfolioTitle: "Portofolio & Klien Band",
        portfolioDesc: "Beberapa hasil cetak setik drum kustom yang telah dipercaya oleh berbagai musisi dan band indie maupun profesional.",
        faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
        faqDesc: "Temukan jawaban seputar proses kustomisasi, bahan kayu, pengiriman, dan pemesanan setik drum.",
        footerDesc: "Pusat pembuatan dan kustomisasi setik drum profesional dengan teknologi laser engraving presisi tinggi untuk musisi Indonesia.",
        langBtn: "🇬🇧 EN"
    },
    en: {
        navReady: "Ready Stock",
        navPortfolio: "Portfolio",
        navTestimoni: "Testimonials",
        navFaq: "FAQ",
        navCustom: "Custom Order",
        heroTitle: "Engrave Your Name, Band, or Logo on Custom Drumsticks.",
        heroDesc: "High-quality selected woods with permanent laser engraving. Perfect for stage musicians, band merchandise, or special gifts.",
        heroBtn: "Start Designing Now",
        readyTitle: "Ready Stock Product Gallery",
        readyDesc: "Stock ready to ship today without waiting for custom production.",
        portfolioTitle: "Portfolio & Band Clients",
        portfolioDesc: "Some of the custom drumstick prints trusted by various indie and professional musicians and bands.",
        faqTitle: "Frequently Asked Questions (FAQ)",
        faqDesc: "Find answers regarding the customization process, wood types, shipping, and drumstick ordering.",
        footerDesc: "Professional drumstick manufacturing and customization center with high-precision laser engraving technology for musicians.",
        langBtn: "🇮🇩 ID"
    }
};

let currentLang = 'id';

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.getElementById('lang-label').innerText = translations[currentLang].langBtn;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
}