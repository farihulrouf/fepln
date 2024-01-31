import http from "./http-common";

const getCustomer = (id) => {
  return http.get(`/customers/${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const updatePrice = (id, data) => {
  return http.put(`/prices/${id}`, data);
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

//customer
const createCustomer = (data) => {
  return http.post('/customers/post');
}
const getallCustomer = (name,page, size) => {
  //?page=1
  return http.get(`/customers/getall/?name=${name}&page=${page}&size=${size}`);
  //localhost:3000/customers/getall?name=ed&page=0&size=4
};

const updateCustomer = (id, data) => {
  return http.put(`/customers/update/${id}`, data);
};
const deleteCustomer = (id) => {
  return http.delete(`/customers/delete/${id}`);
};

const getTransactions = (params) => {
  console.log("ini adalah", params)
  return http.post("/transactions/getransactions/", params);
};

const createTransactions = (data) => {
  return http.post('/transactions/post', data);
}
const ServiceApi = {
  getallPrice,
  create,
  updatePrice,
  remove,
  removeAll,
  findByTitle,
  createPrice,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getallCustomer,
  getTransactions,
  createTransactions,
  getCustomer
  
};

export default ServiceApi;
