import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentTypes} from './Constants';
import FormComponent from './FormComponent';

class FcLayout extends Component {
  static defaultProps = {
    config: {}, // {type, props}
  }
  static propTypes = {
  }
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
    };
  }
  render() {
    return (
      <div></div>
    );
  }
}

const properties = [
  { key: "placeholder", name: "提示信息", type: "text" },
];

const defaultConfig = {
  type: ComponentTypes.LAYOUT,
};

export default FormComponent('Layout 布局', defaultConfig, properties)(FcLayout);
