import React from 'react';
import axios from 'axios';
import Foods from '../components/Foods'
import CustomForm from '../components/Form'
import { Collapse, } from 'antd';

const Panel = Collapse.Panel;

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
            //console.log("debug massages:",res.data)
        })
    }

    render() {
        return (
            <div>
                <Foods data={this.state.foods} />
                <br />

                Cannot find your favorite food? Try: <br/>
                  <Collapse bordered={false} defaultActiveKey={['2']}>
                    <Panel header="Create New Food" key="1">
                        <CustomForm requestType='post' foodID={null} btnText='Create'/>
                    </Panel>
                  </Collapse>
                
            </div>


        )
    }
}

export default FoodList;