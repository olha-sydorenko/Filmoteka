import ApiService from './api.js';
import createCardFilm from './templates/main-card.js';
import { PaginationButton } from './pagination';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const addGalleryAPI = new ApiService();
const gallery = document.querySelector('.gallery');
const galleryList = document.querySelector('.gallery__list');
addMovies();

async function addMovies() {
  try {
    addPreloader();
    const response = await addGalleryAPI.getPopularMovies();
    const genres = await addGalleryAPI.getGenresName();
    const data = response.results;
    const collection = createCardFilm(data, genres);
    galleryList.innerHTML = collection.join('');
    Loading.remove();


    // Пагінація
    const paginationButtons = new PaginationButton(response['total_pages']);
    paginationButtons.render(gallery);
    paginationButtons.onChange(async e => {
      addGalleryAPI.page = e.target.value;
      addPreloader();
      const movies = await addGalleryAPI.getPopularMovies();
      const collection = createCardFilm(movies.results, genres);
      galleryList.innerHTML = collection.join('');
      Loading.remove();
    });
  } catch (error) {
    console.log(error);
  }
}

// async function addGenres(){
//   try {
//     const genres = await addGalleryAPI.getGenresName();
//     const collection = createCardFilm({genres});
//   }catch (error) {
//     console.log(error);
//   }
// }




function addPreloader() {
  Loading.pulse({ svgColor: 'rgb(236, 248, 5)' });
}