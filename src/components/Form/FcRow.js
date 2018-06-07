import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { ComponentTypes} from './Constants';
import FormComponent from './FormComponent';

class FcRow extends Component {
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
    return <Row></Row>;
  }
}

const properties = [
  { key: "gutter", name: "栅格间隔", type: "text" },
];

const defaultConfig = {
  type: ComponentTypes.ROW,
};

export default FormComponent('Row 栅格行', defaultConfig, properties)(FcRow);
