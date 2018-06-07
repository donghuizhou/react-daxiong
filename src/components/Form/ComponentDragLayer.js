import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { createFormComponent } from './Utils';
import { ComponentModes } from './Constants';

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class ComponentDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };
  renderItem(item) {
    return createFormComponent(item, ComponentModes.VIEW);
  }
  render() {
    const { item, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div className={styles.dragLayer}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(item)}
        </div>
      </div>
    );
  }
}

const collect = (monitor) => ({
  item: monitor.getItem(),
  isDragging: monitor.isDragging(),
  currentOffset: monitor.getSourceClientOffset(),
});

export default DragLayer(collect)(ComponentDragLayer);
