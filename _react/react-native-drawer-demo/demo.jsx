import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform, Text, Alert
} from 'react-native';
import Drawer from './';

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      position: 'left',
    };
  }
  onOpenChange = (isOpen) => {
    // Alert.alert('是否打开了 Drawer', (isOpen).toString());
  }
  render() {
    const sidebar = (<View style={{ height: 300 }}>
    <Text style={{ color: 'red' }}>主内容</Text></View>);

    const drawerProps = {
      // docked: true,
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
      drawerStyles: {
        drawer: {  },
        main: {paddingLeft: 3},
      },
    };
    return (
      <Drawer sidebar={sidebar} {...drawerProps} ref={(drawer) => { return this.drawer = drawer  }}>
        <View style={{ margin: 10, height: 300 }}>
          <Text style={{ color: 'red' }} onPress={() => this.drawer.drawer.openDrawer()}>主内容</Text>
          <Text style={{ color: 'red' }} onPress={() => this.setState({ open: !this.state.open }) }>ios</Text>
        </View>
      </Drawer>
    );
  }
}