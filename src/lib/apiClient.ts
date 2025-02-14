import axios from 'axios';
import { UserSchema, AppointmentSchema } from '@/types/validation';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  }
});

api.interceptors.response.use(response => {
  const validator = {
    '/users': UserSchema,
    '/appointments': AppointmentSchema
  }[response.config.url?.split('?')[0] ?? ''];
  
  if (validator) {
    return validator.parse(response.data);
  }
  return response;
}, error => {
  throw new Error(error.response?.data?.message || 'API request failed');
});

export default api;
