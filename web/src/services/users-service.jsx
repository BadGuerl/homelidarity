import http from './base-api-service';

export const profile = () => http.get('/users/me')

export const list = (avatar, name, email, role) => http.get('/users/:id/users-list', { avatar, name, email, role  })

export const login = (email, password) => http.post('/login', { email, password })

export const register = (user) => http.post('/users', user)

export const logout = () => http.post('/logout')
