import React, { PropTypes } from 'react';
import { Platform, DrawerLayoutAndroid } from 'react-native';
import RnDrawer from 'react-native-drawer';
import tsPropsType from './PropsType';

export default class Drawer extends React.Component<tsPropsType, any> {
  static propTypes = {
    children: PropTypes.any,
  };
  static defaultProps = {
    position: 'left',
    onOpenChange: () => { },
    drawerWidth: 300,
    drawerBackgroundColor: 'rgba(0,0,0,0.3)',
  };

  constructor(props) {
    super(props);
  }

  renderIos() {console.log('xxxx');
    const {
      children, sidebar, open, onOpenChange, position,
      drawerWidth, drawerBackgroundColor, drawerStyles = {}, docked
    } = this.props;
    drawerStyles.drawer = drawerStyles.drawer || {}; 
    drawerStyles.drawer.shadowRadius = drawerStyles.drawer.shadowRadius || 3;
    if (docked) {
      drawerStyles.drawer.backgroundColor = drawerStyles.drawer.backgroundColor || drawerBackgroundColor;
      drawerStyles.drawer.shadowColor = drawerStyles.drawer.shadowColor || '#000';
      drawerStyles.drawer.shadowOpacity = drawerStyles.drawer.shadowOpacity || 0.8;
    } else {
      drawerStyles.drawer.shadowColor = drawerStyles.drawer.shadowColor || '#000';
      drawerStyles.drawer.shadowOpacity = drawerStyles.drawer.shadowOpacity || 0.3;
    }
    drawerStyles.mainOverlay = drawerStyles.mainOverlay || {};
    if (!docked && open) {
      drawerStyles.drawer.backgroundColor = drawerStyles.drawer.backgroundColor || '#fff';
      drawerStyles.mainOverlay.backgroundColor = drawerStyles.mainOverlay.backgroundColor || drawerBackgroundColor;
    }
    return (
      <RnDrawer ref={drawer => this.drawer = drawer}
        type={docked ? 'displace' : 'overlay'}
        content={sidebar}
        open={open}
        onOpen={() => onOpenChange(true)}
        onClose={() => onOpenChange(false) }
        tapToClose={true}
        side={position}
        openDrawerOffset={(viewport) => viewport.width - drawerWidth}
        styles={drawerStyles}
      >
        {children}
      </RnDrawer>
    );
  }
  renderAndroid() {
    const {
      children, sidebar, open, onOpenChange, position,
      drawerWidth, drawerBackgroundColor
    } = this.props;
    let drawerPosition = DrawerLayoutAndroid.positions.Left;
    if (position === 'right') {
      drawerPosition = DrawerLayoutAndroid.positions.right;
    }
    return (
      <DrawerLayoutAndroid ref={drawer => this.drawer = drawer}
        renderNavigationView={() => sidebar}
        drawerWidth={drawerWidth}
        drawerBackgroundColor={drawerBackgroundColor}
        drawerPosition={drawerPosition}
        onDrawerOpen={() => onOpenChange(true)}
        onDrawerClose={() => onOpenChange(false)}
      >
        {children}
      </DrawerLayoutAndroid>
    );
  }
  render() {
    if (Platform.OS === 'android') {
      return this.renderAndroid();
    }
    return this.renderIos();
  }
}
