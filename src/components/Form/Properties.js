import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import FcSelect from './FcSelect';

/**
 * 创建属性值输入控件
 * @param {string} key
 * @param {string} type
 */
function createPropValueInput(key, type) {
  return (<div></div>);
}

class Properties extends Component {
  static propTypes = {
  }
  render() {
    const configProps = FcSelect.configProps;
    return (
      <div>
        {configProps.map((prop) => {
          return (
            <Row>
              <Col span={8}>{prop.name}</Col>
              <Col span={16}>{createPropValueInput(prop.key, prop.type)}</Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Properties;
