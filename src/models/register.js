import { fakeRegister } from '../services/api';
/* z
import { setAuthority } from '../utils/authority';
*/
import { setAccessToken } from '../utils/authority';

import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit(_, { call, put }) {
      const response = yield call(fakeRegister);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      /* z
      setAuthority('user');
      */
      setAccessToken(payload.accessToken, payload.autoLogin);

      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
