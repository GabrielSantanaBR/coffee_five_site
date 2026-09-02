(() => {
  const body = document.body;

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        navigation.classList.remove("is-open");
      });
    });
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  if (body.dataset.page !== "menu") return;

  const categoryMeta = [
    {
      id: "cafes",
      label: "Cafés",
      title: "Cafés",
      accent: "Feitos com café da Five Roasters, nossa própria torrefação.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Espresso-1536x2048.webp"
    },
    {
      id: "refrescantes",
      label: "Refrescantes",
      title: "Refrescantes",
      accent: "Para desacelerar, refrescar e continuar o dia com sabor.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Espresso-tonica.jpg"
    },
    {
      id: "tea-cafe",
      label: "Tea Café",
      title: "Tea Café",
      accent: "Chás e infusões preparados com a mesma atenção que o café.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Coco-Matcha-1536x2048.webp"
    },
    {
      id: "docinhos",
      label: "Docinhos",
      title: "Docinhos",
      accent: "Pequenas alegrias para acompanhar sua pausa.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/brigadeiros-1536x2048.webp"
    },
    {
      id: "comidinhas",
      label: "Comidinhas",
      title: "Comidinhas",
      accent: "Preparadas para deixar sua pausa ainda mais gostosa.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pao-de-queijo-1536x2048.webp"
    },
    {
      id: "drinks",
      label: "Drinks",
      title: "Drinks",
      accent: "Clássicos e criações da casa para maiores de 18 anos.",
      image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Irish-Coffee-Glenfiddich-1536x2048.webp"
    }
  ];

  const menuItems = [
    { category: "cafes", name: "Espresso", price: "10,00", description: "", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Espresso-1536x2048.webp" },
    { category: "cafes", name: "Espresso Duplo", price: "14,00", description: "Dose dupla.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Duplo-1536x2048.webp" },
    { category: "cafes", name: "Espresso Visitante", price: "20,00", description: "Grão à sua escolha. Pergunte ao nosso barista.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Duplo-Espresso.webp" },
    { category: "cafes", name: "Dose de Chantilly", price: "5,00", description: "Creme de leite fresco com xarope de amêndoas ou baunilha.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Dose-de-chantilly-1536x2048.webp" },
    { category: "cafes", name: "Macchiato", price: "12,00", description: "Espresso manchado com leite.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Machiatto-1-1536x2048.jpg" },
    { category: "cafes", name: "Cappuccino", price: "18,00", description: "Café com leite estilo italiano (leite integral ou vegetal).", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/cappuccino-1536x2048.webp" },
    { category: "cafes", name: "Flat White", price: "20,00", description: "Dose dupla de espresso com leite vaporizado.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Flat-white-1536x2048.jpg" },
    { category: "cafes", name: "Chococcino", price: "23,00", description: "Cacau 50% com café e leite vaporizado (leite integral ou vegetal).", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Chococcino-2.jpg" },
    { category: "cafes", name: "Mocaccino", price: "23,00", description: "Base de chocolate ou caramelo, leite vaporizado e café.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Mocaccino-1-1536x2048.webp" },
    { category: "cafes", name: "Café Filtrado", price: "16,00", description: "Grãos sazonais. Pergunte ao nosso barista. Não fracionamos.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Filtrado-1536x2048.jpg" },
    { category: "cafes", name: "O Chocolate", price: "17,00", description: "Chocolate nobre, com leite e creme de leite fresco para dar um toque de cremosidade.", image: "https://coffeefive.com.br/wp-content/uploads/2025/07/O-chocolate-1536x2048.jpg" },
    { category: "cafes", name: "Cortado do Five", price: "18,00", description: "Dose dupla curta de espresso com leite levemente vaporizado (leite integral ou vegetal).", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Flat-white-1536x2048.jpg" },

    { category: "refrescantes", name: "Espresso Tônica", price: "20,00", description: "Espresso com água tônica Schweppes e gelo.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Espresso-tonica.jpg" },
    { category: "refrescantes", name: "Iced Coffee", price: "17,00", description: "Café filtrado sobre gelo.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/2-1536x2048.jpg" },
    { category: "refrescantes", name: "Iced Latte", price: "18,00", description: "Gelo, leite e café espresso gelado cremoso (leite integral ou vegetal).", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/3.jpg" },
    { category: "refrescantes", name: "Iced Vibes", price: "21,00", description: "Gelo, leite e espresso cremoso com uma base à escolha: avelã, baunilha, caramelo ou coco.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/3.jpg" },
    { category: "refrescantes", name: "Água", price: "6,00", description: "Com ou sem gás.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Agua-que-usamos-1536x2048.webp" },
    { category: "refrescantes", name: "Água de Coco", price: "12,00", description: "Marca: Coco Legal.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Agua-de-Coco-1536x2048.webp" },
    { category: "refrescantes", name: "Suco de Laranja", price: "13,00", description: "Marca: Coco Legal.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Suco-de-laranja-1536x2048.webp" },
    { category: "refrescantes", name: "Água Tônica", price: "14,00", description: "Schweppes.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Agua-que-usamos-1536x2048.webp" },
    { category: "refrescantes", name: "Cold Brew", price: "17,00", description: "Café extraído a frio por 8 horas.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cold-scaled.jpg" },

    { category: "tea-cafe", name: "Coconut", price: "28,00", description: "Autoria do barista George Leonardo: água de coco, xarope de coco e matcha.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Coco-Matcha-1536x2048.webp" },
    { category: "tea-cafe", name: "Chá V60", price: "17,00", description: "Chá verde preparado no filtro de papel: uma bebida leve e limpa.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cha-Japones-scaled.webp" },
    { category: "tea-cafe", name: "Matcha Moka", price: "21,00", description: "Base de chocolate branco, nude ou matcha.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Moka-matcha-scaled.webp" },
    { category: "tea-cafe", name: "Chá Chinês", price: "15,00", description: "Serviço tradicional. Você conhece o Gaiwan?", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cha-Chines-scaled.webp" },
    { category: "tea-cafe", name: "Cold Brew Tea", price: "17,00", description: "Chá preto extraído por 8 horas: leve, naturalmente adocicado e complexo.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cold-scaled.jpg" },
    { category: "tea-cafe", name: "Chá Japonês", price: "14,00", description: "Serviço tradicional. Você conhece o Kyusu?", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cha-Japones-scaled.webp" },
    { category: "tea-cafe", name: "Escolha da Expert", price: "20,00", description: "Rafaela Nascimento compartilha chás nobres e peculiares do seu acervo pessoal.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Escolha-do-especialista-scaled.webp" },
    { category: "tea-cafe", name: "Matcha", price: "15,00", description: "Concentrado de chá verde: bebida cerimonial do Japão.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Matcha-puro-scaled.jpg" },
    { category: "tea-cafe", name: "Exp. Flight de Chás", price: "22,00", description: "Degustação e comparação de chás da mesma família com sensoriais diferentes.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Experiencia-Flight-scaled.webp" },
    { category: "tea-cafe", name: "Matcha Nude", price: "18,00", description: "Bebida cremosa à base de aveia e matcha. Escolha gelado ou quente.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Matcha-Nude-scaled.jpg" },
    { category: "tea-cafe", name: "Mate da Casa", price: "14,00", description: "Puro ou batido com xarope de limão ou pêssego.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Mate-scaled.jpg" },
    { category: "tea-cafe", name: "Matcha Latte", price: "18,00", description: "Clássico matcha com leite, gelado ou quente.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Matcha-latte-scaled.webp" },
    { category: "tea-cafe", name: "Infusão", price: "18,00", description: "Quente. Pergunte ao barista qual é o sabor do dia.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cha-Japones-scaled.webp" },
    { category: "tea-cafe", name: "Matcha Tônica", price: "21,00", description: "Matcha com água tônica e gelo.", image: "https://coffeefive.com.br/wp-content/uploads/2025/11/Tonica-matcha-1-scaled.jpg" },
    { category: "tea-cafe", name: "Matcha Vibes", price: "21,00", description: "Matcha gelado com nude e xarope de baunilha, avelã ou coco.", image: "https://coffeefive.com.br/wp-content/uploads/2025/12/WhatsApp-Image-2026-01-26-at-16.38.21.jpeg" },
    { category: "tea-cafe", name: "Matcha Fruit", price: "25,00", description: "Matcha gelado com nude e geleia de frutas vermelhas.", image: "https://coffeefive.com.br/wp-content/uploads/2025/12/Matcha-fruit-scaled.jpg" },

    { category: "docinhos", name: "Brigadeiro", price: "9,00", description: "Diversos sabores de pequena alegria. Pergunte aos baristas.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/brigadeiros-scaled.webp" },
    { category: "docinhos", name: "Cookie", price: "13,00", description: "Mix de chocolate.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/WhatsApp-Image-2026-05-27-at-10.02.13-e1779887057391.jpeg" },
    { category: "docinhos", name: "Bolos Especiais", price: "30,00", description: "A cada dia, um bolo diferente para adoçar a sua pausa.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/nos-bolos-scaled.webp" },
    { category: "docinhos", name: "Cheesecake", price: "25,00", description: "Geleia de goiabada ou frutas vermelhas.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cheesecake-scaled.webp" },
    { category: "docinhos", name: "Pão de Mel", price: "14,00", description: "Produzido pela Santo Favo. Caramelo salgado ou nozes com doce de leite.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/brigadeiros-scaled.webp" },
    { category: "docinhos", name: "Banoffee", price: "25,00", description: "Clássica banoffee brasileira: base de biscoito amanteigado, doce de leite, bananas, chantilly e canela polvilhada.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Cheesecake-scaled.webp" },

    { category: "comidinhas", name: "Misto", price: "20,00", description: "Queijo minas curado, presunto e cream cheese no pão Petrópolis.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pastel-frango-e-palmito-scaled.webp" },
    { category: "comidinhas", name: "Pão de Queijo", price: "14,00", description: "Tapioca e queijo parmesão. Porção com 5 unidades.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pao-de-queijo-1536x2048.webp" },
    { category: "comidinhas", name: "Toast c/ Ovos Mexidos", price: "25,00", description: "Pão sourdough com ovos cremosos, queijo e bacon decorado.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pao-de-queijo-1536x2048.webp" },
    { category: "comidinhas", name: "Queijo Quente", price: "20,00", description: "Queijo quente feito com queijo minas curado e cream cheese no pão brioche.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pastel-frango-e-palmito-scaled.webp" },
    { category: "comidinhas", name: "Croissant", price: "18,00", description: "Escolha até 3 acompanhamentos: manteiga, geleia, cream cheese ou mel.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Pao-de-queijo-1536x2048.webp" },

    { category: "drinks", group: "Irish Coffee", name: "Jameson", price: "38,00", description: "White.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Irish-Coffee-Jameson-scaled.webp", alcohol: true },
    { category: "drinks", group: "Irish Coffee", name: "Glenfiddich", price: "60,00", description: "12 anos.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Irish-Coffee-Glenfiddich-scaled.webp", alcohol: true },
    { category: "drinks", group: "Irish Coffee", name: "Glenmorangie", price: "100,00", description: "Nectar D'Or.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Irish-Coffee-Glenmorange-scaled.webp", alcohol: true },
    { category: "drinks", group: "Espresso Gin Tônica", name: "Apogee", price: "30,00", description: "", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Gin-Tonica-Apogee-scaled.webp", alcohol: true },
    { category: "drinks", group: "Espresso Gin Tônica", name: "Bulldog", price: "35,00", description: "", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Gin-Tonica-bulldog-scaled.webp", alcohol: true },
    { category: "drinks", group: "Espresso Gin Tônica", name: "Roku", price: "40,00", description: "", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Gim-Tonica-Roku-scaled.webp", alcohol: true },
    { category: "drinks", group: "Espresso Gin Tônica", name: "Hedrick's", price: "45,00", description: "", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Gin-Tonica-Hedrick-scaled.webp", alcohol: true },
    { category: "drinks", group: "Martinis do Five", name: "Matcha Martini", price: "45,00", description: "Água de coco, matcha, vodka e xarope de coco.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Matcha-martini-scaled.jpg", alcohol: true },
    { category: "drinks", group: "Martinis do Five", name: "Espresso Martini", price: "42,00", description: "Vodka, espresso duplo curto, licor de café e xarope de caramelo.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/Espresso-Martini.webp", alcohol: true },
    { category: "drinks", group: "Drinks", name: "White Russian", price: "42,00", description: "Vodka, licor de café e creme de leite.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/WhatsApp-Image-2026-05-28-at-17.14.58.jpeg", alcohol: true },
    { category: "drinks", group: "Drinks", name: "Espresso Sour", price: "40,00", description: "Whisky, mel, limão e espresso.", image: "https://coffeefive.com.br/wp-content/uploads/2025/06/WhatsApp-Image-2026-05-28-at-17.36.40-e1780001345373.jpeg", alcohol: true },
    { category: "drinks", group: "Drinks", name: "Florin", price: "21,00", description: "Refrigerante de café com gengibre, mix de limão, mel e espresso. Pode adicionar gin + R$ 10.", image: "https://coffeefive.com.br/wp-content/uploads/2025/08/Florin-scaled.jpg" },
    { category: "drinks", group: "Drinks", name: "La Cura", price: "26,00", description: "Mocktail autoral de Yasmim: espresso, gengibre, lemonade, hortelã e mel. Pode adicionar cachaça + R$ 6.", image: "https://coffeefive.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-05-22-at-16.02.391.jpg" }
  ];

  const filtersNode = document.getElementById("menuFilters");
  const catalogueNode = document.getElementById("menuCatalogue");
  const emptyNode = document.getElementById("menuEmpty");
  const searchInput = document.getElementById("menuSearch");
  const clearSearchButton = document.getElementById("clearSearch");
  let currentCategory = "todos";
  let currentSearch = "";

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const categoryFromHash = () => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    return categoryMeta.some((category) => category.id === hash) ? hash : "todos";
  };

  const renderFilters = () => {
    const options = [{ id: "todos", label: "Tudo" }, ...categoryMeta];
    filtersNode.innerHTML = options.map((option) => `
      <button class="menu-filter ${option.id === currentCategory ? "is-active" : ""}" type="button" data-category="${option.id}" aria-pressed="${option.id === currentCategory}">${option.label}</button>
    `).join("");

    filtersNode.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category;
        currentSearch = "";
        searchInput.value = "";
        if (currentCategory === "todos") {
          history.replaceState(null, "", window.location.pathname);
        } else {
          history.replaceState(null, "", `#${currentCategory}`);
        }
        renderMenu();
        document.getElementById("menuCatalogue").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const itemMarkup = (item, fallbackImage) => {
    const itemImage = item.image || fallbackImage;
    const alcohol = item.alcohol ? '<span class="menu-item-alcohol">18+</span>' : "";
    const description = item.description ? `<p class="menu-item-desc">${item.description}</p>` : "";
    return `
      <article class="menu-item">
        <div class="menu-item-image"><img src="${itemImage}" alt="" loading="lazy" /></div>
        <div class="menu-item-copy">
          <h3 class="menu-item-title">${item.name}${alcohol}</h3>
          ${description}
        </div>
        <div class="menu-item-price"><small>R$</small>${item.price}</div>
      </article>
    `;
  };

  const renderCategory = (category, index, items) => {
    let previousGroup = "";
    const cards = items.map((item) => {
      const group = item.group && item.group !== previousGroup
        ? `<p class="menu-subgroup">${item.group}</p>`
        : "";
      previousGroup = item.group || "";
      return `${group}${itemMarkup(item, category.image)}`;
    }).join("");

    return `
      <section class="menu-category" id="${category.id}" aria-labelledby="${category.id}-title">
        <header class="menu-category-header">
          <div><span class="menu-category-index">0${index + 1}</span><h2 id="${category.id}-title">${category.title}</h2></div>
          <p>${category.accent}</p>
        </header>
        <div class="menu-grid">${cards}</div>
      </section>
    `;
  };

  const renderMenu = () => {
    const searchable = normalize(currentSearch.trim());
    const visibleCategories = currentCategory === "todos"
      ? categoryMeta
      : categoryMeta.filter((category) => category.id === currentCategory);

    const sections = visibleCategories.map((category) => {
      const items = menuItems.filter((item) => {
        const categoryMatches = item.category === category.id;
        const text = normalize(`${item.name} ${item.description} ${item.group || ""}`);
        return categoryMatches && (!searchable || text.includes(searchable));
      });
      return items.length ? renderCategory(category, categoryMeta.indexOf(category), items) : "";
    }).join("");

    catalogueNode.innerHTML = sections;
    emptyNode.hidden = Boolean(sections);
    renderFilters();
  };

  const focusSelectedCategory = (behavior = "smooth") => {
    if (currentCategory === "todos") return;
    document.getElementById(currentCategory)?.scrollIntoView({ behavior, block: "start" });
  };

  currentCategory = categoryFromHash();
  renderMenu();
  if (currentCategory !== "todos") {
    requestAnimationFrame(() => focusSelectedCategory("auto"));
  }

  searchInput.addEventListener("input", (event) => {
    currentSearch = event.target.value;
    renderMenu();
  });

  clearSearchButton.addEventListener("click", () => {
    currentSearch = "";
    currentCategory = "todos";
    searchInput.value = "";
    history.replaceState(null, "", window.location.pathname);
    renderMenu();
  });

  window.addEventListener("hashchange", () => {
    currentCategory = categoryFromHash();
    currentSearch = "";
    searchInput.value = "";
    renderMenu();
    requestAnimationFrame(() => focusSelectedCategory("smooth"));
  });
})();
