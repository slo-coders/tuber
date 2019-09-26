import React, { Component } from 'react';
import CheckBox from '../../reusables/CheckBox';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../reusables/Button';
import Title from '../../reusables/Title';
import PropTypes from 'prop-types';

class SignUpTopics extends Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionAppear={true}
        transitionName="componentFadeIn"
        transitionAppearTimeout={9000}
        transitionLeaveTimeout={9000}
        transitionEnterTimeout={9000}
      >
          <Title
    largeText='Select Topics'
    smallText='Please select any topics from the list below that you have had exposure to.'
    center={true}
    />
        <div className="section" style={{paddingTop:"30px"}}>
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child"></div>
                <div
                  className="tile is-child is-6 box tileColor"
                  style={{ borderRadius: '0px' }}
                >
                  {/* <div className="level"> */}
                  < div style={{padding:"10px"}}>
                    <div className="column" style={{paddingBottom:"40px", paddingLeft:"30px", paddingRight:"30px"}}>
                      {this.props.topics.topics.map(topic => (
                        <div key={topic.id}>
                          <CheckBox
                            checkboxValue={topic.id}
                            checkboxItem={topic.title}
                            handleCheckboxChange={
                              this.props.handleCheckboxChange
                            }
                            checked={this.props.checked}
                          />
                        </div>
                      ))}</div>
                      <div className="container">
                        <div className="level">
                          <div className="level-item">
                            <Button
                              handleClick={this.props.handleContinue}
                              buttonStyle={'is-primary'}
                              buttonText={'Continue'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  {/* </div> */}
                
                
                
                </div>
                <div className="tile is-child"></div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics,
});

SignUpTopics.propTypes = {
  topics: PropTypes.object,
  handleCheckboxChange: PropTypes.func,
  checked: PropTypes.string,
  handleContinue: PropTypes.func,
};

export default connect(
  mapStateToProps,
  null,
)(SignUpTopics);
