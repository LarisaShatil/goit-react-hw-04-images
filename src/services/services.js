import axios from "axios";

const API_KEY = "23129630-9573c017c45744d32c0b55f39";
const BASE_URL = "https://pixabay.com/api/";

axios.defaults.baseURL = BASE_URL;

const fetchImage = (searchQuery, currentPage) => {
  return axios.get(
    `/`, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'landscape',
        per_page: 12,
        q: searchQuery,
      }
    }
  )
    .then(({ data }) => data.hits)
    .catch(err => {
      alert("Something went wrong. Please try again!");
      console.log(err);
    });
  
  // return axios.get(
  //   `/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=landscape&per_page=12`
  // )
  //   .then(({ data }) => data.hits)
  //   .catch(err => {
  //     alert("Something went wrong. Please try again!");
  //     console.log(err);
  //   });
};

export default fetchImage;