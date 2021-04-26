import http from './base-api-service';

const get = (id) => http.get(`/bookings/${id}`)

const list = (search) => http.get(`/bookings`, { params: search })

const remove = (id) => http.delete(`/bookings/${id}`)

const update = (booking) => http.put(`/bookings/${booking.id}`, booking)


const create = (booking) => http.post(`/bookings`, booking)


const bookingService = {
  create,
  update,
  remove,
  list,
  get
}

export default bookingService;