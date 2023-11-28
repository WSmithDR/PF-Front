import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import NavBar from './components/navBar.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <NavBar />
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,

);