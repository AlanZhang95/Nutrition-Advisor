import React from 'react';
import { List, Card, Icon, } from 'antd';

const DietPlans = (props) => {
    return (
      <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4,
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
            <Card title={<a href={`plans/${item.id}`}>{item.name}</a>}>
                Created By: {item.username} <br/>
                Date: {item.date.substring(0, 10)} <br/>
                Total Calories: {item.fat_calories + item.protein_calories + item.carbs_calories} <br/>
                {
                  item.status ?
                    <div> 
                      Status:  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> Completed
                    </div>
                    : 
                    <div> 
                      Status: <Icon type="hourglass" theme="twoTone" /> In Progress
                    </div>
                }
            </Card>
          </List.Item>
        )
      }
      />
    );
};

export default DietPlans;