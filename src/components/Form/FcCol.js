import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { ComponentTypes} from './Constants';
import FormComponent from './FormComponent';

class FcCol extends Component {
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
];

const defaultConfig = {
  type: ComponentTypes.COL,
};

export default FormComponent('Col 栅格列', defaultConfig, properties)(FcCol);
