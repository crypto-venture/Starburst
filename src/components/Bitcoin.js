import React, { Component } from 'react';
import moment from 'moment';
import './Bitcoin.css';
import LineChart from './LineChartBTC';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import Price from './Price';

class Bitcoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
    };
  }

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    });
  }

  componentDidMount() {
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

      fetch(url)
        .then((r) => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi) {
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN', {
                style: 'currency',
                currency: 'USD',
              }),
              x: count, //previous days
              y: bitcoinData.bpi[date], // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }

  renderOracle() {
    return (
      <div className="card darken-1">
        <div className="card-content">
          <span className="card-title center">The Prophecy</span>
          <p className="center" style={{ paddingBottom: 10 }}>
            Our Predicted BTC Price for the next 5 hours. Click on a time below
            to see forecasted price!
          </p>
          <Price />
        </div>
      </div>
    );
  }

  render() {
    const registerStyle = {
      paddingTop: 20,
      paddingBottom: 20,
    };

    return (
      <div className="row">
        <div style={registerStyle}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title center amber-text lighten-2">
                BTCUSD
              </span>
              <p className="center">Bitcoin 30 Day Price Chart</p>
              <div className="container">
                <div className="row1">
                  {!this.state.fetchingData ? (
                    <InfoBox data={this.state.data} />
                  ) : null}
                </div>
                <div className="row1">
                  <div className="popup">
                    {this.state.hoverLoc ? (
                      <ToolTip
                        hoverLoc={this.state.hoverLoc}
                        activePoint={this.state.activePoint}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="row1">
                  <div className="chart">
                    {!this.state.fetchingData ? (
                      <LineChart
                        data={this.state.data}
                        onChartHover={(a, b) => this.handleChartHover(a, b)}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="row1">
                  <div id="coindesk">
                    {' '}
                    Powered by{' '}
                    <a href="http://www.coindesk.com/price/">CoinDesk</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.renderOracle()}
        </div>
      </div>
    );
  }
}

export default Bitcoin;
