import React from 'react';
import MemberActions from '../../actions/MemberActions';

const Members = React.createClass({
  componentDidMount() {
    MemberActions.getMembers();
  },
  render() {
    return (
      <div>Members</div>
    );
  },
});

export default Members;
