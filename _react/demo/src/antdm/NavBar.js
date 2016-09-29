import { NavBar, Icon, Button } from 'antd-mobile';

export default class MyNavBar extends React.Component{
  render() {
    return (
      <NavBar
        leftContent="返回" mode="dark"
        onLeftClick={() => alert('onLeftClick') }
        rightContent={[
          <Icon key="1" type="search" />,
          <Button key="2" type="primary" inline onClick={(e) => alert(e.toString()) }>Start</Button>
        ]}
        >NavBar</NavBar>
    );
  }
}
