import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import { ComponentModes } from './Constants';
import FcRow from './FcRow';
import FcCol from './FcCol';
import FcLayout from './FcLayout';
import FcSelect from './FcSelect';
const { Panel } = Collapse;

class Catalog extends Component {
  render() {
    return (
      <Collapse bordered={false} defaultActiveKey={['basic']}>
        <Panel header="基本组件" key="basic">
          <FcRow componentMode={ComponentModes.CATA}></FcRow>
          <FcCol componentMode={ComponentModes.CATA}></FcCol>
          <FcLayout componentMode={ComponentModes.CATA}></FcLayout>
          <FcSelect componentMode={ComponentModes.CATA}></FcSelect>
        </Panel>
      </Collapse>
    );
  }
}

export default Catalog;
