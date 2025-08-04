class CafeAnimations {
  constructor() {
    // Initialisation des animations
    this.initAnimations();
    this.initEventListeners();
    this.animateOnScroll();
  }

  //! Initialise les animations au chargement de la page
  initAnimations() {
    const discoverBtn = document.querySelector("header button");
    if (discoverBtn) {
      discoverBtn.addEventListener("click", () => {
        this.animateButtonClick(discoverBtn);
      });
    }

    // Animation des cartes de café au survol
    this.setupCardHoverEffects();
  }

  //! Initialise les écouteurs d'événements
  initEventListeners() {
    // Animation douce lors du clic sur les liens de navigation
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  //! Configure les effets de survol pour les cartes
  setupCardHoverEffects() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.querySelector(".left").style.transform = "translateX(5px)";
        card.querySelector(".right img").style.transform = "scale(1.03)";
      });

      card.addEventListener("mouseleave", () => {
        card.querySelector(".left").style.transform = "translateX(0)";
        card.querySelector(".right img").style.transform = "scale(1)";
      });
    });
  }

  //! Anime le bouton lors du clic
  animateButtonClick(button) {
    button.style.transform = "scale(0.95)";
    button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";

      // Faire défiler jusqu'à la section des produits
      const productsSection = document.querySelector("#products");
      if (productsSection) {
        window.scrollTo({
          top: productsSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }, 200);
  }

  //! Anime les éléments lorsqu'ils apparaissent à l'écran
  animateOnScroll() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    // Observer pour les cartes de café
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".card").forEach((card) => {
      cardObserver.observe(card);
    });

    // Observer pour la carte Google Maps
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          mapObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const mapContainer = document.querySelector(".map");
    if (mapContainer) {
      mapObserver.observe(mapContainer);
    }

    // Observer pour les spécialités du footer
    const specialitesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200);
          specialitesObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".specialite").forEach((specialite) => {
      specialitesObserver.observe(specialite);
    });

    // NOUVEAU : Observer pour les faits sur le café (fact-item)
    const factsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150); // Délai progressif pour un effet en cascade
          factsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fact-item").forEach((fact) => {
      factsObserver.observe(fact);
    });

    // Observer pour les cartes de bienfaits
    const benefitsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          benefitsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".benefit-card").forEach((card) => {
      benefitsObserver.observe(card);
    });
  }
}

//! Initialisation des animations lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new CafeAnimations();
});
