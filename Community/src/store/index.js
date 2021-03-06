import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myName:'',
        myHeaderImg:'',
        myId:'',
        headerNav:'/',
        isLogin: 0
    },
    mutations:{
        change_headerNav(state, headerNav){
            state.headerNav = headerNav
        },
        change_myHeaderImg(state, myHeaderImg){
            state.myHeaderImg = myHeaderImg
        },
        change_myName(state, myName){
            state.myName = myName
        },
        changeLogin(state, isLogin){
            state.isLogin = isLogin;
        }
    }
})