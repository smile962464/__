import {
  SearchBar, Steps,
  NavBar, Icon, Button,
} from 'antd-mobile';

export default class Misc extends React.Component{
  render() {
    return (<div>
      <NavBar
        leftContent="返回" mode="light"
        onLeftClick={() => alert('onLeftClick') }
        rightContent={[
          <Icon key="0" type="retweet" />,
          <Icon key="1" type="search" />,
          <Button key="2" type="primary" inline onClick={(e) => alert(e.toString()) }>Start</Button>
        ]}
      >NavBar</NavBar>

      <div style={{ margin: '20px 0'}}>
        <Button loading inline>loading 按钮</Button>
        <Button type="warning" across>warning 通栏按钮</Button>
      </div>

      <Steps direction="horizontal">
        <Steps.Step title="现在" description="立即买入" />
        <Steps.Step title="11月3日" description="买入成功" />
        <Steps.Step title="11月4日" description="收益到账" />
      </Steps>
      <SearchBar placeholder="搜索" />
    </div>);
  }
}
