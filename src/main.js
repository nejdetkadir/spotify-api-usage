import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './router'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faList, faPlusSquare, faHeart, faClock, faPlayCircle, faPauseCircle, faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSearch, faList, faPlusSquare, faHeart, faClock, faPlayCircle, faPauseCircle, faStepBackward, faStepForward)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
