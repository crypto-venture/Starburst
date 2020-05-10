import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrices } from '../actions';

class Price extends Component {
  componentDidMount() {
    this.props.fetchPrices();
  }

  changeState() {
    if (this.props.prices.Data) {
      console.log(this.props.prices.Data);
      //   const prices = Object.keys(this.props.prices.Data).map(function (key) {
      //     // Using Number() to convert key to number type
      //     // Using obj[key] to retrieve key value
      //     return [Number(key), this.props.prices.Data[key]];
      //   });
      //   this.setState(() => {});
      //   console.log(prices);
    }
  }

  render() {
    this.changeState();
    return (
      <div className="center" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <h4>
          <span className="green-text darken-3">Price</span>
        </h4>
      </div>
    );
  }
}

function mapStateToProps({ prices }) {
  return { prices };
}

export default connect(mapStateToProps, { fetchPrices })(Price);
