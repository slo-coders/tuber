import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../../reusables/Title';
import StarRating from '../../reusables/StarRating';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      proficiencyRating: 0,
      topicId: '',
    };
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleStarClick(e, topicId) {
    const rating = e.target.getAttribute('value');
    this.setState({
      proficiencyRating: rating,
      topicId: topicId,
    });
  }

  render() {
    console.log('RATING STATE', this.state);
    return (
      <div>
        <Title
          largeText="Review Your Partner"
          smallText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. "
        />
        <div className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child"></div>
                <div className="tile is-child is-6 box tileColor">
                  <strong>
                    {
                      'Please rate (name goes here) proficiency in the folowing topic:'
                    }
                  </strong>
                  <br />
                  <br />
                  <div className="level">
                    <p>Topic name goes here:</p>

                    <StarRating
                      // pass in topicId here, it will get sent back to this state with score when user clicks on star
                      topic={'topic id gets passed in here'}
                      handleStarClick={this.handleStarClick}
                    />
                  </div>
                </div>
                <div className="tile is-child"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(Review);
