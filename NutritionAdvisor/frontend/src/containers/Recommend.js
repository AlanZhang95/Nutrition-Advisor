import React,{Component} from 'react'
import {Menu, Dropdown,Icon} from 'antd';
import '../style/Recommend.css'
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
            .catch(e => console.log('错误:', e))
        fetch(
            'http://127.0.0.1:8000/restaurant-api/gain/'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({Gain:data})
            })
            .catch(e => console.log('错误:', e))
        fetch(
            'http://127.0.0.1:8000/restaurant-api/transform/'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({Keep:data})
            })
            .catch(e => console.log('错误:', e))

    }

    handleCheck(value){
        this.setState({
            Res:value,
        })
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
                <div className="bottom"><Menu.Item onClick={this.handleCheck.bind(this, lose)}>Lose weight</Menu.Item></div>
                <div className="bottom"><Menu.Item onClick={this.handleCheck.bind(this, keep)}>Keep weight</Menu.Item></div>
                <div className="bottom"><Menu.Item onClick={this.handleCheck.bind(this, gain)}>Gain weight</Menu.Item></div>
            </Menu>
        );
        return(
            <div className="Recommend">
                <div className="Goal">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            Goal <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <ul className="Result">
                    <li>
                        {Object.keys(this.state.Res).map(res=>
                        <li >
                            <a href={"https://www.ubereats.com/en-US/search/?q="+this.state.Res[res]}>{this.state.Res[res]}</a>
                        </li>)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Recommend