import React from 'react';
import { connect } from 'react-redux';

class PartnerReview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //import partner data from store/state
    //need usermeetup info and maybe meetup info
  }

  render() {
    return <div>This will be the review Component</div>;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerReview);
