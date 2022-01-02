import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mission-locale-server.herokuapp.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getReferentBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getBeneficiaireBoard() {
    return axios.get(API_URL + 'beneficiaire', { headers: authHeader() });
  }
}

export default new UserService();
