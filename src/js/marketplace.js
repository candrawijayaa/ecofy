gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip) 

// Animasi untuk tulisan "Marketplace"
gsap.from('#marketplace-text', {
  duration: 3,
  opacity: 0,
  y: 50,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#marketplace-text',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  },
});

// Animasi untuk kartu produk
gsap.from('.bg-gray-800', {
  duration: 3,
  opacity: 0,
  y: 50,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.bg-gray-800',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  },
});

// GSAP Animasi untuk tombol "Add to Cart"
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah perilaku default tombol

    // Animasi GSAP saat tombol diklik
    gsap.to(button, {
      scale: 1.2, // Membesar
      duration: 0.2,
      yoyo: true, // Kembali ke ukuran semula
      repeat: 1, // Mengulang animasi sekali
      ease: 'power2.out',
    });

    // Tambahkan logika untuk menambahkan produk ke keranjang di sini
    console.log('Produk ditambahkan ke keranjang!');
  });
});

// Fungsi untuk mencari produk
const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      card.style.display = 'block'; // Tampilkan produk jika cocok
    } else {
      card.style.display = 'none'; // Sembunyikan produk jika tidak cocok
    }
  });
});


/*
//Implementasikan
// Fungsi untuk menampilkan detail produk
function showDetails(item) {
  const detail = document.querySelector('.detail');
  const detailImage = detail.querySelector('img');
  const detailTitle = detail.querySelector('.title');
  const detailSecondary = detail.querySelector('.secondary');
  const detailDescription = detail.querySelector('.description');
  const detailAddToCartBtn = detail.querySelector('.add-to-cart-btn');
  const detailSwapBtn = detail.querySelector('.swap-btn');

  detailImage.src = item.querySelector('img').src;
  detailTitle.textContent = item.getAttribute('data-title');
  detailSecondary.textContent = item.getAttribute('data-secondary');
  detailDescription.textContent = item.getAttribute('data-text');

  // Tampilkan tombol "Add to Cart" di detail
  detailAddToCartBtn.style.display = 'inline-block';
  detailSwapBtn.style.display = 'inline-block';


  detail.classList.add('visible');
}

gsap.utils
  .toArray(".item")
  .forEach((item) => item.addEventListener("click", () => showDetails(item)));

// Fungsi untuk menyembunyikan detail produk
function hideDetails() {
  const detail = document.querySelector('.detail');
  detail.classList.remove('visible');
}

// Tambahkan event listener untuk menutup detail saat mengklik di luar
document.querySelector('.detail').addEventListener('click', (e) => {
  if (e.target === document.querySelector('.detail')) {
    hideDetails();
  }
});

// Tambahkan event listener untuk setiap item produk
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', () => showDetails(item));
});
*/


const items = gsap.utils.toArray(".item"),
  details = document.querySelector(".detail"),
  detailContent = document.querySelector(".content"),
  detailImage = document.querySelector(".detail img"),
  detailTitle = document.querySelector(".detail .title"),
  detailSecondary = document.querySelector(".detail .secondary"),
  detailDescription = document.querySelector(".detail .description"),
  detailAddToCartBtn = document.querySelector(".add-to-cart-btn"),
  detailSwapBtn = document.querySelector(".swap-btn");

let activeItem;
gsap.set(detailContent, { xPercent: -100 });

function showDetails(item) {
  if (activeItem) {
    return hideDetails();
  }

  let onLoad = () => {
    Flip.fit(details, item, { scale: true, fitChild: detailImage });
    const state = Flip.getState(details);

    gsap.set(details, { clearProps: true });
    gsap.set(details, {
      xPercent: 0,
      top: "30%",
      yPercent: -30,
      visibility: "visible",
      overflow: "hidden"
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      scale: true,
      onComplete: () => gsap.set(details, { overflow: "auto" })
    }).to(detailContent, { xPercent: 0 }, 0.2);

    detailImage.removeEventListener("load", onLoad);
    document.addEventListener("click", hideDetails);
  };

  detailImage.addEventListener("load", onLoad);
  detailImage.src = item.querySelector("img").src;
  detailTitle.textContent = item.getAttribute("data-title");
  detailSecondary.textContent = item.getAttribute("data-secondary");
  detailDescription.textContent = item.getAttribute("data-text");

  detailAddToCartBtn.style.display = 'inline-block';
  detailSwapBtn.style.display = 'inline-block';

  gsap.to(items, {
    opacity: 0.3,
    stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto" }
  }).kill(item);

  gsap.to(".app", { backgroundColor: "#888", duration: 1, delay: 0.3 });
  activeItem = item;
}

function hideDetails() {
  document.removeEventListener("click", hideDetails);
  gsap.set(details, { overflow: "hidden" });
  const state = Flip.getState(details);
  Flip.fit(details, activeItem, { scale: true, fitChild: detailImage });

  const tl = gsap.timeline();
  tl.set(details, { overflow: "hidden" })
    .to(detailContent, { xPercent: -100 })
    .to(items, {
      opacity: 1,
      stagger: { amount: 0.7, from: items.indexOf(activeItem), grid: "auto" }
    })
    .to(".app", { backgroundColor: "#fff" }, "<");

  Flip.from(state, {
    scale: true,
    duration: 0.5,
    delay: 0.2,
    onInterrupt: () => tl.kill()
  }).set(details, { visibility: "hidden" });

  activeItem = null;
}

gsap.utils.toArray(".item").forEach((item) => {
  item.addEventListener("click", () => showDetails(item));
});

window.addEventListener("load", () => {
  gsap.to(".app", { autoAlpha: 1, duration: 0.2 });
  gsap.from(".item", { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
});


//test
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiper = new Swiper(".mySwiperCard", {
  effect: "cards",
  grabCursor: true,
});
var swiper = new Swiper(".mySwiperGrab", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  grabCursor: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3.3,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".adventureSwiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  grabCursor: false,
  pagination: {
    el: ".swiper-pagination-adv",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-adv",
    prevEl: ".swiper-button-prev-adv",
  },
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2.3,
      spaceBetween: 30,
    },
  },
});

const ig = document.getElementById(14);
ig.classList.add("md:hidden", "lg:block");

