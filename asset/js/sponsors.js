

  document.addEventListener("DOMContentLoaded", async function () {
    const sponsorsWrapper = document.getElementById("sponsors-wrapper");

    async function fetchSponsors() {
      try {
        const response = await fetch("asset/data/sponsors.json");
        if (!response.ok) throw new Error("Error al cargar los sponsors.");
        const sponsors = await response.json();
        renderSponsors(sponsors);
      } catch (error) {
        console.error("Error:", error);
        sponsorsWrapper.innerHTML = `<p class="text-red-500 text-center">No se pudieron cargar los sponsors.</p>`;
      }
    }

    function renderSponsors(sponsors) {
      sponsorsWrapper.innerHTML = ""; // Limpiar contenido previo

      sponsors.forEach(sponsor => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide flex justify-center";
        slide.innerHTML = `
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 flex justify-center items-center w-40 h-24">
            <img src="${sponsor.image}" alt="${sponsor.name}" class="h-16 object-contain">
          </div>
        `;
        sponsorsWrapper.appendChild(slide);
      });

      // Inicializar Swiper después de renderizar los slides
      setTimeout(() => {
        new Swiper('.swiper-container', {
          loop: true,
          autoplay: { delay: 2500 },
          slidesPerView: 1,
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          },
          pagination: { el: '.swiper-pagination', clickable: true }
        });
      }, 100);
    }

    fetchSponsors();
  });
