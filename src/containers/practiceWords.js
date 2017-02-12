const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')
const Modal = require('react-modal');

class PracticeWords extends React.Component {

  componentWillMount() {
    Modal.setAppElement('body');
  }

  playSound(index) {
    this.refs[index].load()
    this.refs[index].play()
  }

  generateAnswer(wordsArr, answer, words) {
    return wordsArr.map((word) => {
      if (word === answer) {
        return (
          <div className="row">
            <div className="columns">
              <audio ref={`${answer}`} >
                <source src={`${words[word].soundFile}`} preload=''/>
              </audio>
              <h1 onClick={() => this.playSound(word)}>♫</h1>
            </div>
          </div>
        )
      }
    })
  }

  generateWord(wordsArr, words, answer){
    const dispatch = this.props.dispatch
    const modal = this.props.modal
    const modalStyle = {
      content:{
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
      }
    }

    const level = Number(this.props.params.id)
    const activityRoute = 'activity/practice/words/'

    return wordsArr.map((word,index)=>{
      if (level === 5) {
        if (word === answer) {
          return (
          <div>
            <div className="row">
              <div className="columns">
                <img src={`${words[word].imageFile}`} />
                <audio ref={`${word}`} >
                  <source src={`${words[word].soundFile}`} preload=''/>
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="columns" onClick={() => dispatch({type: 'OPEN_MODAL'})}>
                <button onClick={() => this.playSound(word)} className={`button radius`}>
                  {word}
                </button>
                <Modal isOpen={modal} contentLabel='Modal' style={modalStyle}>
                  <h1>Well done!</h1>
                    <Modal isOpen={modal} contentLabel='Modal' style={modalStyle}>
                      <h1>Well done!</h1>
                      <Link to={activityRoute+1}><button className="button-radius repeat" onClick={() => dispatch({type: 'CLOSE_MODAL_RESET_SCORE'})}>Repeat</button></Link><br />
                      <Link to='activity'><button className="button-radius new-activity" onClick={() => dispatch({type: 'CLOSE_MODAL_RESET_SCORE'})}>Choose another activity</button></Link>
                    </Modal>
                </Modal>
              </div>
            </div>
          </div>
          )
        } else {
          return (
            <div>
              <div className="row">
                <div className="columns">
                  <img src={`${words[word].imageFile}`} />
                  <audio ref={`${word}`} >
                    <source src={`${words[word].soundFile}`} preload=''/>
                  </audio>
                </div>
              </div>
              <div className="row">
                <div className="columns" onClick={() => dispatch({type: 'INCREMENT_WRONGWORDS'})}>
                  <button onClick={() => this.playSound(word)} className={`button radius`}>
                    {word}
                  </button>
                </div>
              </div>
            </div>
          )
        }
      } else if (word === answer) {
        return (
        <div>
          <div className="row">
            <div className="columns">
              <img src={`${words[word].imageFile}`} />
              <audio ref={`${word}`} >
                <source src={`${words[word].soundFile}`} preload=''/>
              </audio>
            </div>
          </div>
          <div className="row">
            <div className="columns" onClick={() => dispatch({type: 'OPEN_MODAL'})}>
              <button onClick={() => this.playSound(word)} className={`button radius`}>
                {word}
              </button>
              <Modal isOpen={modal} contentLabel='Modal' style={modalStyle}>
                <h1>Right on!</h1>
                <Link to={activityRoute+(level+1)}><button className="button-radius repeat" onClick={() => dispatch({type: 'CLOSE_MODAL'})}>Next one!</button></Link><br />
              </Modal>
            </div>
          </div>
        </div>
        )
      } else {
        return (
          <div>
            <div className="row">
              <div className="columns">
                <img src={`${words[word].imageFile}`} />
                <audio ref={`${word}`} >
                  <source src={`${words[word].soundFile}`} preload=''/>
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="columns" onClick={() => dispatch({type: 'INCREMENT_WRONGWORDS'})}>
                <button onClick={() => this.playSound(word)} className={`button radius`}>
                  {word}
                </button>
              </div>
            </div>
          </div>
        )
      }
    })
  }

  render() {
    const props = this.props
    const { dispatch, modal, words } = this.props
    const level = Number(this.props.params.id)
    const activityRoute = 'activity/practice/words/'
    const wordsArr = this.props.practiceWordPage[level].words
    const answer = this.props.practiceWordPage[level].answer
    const modalStyle = {
      content:{
        top:'20%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
      }
    }

    if (level === 1) {
      return (
        <div>
          <div className="row">
            <h1>Click ♫ then listen and choose the right one!</h1>
          </div>
          <div className="playBox row align-spaced">
            <div className="row">
              <div className="columns">
                <h1>{this.generateAnswer(wordsArr, answer, words)}</h1>
              </div>
            </div>
            {this.generateWord(wordsArr, words, answer)}
          </div>
        </div>
      )
    } else if (level === 5){
      return (
        <div>
          <div className="row">
            <h1>Click ♫ then listen and choose the right one!</h1>
          </div>
          <div className="playBox row align-spaced">
            <div className="row">
              <div className="columns">
                <h1>{this.generateAnswer(wordsArr, answer, words)}</h1>
              </div>
            </div>
            {this.generateWord(wordsArr, words, answer)}
          </div>
        </div>
      )
    } else return (
      <div>
        <div className="row">
          <h1>Click ♫ then listen and choose the right one!</h1>
        </div>

        <div className="playBox row align-spaced">
          <div className="row">
            <div className="columns">
              <h1>{this.generateAnswer(wordsArr, answer, words)}</h1>
            </div>
          </div>
          {this.generateWord(wordsArr, words, answer)}
        </div>
      </div>
    )
  }
}
module.exports = connect((state) => state)(PracticeWords)
