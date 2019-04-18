import React from 'react';
import axios from 'axios';
import {
  Form, Input, Button, TreeSelect,
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

class SelectFoodCustomForm extends React.Component {
    state = {
        value: [],
        user: localStorage.getItem('current_id'),
        plans: {},            
    }

    componentDidMount() {
        const planID = this.props.planID;
        axios.get(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`)
        .then(res => {
            this.setState({
                plans: res.data
            });
        })
    }

    handleFormSubmit = (event, requestType, planID) => {
       event.preventDefault();

        const data = {
            food_id: null,
            plan_id: this.props.planID,
            amount: null,
        };

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/dietplan-api/generatedby/', data)
                .then(this.handleRedirec)
                .catch(error => console.log(error))
        }
        //console.log("debug messages", data)
    }

    handleRedirec = (res) => {
            if( res.statusText === "Created" ){
                //console.log("su", res.data)
                const planID = res.data.id;
                window.location.href = `/${planID}/select`;
            }else {
              // Something went wrong here
            }
        }

    render() {
        return (
          <div>
            <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.foodID)}>

            <div>
              <Form.Item {...formTailLayout} style={{float:'left'}}>
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
              </Form.Item>

               <Form.Item {...formTailLayout} style={{float:'right'}} >
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
              </Form.Item>
            </div>
            </Form>
          </div>
        );
    }
};

export default SelectFoodCustomForm;