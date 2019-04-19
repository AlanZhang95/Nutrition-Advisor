import React from 'react';
import { List, Card } from 'antd';

const source_dict = {
    "pt": "Main Protein Source",
    "ft": "Main Fat Source",
    "ct": "Main Carbonhydrate Source",
  }

const source_image = {
    "pt": "https://i.ibb.co/tbd7mtz/barbecue-bbq-close-up-72160.jpg",
    "ft": "https://i.ibb.co/5T7Ps3k/agriculture-blur-close-up-33783.jpg",
    "ct": "https://i.ibb.co/g7tDffZ/bakery-bread-bread-rolls-2434.jpg",
  }

const Foods = (props) => {
    return (
      <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4,
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
            <Card title={<a href={`foods/${item.id}`}>{item.name}</a>} 
            cover={<img alt="example" src={source_image[item.source_type]} />}>
                {source_dict[item.source_type]}
            </Card>
          </List.Item>
        )}
      />
    );
};

export default Foods;