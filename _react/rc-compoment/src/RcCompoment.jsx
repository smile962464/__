import React from 'react';

export default class Layout extends React.Component {
  render() {
    const { content, sidebar } = this.props
    return (
      <div>
        <div className="Sidebar">
          {sidebar || <span>sidebar</span>}
        </div>
      </div>
    )
  }
}
