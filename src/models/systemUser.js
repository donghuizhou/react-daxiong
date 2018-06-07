import { message } from 'antd';
import { queryUsers, getUser, saveUser } from '../services/systemUser';

export default {
  namespace: 'systemUser',

  state: {
    current: {},
    page: {
      list: [], // AuthUser
      pagination: {}, // {current: 当前页, total: 总页数, pageSize: 每页条数}
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *fetchUser({ payload }, { call, put }) {
      const id = payload;
      let user = {};
      if (id) {
        user = yield call(getUser, payload);
      }
      yield put({
        type: 'saveCurrent',
        payload: user,
      });
    },
    *saveUser({ payload }, { call }) {
      const result = yield call(saveUser, payload);
      console.log(result)
      if (result) {
        message.success('保存成功');
      }
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
    saveCurrent(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
};
