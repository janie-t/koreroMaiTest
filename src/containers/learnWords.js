const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')
const Modal = require('react-modal')

class LearnWords extends React.Component {

    render() {
      const props = this.props
      const { dispatch, modal, words } = this.props
      const level = Number(this.props.params.id)
      const activityRoute = 'activity/learn/words/'
      const wordsArr = this.props.learnWordsPage[level]

      if (level === 1) {
        return (
          <div>
            <div className='welcome'>
              Learn how to pronounce Te Reo!
            </div>
            <div className="play-box-lw">
              {this.generateWord(wordsArr, words)}
            </div>
            <div>
              <Link to='activity'><button className="first-back">↩</button></Link>
              <Link to={activityRoute+(level+1)}><button className="first-next">↪</button></Link>
            </div>
          </div>
        )
      } else if (level === 5){
        return (
          <div>
            <div className='welcome'>
              Learn how to pronounce Te Reo!
            </div>

            <div className='play-box-lw'>
              {this.generateWord(wordsArr, words)}
              <div>
                <Link to={activityRoute+(level-1)}><button className="last-back">↩</button></Link>
                <button className="finish" onClick={() => dispatch({type: 'TOGGLE_MODAL'})}>★</button>
                <Modal isOpen={modal} contentLabel='Modal' className='learn-words-modal'>
                  <h1>Tumeke! Awesome!</h1>
                  <Link to={activityRoute+1}><button className="lwordbutton repeat" onClick={() => dispatch({type: 'END_ROUND'})}>Repeat</button></Link><br />
                  <Link to='activity'><button className="lwordbutton new-activity" onClick={() => dispatch({type: 'END_ROUND'})}>Choose another activity</button></Link>
                </Modal>
              </div>

            </div>
          </div>
        )
      } else return (
        <div>
          <div className='welcome'>
            Learn how to pronounce Te Reo!
          </div>
          <div>
            <div className="play-box-lw">
              {this.generateWord(wordsArr, words)}
            </div>
            <div>
              <div>
                <Link to={activityRoute+(level-1)}><button className="nav-back">↩</button></Link>
                <Link to={activityRoute+(level+1)}><button className="nav-next">↪</button></Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
    componentWillMount() {
      Modal.setAppElement('body');
    }

    playSound(index) {
      this.refs[index].load()
      this.refs[index].play()
    }

    generateWord(wordsArr, words) {
        return wordsArr.map((word, index) => {
          return (
            <div>
              <audio ref={`${index}`} >
                <source src={`${words[word].soundFile}`} preload='auto'/>
              </audio>
              <img src={`${words[word].imageFile}`} />
              <button onClick={() => this.playSound(index)} className='lwordbutton'>
                {word}
              </button>
            </div>
          )
        })
      }
}
    module.exports = connect((state) => state)(LearnWords)
