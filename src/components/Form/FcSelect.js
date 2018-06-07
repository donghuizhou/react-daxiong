import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { ComponentTypes} from './Constants';
import FormComponent from './FormComponent';

class FcSelect extends Component {
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
    return <Select style={{ width: 120 }}></Select>;
  }
}

const properties = [
  { key: "placeholder", name: "提示信息", type: "text" },
];

const defaultConfig = {
  type: ComponentTypes.SELECT,
};

export default FormComponent('Select 选择器', defaultConfig, properties)(FcSelect);
