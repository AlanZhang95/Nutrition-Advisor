import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Collapse, Input, Select, Slider, Icon, Row, Col, Statistic} from 'antd';

const Panel = Collapse.Panel;
const Option = Select.Option;

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    };

const style1 = {
  position: 'absolute',
  top: '-2px',
  width: '16px',
  height: '16px',
  line_height: '1',
  font_size: '16px',
  left: '0'
}

const style2 = {
  position: 'absolute',
  top: '-2px',
  width: '16px',
  height: '16px',
  line_height: '1',
  font_size: '16px',
  right: '0'
}

const active = {
    0: "Not Active",
    50: "Active",
    100: "Very Active"
}
const active_rev = {
    VA: 100,
    AC: 50,
    NA: 0,
}

const active_rev2 = {
    100: "VA",
    50: "AC",
    0: "NA",
}

class UserDetail extends React.Component {
    
    state = {
        user: {},
        gender: null,
        my_goal: null,
        activity: null,
    }

    componentDidMount() {
        const userID = localStorage.getItem('current_id');
        axios.get(`http://127.0.0.1:8000/users-api/users/${userID}`)
        .then(res => {
            this.setState({
                user: res.data,
                gender: res.data.gender,
                my_goal: res.data.my_goal,
                activity: res.data.activity,
            });
        })
    }

    handleChange = (value) => {
        this.setState({ activity:  active_rev2[value]});
    }

    handleFormSubmit = (event, userID) => {
        //event.preventDefault();
        const data = {
            gender: this.state.gender,
            my_goal: this.state.my_goal, 
            activity: this.state.activity, 
            height: event.target.elements.height.value,
            weight: event.target.elements.weight.value,
            age: event.target.elements.age.value
        };

        axios.put(`http://127.0.0.1:8000/users-api/users/${userID}/`, data)
        .then(res => console.log(res))
        .catch(error => console.log(error));
        console.log("debug messages", data)
    }

    handleChangeGender = (value) => {
        this.setState({
            gender: value
        })
    }

    handleChangeGoal = (value) => {
        this.setState({
            my_goal: value
        })
    }

    handleChangeAct = (value) => {
        this.setState({
            activity: value
        })
    }
    handleClick = (value) => {
        localStorage.setItem('cal', this.state.user.advised_calories)
    }

    formatter = (value) => {
        return `${active[value]}`
    }
    render() {
        const item = this.state.user;
        return (
            <div>
            <h1> My Profile </h1>
            {

                typeof item.gender !== 'undefined' ? 
                <Form {...formItemLayout} onSubmit={(event) => this.handleFormSubmit(event, item.id)}>
                    <Form.Item label="Gender">
                    <Select name="gender" defaultValue={item.gender} onChange={this.handleChangeGender}>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Others">Others</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item label="My Goal">
                      <Select name="my_goal" defaultValue={item.my_goal} onChange={this.handleChangeGoal}>
                      <Option value="LF">Loss Fat</Option>
                      <Option value="GM">Gain Muscle</Option>
                      <Option value="TF">Transform</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item label="Activity Level">
                    <div className="icon-wrapper" style={{position: 'relative', padding: '0px 30px',}}>
                        <Icon type="frown-o" style={style1}/>
                    <Slider defaultValue={active_rev[item.activity]} step={50} tipFormatter={this.formatter} onChange={this.handleChange}/>
                        <Icon type="smile-o" style={style2}/>
                    </div>
                    </Form.Item>
                    <Form.Item label="Height">
                     <Input name='height' defaultValue={item.height} />  
                    </Form.Item>
                    <Form.Item label="Weight">
                     <Input name='weight' defaultValue={item.weight}/>
                    </Form.Item>
                    <Form.Item label="Age">
                     <Input name='age' defaultValue={item.age}/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Update My Profile</Button>
                    </Form.Item>
                </Form>
                :

                "loading..."
            }

            <h1>My Status</h1>


            <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title="Advised Calories" value={ Math.round(item.advised_calories)} prefix={<Icon type="like" />} />
                    </Col>
                    <Col span={12}>
                      <Statistic title="BMR" value={item.bmr} />
                    </Col>
                </Row>

            <h1></h1>

            <Button type="primary" href='/dietplan/create' onClick={this.handleClick} >Create a Diet Plan</Button>

            </div>
        )
    }
}

export default UserDetail;