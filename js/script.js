// Sticky Header
window.addEventListener("scroll", () => {
  const header = document.getElementById("header")
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// ハンバーガーメニューの制御
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector(".nav")

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      nav.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })

    // メニュー内のリンクをクリックしたらメニューを閉じる
    const navLinks = nav.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        nav.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })

    // 画面外クリックでメニューを閉じる
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains("active")) {
        menuToggle.classList.remove("active")
        nav.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })
  }
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      // スマホ表示時はヘッダーの高さが異なるため、動的に計算
      const headerHeight = document.getElementById("header").offsetHeight

      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: "smooth",
      })
    }
  })
})

// Set Current Year in Footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
})

// EmailJSの初期化（自分のPublic Keyを使用）
// emailjs is expected to be loaded via CDN or similar, so we don't need to declare it.
// Make sure EmailJS is properly set up in your HTML file.
emailjs.init("96ekt9SeTogWcGdJj") // ← ここは自分の公開キーに差し替え！

// DOMが読み込まれたらフォーム送信イベントを設定
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault() // フォームのデフォルト送信を防止

      // EmailJSの送信処理
      emailjs.sendForm("service_x1azleg", "template_c8hpb09", this).then(
        () => {
          alert("メッセージが送信されました！")
          form.reset() // フォームをリセット
        },
        (error) => {
          console.error("送信エラー:", error)
          alert("送信に失敗しました。もう一度お試しください。")
        },
      )
    })
  } else {
    console.warn("フォームが見つかりませんでした。IDが正しいか確認してください。")
  }
})

// Create cosmic particles
function createCosmicParticles() {
  const sections = document.querySelectorAll(".cosmic-particles")

  sections.forEach((section) => {
    // モバイル端末では粒子の数を減らす
    const isMobile = window.innerWidth <= 768
    const particleCount = isMobile ? 25 : 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Random size
      const size = Math.random() * 3 + 1

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.3

      // Random animation duration
      const duration = Math.random() * 20 + 10

      // Apply styles
      particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px rgba(96, 165, 250, 0.8);
        animation: float ${duration}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
      `

      section.appendChild(particle)
    }
  })
}

// Animation for cosmic particles
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-20px) translateX(10px);
      }
      50% {
        transform: translateY(0) translateX(20px);
      }
      75% {
        transform: translateY(20px) translateX(10px);
      }
    }
  </style>
`,
)

// クリック時の神秘的な演出
document.addEventListener("click", (e) => {
  // ボタン以外の要素をクリックした場合の演出
  if (!e.target.closest(".btn")) {
    const ripple = document.createElement("div")
    ripple.classList.add("cosmic-ripple")

    ripple.style.cssText = `
      position: fixed;
      top: ${e.clientY}px;
      left: ${e.clientX}px;
      width: 5px;
      height: 5px;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      animation: cosmic-ripple 1s ease-out forwards;
    `

    document.body.appendChild(ripple)

    setTimeout(() => {
      document.body.removeChild(ripple)
    }, 1000)
  }
})

// 神秘的な演出のアニメーション
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    @keyframes cosmic-ripple {
      0% {
        width: 5px;
        height: 5px;
        opacity: 0.7;
      }
      100% {
        width: 100px;
        height: 100px;
        opacity: 0;
      }
    }
  </style>
`,
)

// ウィンドウサイズ変更時の処理
window.addEventListener("resize", () => {
  // モバイルメニューが開いている状態でデスクトップサイズになった場合、メニューを閉じる
  if (window.innerWidth > 768) {
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector(".nav")

    if (menuToggle && nav && nav.classList.contains("active")) {
      menuToggle.classList.remove("active")
      nav.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  }
})

// Initialize any interactive elements when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  createCosmicParticles()

  // 画像の遅延読み込み
  const lazyImages = document.querySelectorAll("img[data-src]")
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // IntersectionObserverがサポートされていない場合のフォールバック
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
    })
  }
})
