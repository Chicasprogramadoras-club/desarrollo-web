
  document.addEventListener("DOMContentLoaded", async function () {
    const reviewContainer = document.getElementById("review-container");

    try {
      const response = await fetch("asset/data/review.json"); // Cambia esto a la URL de tu API si es necesario
      const data = await response.json();

      data.forEach(resena => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide", "flex", "justify-center");

        slide.innerHTML = `
          <div class="p-6 text-center">
            <img src="${resena.imagen}" class="w-30 h-5 mx-auto" alt="${resena.nombre}">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">"${resena.comentario}"</p>
            <h4 class="font-bold mt-4 text-gray-900 dark:text-white">${resena.nombre}</h4>
            <span class="text-sm text-gray-500 dark:text-gray-400">${resena.curso}</span>
          </div>
        `;

        reviewContainer.appendChild(slide);
      });

      // Inicializar Swiper después de cargar las review
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 4000 },
        slidesPerView: 1,
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        },
        pagination: { el: '.swiper-pagination', clickable: true }
      });

    } catch (error) {
      console.error("Error cargando las reseñas:", error);
    }
  });
