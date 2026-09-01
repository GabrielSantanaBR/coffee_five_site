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
      .cf5-translate-hidden { position:absolute!important; width:1px!important; height:1px!important; overflow:hidden!important; clip:rect(0 0 0 0)!important; white-space:nowrap!important; }
      .goog-te-banner-frame.skiptranslate { display:none!important; }
      body { top:0!important; }
      .hero.has-cf5-video .hero-backdrop { opacity:.16; }
      .cf5-hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; z-index:0; filter:saturate(.96) contrast(1.03) brightness(.86); transform:scale(1.015); }
      .hero.has-cf5-video::after { background:linear-gradient(90deg,rgba(34,20,12,.92) 0%,rgba(34,20,12,.72) 38%,rgba(34,20,12,.22) 76%,rgba(34,20,12,.46) 100%),linear-gradient(0deg,rgba(24,15,10,.45),transparent 50%); content:""; inset:0; pointer-events:none; position:absolute; z-index:1; }
      .hero.has-cf5-video .hero-layout, .hero.has-cf5-video .hero-scroll { z-index:2; }
      .world-card img.cf5-image-fixed { object-fit:cover; }
      @media (max-width: 900px) {
        .cf5-language { margin: 10px 0 0; }
        .cf5-language select { width:100%; }
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

    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    holder.className = "cf5-translate-hidden";
    document.body.appendChild(holder);

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new google.translate.TranslateElement({ pageLanguage: "pt", includedLanguages: "en,es,zh-CN,fr,it", autoDisplay: false }, "google_translate_element");
      }
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    select.addEventListener("change", (event) => {
      const lang = event.target.value;
      if (lang === "pt") {
        document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        window.location.reload();
        return;
      }
      const trySelect = () => {
        const combo = document.querySelector(".goog-te-combo");
        if (!combo) return false;
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
        return true;
      };
      if (!trySelect()) {
        setTimeout(trySelect, 700);
        setTimeout(trySelect, 1600);
      }
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
    video.poster = "https://coffeefive.com.br/wp-content/uploads/2025/06/img_slide_Home01-KNVSER2.jpg";
    video.src = "./assets/coffee-five-hero.mp4";
    video.addEventListener("error", () => video.remove(), { once: true });
    video.addEventListener("canplay", () => hero.classList.add("has-cf5-video"), { once: true });
    hero.prepend(video);
  };

  ensureStyles();
  mountLanguageSelector();
  fixBrokenWorldImages();
  mountHeroVideo();
})();
