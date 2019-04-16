import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class CustomLayout extends React.Component {
  render(){
    return (
    <Layout>
        <Header className="header">
          <div className="logo" label={<Icon type="user" />}/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/foods"> Foods </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/plans"> Diet Plans </Link>
            </Menu.Item>
              {console.log("debug msg:", this.props)}
              {
                this.props.isAuthenticated ?

                <Menu.Item key="3" onClick={this.props.logout} style={{float: 'right'}}> 
                  Log Out
                </Menu.Item>

                :

                <Menu.Item key="3" style={{float: 'right'}}>
                  <Link to="/login">Log In</Link>
                </Menu.Item>
              }
            
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" /> {
                this.props.isAuthenticated ?
                  "Welcome" : "Hello Guest"
              }</span>}>
                <Menu.Item key="1">option1</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Advanced</span>}>
                <Menu.Item key="5">Popular Foods</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
                  {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
