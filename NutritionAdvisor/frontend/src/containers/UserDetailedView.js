import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Collapse} from 'antd';

const Panel = Collapse.Panel;

class UserDetail extends React.Component {
    
    state = {
        user: {}
    }

    componentDidMount() {
        const username = localStorage.getItem('current_user');
        console.log(username)
        axios.get(`http://127.0.0.1:8000/users-api/users/${username}`)
        .then(res => {
            this.setState({
                user: res.data
            });
        })
    }

    render() {
        const item = this.state.user;
        console.log(item)
        
        return (
            <div>
                <Card title={item.username} >
                </Card><br />
                <Collapse bordered={false} defaultActiveKey={['3']}>
                    <Panel header="Update this food" key="1">
                    </Panel>
                  </Collapse>
            </div>
        )
    }
}

export default UserDetail;