import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPermits } from '../actions/permitActions';
import Map from '../components/Map/map';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.fetchPermits();
  }
  render() {
    return <Map data={this.props.permits} />;
  }
}
const mapStateToProps = state => ({
  permits: state.permits.items
});

export default connect(mapStateToProps, { fetchPermits })(Main);
