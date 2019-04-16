import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Collapse} from 'antd';
import CustomForm from '../components/Form'

const Panel = Collapse.Panel;

const source_dict = {
                  "pt": "Main Protein Source",
                  "ft": "Main Fat Source",
                  "ct": "Main Carbonhydrate Source",}
class FoodDetail extends React.Component {
    
    state = {
        foods: {}
    }

    componentDidMount() {
        const foodID = this.props.match.params.foodID;
        axios.get(`http://127.0.0.1:8000/foodtable-api/foods/${foodID}`)
        .then(res => {
            this.setState({
                foods: res.data
            });
        })
    }

    handleDelete = (event) => {
        const foodID = this.props.match.params.foodID;
        axios.delete(`http://127.0.0.1:8000/foodtable-api/foods/${foodID}`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    render() {
        const item = this.state.foods;
        const summary = item.foods_summary;

        return (
            <div>
                <Card title={item.name} >
                    <h3> This is a {source_dict[item.source_type]}</h3>

                    <h2> Nutritions: </h2>

                        Carb: {item.carbs} <br/>
                        Fiber: {item.fiber} <br/>
                        Protein: {item.protein} <br/>
                        Fat: {item.fat}
                </Card><br />

                {/* 
                    typeof summary !== 'undefined' ?
                    <Card title="summary" >
                        Number of Carb source foods: {summary.Carbonhydrates} <br />
                        Number of Fiber source foods: {summary.Fiber} <br />
                        Number of Protein source foods: {summary.Protein} <br />
                        Number of Fat source foods: {
                            typeof summary.Fat !== 'undefined' ?
                            summary.Fat
                            :
                            "0"
                        } <br />
                    </Card>

                    :
                    <Card title="summary" >
                        "Loading..."
                    </Card>

                */}

                
                <Collapse bordered={false} defaultActiveKey={['3']}>
                    <Panel header="Update this food" key="1">
                        <CustomForm requestType='put' foodID={this.props.match.params.foodID} btnText='Update'/>
                    </Panel>
                    <Panel header="Delete this food" key="2">
                        <Form onSubmit={this.handleDelete}>
                            Are you sure?
                            <Form.Item layout='inline'>
                                <Button type='danger' htmlType='submit'> Confirm Delete! </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                  </Collapse>
            </div>
        )
    }
}

export default FoodDetail;