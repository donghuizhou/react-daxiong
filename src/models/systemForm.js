export default {
  namespace: 'systemForm',

  state: {
    current: {},
  },

  effects: {
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
