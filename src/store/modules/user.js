import router from '@/router'
import store from '@/store'

const type = {
  SET_USER: 'SET_USER',
  QUIT_LOGIN: 'QUIT_LOGIN'
};

const state = {
  user: {}
};

const getters = {
  user: state => state.user
};

const mutations = {
  [type.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  },
  [type.QUIT_LOGIN]() {
    router.push({name: 'login'}).then(() => {
      store.dispatch('setActive');
      store.dispatch('clearTags');
      store.dispatch('setBreadcrumb');
      store.dispatch('setToken');
      location.reload();
    })
  }
};

const actions = {
  setUser: ({commit}, user) => {
    commit(type.SET_USER, user)
  },
  quitLogin: ({commit}) => {
    commit(type.QUIT_LOGIN)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
