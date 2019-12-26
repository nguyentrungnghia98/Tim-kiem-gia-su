import React from "react";
import { Alert} from "shards-react";

export default class SelfDismissingAlert extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      visible: true,
      countdown: 0,
      timeUntilDismissed: 5
    };

    this.showAlert = this.showAlert.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  showAlert() {
    this.clearInterval();
    this.setState({ visible: true, countdown: 0, timeUntilDismissed: 5 });
    this.interval = setInterval(this.handleTimeChange, 1000);
  }

  handleTimeChange() {
    if (this.state.countdown < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ countdown: this.state.countdown + 1 }
      });
      return;
    }

    this.setState({ ...this.state, ...{ visible: false } });
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  
  render() {
    return (
      <div>     
      
        <Alert className="mb-3" open={this.state.visible} theme="success">
          {this.props.message}
        </Alert>
      </div>
    );
  }
}