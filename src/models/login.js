import { routerRedux } from 'dva/router';
/* z
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
*/
import { accountLogin } from '../services/api';
import { setAccessToken } from '../utils/authority';

import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      /* z
      const response = yield call(fakeAccountLogin, payload);
      */
      const response = yield call(accountLogin, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
            accessToken: null, // z
            autoLogin: false, // z
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      /* z
      setAuthority(payload.currentAuthority);
      */
      setAccessToken(payload.accessToken, payload.autoLogin);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
