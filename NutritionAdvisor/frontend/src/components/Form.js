import React from 'react';
import axios from 'axios';
import {
  Form, Input, Button, Select
} from 'antd';

const Option = Select.Option;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 5, offset: 4},
};

const source_dict = {
                  "pt": "Main Protein Source",
                  "ft": "Main Fat Source",
                  "ct": "Main Carbonhydrate Source",}

class CustomForm extends React.Component {

    state = {
       source_type: null
    }

    handleFormSubmit = (event, requestType, foodID) => {
        //event.preventDefault();

        const data = {
            name: event.target.elements.name.value,
            carbs: event.target.elements.carbs.value,
            fiber: event.target.elements.fiber.value,
            protein: event.target.elements.protein.value,
            fat: event.target.elements.fat.value,
            source_type: this.state.source_type
        };

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/foodtable-api/foods/', data)
                .then(res => console.log(res))
                .catch(error => console.log(error));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/foodtable-api/foods/${foodID}/`, data)
                .then(res => console.log(res))
                .catch(error => console.log(error));

        }
        //console.log("debug messages", data)
    }

    handleChange = (value) => {
        this.setState({ source_type: value});
    }

    render() {
        return (
          <div>
            <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.foodID)}>
              <Form.Item {...formItemLayout} label="Name">
              { this.props.requestType === "post" ?
                <Input name="name" placeholder="food name"  />
                :
                <Input name="name" defaultValue={this.props.foods.name}/>
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Carb">
              { this.props.requestType === "post" ?
                <Input name="carbs" placeholder="Carbonhydrate in gram" />
                :
                <Input name="carbs" defaultValue={this.props.foods.carbs} />
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Protein">
              { this.props.requestType === "post" ?
                <Input name="protein" placeholder="Protein in gram" />
                :
                <Input name="protein" defaultValue={this.props.foods.protein} />
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Fiber">
              { this.props.requestType === "post" ?
                <Input name="fiber" placeholder="Fiber in gram" />
                :
                <Input name="fiber" defaultValue={this.props.foods.fiber}  />
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Fat">
              { this.props.requestType === "post" ?
                <Input name="fat" placeholder="Fat in gram" />
                :
                 <Input name="fat" defaultValue={this.props.foods.fat} />
              }
              </Form.Item>
               <Form.Item {...formItemLayout} label="Source Type">
               { this.props.requestType === "post" ?
                    <Select name="source_type" onChange={this.handleChange} >
                      <Option value="pt">Protein</Option>
                      <Option value="ft">Fat</Option>
                      <Option value="ct">Carbonhydrate</Option>
                    </Select>
                :
                    <Select name="source_type" onChange={this.handleChange} defaultValue={this.props.foods.source_type} >
                      <Option value="pt">Protein</Option>
                      <Option value="ft">Fat</Option>
                      <Option value="ct">Carbonhydrate</Option>
                    </Select>
               }
              </Form.Item>
              <Form.Item {...formTailLayout} >
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
              </Form.Item>
            </Form>
          </div>
        );
    }
};

export default CustomForm;