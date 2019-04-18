import React from 'react';
import axios from 'axios';
import { Card, Button, Form, Collapse, Skeleton, Row, Col, Statistic, Popconfirm, } from 'antd';
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
            {
                typeof item.name == 'undefined' ?
                <Skeleton />
                :
                <Card title={item.name} >
                    <h4> This is a {source_dict[item.source_type]}</h4>

                    <h3> Nutritions: </h3>

                        <Row gutter={16}>
                        <Col span={6}>
                          <Statistic title="Fat" value={item.fat} suffix="/100 g"/>
                        </Col>
                        <Col span={6}>
                          <Statistic title="Protein" value={item.protein} suffix="/100 g"/>
                        </Col>
                        <Col span={6}>
                          <Statistic title="Carbonhydrates" value={item.carbs} suffix="/100 g"/>
                        </Col>
                        <Col span={6}>
                          <Statistic title="Fiber" value={item.fiber} suffix="/100 g"/>
                        </Col>
                    </Row>

                </Card>
            }
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
                        <CustomForm requestType='put' foods={this.state.foods} foodID={this.props.match.params.foodID} btnText='Update'/>
                    </Panel>
                </Collapse>
                <br /> 
                <Popconfirm title="Are you sure delete this food?" onConfirm={this.handleDelete} okText="Yes" cancelText="No">
                    <Button type='danger'> Delete Food </Button>
                </Popconfirm>
            </div>
        )
    }
}

export default FoodDetail;