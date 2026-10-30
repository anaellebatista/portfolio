
/* ==========================================
   PORTFOLIO — ANAËLLE BATISTA
   JAVASCRIPT VANILLA
========================================== */

"use strict";


/* ==========================================
   01 — MENU DE NAVIGATION MOBILE
========================================== */

// Sélection des éléments

const menuToggle = document.querySelector(
  ".menu-toggle"
);

const menu = document.querySelector(
  "#menu"
);


/* ==========================================
   02 — FERMETURE DU MENU MOBILE
========================================== */

function fermerMenu() {

  if (!menu || !menuToggle) {
    return;
  }

  // Masquer le menu

  menu.classList.remove("open");

  // Mettre à jour son état

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Ouvrir le menu"
  );

}


/* ==========================================
   03 — OUVERTURE / FERMETURE DU MENU
========================================== */

if (menu && menuToggle) {

  menuToggle.addEventListener(
    "click",
    () => {

      const ouvert = menu.classList.toggle(
        "open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(ouvert)
      );

      menuToggle.setAttribute(
        "aria-label",
        ouvert
          ? "Fermer le menu"
          : "Ouvrir le menu"
      );

    }
  );


  // Fermer le menu après un clic sur un lien

  menu.querySelectorAll("a").forEach((lien) => {

    lien.addEventListener(
      "click",
      fermerMenu
    );

  });


  // Fermer le menu avec Échap

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        fermerMenu();
      }

    }
  );


  // Fermer le menu en cliquant à l'extérieur

  document.addEventListener(
    "click",
    (event) => {

      if (
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        fermerMenu();

      }

    }
  );

}


/* ==========================================
   04 — GESTION DES IMAGES
========================================== */

// Afficher un visuel temporaire si une image
// n'a pas encore été ajoutée au portfolio.

document.querySelectorAll("img").forEach((image) => {

  // Image chargée

  image.addEventListener(
    "load",
    () => {

      image.classList.add("is-loaded");

    }
  );


  // Image introuvable

  image.addEventListener(
    "error",
    () => {

      image.classList.remove("is-loaded");

    }
  );


  // Image déjà chargée

  if (
    image.complete &&
    image.naturalWidth > 0
  ) {

    image.classList.add("is-loaded");

  }

});


/* ==========================================
   05 — ANIMATIONS AU DÉFILEMENT
========================================== */

// Sélection des éléments à animer

const elements = document.querySelectorAll(
  ".reveal"
);


// Vérifier les préférences d'accessibilité

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


// Activer les animations si elles sont autorisées

if (
  "IntersectionObserver" in window &&
  !reducedMotion
) {

  const observer = new IntersectionObserver(

    (entrees) => {

      entrees.forEach((entree) => {

        if (entree.isIntersecting) {

          // Afficher l'élément

          entree.target.classList.add(
            "visible"
          );

          // Arrêter de l'observer

          observer.unobserve(
            entree.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  // Observer chaque élément

  elements.forEach((element) => {

    observer.observe(element);

  });

} else {

  // Afficher directement les éléments

  elements.forEach((element) => {

    element.classList.add("visible");

  });

}


/* ==========================================
   06 — GALERIE MES RÉALISATIONS
========================================== */

// Sélection des éléments de la galerie

const galleryTrack = document.querySelector(
  ".gallery-track"
);

const galleryItems = document.querySelectorAll(
  ".gallery-item"
);

const galleryPrev = document.querySelector(
  ".gallery-prev"
);

const galleryNext = document.querySelector(
  ".gallery-next"
);

const galleryCounter = document.querySelector(
  "#gallery-counter"
);

const galleryProgress = document.querySelector(
  "#gallery-progress-bar"
);


/* ==========================================
   07 — CALCUL DE LA POSITION ACTUELLE
========================================== */

function getGalleryIndex() {

  // Vérifier que la galerie existe

  if (!galleryTrack || !galleryItems.length) {
    return 0;
  }


  // Largeur de la première création

  const firstItem = galleryItems[0];

  const itemWidth =
    firstItem.getBoundingClientRect().width;


  // Espacement entre les créations

  const gap = parseFloat(
    getComputedStyle(galleryTrack).gap
  ) || 0;


  // Distance de défilement

  const step = itemWidth + gap;


  // Position actuelle

  return Math.min(
    galleryItems.length - 1,
    Math.max(
      0,
      Math.round(galleryTrack.scrollLeft / step)
    )
  );

}


/* ==========================================
   08 — COMPTEUR ET BARRE DE PROGRESSION
========================================== */

function updateGallery() {

  // Vérifier que la galerie existe

  if (!galleryTrack || !galleryItems.length) {
    return;
  }


  // ========================================
  // COMPTEUR DES CRÉATIONS
  // ========================================

  // Position actuelle

  const index = getGalleryIndex();


  // Nombre total de créations

  const total = galleryItems.length;


  // Numéro actuel

  const current = index + 1;


  // Mettre à jour le compteur
  // Exemple : 01 / 05

  if (galleryCounter) {

    galleryCounter.textContent =
      String(current).padStart(2, "0") +
      " / " +
      String(total).padStart(2, "0");

  }


  // ========================================
  // NOUVELLE BARRE DE PROGRESSION
  // ========================================

  // Calculer la distance totale défilable

  const maxScroll = Math.max(
    0,
    galleryTrack.scrollWidth -
    galleryTrack.clientWidth
  );


  // Calculer le pourcentage de progression
  // selon la position réelle du défilement

  const progression = maxScroll > 0
    ? Math.min(
        100,
        Math.max(
          0,
          (galleryTrack.scrollLeft / maxScroll) * 100
        )
      )
    : 100;


  // Mettre à jour la largeur de la barre

  if (galleryProgress) {

    galleryProgress.style.width =
      progression + "%";

  }


  // ========================================
  // GESTION DES FLÈCHES
  // ========================================

  // Désactiver la flèche gauche au début

  if (galleryPrev) {

    galleryPrev.disabled =
      galleryTrack.scrollLeft <= 2;

  }


  // Désactiver la flèche droite à la fin

  if (galleryNext) {

    galleryNext.disabled =
      galleryTrack.scrollLeft >= maxScroll - 2;

  }

}


/* ==========================================
   09 — DÉFILEMENT VERS UNE CRÉATION
========================================== */

function scrollToGalleryItem(index) {

  // Vérifier que la galerie existe

  if (!galleryTrack || !galleryItems.length) {
    return;
  }


  // Limiter l'index aux créations disponibles

  const targetIndex = Math.max(
    0,
    Math.min(
      index,
      galleryItems.length - 1
    )
  );


  // Sélectionner la création

  const item = galleryItems[targetIndex];


  // Calculer sa position dans la galerie

  const position =
    item.getBoundingClientRect().left -
    galleryTrack.getBoundingClientRect().left +
    galleryTrack.scrollLeft;


  // Lancer le défilement

  galleryTrack.scrollTo({

    left: position,

    behavior: reducedMotion
      ? "auto"
      : "smooth"

  });

}


/* ==========================================
   10 — BOUTON SUIVANT
========================================== */

if (galleryNext) {

  galleryNext.addEventListener(
    "click",
    () => {

      // Passer à la création suivante

      scrollToGalleryItem(
        getGalleryIndex() + 1
      );

    }
  );

}


/* ==========================================
   11 — BOUTON PRÉCÉDENT
========================================== */

if (galleryPrev) {

  galleryPrev.addEventListener(
    "click",
    () => {

      // Revenir à la création précédente

      scrollToGalleryItem(
        getGalleryIndex() - 1
      );

    }
  );

}


/* ==========================================
   12 — MISE À JOUR AUTOMATIQUE
========================================== */

if (galleryTrack) {

  // Actualiser la progression
  // pendant le défilement

  galleryTrack.addEventListener(
    "scroll",
    updateGallery,
    {
      passive: true
    }
  );


  // Actualiser si la fenêtre
  // change de taille

  window.addEventListener(
    "resize",
    updateGallery
  );


  // Initialiser la galerie

  updateGallery();

}


/* ==========================================
   13 — AGRANDISSEMENT DES PHOTOS
========================================== */

// Fenêtre d'agrandissement

const galleryLightbox = document.querySelector(
  "#gallery-lightbox"
);


// Image affichée dans la fenêtre

const galleryLightboxImage = document.querySelector(
  "#gallery-lightbox-image"
);


// Bouton de fermeture

const galleryLightboxClose = document.querySelector(
  ".gallery-lightbox-close"
);


/* ==========================================
   14 — OUVERTURE D'UNE PHOTO
========================================== */

if (
  galleryLightbox &&
  galleryLightboxImage
) {

  // Sélectionner les photos de la galerie

  document.querySelectorAll(
    ".gallery-media img"
  ).forEach((image) => {

    image.addEventListener(
      "click",
      () => {

        // Vérifier que l'image existe

        if (
          !image.complete ||
          !image.naturalWidth
        ) {
          return;
        }


        // Afficher la photo sélectionnée

        galleryLightboxImage.src = image.src;

        galleryLightboxImage.alt = image.alt;


        // Ouvrir la fenêtre

        galleryLightbox.showModal();

      }
    );

  });

}


/* ==========================================
   15 — FERMETURE AVEC LA CROIX
========================================== */

if (
  galleryLightbox &&
  galleryLightboxClose
) {

  galleryLightboxClose.addEventListener(
    "click",
    () => {

      galleryLightbox.close();

    }
  );

}


/* ==========================================
   16 — FERMETURE EN CLIQUANT À L'EXTÉRIEUR
========================================== */

if (galleryLightbox) {

  galleryLightbox.addEventListener(
    "click",
    (event) => {

      if (event.target === galleryLightbox) {

        galleryLightbox.close();

      }

    }
  );

}


/* ==========================================
   17 — GESTION AUTOMATIQUE DES VIDÉOS
========================================== */

// Sélectionner toutes les vidéos de la galerie

const galleryVideos = document.querySelectorAll(
  ".gallery-media video"
);


/* ==========================================
   18 — MISE EN PAUSE DES VIDÉOS NON VISIBLES
========================================== */

if (
  galleryTrack &&
  galleryVideos.length > 0 &&
  "IntersectionObserver" in window
) {

  const videoObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        // Mettre en pause les vidéos
        // qui sortent de la zone visible

        if (!entry.isIntersecting) {

          entry.target.pause();

        }

      });

    },

    {
      root: galleryTrack,
      threshold: 0.2
    }

  );


  // Observer toutes les vidéos

  galleryVideos.forEach((video) => {

    videoObserver.observe(video);

  });

}


/* ==========================================
   19 — ANNÉE AUTOMATIQUE DU FOOTER
========================================== */

// Afficher automatiquement l'année en cours

const yearElement = document.querySelector(
  "#year"
);

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}

/* ==========================================
   20 — MINI-GALERIES DES PASSIONS
========================================== */

// Sélectionner toutes les mini-galeries

const passionCarousels = document.querySelectorAll(
  ".passion-carousel"
);


// Initialiser chaque galerie séparément

passionCarousels.forEach((carousel) => {

  // Sélection des éléments

  const track = carousel.querySelector(
    ".passion-track"
  );

  const slides = carousel.querySelectorAll(
    ".passion-slide"
  );

  const prevButton = carousel.querySelector(
    ".passion-prev"
  );

  const nextButton = carousel.querySelector(
    ".passion-next"
  );


  // Vérifier les éléments nécessaires

  if (
    !track ||
    !slides.length ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }


  /* ========================================
     CALCUL DE LA POSITION
  ======================================== */

  function getCurrentIndex() {

    const slideWidth = track.clientWidth;

    if (slideWidth === 0) {
      return 0;
    }

    return Math.min(
      slides.length - 1,
      Math.max(
        0,
        Math.round(track.scrollLeft / slideWidth)
      )
    );

  }


  /* ========================================
     DÉFILEMENT
  ======================================== */

  function goToSlide(index) {

    // Limiter la position

    const targetIndex = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );


    // Mettre les vidéos en pause
    // avant de changer de média

    track.querySelectorAll("video").forEach((video) => {

      video.pause();

    });


    // Faire défiler

    track.scrollTo({

      left: targetIndex * track.clientWidth,

      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth"

    });

  }


  /* ========================================
     FLÈCHE SUIVANTE
  ======================================== */

  nextButton.addEventListener(
    "click",
    () => {

      goToSlide(
        getCurrentIndex() + 1
      );

    }
  );


  /* ========================================
     FLÈCHE PRÉCÉDENTE
  ======================================== */

  prevButton.addEventListener(
    "click",
    () => {

      goToSlide(
        getCurrentIndex() - 1
      );

    }
  );


  /* ========================================
     ÉTAT DES FLÈCHES
  ======================================== */

  function updateButtons() {

    const maxScroll = Math.max(
      0,
      track.scrollWidth - track.clientWidth
    );

    prevButton.disabled =
      track.scrollLeft <= 2;

    nextButton.disabled =
      track.scrollLeft >= maxScroll - 2;

  }


  // Actualiser les flèches au défilement

  track.addEventListener(
    "scroll",
    updateButtons,
    {
      passive: true
    }
  );


  // Actualiser après un redimensionnement

  window.addEventListener(
    "resize",
    updateButtons
  );


  // Initialisation

  updateButtons();

});


/* ==========================================
   21 — PAUSE DES VIDÉOS HORS DU CADRE
========================================== */

if ("IntersectionObserver" in window) {

  passionCarousels.forEach((carousel) => {

    const track = carousel.querySelector(
      ".passion-track"
    );

    if (!track) {
      return;
    }

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {

            entry.target.pause();

          }

        });

      },

      {
        root: track,
        threshold: 0.2
      }

    );


    // Observer les vidéos de cette galerie

    carousel.querySelectorAll(
      "video"
    ).forEach((video) => {

      observer.observe(video);

    });

  });

}
/* ==========================================
   RETOUR EN HAUT DE LA PAGE
========================================== */

// Sélectionner le bouton

const backToTop = document.querySelector(
  "#back-to-top"
);


// Ajouter l'événement au clic

if (backToTop) {

  backToTop.addEventListener(
    "click",
    (event) => {

      // Empêcher le comportement automatique du lien

      event.preventDefault();


      // Remonter tout en haut de la page

      window.scrollTo({

        top: 0,

        left: 0,

        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"

      });

    }
  );

}
