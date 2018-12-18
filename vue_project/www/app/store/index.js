import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import picshowState from "./picshow/state.js";
import picshowMutations from "./picshow/mutations.js";
import picshowActions from "./picshow/actions.js";

import carlistState from "./carlist/state.js";
import carlistMutations from "./carlist/mutations.js";
import carlistActions from "./carlist/actions.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        picshowState,
        carlistState
    },
    mutations:{
        ...picshowMutations,
        ...carlistMutations
    },
    actions:{
        ...picshowActions,
        ...carlistActions
    },
    plugins:[createLogger()]
});

export default store;