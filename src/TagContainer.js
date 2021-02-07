import React from 'react';
import TagCloud from './TagCloud';
import * as utils from './utils';

/**
 * TagContainer Component
 */
class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyText: '',
      wordsFreq: []
    };
    this.handleChange = this.handleChange.bind(this);
  }


  /**
   * OnChange handler for body text input
   * OnChange event is very costlier for this operation hence using debounce
   * @param event     @event  field change event
   */
  handleChange = utils.debounce(function (event) {
    //Set the state for body text if entered any value
    if(event.target.value) {
      this.setState({bodyText: event.target.value});
    } else {
      this.setState({bodyText: "", wordsFreq: []});
    }
  }, 500);


  /**
   * Submit handler for body text form
   * @param event     @event  form submit event
   */
  handleSubmit(event) {
    event.preventDefault();

    //Get the list of words object when received a non-empty string
    if(this.state.bodyText) {
      this.setState({wordsFreq: utils.processWordsFromBodyText(this.state.bodyText)});
    } else {
      this.setState({wordsFreq: [] });
    }
  }

  /**
   * Renders the form that submits the body text
   * render the TagCloud component only if the wordsFreq is extracted with lists
   */
  render() {
    return (
        <div className="container">
          <form onSubmit={(evt) => {
            this.handleSubmit(evt)
          }}>
            <div className="row">
              <div className="col-25">
                <label>Enter the Body of Text:</label>
              </div>
              <div className="col-75">
                <textarea  placeholder="Enter the body of text here..." onChange={(e)=>{ e.persist(); this.handleChange(e); }} />
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Generate tag cloud" />
            </div>
          </form>

          {this.state.wordsFreq && Array.isArray(this.state.wordsFreq) && this.state.wordsFreq.length > 0 &&
          <TagCloud wordsFreq={this.state.wordsFreq}/>}

        </div>
    );
  }
}

export default TagContainer;
