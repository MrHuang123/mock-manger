import React, { Component } from 'react';
import './App.less';
import './style/APP.styl'
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
