import React, { PropTypes } from 'react';

class StaticRenderer extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    return this.props.render();
  }
}StaticRenderer.propTypes = {
  shouldUpdate: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};
;

export default StaticRenderer;