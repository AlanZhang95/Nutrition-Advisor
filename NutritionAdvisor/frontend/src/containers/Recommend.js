import React,{Component} from 'react'
import {Menu, Dropdown, Icon, Steps, Button, message, List} from 'antd';
//import '../style/Recommend.css'
const Step = Steps.Step;
const steps = [{
  title: 'Goal',
  description: 'Choose Your Goal', 
  content: 'First-content',
}, {
  title: 'Recommend Restaurants',
  description: 'Choose A Restaurant',
  content: 'Second-content',
}, {
  title: 'Done',
  description: 'Enjoy!', 
  content: 'Last-content',
}];

class Recommend extends Component{
    constructor(){
        super()
        this.handleCheck = this.handleCheck.bind(this);
        this.state={
            GoalDict:'',
            Res:'',
            Keep:'',
            Lose:'',
            Gain:'',
            current: 0,
            goal: null, 
        }
    }
    componentWillMount() {
        fetch(
            'http://127.0.0.1:8000/restaurant-api/lose/'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({Lose:data})
            })
            .catch(e => console.log('error:', e))
        fetch(
            'http://127.0.0.1:8000/restaurant-api/gain/'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({Gain:data})
            })
            .catch(e => console.log('error:', e))
        fetch(
            'http://127.0.0.1:8000/restaurant-api/transform/'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({Keep:data})
            })
            .catch(e => console.log('error:', e))

    }

    handleCheck(value){
        value = this.shuffle(value);
        this.setState({
            Res:value.slice(0,3)
        })
    }

    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        var Lose= this.state.Lose
        var lose = [];
        for(var i in Lose)
        for(var j in Lose[i])
                if (j==='name')
                    lose.push([Lose[i][j]])
        var Gain= this.state.Gain
        var gain = [];
        for(var i in Gain)
            for(var j in Gain[i])
                if (j==='name')
                    gain.push([Gain[i][j]])
        var Keep= this.state.Keep
        var keep = [];
        for(var i in Keep)
            for(var j in Keep[i])
                if (j==='name')
                    keep.push([Keep[i][j]])
        const menu = (
            <Menu>
                <Menu.Item onClick={this.handleCheck.bind(this, lose)}>Lose weight</Menu.Item>
                <Menu.Item onClick={this.handleCheck.bind(this, keep)}>Keep weight</Menu.Item>
                <Menu.Item onClick={this.handleCheck.bind(this, gain)}>Gain weight</Menu.Item>
            </Menu>
        );

        const { current } = this.state;
        return(
            <div>
            {/*
                <Steps current={current} style={{margin:'auto', width:'80%'}}>
                  {steps.map(item => <Step key={item.title} title={item.title} description={item.description}/>)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                  {
                    current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>Next</Button>
                  }
                  {
                    current === steps.length - 1
                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                  }
                  {
                    current > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                      Previous
                    </Button>
                    )
                  }
                </div>
            */}
            
            <div className="Recommend">
                <div className="Goal">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#" >
                            Goal <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            {
                this.state.Res !== '' ?

                <List
                  size='small'
                  style={{margin:'auto',width:'50%'}}
                  header={<div>Recommended Restaurants</div>}
                  footer={<div style={{fontSize:"10px"}}>Click restaurant name to order on uber eats</div>}
                  bordered
                  dataSource={this.state.Res}
                  renderItem={item => (<List.Item>
                    <Icon style={{paddingRight:'10px',fontSize:'20px'}}type="right-circle" /><a href={"https://www.ubereats.com/en-US/search/?q="+item}>{item} </a> 
                    </List.Item>)}
                />
                /*<ul className="Result" style={{float: 'left', position: 'relative',left:'10%'}}>
                        {Object.keys(this.state.Res).map(res=>
                        <li >
                            <a href={"https://www.ubereats.com/en-US/search/?q="+this.state.Res[res]}>{this.state.Res[res]}</a>
                        </li>)}
                </ul>*/
                :
                <br />
            }
            </div>
        </div>
        )
    }
}

export default Recommend;