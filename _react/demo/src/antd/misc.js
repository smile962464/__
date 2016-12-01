import { Steps } from 'antd';

export default class Misc extends React.Component{
  render() {
    return (<div>
      <Steps direction="horizontal">
        <Steps.Step title="现在" description="立即买入" />
        <Steps.Step title="11月3日" description="买入成功" />
        <Steps.Step title="11月4日" description="收益到账" />
      </Steps>
    </div>);
  }
}
