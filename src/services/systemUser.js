import { stringify } from 'qs'; // z
import request from '../utils/request';

export async function queryUsers(params) {
  return request(`/api/auth/user/list?${stringify(params)}`);
}

export async function saveUser(params) {
  return request('/api/auth/user/save', {method: 'POST', body: params});
}

export async function getUser(id) {
  return request(`/api/auth/user/${id}`);
}