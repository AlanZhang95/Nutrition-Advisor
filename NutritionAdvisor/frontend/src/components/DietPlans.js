import React from 'react';
import { List, Card } from 'antd';

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
                Plan Goal: <br/>
                {item.goal} <br/>
                Status: <br /> 
                {
                  item.status ?
                    "Finished" : "In Progress"
                }
            </Card>
          </List.Item>
        )}
      />
    );
};

export default DietPlans;