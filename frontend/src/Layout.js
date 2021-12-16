import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from 'antd';

const { Header, Content, Footer } = Layout;

const layout = ({component: Component, ...rest}) => {
return(
  <Layout>
    <Content className="site-layout">
      <div className="site-layout-background" style={{minHeight: '100vh'}}>
      <Component {...rest} />
      </div>
    </Content>
  </Layout>
);
}

export default layout;