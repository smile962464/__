import React from 'react';
import { Button, Group } from './ParentChildren';

export class WrapButton extends React.Component {
}

export class WrapGroup extends React.Component {
  render() {
    // React.Children.forEach(this.props.children, (item, index) => {
    //   console.log(item, index);
    // });

    // 注意：React.Children.map 会修改 key, 而 this.props.children.map 不会
    const kids = React.Children.map(this.props.children, (item) => {
    // const kids = this.props.children.map((item) => {
      // console.log(item.key, 'wrap_ccc');
      return React.cloneElement(<Button />, {
        name: item.props.name1,
        id: item.props.id,
        key: item.key,
      });
    });
    return <Group>{kids}</Group>;
  }
}
