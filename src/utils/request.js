import jQuery from "jquery";
window.jQuery = window.$ = jQuery;
import axios from "axios";
import { ElMessage } from 'element-plus';
import { useMainStore,pinia } from '../stores/main.js';
const store = useMainStore(pinia);
const baseUrl = store.baseUrl;
const headers = store.headers;

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 600000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
    config.headers["Ewaresoft-FOne-SessionId"] =
      headers["Ewaresoft-FOne-SessionId"];
    config.headers["Ewaresoft-FOne-GlobalUserId"] =
      headers["Ewaresoft-FOne-GlobalUserId"];
    config.headers["Ewaresoft-FOne-ApplicationId"] =
      headers["Ewaresoft-FOne-ApplicationId"];
    config.headers["Ewaresoft-FOne-ApplicationUserId"] =
      headers["Ewaresoft-FOne-ApplicationUserId"];
    config.headers["Authorization"] = headers["Authorization"];
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

const fail = (error, callback) => {
  callback();

    ElMessage({
        message: error.message,
        type: 'success',
    });
};
service.interceptors.response.use(
  (response) => {
    // TODO
    let data = response.data;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const get = (url, params) =>
  new Promise((resolve, reject) => {
    service({
      url,
      method: "get",
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        fail(err, () => reject(err));
      });
  });

export const post = (url, data) =>
  new Promise((resolve, reject) => {
    service({
      url,
      method: "post",
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        fail(err, () => reject(err));
      });
  });

export const put = (url, data) =>
  new Promise((resolve, reject) => {
    service({
      url,
      method: "put",
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        fail(err, () => reject(err));
      });
  });

export const del = (url, params) =>
  new Promise((resolve, reject) => {
    service({
      url,
      method: "delete",
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        fail(err, () => reject(err));
      });
  });

export function getJson(url, func, isasync = true) {
  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    async: isasync,
    success: function (data) {
      func(data);
    },
    error: function (e) {
      alert("json not found");
    },
  });
}

export function getJson1(url, type, body, headerFunc, func, isasync = true) {
  $.ajax({
    type: type,
    url: url,
    async: isasync,
    beforeSend: function (request) {
      headerFunc(request);
    },
    data: JSON.stringify(body),
    success: function (data) {
      const d = JSON.parse(data);
      if (d.status === 1031) {
        document.location.href = "#login";
      }
      func(data);
    },
    error: function () {
      alert("json not found");
    },
  });
}

export function setHeaders(request, headers) {
  for (let key in headers) {
    request.setRequestHeader(key, headers[`${key}`]);
  }
}

export function getJson2(url, type, body, headerFunc, func, isasync = true) {
  $.ajax({
    type: type,
    url: url,
    async: isasync,
    beforeSend: function (request) {
      headerFunc(request);
    },
    data: JSON.stringify(body),
    success: function (data) {
      func(data);
    },
    error: function () {
      alert("json not found");
    },
  });
}
