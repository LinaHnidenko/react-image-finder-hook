const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '39158900-f9ebc7a1e27be347df28dfb3a';

export const getPictures = (searchValue, page) => {
  return fetch(
    `${BASE_URL}/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
