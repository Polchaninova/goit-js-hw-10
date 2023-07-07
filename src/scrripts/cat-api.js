import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_sGNTU0nB3NrxGXmQhUiOik8WcsayFmZFCrj76UYkvD5unzDO3o9gcxVZLDPqsLhI";


function fetchBreeds() {
  return axios.get(`https://api.thecatapi.com/v1/breeds?`)
    .then(function (response) {
      const idName = response.data;
      // console.log(idName);
      return idName;
    })
}

function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`) //?breed_ids=${breedId}
    .then(function (response) {
      return response.data
    })
}
export { fetchBreeds, fetchCatByBreed };