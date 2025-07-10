import axios from "axios";

const API = axios.create({
  baseURL: "https://pixisphere-api-k3af.onrender.com/api",
});

export const getPhotographers = () => API.get("/photographers");

export const getPhotographerById = (id: number) =>
  API.get(`/photographers/${id}`);
