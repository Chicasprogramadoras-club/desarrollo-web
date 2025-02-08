
  const proyectosURL = "asset/data/project.json"; // Archivo JSON

  // Configuración de la paginación
  const proyectosPerPage = 3;
  let currentProyectoPage = 1;
  let proyectos = [];

  // Referencias a los elementos
  const proyectoContainer = document.getElementById("proyecto-container");
  const prevProyectoBtn = document.getElementById("prev-proyecto-btn");
  const nextProyectoBtn = document.getElementById("next-proyecto-btn");

  // Función para obtener proyectos desde JSON externo
  async function fetchProyectos() {
    try {
      const response = await fetch(proyectosURL);
      if (!response.ok) throw new Error("Error al cargar los proyectos");

      proyectos = await response.json();
      renderProyectos(); // Renderiza los proyectos al cargar
    } catch (error) {
      console.error("Error:", error);
      proyectoContainer.innerHTML = "<p class='text-red-500'>Error al cargar proyectos.</p>";
    }
  }

  // Renderizar Proyectos
  function renderProyectos() {
    proyectoContainer.innerHTML = "";
    const startIndex = (currentProyectoPage - 1) * proyectosPerPage;
    const endIndex = startIndex + proyectosPerPage;
    const visibleProyectos = proyectos.slice(startIndex, endIndex);

    visibleProyectos.forEach((proyecto) => {
      const proyectoCard = document.createElement("div");
      proyectoCard.className = "proyecto-card bg-white shadow-md rounded-lg overflow-hidden border border-pink-300";
      proyectoCard.innerHTML = `
        <img src="${proyecto.img}" alt="${proyecto.titulo}" class="w-full h-40 object-cover">
        <div class="p-5">
          <h2 class="text-xl font-bold text-green-600 mb-2">
            <a href="#">${proyecto.titulo}</a>
          </h2>
          <p class="text-sm text-gray-600 mb-2">Autora: ${proyecto.autora}</p>
          <p class="text-gray-700 mb-3">${proyecto.descripcion}</p>
          <div class="social-icons flex justify-center space-x-4 text-2xl text-gray-500">
            <a href="${proyecto.redes.github}" target="_blank" class="hover:text-gray-800">
              <i class="uil uil-github"></i>
            </a>
            <a href="${proyecto.redes.demo}" target="_blank" class="hover:text-blue-500">
              <i class="uil uil-external-link-alt"></i>
            </a>
          </div>
        </div>
      `;
      proyectoContainer.appendChild(proyectoCard);
    });

    // Deshabilitar botones si es necesario
    prevProyectoBtn.disabled = currentProyectoPage === 1;
    nextProyectoBtn.disabled = endIndex >= proyectos.length;
  }

  // Manejadores de paginación
  prevProyectoBtn.addEventListener("click", () => {
    if (currentProyectoPage > 1) {
      currentProyectoPage--;
      renderProyectos();
    }
  });

  nextProyectoBtn.addEventListener("click", () => {
    if (currentProyectoPage * proyectosPerPage < proyectos.length) {
      currentProyectoPage++;
      renderProyectos();
    }
  });

  // Cargar proyectos al inicio
  fetchProyectos();
