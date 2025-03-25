import { LoginData, RegistrationData, SessionPayload, UserDataMongoose } from '@/types/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kudago.com/public-api/v1.4',
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

const KudaGo = {
    getEvents: () =>
      instance.get(
        '/events/?lang=&fields=&expand=&categories=concert,party,festival&order_by=&text_format=&ids=&location=spb&actual_since=1740531791&page=2&is_free=&lon=&lat=&radius=',
      ),
   
};
export default KudaGo;
