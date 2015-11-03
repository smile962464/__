import React from 'react';
import assign from 'object-assign';
import Head from './layouts/Head';
import MainMenu from './layouts/MainMenu';
import Main from './layouts/Main';
import Foot from './layouts/Foot';

import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

const App = React.createClass({
  getInitialState() {
    return {
      appData: AppStore.getData(),
    };
  },
  componentDidMount() {
    AppActions.getResource();
    AppActions.loadPage();
    AppStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount() {
    AppStore.removeChangeListener(this.handleChange);
  },
  handleChange() {
    this.setState({
      appData: AppStore.getData(),
    });
  },
  render() {
    const state = this.state;
    const newProps = assign({initData: state.appData}, this.props);
    // console.log(newProps);
    return (
      <div>
        <Head />
        <MainMenu/>
        <Main {...newProps} />
        <Foot />
      </div>
    );
  },
});

export default App;
