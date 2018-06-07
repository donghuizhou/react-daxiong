import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import { createSelectable } from 'react-selectable-fast';
import { ComponentModes } from './Constants';

/**
 * HOC
 * @param {string} displayName 表单组件显示名称
 * @param {object} defaultConfig 表单组件拖动时的默认数据
 * @param {Array} properties 表单组件可配置的属性
 */
function FormComponent(displayName, defaultConfig, properties) {
  return function (WrappedComponent) {

    const NewComponent = class extends Component {
      static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,

        componentMode: PropTypes.string.isRequired,
      }
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        const { connectDragPreview } = this.props;
        connectDragPreview(getEmptyImage(), {
          captureDraggingState: true,
        })
      }
      render() {
        const { componentMode, connectDragSource, selectableRef, selected, selecting } = this.props;

        let element = null;
        switch (componentMode) {
          case ComponentModes.CATA:
            element = connectDragSource(<div>{displayName}</div>);
            break;
          case ComponentModes.EDIT:
            element = connectDragSource(
              <div>
                <WrappedComponent {...this.props} />
              </div>
            );
            break;
          case ComponentModes.VIEW:
            element = <WrappedComponent {...this.props} />;
            break;
          default:
            break;
        }
        //return (<div ref={selectableRef}>{element}</div>);
        return element;
      }
    };

    const type = "FormComponent";
    const spec = {
      canDrag(props, monitor) {
        const { componentMode } = props;
        return componentMode != ComponentModes.VIEW;
      },
      beginDrag(props, monitor, component) {
        console.log('beginDrag:');
        console.log(defaultConfig);
        return defaultConfig;
      }
    };
    const collect = (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    });

    //return DragSource(type, spec, collect)(createSelectable(NewComponent));
    //return createSelectable(DragSource(type, spec, collect)(NewComponent));
    return DragSource(type, spec, collect)(NewComponent);
  }
}

export default FormComponent;
