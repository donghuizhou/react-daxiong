import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Bachend from 'react-dnd-html5-backend';
import { SelectableGroup } from 'react-selectable-fast';
import { Layout, Tabs } from 'antd';
import styles from './index.less';
import ComponentDragLayer from './ComponentDragLayer';
import Canvas from './Canvas';
import Catalog from './Catalog';
import Properties from './Properties';
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
/**
 * config: {type: "", props: {}, children: []}
 */
class FormEditor extends Component {
  static defaultProps = {
    config: {}, // {type, props}
  }
  static propTypes = {
    config: PropTypes.object.isRequired,
    saveConfig: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      selected: null,
    };
  }
  updateConfig(childUid, childConfig) {

  }
  handleSelecting = selectingItems => {
    console.log('handleSelecting');
    console.log(selectingItems);
  }
  handleSelectionFinish = selectedItems => {
    console.log('handleSelectionFinish');
    console.log(selectedItems)
  }
  handleSelectionClear() {
    console.log('Cancel selection');
  }
  render() {
    const { config } = this.props;
    return (
        <Layout>
          <Content>
            <ComponentDragLayer />
      <SelectableGroup
        clickClassName="tick"
        enableDeselect
        tolerance={0}
        allowClickWithoutSelected={false}
        duringSelection={this.handleSelecting}
        onSelectionClear={this.handleSelectionClear}
        onSelectionFinish={this.handleSelectionFinish}
        ignoreList={['.not-selectable']}
      >
            <Canvas className={styles.canvas} config={config}></Canvas>
      </SelectableGroup>
          </Content>
          <Sider className={styles.sider}>
            <Tabs size="small">
              <TabPane tab="组件" key="component">
                <Catalog />
              </TabPane>
              <TabPane tab="属性" key="property">
                <Properties />
              </TabPane>
            </Tabs>
          </Sider>
        </Layout>
    );
  }
}

export default DragDropContext(HTML5Bachend)(FormEditor);
