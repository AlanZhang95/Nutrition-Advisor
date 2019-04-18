import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Skeleton, Statistic, Row, Col, Icon} from 'antd';
import SelectFoodCustomForm from '../components/SelectFoodForm'

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 20},
};

class SelectFood extends React.Component {
    
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
                    id: planID,
                    plans: res.data
                });
            })
        } else {
            axios.get(`http://127.0.0.1:8000/foodtable-api/foods/`)
            .then(res => {
                this.setState({
                    id: planID,
                    all_foods: res.data,
                });
            })
        }
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

        //console.log(this.state.id)
        return (
            <div>
                <SelectFoodCustomForm planID={this.props.match.params.planID} requestType='post'/>
            </div>
        )
    }
}

export default SelectFood;