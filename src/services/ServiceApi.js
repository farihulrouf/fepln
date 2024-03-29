import http from "./http-common";

const getCustomer = (nomer) => {
  //http://localhost:3000/customers?no=886868468
  return http.get(`/customers?no=${nomer}`);
};
const getNoCustomer = (id) => {
  return http.post(`/customers/getnomer?no=${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const updatePrice = (id, data) => {
  //console.log('cek tesdt', data)
  return http.put(`/prices/${id}`, data);
};

const findPrice = (id) => {
  //console.log(id)
  return http.get(`/prices/?id=${id}`)
}

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
  // console.log('baca data', data)
  return http.post("/customers/post", data);
};
const getallCustomer = (name, page, size) => {
  //?page=1
  return http.get(`/customers/getall/?name=${name}&page=${page}&size=${size}`);
  //localhost:3000/customers/getall?name=ed&page=0&size=4
};

const updateCustomer = (id, data) => {
  return http.patch(`/customers/update/${id}`, data);
};
const deleteCustomer = (id) => {
  return http.delete(`/customers/delete/${id}`);
};

const getTransactions = (id) => {
  return http.get(`/transactions/getone/?no=${id}`);
};

const getTransactionsDetail = (id) => {
  return http.get(`/transactions/getransactions/?nomer=${id}`);
};

const getDetailtransById = async (id) => {
  return http.get(`/transactions/getlast/?nomer=${id}`);
};

const getDetailtransLimit = async (id) => {
  return http.get(`/transactions/idcustomer/?no=${id}`);
};

const getUserTransactions = (params, page, limit) => {
  //console.log('ini data di', id)
  //?page=1&limit=3 return http.get(`/customers/${id}`);
  //console.log('data params', params)
  return http.post(`/transactions/getid?page=${page}&limit=${limit}`, params);
};
//http://localhost:3000/transactions/getid

const createTransactions = (data) => {
  return http.post("/transactions/post", data);
};

const updateTransactions = (data, id) => {
  return http.put(`/transactions/update?id=${id}`, data);
};
//user update
const updateUser = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const createUser = async (data) => {
  return http.post("/users/register", data);
};

const getTransactionsAll = async (page, limit, name) => {
  return http.get(`/transactions/getall?page=${page}&limit=${limit}&s=${name}`);
};
const getReportTransaction = async (date1, date2) => {
  return http.get(`/transactions/all?from=${date1}&to=${date2}`);
};

const getListCustomers = async (page, limit, name) => {
  //http://localhost:3000/customers/all?page=1&limit=5&s=Farihul
  return http.get(`/customers/all?page=${page}&limit=${limit}&s=${name}`);
};

const getallUsers = async (page, limit, name) => {
  return http.get(`/users/all?page=${page}&limit=${limit}&s=${name}`);
};

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
  getListCustomers,
  getTransactions,
  createTransactions,
  getUserTransactions,
  getCustomer,
  getNoCustomer,
  updateUser,
  getTransactionsAll,
  getReportTransaction,
  getallUsers,
  updateTransactions,
  getTransactionsDetail,
  getDetailtransById,
  getDetailtransLimit,
  createUser,
  findPrice
};

export default ServiceApi;
