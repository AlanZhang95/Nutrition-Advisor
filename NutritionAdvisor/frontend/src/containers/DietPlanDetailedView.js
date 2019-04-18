import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Skeleton, Statistic, Row, Col, Icon, Switch, Popconfirm, } from 'antd';
import DietPlanCustomForm from '../components/DietPlanForm'

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 20},
};

class DietPlanDetail extends React.Component {
    
    state = {
        id: null,
        plans: {},
        all_foods: {},
    }

    componentDidMount() {
        const planID = this.props.match.params.planID;
        if (planID !== "create"){
            axios.get(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`)
            .then(res => {
                this.setState({
                    plans: res.data
                });
            })
        }
        this.setState({id: planID})
    }

    handleDelete = (event) => {
        const planID = this.props.match.params.planID;
        axios.delete(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`);
        window.location.href = "http://localhost:3000/plans"
    }

    onChange = (event) => {
        const planID = this.props.match.params.planID;
        const data = {
            name: this.state.plans.name,
            date: this.state.plans.date, 
            user: this.state.plans.user,
            status: true,
        }

        console.log(data)
        axios.put(`http://127.0.0.1:8000/dietplan-api/plans/${planID}/`, data)
        .then(this.reload)
    }

    reload = (res) => {
        if(res.status == 200){
            window.location.reload()
        }
    }

    render() {
        const item = this.state.plans;
        const foods = item.foods_list;

        let foods_list = null;

        const total_cal = item.fat_calories + item.protein_calories + item.carbs_calories
        //console.log(item)
        if(typeof foods !== 'undefined'){
            foods_list = foods.map((food)=>
            <Col key={food} span={6}>
                <Statistic title={food} value={item.amounts[food]} suffix="g" />
            </Col>
        )} 

        if (this.state.id !== "create"){
        return (
            <div>
            { 
                typeof item.date == 'undefined' ? 
                <Skeleton />
                :
                <Card title={item.name} >
                <div style={{float:'right'}}>
                    Created by <b>{item.username}</b> on <b>{item.date.substring(0,10)}</b>
                </div>
                    <h3> Foods: </h3>

                    <div> 
                        <Row gutter={16}>
                            {foods_list}
                        </Row>
                    </div> 

                    <Button type="primary" href={`${this.state.id}/select`} >
                      Add more foods<Icon type="right" />
                    </Button>

                    <hr />
                    <h3> Calories:  </h3>
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

                    <h3>Status: </h3> 
                    {
                        item.status ?
                    <div> 
                      <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> Completed
                    </div>
                    : 
                    <div> 
                      <Icon type="hourglass" theme="twoTone" /> In Progress

                    </div>

                    }


                    <br/>


                    {
                        item.status ? 
                        <br/>

                        : 

                        <Button style={{float: 'left'}} type='primary' onClick={this.onChange}> Mark as completed </Button>
                    }

                    <Popconfirm title="Are you sure delete this task?" onConfirm={this.handleDelete} okText="Yes" cancelText="No">
                        <Button style={{float: 'left'}} type='danger'> Delete this plan</Button>
                    </Popconfirm>
                </Card>
            }
            </div>
        )
        }
        else {
            return (
                <div>
                <h4>Create your own diet plan here!</h4>
                    <DietPlanCustomForm  requestType='post' btnText='Create'/>
                </div>
            )
        }
    }
}

export default DietPlanDetail;