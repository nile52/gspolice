import React,{Component} from 'react'
import './../style/style.less'
import pictitle from '../../../../static/images/zhafsq/border_after_index.png'
import picdevice from '../../../../static/images/49.png'
import img  from '../../../../static/images/zhafsq/video.jpg'
import bgleft from '../../../../static/images/zhafsq/0.png'
import bgright  from '../../../../static/images/zhafsq/1.png'
import {Table} from 'antd'
import bg  from '../../../../static/images/zhafsq/border_after_index.png'
import close from '../../../../static/images/zhafsq/X.png'
import { tabledatacar } from './tabledataCar.jsx'
class gate  extends Component{
    constructor(props){
        super(props)
        this.state={
          gateDetail:{
             
              'name':'佳源银座负二层车库西一门（出场）',
             
              'num':'DH-AGFRSD/4V',           
              'type':'车闸',
              'owner':'XX业主',
              'publictime':'2019-01-0100:00:01',
              'protect':'浙江启融',
              'lasttime':'2019_01_09 18:00:01',
              'video':img
          }
        }
       

    }
  closebox(){
    var gate=document.querySelector('.gate');
    gate.style.display='none'
  }
    render(){
        return(
            <div className="gate">
                   <div className="baseDataTitle">
                        <div className="baseDataTitle_left">
                           <i>{this.state.gateDetail.name}</i>
                         
                           <img src={bg} />
                        </div>
                        <div className="baseDataTitle_right">
                           <span>{this.state.gateDetail.num}</span>
                           <em>
                            <img src={bgleft} className="bgleft"/>
                             {this.state.gateDetail.type}
                              <img src={bgright} className="bgright"/>
                           </em>
                         
                        </div>
                        <img src={close} onClick={this.closebox.bind(this)}/>
                    </div>
                    <div className="content">
                        <div className="content_top">
                                <div className="content_left">
                                    <span className="firsts">业主单位：</span>
                                    <i className="firsti">{this.state.gateDetail.owner}</i><br/>
                                    <span className="seconds">维保单位：</span>
                                    <i className="secondi">{this.state.gateDetail.protect}</i><br/>
                                </div>
                                <div className="content_right">
                                  <span  className="firsts">上线时间：</span>
                                    <i className="firsti">{this.state.gateDetail.publictime}</i><br/>
                                    <span  className="seconds">上次检修时间：</span>
                                    <i className="secondi">{this.state.gateDetail.lasttime}</i><br/>
                                </div>
                        </div>
                        <div className="content_bottom">
                        <table width="890px" height="645px">
                            <thead>
                                <tr>
                                <th>发生时间</th>
                                <th>核验形式</th>
                                <th>识别情况</th>
                                <th>核验信息</th>
                                <th>数据统计（累计核验次数）</th>
                                </tr>
                            </thead>
                            <tbody>
                           
                                {
                                   
                                   tabledatacar.map((item,index)=>{
                                       if(item.result==='临时车'){
                                        return(
                                            <tr key={index}>
                                            <td>{item.time}</td>
                                            <td>{item.checkout}</td>
                                           
                                            <td className="bgBlue">{item.result}</td>
                                            <td>{item.massage}</td>
                                            <td>{item.num}</td>
                                            </tr>
                                        )
                                       }else{
                                           return(
                                            <tr key={index}>
                                            <td>{item.time}</td>
                                            <td>{item.checkout}</td>
                                           
                                            <td className="bgGreen">{item.result}</td>
                                            <td>{item.massage}</td>
                                            <td>{item.num}</td>
                                            </tr> 
                                           )
                                       }
                                           
                                    })
                                }
                            </tbody>
                        </table>
                     
                         
                        </div>
                    </div>
                 
                      
               
            </div>
        )
    }
}
export default gate;