(() => {
  const LANGUAGES = [
    ["pt", "Português (Brasil)"],
    ["en", "English"],
    ["es", "Español"],
    ["zh-CN", "中文"],
    ["fr", "Français"],
    ["it", "Italiano"]
  ];

  const ensureStyles = () => {
    if (document.getElementById("cf5-enhancement-styles")) return;
    const style = document.createElement("style");
    style.id = "cf5-enhancement-styles";
    style.textContent = `
      .cf5-language { position: relative; display: inline-flex; align-items: center; margin-left: 14px; }
      .cf5-language select { appearance: none; background: transparent; border: 1px solid rgba(37,24,17,.18); border-radius: 999px; color: #251811; cursor: pointer; font: 700 11px/1 "DM Sans",Arial,sans-serif; letter-spacing:.04em; min-height:38px; padding:0 28px 0 12px; }
      .cf5-language::after { content:"⌄"; color:#65918c; font-size:13px; pointer-events:none; position:absolute; right:11px; top:10px; }
      .hero.has-cf5-video .hero-backdrop { opacity:.16; }
      .cf5-hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; z-index:0; filter:saturate(.96) contrast(1.03) brightness(.86); transform:scale(1.015); }
      .hero.has-cf5-video::after { background:linear-gradient(90deg,rgba(34,20,12,.92) 0%,rgba(34,20,12,.72) 38%,rgba(34,20,12,.22) 76%,rgba(34,20,12,.46) 100%),linear-gradient(0deg,rgba(24,15,10,.45),transparent 50%); content:""; inset:0; pointer-events:none; position:absolute; z-index:1; }
      .hero.has-cf5-video .hero-layout, .hero.has-cf5-video .hero-scroll { z-index:2; }

      /* Cards "Também é Coffee Five": mais área útil sem cortar as fotos. */
      .five-world .container { width:min(1260px, calc(100% - 48px)); }
      .five-world .world-grid { gap:22px; }
      .five-world .world-card {
        grid-template-columns:48% minmax(0, 1fr);
        min-height:330px;
        border:1px solid rgba(54,35,22,.08);
        box-shadow:0 10px 28px rgba(60,38,19,.07);
      }
      .five-world .world-card > img,
      .five-world .world-card img.cf5-image-fixed {
        width:100%;
        height:330px;
        min-height:330px;
        padding:10px;
        background:linear-gradient(145deg,#eee3d1,#e6d8c2);
        object-fit:contain;
        object-position:center;
        image-rendering:auto;
      }
      .five-world .world-card > div { padding:30px 22px; }
      .five-world .world-card h3 { font-size:27px; }
      .five-world .world-card p { font-size:12.5px; }

      .about-images img.cf5-about-image { object-fit:cover; }

      @media (max-width: 1020px) {
        .five-world .world-card { grid-template-columns:1fr; min-height:0; }
        .five-world .world-card > img,
        .five-world .world-card img.cf5-image-fixed {
          width:100%;
          height:auto;
          min-height:0;
          max-height:320px;
          aspect-ratio:4 / 3;
          object-fit:contain;
        }
        .five-world .world-card > div { min-height:205px; }
      }

      @media (max-width: 900px) {
        .cf5-language { margin: 10px 0 0; width:100%; }
        .cf5-language select { width:100%; }
      }

      @media (max-width: 780px) {
        .five-world .container { width:min(100% - 32px, 1180px); }
        .five-world .world-card { grid-template-columns:44% minmax(0,1fr); min-height:250px; }
        .five-world .world-card > img,
        .five-world .world-card img.cf5-image-fixed {
          height:250px;
          min-height:250px;
          max-height:none;
          aspect-ratio:auto;
          padding:8px;
        }
        .five-world .world-card > div { min-height:0; padding:22px 20px; }
      }

      @media (max-width: 520px) {
        .five-world .world-card { grid-template-columns:1fr; }
        .five-world .world-card > img,
        .five-world .world-card img.cf5-image-fixed {
          height:auto;
          min-height:0;
          aspect-ratio:4 / 3;
          padding:8px;
        }
        .five-world .world-card > div { padding:20px; }
      }
    `;
    document.head.appendChild(style);
  };

  const mountLanguageSelector = () => {
    const nav = document.querySelector(".primary-nav");
    if (!nav || document.querySelector(".cf5-language")) return;

    const wrapper = document.createElement("label");
    wrapper.className = "cf5-language";
    wrapper.setAttribute("aria-label", "Idioma");
    const select = document.createElement("select");
    select.id = "cf5-language-select";
    select.innerHTML = LANGUAGES.map(([code, label]) => `<option value="${code}">${label}</option>`).join("");
    wrapper.appendChild(select);
    nav.appendChild(wrapper);

    select.addEventListener("change", (event) => {
      const lang = event.target.value;
      if (lang === "pt") return;
      const sourceUrl = window.location.href;
      window.location.assign(`https://translate.google.com/translate?sl=pt&tl=${encodeURIComponent(lang)}&u=${encodeURIComponent(sourceUrl)}`);
    });
  };

  const fixBrokenWorldImages = () => {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        if (img.dataset.cf5Fixed) return;
        if (img.src.includes("Imagem-do-WhatsApp-de-2025-07-04")) {
          img.dataset.cf5Fixed = "1";
          img.src = "https://coffeefive.com.br/wp-content/uploads/2025/06/87utj.webp";
          img.classList.add("cf5-image-fixed");
        }
      });
    });
  };

  const replaceIrrelevantAboutImages = () => {
    const primary = document.querySelector(".about-image-primary img");
    const secondary = document.querySelector(".about-image-secondary img");
    if (primary) {
      primary.src = "https://coffeefive.com.br/wp-content/uploads/2025/06/img_slide_Home01-KNVSER2.jpg";
      primary.alt = "Coffee Five — preparo de café especial";
      primary.classList.add("cf5-about-image");
    }
    if (secondary) {
      secondary.src = "https://coffeefive.com.br/wp-content/uploads/2025/06/87utj.webp";
      secondary.alt = "Ambiente da Coffee Five no Centro do Rio";
      secondary.classList.add("cf5-about-image");
    }
  };

  const mountHeroVideo = () => {
    const hero = document.querySelector(".hero");
    if (!hero || document.querySelector(".cf5-hero-video")) return;
    const video = document.createElement("video");
    video.className = "cf5-hero-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = "./assets/coffee-five-hero.mp4";
    video.addEventListener("error", () => video.remove(), { once: true });
    video.addEventListener("canplay", () => hero.classList.add("has-cf5-video"), { once: true });
    hero.prepend(video);
  };

  ensureStyles();
  mountLanguageSelector();
  fixBrokenWorldImages();
  replaceIrrelevantAboutImages();
  mountHeroVideo();
})();
