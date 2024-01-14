import http from "./http-common";

const get = (id) => {
  return http.get(`/tutorials/${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const createPrice = (data) => {
  return http.post("/prices/post", data);
};

const getallPrice = () => {
  return http.get("/prices/getall");
};

const ServiceApi = {
  getallPrice,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  createPrice,
};

export default ServiceApi;
