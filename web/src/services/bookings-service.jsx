import http from './base-api-service';

const get = (id) => http.get(`/bookings/${id}`)

const list = (search) => http.get(`/bookings`, { params: search })

const remove = (id) => http.delete(`/bookings/${id}`)

const update = (booking) => http.put(`/bookings/${booking.id}`, booking)


const create = (booking) => {
  const data = new FormData()

  Object.keys(booking).forEach(key => {
    data.append(key, booking[key])
  })
  
  http.post(`/booking`, booking)
}

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;