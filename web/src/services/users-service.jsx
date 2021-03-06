import http from './base-api-service';

export const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

export const profile = () => http.get('/users/me')

export const list = (search) => http.get('/users', { params:  search  })

export const login = (email, password) => http.post('/login', { email, password })

export const register = (user) => http.post('/users', user)

export const logout = () => http.post('/logout')

const userService = {
    
    socialLoginUrl,
    profile,
    login,
    register,
    list,
    logout
}

export default userService;