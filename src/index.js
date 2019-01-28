import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      errorMessage: ""
    };
  }
  //   render() {
  //     return (
  //       <div>
  //         Latitude: {this.state.lat}
  //         <br />
  //         Error: {this.state.errorMessage}
  //       </div>
  //     );
  //   }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        // we called setState
        this.setState({
          lat: position.coords.latitude
        });
      },
      err => {
        this.setState({
          errorMessage: err.message
        });
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
      //   return <div> Latitude: {this.state.lat} </div>;
    }

    return <Spinner message="Please accept location request" />;
  }

  //   componentDidUpdate() {
  //     console.log("My component was just updated - it rerendred!");
  //   }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
