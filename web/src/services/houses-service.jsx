import http from './base-api-service';

const list = (search) => http.get('/houses', { params:  search  })

const get = (id) => http.get(`/houses/${id}`)

const create = (house) => http.post(`/houses`, house)



const remove = (id) => http.delete(`/houses/${id}`)

const update = (house) => http.put(`/houses/${house.id}`, house)

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;