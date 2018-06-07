// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  /* z
  return localStorage.getItem('antd-pro-authority') || 'admin';
  */
  try {
    let jwt = getAccessToken();
    let claims = decodeJWT(jwt);
    return 'user';
  } catch (e) {
    return 'guest';
  }
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

/**
 * z 读取token
 */
export function getAccessToken() {
  return sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
}

/**
 * z 保存token
 * @param {*} token
 * @param {*} autoLogin
 */
export function setAccessToken(token, autoLogin) {
  sessionStorage.setItem('access_token', token);
  if (autoLogin) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
}

/**
 * z 解析jwt
 * @param {*} token
 */
function decodeJWT(token) {
  let segments = token.split('.');
  if (!segments instanceof Array || segments.length !== 3) {
    throw new Error('Invalid JWT');
  }
  let claims = segments[1];
  return JSON.parse(decodeURIComponent(escape(window.atob(claims))));
}
