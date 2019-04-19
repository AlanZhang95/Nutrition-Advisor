import React from 'react';
import axios from 'axios';
import CanvasJSReact from '../canvasjs.react'
import { 
  Card, Button, Form, Collapse, Input, Select, Slider, Icon, Row, Col, Statistic, Skeleton, Tabs, List, 
} from 'antd';

const Panel = Collapse.Panel;
const TabPane= Tabs.TabPane;
const Option = Select.Option;
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 20},
};

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
        e_cal: undefined, 
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

    handleStatSubmit = (event, user) => {
        const data = {
          user: user,
          weight: event.target.elements.weight.value,
          calories_consumed: event.target.elements.cal.value,
        } 
        axios.post(`http://127.0.0.1:8000/weighttracker-api/tracker/`, data)
        .then(window.location.reload())
    }

    formatter = (value) => {
        return `${active[value]}`
    }

    constructor() {
      super();
      this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }
    
    toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      this.chart.render();
    }

    onChangeTab = (key) => {
      localStorage.setItem("defaultkey", key)
    }

    handleEstimator = (event) => {
      const e_weight = event.target.elements.e_weight.value;
      const e_cal = e_weight*this.state.user.correlation.a + this.state.user.correlation.b
      this.setState({
        e_cal: e_cal
      })
    }

    render() {
        const item = this.state.user;
        console.log(item.weight_cal);
        const plans = item.user_plans;
        var options = {};
        if(typeof item.weight_cal !== 'undefined'){
          options = {
            theme: "light2",
            animationEnabled: true,
            title:{
              text: "Weight Tracker",
            },
            axisY: {
              title: "Weight",
              titleFontColor: "#6D78AD",
              lineColor: "#6D78AD",
              labelFontColor: "#6D78AD",
              tickColor: "#6D78AD",
              includeZero: false
            },
            axisY2: {
              title: "Calories Consumed",
              titleFontColor: "#51CDA0",
              lineColor: "#51CDA0",
              labelFontColor: "#51CDA0",
              tickColor: "#51CDA0",
              includeZero: false
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: "pointer",
              itemclick: this.toggleDataSeries
            },
            data: [{
              type: "spline",
              name: "Weight",
              showInLegend: true,
              yValueFormatString: "#,##0.# kg",
              dataPoints: item.weight_cal['weight'],
            },
            {
              type: "spline",
              name: "Caloreis Consumed",
              axisYType: "secondary",
              showInLegend: true,
              yValueFormatString: "#,##0.# cal",
              dataPoints: item.weight_cal['cal'],
            }]
          }
        } 
        return (
            <div>
            <Tabs defaultActiveKey={localStorage.getItem("defaultkey")} onChange={this.onChangeTab}>
            <TabPane tab="Profile" key="1">
            <h3> My Profile </h3>
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
                <Skeleton />
            }
            </TabPane>
            <TabPane tab="Status" key="2">
            <h3>My Status</h3>


            <Row gutter={16} style={{paddingLeft: '50px'}}>
                    <Col span={12}>
                      <Statistic title="Current BMR" value={item.bmr} />
                    </Col>
                    <Col span={12}>
                      <Statistic title="Advised Calories" value={ Math.round(item.advised_calories)} suffix="cal" />
                    </Col>
                </Row>



            <p style={{color: '#6d3939', paddingTop: '20px'}}>  
            <Icon type="notification" style={{paddingLeft:'10px', paddingRight:'10px'}} />
            BMR stands for '<b>basal maetabolic rate</b>', it shows the calories that you need to keep current weight at rest. </p>
            <p style={{color: '#6d3939', paddingTop: '5px'}}> 
            <Icon type="notification" style={{paddingLeft:'10px', paddingRight:'10px'}} />
            The advised calories will guide you to your goal based on your current BMR, 
            and activity level. <b>Remeber, to lose 1lb of fat, you need to have 3500 Cal deficit</b> </p>
            <h1></h1>
            </TabPane>


            <TabPane tab="Plans" key="3">
              <h3> My Plans </h3>

            <List
              itemLayout="horizontal"
              dataSource={plans}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={`http://localhost:3000/plans/${item.planID}`}>{item.name}</a>}
                    description={item.date.substring(0,10)}
                  />

                  <div>
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
                  </div>
                </List.Item>
              )}
            />


            <Button type="primary" href='/plans/create' onClick={this.handleClick} >
              Create a New Plan <Icon type="right" /> 

            </Button>
            </TabPane>
            <TabPane tab="Track" key="4">
            <h3> My Weight Track </h3> 

            <Form onSubmit={(event) => this.handleStatSubmit(event, this.state.user.id)}> 
              <Form.Item {...formItemLayout} label="Current Weight"> 
                  <Input name="weight" defaultValue={item.weight} placeholder="enter your new weight"/>
              </Form.Item>

              <Form.Item {...formItemLayout} label="Calories Cosumed">
                  <Input name="cal" placeholder="enter calories cosumed today" />
              </Form.Item> 

              <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit"> Submit </Button> 
              </Form.Item> 
            </Form>
            <div> 
              <CanvasJSChart options={options} onRef={ref => this.chart = ref}/>
            </div>


            Calories Estimator
            <Form onSubmit={(event) => this.handleEstimator(event)}>
            <Form.Item {...formItemLayout} label="Expected Weight">
              <Input name="e_weight" > </Input> 
            </Form.Item> 
            <Form.Item {...formItemLayout}>
              <Button htmlType="submit"> calculate </Button> 
            </Form.Item>

            </Form>

            {
              typeof this.state.e_cal === 'undefined' ?
              <br />
              :
              Estimated Calories: {this.state.e_cal}
            }

            </TabPane>
            </Tabs>
            </div>
        )
    }
}

export default UserDetail;