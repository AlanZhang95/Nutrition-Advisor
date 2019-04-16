import React from 'react';
import axios from 'axios';
import Foods from '../components/Foods'
import CustomForm from '../components/Form'

class FoodList extends React.Component {
    
    state = {
        foods: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/foodtable-api/foods/')
        .then(res => {
            this.setState({
                foods: res.data
            });
            console.log("debug massages:",res.data)
        })
    }

    render() {
        return (
            <div>
                <Foods data={this.state.foods} />
                <br />
                <h2> Create New Food </h2>
                <CustomForm requestType='post' foodID={null} btnText='Create'/>
            </div>


        )
    }
}

export default FoodList;