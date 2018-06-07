import React from 'react';
import { ComponentTypes } from './Constants';
import FcRow from './FcRow';
import FcCol from './FcCol';
import FcLayout from './FcLayout';
import FcSelect from './FcSelect';

const componentTypeMapping = {
  [ComponentTypes.ROW]: FcRow,
  [ComponentTypes.COL]: FcCol,
  [ComponentTypes.LAYOUT]: FcLayout,
  [ComponentTypes.SELECT]: FcSelect,
};

/**
 * 按类型创建表单组件
 * @param {object} config
 * @param {ComponentModes} componentMode
 */
function createFormComponent(config, componentMode) {
  const { type, uid } = config;
  const clazz = componentTypeMapping[type];
  return React.createElement(clazz, { componentMode, key: uid, config });
};

export { createFormComponent };
