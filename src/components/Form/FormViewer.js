import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Bachend from 'react-dnd-html5-backend';
import { createFormComponent } from './Utils';

class FormViewer extends Component {
  static defaultProps = {
    config: {}, // {type, props}
  }
  static propTypes = {
    config: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
    };
  }
  render() {
    //const { config } = this.state;
    const config = {
      children: [{
        type: "Select",
        uid: "aa"
      },{
        type: "Select",
        uid: "bb"
      }]
    }

    const { children } = config;
    return (
      <div>
        {children ? children.map((item) => {
          return createFormComponent(item, ComponentModes.VIEW);
        }) : null}
      </div>
    );
  }
}

export default DragDropContext(HTML5Bachend)(FormViewer);
