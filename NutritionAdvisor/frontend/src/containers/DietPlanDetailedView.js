import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Skeleton, Statistic, Row, Col, Icon} from 'antd';
import CustomForm from '../components/Form'

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 20},
};

class DietPlanDetail extends React.Component {
    
    state = {
        plans: {}
    }

    componentDidMount() {
        const planID = this.props.match.params.planID;
        axios.get(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`)
        .then(res => {
            this.setState({
                plans: res.data
            });
        })
    }

    handleDelete = (event) => {
        const planID = this.props.match.params.planID;
        axios.delete(`http://127.0.0.1:8000/dietplan-api/plans/${planID}`);
        this.props.history.push('/');
        this.forceUpdate();
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
                    <hr />
                    <h3> Calories:  </h3>
                    <Row gutter={16}>
                        <Col span={8}>
                          <Statistic title="Calories from Fat" value={item.fat_calories} suffix={"/"+total_cal+" cal"} />
                        </Col>
                        <Col span={8}>
                          <Statistic title="Calories from Protein" value={item.protein_calories} suffix={"/"+total_cal+" cal"}/>
                        </Col>
                        <Col span={8}>
                          <Statistic title="Calories from Carbs" value={item.carbs_calories} suffix={"/"+total_cal+" cal"}/>
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
                </Card>
            }
            </div>
        )
    }
}

export default DietPlanDetail;