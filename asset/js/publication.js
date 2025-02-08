
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch("asset/data/publication.json");
      const publicaciones = await response.json();

      const publicacionesContainer = document.getElementById("publicaciones-container");
      publicacionesContainer.innerHTML = "";

      publicaciones.forEach((publicacion) => {
        const card = `
          <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <img src="${publicacion.imagen}" alt="${publicacion.titulo}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold dark:text-white">${publicacion.titulo}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${publicacion.descripcion}</p>
            <div class="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
              <span>👀 ${publicacion.vistas} vistas</span>
              <span>${publicacion.reacciones} reacciones</span>
            </div>
            <a href="${publicacion.verMas}" class="mt-4 inline-block text-primary dark:text-blue-400 font-bold">Ver más →</a>
          </div>
        `;
        publicacionesContainer.innerHTML += card;
      });
    } catch (error) {
      console.error("Error al cargar las publicaciones:", error);
    }
  });

