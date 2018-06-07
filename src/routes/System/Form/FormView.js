import React, { Component } from 'react';
import { connect } from 'dva';
import { FormViewer } from 'components/Form';

class FormView extends Component {
  render() {
    const { systemForm } = this.props;
    const { current } = systemForm;
    const config = {

    };
    return (
      <FormViewer config={config}></FormViewer>
    );
  }
}

export default connect(({ global, systemForm, loading }) => ({
  systemForm,
  collapsed: global.collapsed,
  submitting: loading.effects['systemForm/saveForm'],
}))(FormView);