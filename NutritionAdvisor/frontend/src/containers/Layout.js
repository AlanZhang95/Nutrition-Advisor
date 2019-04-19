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
            defaultSelectedKeys={[`${this.props.location.pathname}`]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/foods">
              <Link to="/foods"> Foods </Link>
            </Menu.Item>
            <Menu.Item key="/plans">
              <Link to="/plans"> Diet Plans </Link>
            </Menu.Item>
              {
                this.props.isAuthenticated ?

                <Menu.Item key="3" onClick={this.props.logout} style={{float: 'right'}}> 
                  Log Out
                </Menu.Item>

                :

                <Menu.Item key="/login" style={{float: 'right'}}>
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
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="sub1" > 
                <Icon type="user" />
                <span>
                {this.props.isAuthenticated ?
                  <Link to={`/users/${this.props.current_id}`}>Welcome {this.props.current_user}</Link> :  <Link to="/login">Hello Guest</Link>
              }</span>
              </Menu.Item>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Advanced</span>}>
                <Menu.Item key="5">
                <Link to="/recommend" > Restaurants </Link> 
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
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
