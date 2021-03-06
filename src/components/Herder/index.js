import React from 'react';
import { Row,Col } from "antd"
import axios from '../../axios'
import Util from '../../utils/utils'
import {connect} from 'react-redux'
import './index.less'
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            userName:'',
            dayPictureUrl:'',
            weather:''
        };
    }
    componentWillMount(){
        this.setState({
            userName:'Mr huang'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city = '武汉';

        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            console.log(res)
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span='24'>
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                <Row className='breadcremb'>
                    <Col span='4' className='breadcremb-title'>
                        {this.props.menuName}
                    </Col>
                    <Col span='20' className='weather'>
                        <span className='time'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img  src={this.state.dayPictureUrl} />
                        </span>
                        <span>{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        menuName: state.menuName,
    }
}
export default connect(mapStateToProps)(Header)