import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App'
=======
import App from 'app/App'
>>>>>>> kkj-home
=======

import App from './App'

>>>>>>> 3e8c44e85719b24b26f50a75b34c7b4828b4d8b6
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
