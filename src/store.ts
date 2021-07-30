import { createStore } from 'vuex'

interface State {
    userName: string
}

export default createStore({
    state: {
        ApiSkills: [],
        ApiSpecs: []
    }
});
