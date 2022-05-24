import axios from "axios";
import { API_HOST_PREFIX } from "./serviceHelpers";
import * as helper from "./serviceHelpers";

const getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const deleteUser = (id) => {
  const config = {
    method: "DELETE",
    url: `${API_HOST_PREFIX}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  _logger("happens in the middle");
  return axios(config).then(helper.onGlobalSuccess);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getTotalUsers = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/users/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getTotalSessions = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/sessions/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getTotalWorkShops = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/workshops/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};
export {
  getTotalUsers,
  getTotalSessions,
  getTotalWorkShops,
  getAll,
  deleteUser,
  getById,
};
