
  const API_URL = '/asset/data/teachers.json'; // Reemplázala con la URL de tu API
  let profesores = [];
  const profesorContainer = document.getElementById('profesor-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let itemsPerPage = window.innerWidth < 640 ? 1 : 3;
  let currentPage = 1;

  async function fetchProfesores() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      profesores = data.profesores || [];
      renderProfesores();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  function updateItemsPerPage() {
    itemsPerPage = window.innerWidth < 640 ? 1 : 3;
    renderProfesores();
  }

  function renderProfesores() {
    profesorContainer.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleProfesores = profesores.slice(startIndex, endIndex);

    visibleProfesores.forEach(profesor => {
      const profCard = document.createElement('div');
      profCard.className = 'bg-white shadow-lg rounded-lg p-6 text-center transform transition hover:scale-105';
      profCard.innerHTML = `
        <img src="${profesor.img}" alt="${profesor.nombre}" class="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-200">
        <h3 class="text-xl font-bold text-gray-800">${profesor.nombre}</h3>
        <p class="text-gray-600">${profesor.especialidad}</p>
        <div class="flex justify-center space-x-4 mt-4 text-xl text-gray-500">
          <a href="${profesor.redes.facebook}" target="_blank" class="hover:text-blue-600"><i class="uil uil-facebook"></i></a>
          <a href="${profesor.redes.instagram}" target="_blank" class="hover:text-pink-500"><i class="uil uil-instagram"></i></a>
          <a href="${profesor.redes.twitter}" target="_blank" class="hover:text-blue-400"><i class="uil uil-twitter"></i></a>
        </div>
      `;
      profesorContainer.appendChild(profCard);
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= profesores.length;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderProfesores();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage * itemsPerPage < profesores.length) {
      currentPage++;
      renderProfesores();
    }
  });

  window.addEventListener('resize', updateItemsPerPage);

  fetchProfesores();
