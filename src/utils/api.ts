import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const getPhotographers = () => API.get("/photographers");

export const getPhotographerById = (id: number) =>
  API.get(`/photographers/${id}`);
