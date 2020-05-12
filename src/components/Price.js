import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrices } from '../actions';

class Price extends Component {
  componentDidMount() {
    this.props.fetchPrices();
  }

  state = {
    showValue: false,
    value: 0,
  };

  renderValue() {
    if (this.state.showValue) {
      return (
        <h4 className="green-text" style={{ paddingTop: 20 }}>
          ${this.state.value}
        </h4>
      );
    } else {
      return (
        <h4 style={{ paddingTop: 25 }}>
          {/* <span role="img" aria-label="jsx-a11y/accessible-emoji">
            💰👀💸
          </span> */}
        </h4>
      );
    }
  }

  getValue(event) {
    this.setState({
      showValue: true,
    });
    const value = event.target.value;
    console.log(value);
    this.setState({
      value: value,
    });
  }

  renderPrices() {
    if (this.props.prices.length === 0) {
      return (
        <div style={{ paddingBottom: 15 }}>
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    } else {
      let values = Object.values(this.props.prices);
      let keys = Object.keys(this.props.prices);
      console.log(keys[0]);
      return (
        <div>
          <div className="row">
            <div className="col s1 offset-s1">
              <button
                className="btn orange lighten-2"
                onClick={(event) => this.getValue(event)}
                value={values[0]}
              >
                {keys[0]}
              </button>
            </div>
            <div className="col s1 offset-s1">
              <button
                className="btn orange lighten-2"
                onClick={(event) => this.getValue(event)}
                value={values[1]}
              >
                {keys[1]}
              </button>
            </div>
            <div className="col s1 offset-s1">
              <button
                className="btn orange lighten-2"
                onClick={(event) => this.getValue(event)}
                value={values[2]}
              >
                {keys[2]}
              </button>
            </div>
            <div className="col s1 offset-s1">
              <button
                className="btn orange lighten-2"
                onClick={(event) => this.getValue(event)}
                value={values[3]}
              >
                {keys[3]}
              </button>
            </div>
            <div className="col s1 offset-s1">
              <button
                className="btn orange lighten-2"
                onClick={(event) => this.getValue(event)}
                value={values[4]}
              >
                {keys[4]}
              </button>
            </div>
          </div>
          {this.renderValue()}
        </div>
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="center" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <h4>{this.renderPrices()}</h4>
      </div>
    );
  }
}

function mapStateToProps({ prices }) {
  return { prices };
}

export default connect(mapStateToProps, { fetchPrices })(Price);
