const React = require('react')
const { connect } = require('react-redux')
const {Link, IndexLink} = require('react-router')
const request = require('superagent')

function Nav(props) {
  const dispatch = props.dispatch
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            Kia ora!
          </li>
          <li onClick={() => dispatch({type: 'END_ROUND'})}>
            <IndexLink to="/" activeClassName="active-link" className='nav-text'>Home</IndexLink>
          </li>
          <li onClick={() => dispatch({type: 'END_ROUND'})}>
            <Link to="/activity" activeClassName="active-link" className='nav-text'>Activities</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <EnterOrExit users={props.users} dispatch={dispatch}/>
        </ul>
      </div>
    </div>
  )
}

module.exports = connect((state) => state)(Nav)

function EnterOrExit(props){
  if (Object.keys(props.users)[0]){
    return (
      <li className="menu-text" onClick={endRound}>
        <Link to={`/users/${props.users.id}/profile`}>{props.users.username}'s profile</Link>
        <br />
        <Link to='/'>
          <button onClick={() => {
            request.get('api/v1/auth/logout')
            .end((err, data) => {
              if (err) return console.log('error')
              props.dispatch({type: 'LOGOUT_USER'})
            })
          }}>
            Logout
          </button>
        </Link>
      </li>
    )
  }
  return (
    <li className="menu-text" onClick={endRound}>
       <Link to="login-register"> Login / Register </Link>
    </li>
  )

  function endRound(){
    props.dispatch({type: 'END_ROUND'})
  }
}
