import React from 'react';
import axios from 'axios';
import {
  Form, Input, Button, TreeSelect, Icon,
} from 'antd';

const TreeNode = TreeSelect.TreeNode;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 5, offset: 4},
};

class DietPlanCustomForm extends React.Component {
    state = {
        value: [],
        user: localStorage.getItem('current_id'),            
    }


    handleFormSubmit = (event, requestType, planID) => {
       event.preventDefault();

        const data = {
            name: event.target.elements.name.value,
            user: this.state.user,
        };

        console.log(data);

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/dietplan-api/plans/', data)
                .then(this.handleRedirec)
                .catch(error => console.log(error))
            case 'put':
                return axios.put(`http://127.0.0.1:8000/dietplan-api/plans/${planID}/`, data)
                .then(res => console.log(res))
                .catch(error => console.log(error));

        }
        //console.log("debug messages", data)
    }

    handleRedirec = (res) => {
            if( res.statusText === "Created" ){
                console.log("su", res.data)
                localStorage.setItem('current_plan', res.data.id);
                window.location.href = `${res.data.id}/select`;
            }else {
              // Something went wrong here
            }
        }

    render() {
        return (
          <div>
            <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.planID)}>
              <Form.Item {...formItemLayout} label="Name">
                <Input name="name" placeholder="Give your plan a fancy name" /> <br/>
              </Form.Item>

              <Form.Item {...formTailLayout} >
                <Button type="primary" htmlType="submit">{this.props.btnText}  <Icon type="right" /> </Button>
              </Form.Item>
            </Form>
          </div>
        );
    }
};

export default DietPlanCustomForm;