import http from './base-api-service';

export const profile = () => http.get('/users/me')

export const list = (search) => http.get('/users', { params:  search  })

export const login = (email, password) => http.post('/login', { email, password })

export const register = (user) => http.post('/users', user)

export const logout = () => http.post('/logout')

const userService = {
    profile,
    login,
    register,
    list,
    logout
}

export default userService;