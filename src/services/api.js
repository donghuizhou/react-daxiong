import { stringify } from 'qs';
import fetch from 'dva/fetch'; // z
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

/**
 * z
 * @param params
 * {"userName":"admin","password":"888888","type":"account"}
 * {"mobile":"18888888888","captcha":"0987","type":"mobile"}
 * @return
 * {"status":"ok/error","type":"account/mobile","currentAuthority":"admin/user/guest"}
 */
export async function accountLogin(params) {
  /*
  request:
  POST /oauth/token HTTP/1.1
  Host: server.example.com
  Authorization: Basic dGVzdHVzZXI6YWJjMTIz
  Content-Type: application/x-www-form-urlencoded

  grant_type=password&username=johndoe&password=A3ddj3w
  
  response:
  {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0dXNlcjAxIiwianRpIjoiZmM1MTg4YjktMTYyNy00MjJmLTg3NzktMTczNWIzYWVlNzRiIiwiY2xpZW50X2lkIjoiYXBwIiwic2NvcGUiOlsiYXBwIl19.XF5dIz2A4-VvE212-6wKilTVcapCCncO_kR38su4pHk3AHl6f08p6SndLU4y4sA9594tmU1dqMTD2ixxjADf6IC3PzVjQ6zaGvOelytecMRGh8LREfWj2L1jCEIoo4mcUcD69WV-9yhvaN1YXK4k3AygvlB-4jWrV6An6-XlkVMEm8aVJtOD-Brf7jU8M5BS1GVSAHwk3HzpjHNF8ysdZ3LzrlMA5UfkTx1SnbL2_aFufD2ha0lE0YwHUg4Ojaw7pc7T4KOB_L-yZLcCSibD6pBy3urlzKfyvzJT256WizosCCijMmc8kMwefGEqZGEMHgp7KNNAkv-PT3WcF6hJkw",
      "token_type": "bearer",
      "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0dXNlcjAxIiwianRpIjoiZTdkNjIwNDItOTBhMy00NWMwLTgyNjEtNWY3MmRmYzNmYTAyIiwiY2xpZW50X2lkIjoiYXBwIiwic2NvcGUiOlsiYXBwIl0sImF0aSI6ImZjNTE4OGI5LTE2MjctNDIyZi04Nzc5LTE3MzViM2FlZTc0YiJ9.BZVX7RroE4-Mq7ZuvpHFEg43WcrlyQXk5CAhg5ArXgcgYZBiNQqBefhGvY499Hp1CMJfONxUIOuQUNr9cYYT7hY6gEqDpVUj4-vfW-NGWvvZp3GbWbgrjVLVtWr5duN6ozvRM0a5rbbceH169ojpnS-Kypoxwlhd42RjQXBQ3zZExjofS-QowfXrlELc9G7Dw1oTKoqZwkn-iD1-rNk3VCeXOrddyYnqtSea0DGxTHc77YqpVWd_5bXiDiyg0vBH-noq2Su5ZAP3blg9lXthtFA8LWxyb1B1X2RTNl5nwxFfcuH2nivpdNAxAzMnxCztlnFISzFh_DTexx7dq9I7gg",
      "scope": "testscope01",
      "jti": "fc5188b9-1627-422f-8779-1735b3aee74b"
  }
  */
  return fetch('/api/auth/oauth/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic d2ViOmFiYzEyMw==',
    },
    body: stringify({
      grant_type: 'password',
      username: params.userName,
      password: params.password,
      scope: 'web',
    }),
  }).then(response => {
    const error = {
      type: params.type,
      status: 'error',
      currentAuthority: 'guest',
    };

    if (response.status === 200) {
      return response.json().then(data => {
        if (data.access_token) {
          return {
            type: params.type,
            status: 'ok',
            currentAuthority: 'user',
            accessToken: data.access_token,
            autoLogin: params.autoLogin,
          };
        } else {
          return error;
        }
      });
    } else {
      return error;
    }
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
