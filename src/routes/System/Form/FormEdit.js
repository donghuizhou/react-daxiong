import React, { Component } from 'react';
import { connect } from 'dva';
import { FormEditor } from 'components/Form';

class FormEdit extends Component {
  render() {
    const { systemForm } = this.props;
    const { current } = systemForm;
    return (
      <FormEditor config={current}></FormEditor>
    );
  }
}

export default connect(({ global, systemForm, loading }) => ({
  systemForm,
  collapsed: global.collapsed,
  submitting: loading.effects['systemForm/saveForm'],
}))(FormEdit);