import React from 'react';
import axios from 'axios';
import {
  Form, Input, Button, Select, Row, Col, Icon, Statistic,
} from 'antd';

const Option = Select.Option;

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
        value: undefined,
        user: localStorage.getItem('current_id'),
        plans: {}, 
        foods: {},           
    }


    componentDidMount() {
        const planID = this.props.planID;
        axios.get(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`)
        .then(res => {
            this.setState({
                plans: res.data
            });
        })

        axios.get(`http://127.0.0.1:8000/foodtable-api/foods/`)
        .then(res => {
            this.setState({
                foods: res.data
            });
        })
    }

    handleFormSubmit = (event, requestType, planID) => {
        //event.preventDefault();

        const data = {
            food: this.state.value,
            plan: this.props.planID,
            amount: event.target.elements.amount.value,
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
                const planID = this.props.planID;
                //window.location.href = `/select`;
            }else {
              // Something went wrong here
            }
        }

    handleChange = (value) => {
        console.log(value);
        this.setState({ value: value });
    }

    render() {
        const foods = this.state.foods;
        const item = this.state.plans;
        const total_cal = item.fat_calories+item.protein_calories+item.carbs_calories;
        return (
          <div>
            <h3> Current Diet Plan Calories: </h3>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Calories from Fat" value={parseInt(item.fat_calories)} 
                          suffix={"/"+parseInt(total_cal)+" cal"} />
              </Col>
              <Col span={8}>
                    <Statistic title="Calories from Protein" value={parseInt(item.protein_calories)} 
                          suffix={"/"+parseInt(total_cal)+" cal"}/>
              </Col>
              <Col span={8}>
                    <Statistic title="Calories from Carbs" value={parseInt(item.carbs_calories)} 
                          suffix={"/"+parseInt(total_cal)+" cal"}/>
              </Col>
            </Row>
            <hr />

            <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.planID)}>
            <Form.Item {...formItemLayout} label="Food">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a food"
                optionFilterProp="children"
                onChange={this.handleChange}
                >
              {
                Object.keys(foods).map( key => {
                    return <Option key={foods[key].name} value={foods[key].id}>{foods[key].name}</Option>
                })
              }
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Amount">
                <Input name='amount' placeholder="enter amount in gram"/>
            </Form.Item> 

              <Form.Item {...formTailLayout} style={{float:'left'}}>
                <Button type="primary" href={`/plans/${this.props.planID}`}>
                    <Icon type="left" />Back to plan
                </Button>
              </Form.Item>

            <Form.Item {...formTailLayout} style={{float:'left', position: 'relative', left: '2%'}}>
                <Button type="primary" htmlType="submit">Add!</Button>
              </Form.Item>
            </Form>
          </div>
        );
    }
};

export default SelectFoodCustomForm;