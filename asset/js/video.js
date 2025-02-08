
  document.addEventListener("DOMContentLoaded", function () {
    const videoGallery = document.getElementById("videoGallery");
    const searchInput = document.getElementById("searchInput");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");

    let videos = [];
    let currentPage = 1;
    const videosPerPage = 4;

    async function fetchVideos() {
      try {
        const response = await fetch("asset/data/video.json");
        if (!response.ok) {
          throw new Error("Error al cargar los videos.");
        }
        videos = await response.json();
        renderVideos();
      } catch (error) {
        console.error("Error:", error);
        videoGallery.innerHTML = `<p class="text-red-500 text-center">No se pudieron cargar los videos.</p>`;
      }
    }

    function renderVideos(filter = "") {
      videoGallery.innerHTML = "";

      const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(filter.toLowerCase()) ||
        video.description.toLowerCase().includes(filter.toLowerCase())
      );

      const start = (currentPage - 1) * videosPerPage;
      const end = start + videosPerPage;
      const paginatedVideos = filteredVideos.slice(start, end);

      paginatedVideos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.className = "bg-white p-4 rounded-lg shadow-lg overflow-hidden";
        videoCard.innerHTML = `
          <video class="w-full h-auto rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out" controls>
            <source src="${video.src}" type="video/mp4">
          </video>
          <div class="mt-3">
            <h4 class="text-lg font-bold text-gray-900">${video.title}</h4>
            <p class="text-gray-600 text-sm">${video.description}</p>
            <p class="text-gray-500 text-xs">📅 ${video.date}</p>
            <div class="flex justify-between text-gray-700 text-sm mt-2">
              <span>👍 ${video.likes}</span>
              <span>💬 ${video.comments}</span>
            </div>
          </div>
        `;
        videoGallery.appendChild(videoCard);
      });

      // Control de botones de paginación
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = end >= filteredVideos.length;
    }

    nextPageBtn.addEventListener("click", () => {
      currentPage++;
      renderVideos(searchInput.value);
    });

    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderVideos(searchInput.value);
      }
    });

    searchInput.addEventListener("input", (e) => {
      currentPage = 1;
      renderVideos(e.target.value);
    });

    fetchVideos();
  });
