import http from './base-api-service';

// const list = (search) => http.get('/events', { params: { search } })

// const get = (id) => http.get(`/events/${id}`)

const create = (house) => http.post(`/houses/${house.id}/bookings`, booking)

// const remove = (id) => http.delete(`/events/${id}`)

// const update = (event) => http.put(`/events/${event.id}`, event)

const service = {
  create,
//   update,
//   remove,
//   list,
//   get
}

export default service;