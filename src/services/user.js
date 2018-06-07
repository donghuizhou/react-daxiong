import { stringify } from 'qs'; // z
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// z
export async function queryUser(params) {
  return request(`/api/auth/user/list?${stringify(params)}`);
}
