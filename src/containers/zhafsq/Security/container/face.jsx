import React,{Component} from 'react'
import './../style/style.less'
import pictitle from '../../../../static/images/zhafsq/border_after_index.png'
import picface from '../../../../static/images/49.png'
import img  from '../../../../static/images/zhafsq/video.jpg'
import bgleft from '../../../../static/images/zhafsq/0.png'
import bgright  from '../../../../static/images/zhafsq/1.png'
import {Table} from 'antd'
import bg  from '../../../../static/images/zhafsq/border_after_index.png'
import close from '../../../../static/images/zhafsq/X.png'
import peopleImg from '../../../../static/images/gawing/test/(1).jpg'
import peopleImg1 from '../../../../static/images/gawing/test/(5).jpg'
class face  extends Component{
    constructor(props){
        super(props)
        this.state={
          faceidDetail:{
            'address':'佳源银座一楼大厅',
            'name':'人行闸机',             
            'model':'DH-ASI858988',
            'size':'七寸',
            'type':'人脸识别门禁',
            'owner':'XX物业',
            'publictime':'2019-01-0100:00:01',
            'protect':'浙江启融',
            'lasttime':'2019_01_09 18:00:01',
          },
          people:{
            'name':'张佳佳',
            'pid':'41018935566559588995',             
            'address':'拱墅区大关街道大关西六苑24幢3单元403室',
            'tel':'15825848598',
          },
          statistic:{
            'passtime':'2019-01-06 16:03:94',
            'lastpasstime':'2019-01-06 16:03:94',
            'passSeven':'23',
            'passAll':'151',
          },
          failed:{
            'state':'识别失败',
            'describ':'未知',
            'passtime':'2019-01-06 16:03:94',
            'lastpasstime':'未知',
          }
        }
       

    }
  closebox(){
    var faceid=document.querySelector('.faceid');
    faceid.style.display='none'
  }
    render(){
       
      
      return (
        <div className="faceid">
          <div className="baseDataTitle">
            <div className="baseDataTitle_left">
              <i>{this.state.faceidDetail.address}</i>
              <span>{this.state.faceidDetail.name}</span>
            </div>
            <div className="baseDataTitle_right">
              <span>{this.state.faceidDetail.model}</span>
              <i>{this.state.faceidDetail.size}</i>
              <em>
                <img src={bgleft} className="bgleft" />
                {this.state.faceidDetail.type}
                <img src={bgright} className="bgright" />
              </em>
            </div>
            <img src={close} onClick={this.closebox.bind(this)} />
          </div>
          <div className="content">
            <div className="content_top">
              <div className="content_left">
                <span className="firsts">业主单位：</span>
                <i className="firsti">{this.state.faceidDetail.owner}</i><br />
                <span className="seconds">维保单位：</span>
                <i className="secondi">{this.state.faceidDetail.protect}</i><br />
              </div>
              <div className="content_right">
                <span className="firsts">上线时间：</span>
                <i className="firsti">{this.state.faceidDetail.publictime}</i><br />
                <span className="seconds">上次检修时间：</span>
                <i className="secondi">{this.state.faceidDetail.lasttime}</i><br />
              </div>
            </div>
            <div className="content_bottom">
              <div className="content_bottom_left">
                <div className="catchPic">
                  <h3>抓拍人像</h3>
                  <ul>
                    <li><img src={peopleImg} /></li>
                    <li><img src={peopleImg1} /></li>
                    <li><img src={peopleImg} /></li>
                  </ul>
                </div>
                <div className="storePic">
                  <h3>库内人像</h3>
                  <ul>
                    <li><img src={peopleImg} /></li>
                    <li><img src={peopleImg1} /></li>
                    <li><img src={peopleImg} /></li>
                  </ul>
                </div>
              </div>
              <div className="content_bottom_right">
                <ul>
                  <li className="list">
                    <div className="discern">
                      <ol>
                        <li> 识别情况</li>
                        <li> 识别成功 </li>
                        <li> {this.state.people.name} </li>
                        <li> {this.state.people.pid} </li>
                        <li> 住址：{this.state.people.address} </li>
                        <li> 电话：{this.state.people.tel} </li>
                      </ol>
                    </div>
                    <div className="dataAll">
                      <ol>
                        <li> 数据统计</li>
                        <li> 通过时间： </li>
                        <li> {this.state.statistic.passtime} </li>
                        <li> 上次通过： </li>
                        <li> {this.state.statistic.lastpasstime} </li>
                        <li> 近七天累计通过次数：<span> {this.state.statistic.passSeven} </span>次</li>
                        <li> 历史累计通过次数：<span> {this.state.statistic.passAll} </span>次</li>
                      </ol>
                    </div>
                  </li>
                  <li className="list1">
                    <div className="discern">
                      <ol>
                        <li> 识别成功 </li>
                        <li> {this.state.people.name} </li>
                        <li> {this.state.people.pid} </li>
                        <li> 住址：{this.state.people.address} </li>
                        <li> 电话：{this.state.people.tel} </li>
                      </ol>
                    </div>
                    <div className="dataAll">
                      <ol>
                        <li> 通过时间： </li>
                        <li> {this.state.statistic.passtime} </li>
                        <li> 上次通过： </li>
                        <li> {this.state.statistic.lastpasstime} </li>
                        <li> 近七天累计通过次数：<span> {this.state.statistic.passSeven} </span>次</li>
                        <li> 历史累计通过次数：<span> {this.state.statistic.passAll} </span>次</li>
                      </ol>
                    </div>
                  </li>
                  <li className="list2">
                    <div className="discern">
                      <ol>
                        <li>  {this.state.failed.state} </li>
                        <li> {this.state.failed.describ} </li>
                      </ol>
                    </div>
                    <div className="dataAll">
                      <ol>
                        <li> 通过时间： </li>
                        <li> {this.state.failed.passtime} </li>
                        <li> 上次通过： </li>
                        <li> {this.state.failed.lastpasstime} </li>
                      </ol>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
export default face;