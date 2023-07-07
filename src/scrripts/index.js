import Notiflix from 'notiflix';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css";
import { refs } from "./refs";

showLoader()
fetchBreeds()
  .then((idName1) => {
    const cardsMarKup = createCatMarKup(idName1);
    refs.breedSelect.innerHTML = cardsMarKup;
    new SlimSelect({
      select: '#single'
    })
  })
  .catch(error => {
    showError()
  })
  .finally(hideLoader)


refs.breedSelect.addEventListener("change", event => {
  event.preventDefault();
  const breed = event.target.value
  renderBreed(breed)
})

const renderBreed = breed => {
  showLoader()
  fetchCatByBreed(breed)
    .then(showCat)
    .catch(error => {
      showError()
    })
    .finally(hideLoader)
}

function showCat(cardInfoCat) {
  refs.catInfo.innerHTML = cardInfoCat.map(
    renderCatInfoMarKup
  ).join("");
}

function showLoader() {
  refs.loader.classList.add('active')
  refs.breedSelect.classList.add('hide')
}

function hideLoader() {
  refs.loader.classList.remove('active')
  refs.breedSelect.classList.remove('hide')
}

function showError() {
  refs.error.classList.add('active')
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');

}

function createCatMarKup(idName) {
  return idName.map(({ id, name }) => {
    return `
    <option option value="${id}"> ${name}</option >`
  }).join("")
}

function renderCatInfoMarKup(cardInfoCat) {
  return cardInfoCat.breeds.map(({ name, description }) => {
    return `
    <img src="${cardInfoCat.url}" alt="${name}" width="${cardInfoCat.width / 4}" height="${cardInfoCat.height / 4}">
    <h1 class="cat-info-title">${name}</h1>
    <p class="cat-info-text">${description}</p>
    `
  }).join("")
}


