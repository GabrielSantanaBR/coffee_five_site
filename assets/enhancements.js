(() => {
  const LANGUAGES = [
    ["pt", "Português (Brasil)"],
    ["en", "English"],
    ["es", "Español"],
    ["zh-CN", "中文"],
    ["fr", "Français"],
    ["it", "Italiano"]
  ];

  const SCHOOL_FALLBACK = "https://coffeefive.com.br/wp-content/uploads/elementor/thumbs/Coffee-Five-101-pc3uqiwr8wp4tai2bbdrlyu43r0ebkoip0qnpiwwjg.jpg";
  const ROASTER_FALLBACK = "https://coffeefive.com.br/wp-content/uploads/2025/07/Imagem-do-WhatsApp-de-2025-07-04-as-16.51.47_f5ea9e16-scaled.webp";

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

      /* Cards "Também é Coffee Five": imagem inteira sem criar grandes vazios. */
      .five-world .container { width:min(1260px, calc(100% - 48px)); }
      .five-world .world-grid { gap:20px; }
      .five-world .world-card {
        grid-template-columns:minmax(0, 48%) minmax(0, 52%);
        min-height:310px;
        border:1px solid rgba(54,35,22,.08);
        box-shadow:0 12px 30px rgba(60,38,19,.08);
        background:var(--white);
      }
      .five-world .world-card-media {
        position:relative;
        min-width:0;
        min-height:310px;
        overflow:hidden;
        isolation:isolate;
        background:#e7dac5;
      }
      .five-world .world-card-media::before {
        content:"";
        position:absolute;
        inset:-24px;
        z-index:-2;
        background-image:var(--media-image);
        background-size:cover;
        background-position:center;
        filter:blur(20px) saturate(.86) brightness(.88);
        transform:scale(1.08);
        opacity:.48;
      }
      .five-world .world-card-media::after {
        content:"";
        position:absolute;
        inset:0;
        z-index:-1;
        background:linear-gradient(145deg,rgba(244,234,216,.20),rgba(37,24,17,.10));
      }
      .five-world .world-card-media > img {
        width:100%;
        height:310px;
        object-fit:contain;
        object-position:center;
        padding:8px;
        filter:drop-shadow(0 6px 14px rgba(37,24,17,.12));
        image-rendering:auto;
      }
      .five-world .world-card > div:not(.world-card-media) { padding:30px 22px; }
      .five-world .world-card h3 { font-size:27px; }
      .five-world .world-card p { font-size:12.5px; }

      .about-images img.cf5-about-image { object-fit:cover; }

      @media (max-width: 1020px) {
        .five-world .world-grid { grid-template-columns:1fr; }
        .five-world .world-card {
          grid-template-columns:minmax(240px, 42%) minmax(0, 1fr);
          min-height:270px;
        }
        .five-world .world-card-media { min-height:270px; }
        .five-world .world-card-media > img { height:270px; }
        .five-world .world-card > div:not(.world-card-media) { min-height:0; padding:26px 24px; }
      }

      @media (max-width: 900px) {
        .cf5-language { margin:10px 0 0; width:100%; }
        .cf5-language select { width:100%; }
      }

      @media (max-width: 650px) {
        .five-world .container { width:min(100% - 32px, 1180px); }
        .five-world .world-card { grid-template-columns:1fr; min-height:0; }
        .five-world .world-card-media {
          min-height:0;
          aspect-ratio:4 / 3;
        }
        .five-world .world-card-media > img {
          height:100%;
          min-height:0;
          padding:7px;
        }
        .five-world .world-card > div:not(.world-card-media) { padding:22px 20px 24px; }
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

  const enhanceWorldCards = () => {
    document.querySelectorAll(".world-card").forEach((card) => {
      if (card.querySelector(".world-card-media")) return;
      const img = card.querySelector(":scope > img");
      if (!img) return;

      const media = document.createElement("div");
      media.className = "world-card-media";
      card.insertBefore(media, img);
      media.appendChild(img);

      const refreshBackdrop = () => {
        media.style.setProperty("--media-image", `url(\"${img.currentSrc || img.src}\")`);
      };

      const applyFallback = () => {
        if (img.dataset.cf5FallbackApplied) return;
        img.dataset.cf5FallbackApplied = "1";

        if (img.src.includes("coffee-five-escola.webp")) {
          img.src = SCHOOL_FALLBACK;
        } else if (img.src.includes("five-roasters-torrefacao.webp") || img.src.includes("Imagem-do-WhatsApp-de-2025-07-04")) {
          img.src = ROASTER_FALLBACK;
        }
      };

      img.addEventListener("load", refreshBackdrop);
      img.addEventListener("error", applyFallback);
      refreshBackdrop();

      if (img.complete && img.naturalWidth === 0) applyFallback();
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
  enhanceWorldCards();
  replaceIrrelevantAboutImages();
  mountHeroVideo();
})();
