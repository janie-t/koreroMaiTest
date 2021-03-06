const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')

function HelpPage(props) {
  return (
    <div className='help-page'>
      <h1 className='h1-home'>What is Korero Mai?</h1>
      <p>
        This app is intended to be used as a tool to help children 5 and 6 learn Te Reo. It focuses on learning pronounciation and simple words through two main types of activities :
      </p>
      <p>
        <b>Learn the pronounciation</b> : click on the letters or words to hear their proper pronounciation.
        <br />
        <b>Practice your learning</b> : click on <b>Listen</b> to hear a letter or word, then choose the right one.
      </p>
      <p>
        You do not need to register to use the app : all the activities are open to free play. You can however use more features by registering / logging in as one of two types of users.
      </p>
      <p>
        The two different types of users are : <br />
        The <b>teacher</b> can create an admin account and log into it. You then have a <b>profile page</b> where you can manage your <b>students</b> (create, assign to group). You can also access a graph to see how their learning progresses.<br />
        The <b>student</b> can login with the <b>token</b> assigned to them by the <b>teacher</b>. Once logged in, their score in the <b>practice</b> activities will be recorded and available to the <b>teacher</b> on their <b>profile page</b>.
      </p>
      <Link to='/'><button className='play-button'>Play!</button></Link>
      <br />
      <br />
      <a href='https://github.com/Korero-Mai/koreroMai-app/' target="_blank" ><button className='button radius'>For Developers</button></a>
    </div>
  )
}

module.exports = connect((state) => state)(HelpPage)
