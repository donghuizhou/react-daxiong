import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import styles from './index.less';
import { createFormComponent } from './Utils';
import { ComponentModes } from './Constants';

class Canvas extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,

    config: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.moveChild = this.moveChild.bind(this);
    this.findChild = this.findChild.bind(this);
    this.state = {
      config: props.config,
    };
  }
  validate() {
    //this.refs..validate
  }
  insertChild(item) {
    const children = this.state.config.children || [];
    children.push(item);

    this.setState({ config: { children } });
  }
  /**
   * 用于子元素拖动排序
   * @param {string} dragIndex
   * @param {string} hoverIndex
   */
  moveChild(dragIndex, hoverIndex) {

  }
  /**
   * 用于子元素拖动排序
   * @param {string} index
   */
  findChild(index) {

  }
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const children = this.state.config.children || [];
    return connectDropTarget(
      <div className={classNames(styles.dropTarget, { [styles.active]: isActive })}>
        {children.map((config) => {
          return createFormComponent(config, ComponentModes.EDIT);
        })}
      </div>
    );
  }
}

const type = "FormComponent";
const spec = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }
    // Obtain the dragged item
    const item = monitor.getItem();
    console.log("drop:");
    console.log(item);
    component.insertChild(item);
  },
  hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();
    const isJustOverThisOne = monitor.isOver({ shallow: true });
  },
  canDrop(props, monitor) {
    return true;
  }
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

export default DropTarget(type, spec, collect)(Canvas);
