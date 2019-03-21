/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Login'
import $ from 'jquery'
import badge from '../../../../static/images/gawing/login/badge.png'
import avatar from '../../../../static/images/gawing/login/avatar.png'
import '../style/Login.less'

import '../../../../static/css/animate.css';

@connect(
    state => state,
    {...actions}
)

class Login extends Component {
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
    this.anim = this.anim.bind(this)
    this.state = {
        test: true,
        n: 1,
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        z: 0,
        star_color_ratio: 0,
        star_x_save: '', 
        star_y_save: '', 
        star_ratio: 256,
        star_speed: 1,
        star: '',
        color: '', 
        cursor_x: 0,
        cursor_y: 0,
        mouse_x: 0,
        mouse_y: 0,
        context: '', 
        timeout: '', 
        fps: 0,
    }
  }


    $i = (id) => {
        return document.getElementById(id)
    }
    get_screen_size = () => {
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        return Array(w, h)
    }

    init = (test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps) => {
        var a = 0;
        for (var i = 0; i < n; i++) {

            console.log(Math.round(Math.random() * z))
            star[i] = new Array(5);
            star[i][0] = Math.random() * w * 2 - x * 2;
            star[i][1] = Math.random() * h * 2 - y * 2;
            star[i][2] = Math.round(Math.random() * z);
            star[i][3] = 0;
            star[i][4] = 0
        }
        var starfield = this.$i('starfield');
        starfield.style.position = 'absolute';
        starfield.width = w;
        starfield.height = h;
        context = starfield.getContext('2d');
        this.setState({
            context: context,
            star: star
        })
    }
    anim = (test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,mouse_x,mouse_y,context) => {
        // mouse_x = cursor_x - x;
        // mouse_y = cursor_y - y;
        mouse_x = 0;
        mouse_y = 0;
        // context.fillRect(0, 0, w, h);

        // console.log(star)
        for (var i = 0; i < n; i++) {
            test = true;
            star_x_save = star[i][3];
            star_y_save = star[i][4];
            star[i][0] += mouse_x >> 4;
            if (star[i][0] > x << 1) {
                star[i][0] -= w << 1;
                test = false
            }
            if (star[i][0] < -x << 1) {
                star[i][0] += w << 1;
                test = false
            }
            star[i][1] += mouse_y >> 4;
            if (star[i][1] > y << 1) {
                star[i][1] -= h << 1;
                test = false
            }
            if (star[i][1] < -y << 1) {
                star[i][1] += h << 1;
                test = false
            }
            star[i][2] -= star_speed;
            if (star[i][2] > z) {
                star[i][2] -= z;
                test = false
            }
            if (star[i][2] < 0) {
                star[i][2] += z;
                test = false
            }
            star[i][3] = x + (star[i][0] / star[i][2]) * star_ratio;
            star[i][4] = y + (star[i][1] / star[i][2]) * star_ratio;
            if (star_x_save > 0 && star_x_save < w && star_y_save > 0 && star_y_save < h && test) {
                context.lineWidth = (1 - star_color_ratio * star[i][2]) * 2;
                console.log((1 - star_color_ratio * star[i][2]) * 2)
                context.beginPath();
                context.moveTo(star_x_save, star_y_save);
                context.lineTo(star[i][3], star[i][4]);
                context.stroke();
                context.closePath()                        
            }
        }


        this.setState({
            test: test,
            n: n,
            w: w,
            h: h,
            x: x,
            y: y,
            z: z,
            star_color_ratio: star_color_ratio,
            star_x_save: star_x_save,
            star_y_save: star_y_save,
            star_ratio: star_ratio,
            star_speed: star_speed,
            star: star,
            mouse_x: mouse_x,
            mouse_y: mouse_y,
            context: context
        })

    }
    mouse_wheel = (test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps,evt) => {
        evt = evt || event;
        var delta = 0;
        if (evt.wheelDelta) {
            delta = evt.wheelDelta / 120
        } else if (evt.detail) {
            delta = -evt.detail / 3
        }
        star_speed += (delta >= 0) ? -0.2 : 0.2;
        if (evt.preventDefault) evt.preventDefault()
    }

    resize = (test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps) => {
        w = parseInt(this.get_screen_size()[0]);
        h = parseInt(this.get_screen_size()[1]);
        x = Math.round(w / 2);
        y = Math.round(h / 2);
        z = (w + h) / 2;
        star_color_ratio = 1 / z;
        cursor_x = x;
        cursor_y = y;
        this.init(test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps)
    }    

    start = (test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps) => { 
        this.resize(test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps)
        this.anim(test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps)
    }


    

  componentDidMount() {
    var test = true;
    var n = 1;
    var w = 0;
    var h = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var star_color_ratio = 0;
    var star_x_save, star_y_save;
    var star_ratio = 256;
    var star_speed = 1;
    var star = new Array(n);
    var color;
    var cursor_x = 0;
    var cursor_y = 0;
    var mouse_x = 0;
    var mouse_y = 0;
    var context;
    var timeout;
    var fps = 0;


    document.onmousewheel = this.mouse_wheel;

    document.getElementsByClassName("body").onload = this.start(test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps)
    window.onresize = this.resize(test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,color,cursor_x,cursor_y,mouse_x,mouse_y,context,timeout,fps)

    if (window.addEventListener) window.addEventListener('DOMMouseScroll', this.mouse_wheel, false);


    var {
        test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,mouse_x,mouse_y,context
    } = this.state

    this.timer4 = setInterval(
        () => this.anim((test,n,w,h,x,y,z,star_color_ratio,star_x_save, star_y_save,star_ratio,star_speed,star,mouse_x,mouse_y,context)),
        1000
    );
  }
  

  render() {
    return (
      <div className="body">
        <canvas id="starfield"></canvas>
        <div id="container">
            <img className="cones-inner" src={badge} />
            <img src={avatar} />
            <p className="user_name">用户名</p>
            <button className="login_btn">KPI 登录</button>
        </div>
    </div>
    )
  }
}

export default Login;
