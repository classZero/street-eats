import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
import App from './App'
=======
import App from 'app/App'
>>>>>>> kkj-home
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
