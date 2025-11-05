import axios from "axios"
import BASE_URL from "../BASE_URL"
import { TOKEN_KEYS } from "../Constant";

const headers_content = () => {
  const token = localStorage.getItem(TOKEN_KEYS.access);
  return {
    headers: {
      "Content-Type": 'multipart/form-data',
      "Authorization": `Bearer ${token}`
    }
  };
};
const universityApi = (response: FormData) => {
    return axios.post(`${BASE_URL}universities/`, response, headers_content())
        .then(responseData => responseData.data);
};

const universityUpdateApi = (universityId: number, response: FormData) => {
    return axios.put(`${BASE_URL}universities/${universityId}/`, response, headers_content())
        .then(responseData => responseData.data);
};

const getUniversitiesApi = () => {
  return axios.get(`${BASE_URL}universities/`, headers_content())
  .then(reponseData => reponseData.data)
}


const deleteUnversitiesApi = (universityId: number) => {
  return axios.delete(`${BASE_URL}universities/${universityId}/`, headers_content())
  .then(reponseData => reponseData.data)
}

export {
    universityApi,
    getUniversitiesApi,
    universityUpdateApi,
    deleteUnversitiesApi
}