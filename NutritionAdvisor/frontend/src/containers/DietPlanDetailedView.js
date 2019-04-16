import React from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'antd';
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
        axios.get(`http://127.0.0.1:8000/api/plans/${planID}`)
        .then(res => {
            this.setState({
                plans: res.data
            });
        })
    }

    handleDelete = (event) => {
        const planID = this.props.match.params.planID;
        axios.delete(`http://127.0.0.1:8000/api/plans/${planID}`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    render() {
        const item = this.state.plans;
        const foods = item.foods_list
        let foods_list = null
        if(typeof foods !== 'undefined'){
            foods_list = foods.map((food)=>
                <li key={food}> {food} </li>
        )} 
        return (
            <div>
                <Card title={item.name} >
                    <h2> Plan goal: </h2>
                        <p> {item.goal} </p>

                    <h2> Foods: </h2>
                    <ul> {foods_list} </ul>
                </Card><br />
            </div>
        )
    }
}

export default DietPlanDetail;