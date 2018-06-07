import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Switch } from 'dva/router';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';

const { Content } = Layout;
const { AuthorizedRoute } = Authorized;

class FullScreenLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`;
    }
    return title;
  }
  render() {
    const {
      routerData,
      match,
      location,
    } = this.props;
    console.log(this.props)
    const layout = (
      <Layout>
        <Content style={{ margin: '0', height: 'calc(100vh)' }}>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/exception/403"
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    );
  }
}

export default FullScreenLayout;
