gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".box").forEach((box, index) => {
    ScrollTrigger.create({
      trigger: box,
      start: "top top",
      end: () => "+=" + box.offsetHeight,
      toggleActions: "play none none none",
      pin: true,
      pinSpacing: false,
    });
  });

  gsap.utils.toArray(".last-box").forEach((box, index) => {
    ScrollTrigger.create({
      trigger: box,
      start: "top top",
      end: () => "+=" + 0,
      toggleActions: "play none none none",
      pin: true,
      pinSpacing: false,
    });
  });

  function scrambleText(element, originalText, duration = 1.5) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let iterations = 0;
    const interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((char, i) => {
          if (i < iterations) return char; // Kembalikan karakter asli setelah cukup waktu
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
  
      if (iterations >= originalText.length) {
        clearInterval(interval);
      }
      iterations += 1;
    }, duration * 1000 / originalText.length);
  }
  
  function typewriterEffect(element, speed = 100) {
    const text = element.dataset.text;
    element.innerText = "";
    let i = 0;
    const interval = setInterval(() => {
      element.innerText += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }
  
  function typewriterEffect(element, speed = 100) {
    const text = element.dataset.text;
    element.innerText = "";
    let i = 0;
    const interval = setInterval(() => {
      element.innerText += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }
  
  gsap.utils.toArray(".type-writter").forEach((el) => {
    el.dataset.text = el.innerText;
    el.innerText = ""; // Kosongkan sementara
  
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%", // Mulai saat elemen 80% masuk viewport
      toggleActions: "play none none none",
      onEnter: () => typewriterEffect(el, 100),
    });
  });
  
  
  function glitchEffect(element, duration = 1.5) {
    const originalText = element.dataset.text;
    const chars = "!@#$%^&*()_+{}[]<>?";
    let iterations = 0;
    const interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((char, i) => (Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char))
        .join("");
  
      iterations++;
      if (iterations > 10) {
        clearInterval(interval);
        element.innerText = originalText;
      }
    }, duration * 100);
  }
  
  gsap.utils.toArray(".glitch").forEach((el) => {
    el.dataset.text = el.innerText;
    el.innerText = ""; // Kosongkan sementara
  
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%", // Mulai saat elemen 80% masuk viewport
      toggleActions: "play none none none",
      onEnter: () => glitchEffect(el),
    });
  
    gsap.from(el, {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });
  });
  
  const scrollContainer = document.getElementById("scrollContainer");

  function autoScroll() {
    scrollContainer.scrollBy({ left: 300, behavior: "smooth" });

    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
      setTimeout(() => {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      }, 2000);
    }
  }

  setInterval(autoScroll, 3000);