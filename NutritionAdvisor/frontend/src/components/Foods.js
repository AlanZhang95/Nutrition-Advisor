import React from 'react';
import { List, Card } from 'antd';

const source_dict = {
    "pt": "Main Protein Source",
    "ft": "Main Fat Source",
    "ct": "Main Carb Source",
  }

const Foods = (props) => {
    return (
      <List
        grid={{
          gutter: 15, xs: 1, sm: 2, md: 3, lg: 3, xl: 5, xxl: 5,
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
            <Card title={<a href={`foods/${item.id}`}>{item.name}</a>}> 
                {source_dict[item.source_type]}
            </Card>
          </List.Item>
        )}
      />
    );
};

export default Foods;