import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 60000
axios.defaults.retry = 1
axios.defaults.retryDelay = 10000
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  //TODO http headers验证
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  let config = err.config
  if (!config || !config.retry) return Promise.reject(err)
  config.__retryCount = config.__retryCount || 0
  if (config.__retryCount >= config.retry) {
    if (err.message === 'Network Error') {
      // TODO 提示网络不可用，请检查你的网络设置
    }
    return Promise.reject(err)
  }
  config.__retryCount += 1
  let backoff = new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1)
  })
  return backoff.then(() => {
    return axios(config)
  })
})

export default {
  get(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.get(url, { 
          params: params, 
          baseURL: config?.baseURL ?? ''
        }
      )
        .then(response => {
          var data = response.data;
          if (url.indexOf('/microservice') > -1) {
            data = data.replace(/[\r\n]/g, '');
            var info = data.match(/{code=(.*?), message=(.*?)}$/);
            if (info[1] == 0) {
              resolve(JSON.parse(info[2]));
            } else {
              reject()
            }
          } else {
            resolve(data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  postBlob(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, { 
        responseType: 'blob', 
        baseURL: config?.baseURL ?? '', 
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.post(url, params,{
        baseURL: config?.baseURL ?? ''
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  postForm(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params),{
        baseURL: config?.baseURL ?? ''
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  put(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.put(url, params,{
        baseURL: config?.baseURL ?? ''
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  delete(url, params,config) {
    return new Promise((resolve, reject) => {
      axios.delete(url, { 
        params: params, 
        baseURL: config?.baseURL ?? ''
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  upload(url, params, config) {
      let fd = new FormData()
      if(params instanceof Array){
        for (var index in params) {
          fd.append(params[index].key, params[index].value);
        }
      }else{
        for (var key in params) {
            fd.append(key, params[key]);
        }
      }
      return new Promise((resolve, reject) => {
          axios.post(url, fd, {
              baseURL:  config?.baseURL ?? '',
              timeout: 100000,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              resolve(response.data)
          }).catch(error => {
              reject(error)
          })
      })
  }
}
