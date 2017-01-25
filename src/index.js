const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')

const createHistory = require('history').createHashHistory

const { Router, Route, IndexRoute, hashHistory } = require('react-router')


const reducer = require('./reducer')
const initialState = require('../state')

//Top Level Components
const App = require('./components/app')

const NewUser = require('./components/containers/newUser')
const NightOut = require('./components/containers/nightOutPage')
const UserProfile = require('./components/userProfile')

const store = createStore(reducer, initialState)

const Root = ({store}) => {
	return (

			<Provider store = {store}>
				<Router history = {hashHistory}>
					<Route path = '/' component={App}/>
					<Route path = '/newUser' component={NewUser} />
					<Route path='/userprofile' component={UserProfile} />
					<Route path='/nightout' component={NightOut} />
					
				</Router>
			</Provider>
	)
}

document.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('#app')
		ReactDOM.render(
			<Root store={store}/>,
			root
		)
})

// <Route path = 'new-user' component={NewUser} />
// <NewUser/>
