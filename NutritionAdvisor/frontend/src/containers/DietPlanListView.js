import React from 'react';
import axios from 'axios';
import DietPlans from '../components/DietPlans'

class DietPlanList extends React.Component {
    
    state = {
        plans: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/plans/')
        .then(res => {
            this.setState({
                plans: res.data
            });
            //console.log("debug massages:",res.data)
        })
    }

    render() {
        return (
            <div>
                <DietPlans data={this.state.plans} />
                <br />
            </div>
        )
    }
}

export default DietPlanList;