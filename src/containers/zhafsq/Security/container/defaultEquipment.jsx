import React,{Component} from 'react'
import './../style/style.less'
import pictitle from '../../../../static/images/zhafsq/border_after_index.png'
import picdevice from '../../../../static/images/49.png'
import police from '../../../../static/images/60.png'
import {Table} from 'antd'
import close from '../../../../static/images/zhafsq/X.png'
class defaultEquipment  extends Component{
    constructor(props){
        super(props)
        this.state={
            devicedata :{    
                'yezhu':'XX物业',
                'weihu':'浙江启融',
                'public':'2019_01-01 00:00:00',
                'date':'2019_01-01 00:00:00',
                'explain':'就目前情况来看，国内外大部分地区都采用填埋和焚烧发电来处理。填埋可以大量消纳城市生活垃圾，是非常直接有效的方法.',
                'address':'佳源银座一楼大厅测试设备',
                'model':'219993——193-——-199超清摄像机'
            },
            policedata :{  
                'image' :police,
                'blong':'祥符所',
                'policeblong':'西门安邦',
                'police':'125858',
                'policeid':'225878888',
                'recentdate':'2019_01-01 00:00:00',
                'situation':'正常经营',
            }
        }
    }
    closebox(){
        var defaultEquipment=document.querySelector('.defaultEquipment');
        defaultEquipment.style.display='none'
    }
    render(){
        const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            key: i,
            date: `2019-01-09${i+1}`,
            time: '09:08:00',
            aim: `浙江启融科技有限公司`,
            type: `走访`,
          });
        }
        const columns = [
            {
              title: '日期',
              dataIndex: 'date',
              key: 'date',
            }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
          }, {
            title: '目标单位',
            dataIndex: 'aim',
            key: 'aim',
           
          },
          {
            title: '事件类型',
            dataIndex: 'type',
            key: 'type',
          },];
        return(
            <div className="defaultEquipment">
                   <div className="baseDataTitle">
                           <h4>设备信息</h4>
                           <img className="bg" src={pictitle}/>
                           <img className="close" src={close} onClick={this.closebox.bind(this)}/>
                    </div>
                 <div className="device_detail">
                        <div className="device_detail_top">
                            
                              
                                <dl>
                                <dt><img src={picdevice}/></dt>
                                <dd>
                                    <span>业主单位:</span>
                                    <em>{this.state.devicedata.yezhu}</em>
                                </dd>
                                <dd>
                                    <span>维保单位:</span>
                                    <em>{this.state.devicedata.weihu}</em>
                                </dd>
                                <dd>
                                     <span>上线时间:</span>
                                    <em>{this.state.devicedata.public}</em>
                                </dd>
                                <dd>
                                    <span>上次检修时间:</span>
                                    <em>{this.state.devicedata.date}</em>
                                </dd>
                                <dd>
                                    <span>设备说明:</span>
                                    <em>{this.state.devicedata.explain}</em>
                                </dd>
                               
                            </dl>
                               
                          
                                  
                               
                        </div>
                        <div className="device_detail_bottom">
                                     <ul>
                                         <li>
                                            <span>设备位置:</span>
                                            <em>{this.state.devicedata.address}</em>
                                         </li>
                                         <li>
                                            <span>设备型号:</span>
                                            <em>{this.state.devicedata.model}</em>
                                        </li>
                                    </ul>
                                       
                        </div>
                 </div>
                 <div className="police_detail">
                        <div className="police_detail_left">
                                  <ul>
                                         <li>
                                            <span>所属辖区派出所:</span>
                                            <em>{this.state.policedata.blong}</em>
                                         </li>
                                         <li>
                                           <img src={this.state.policedata.image}/>
                                        </li>
                                         <li>
                                            <span>民警:</span>
                                            <em>{this.state.policedata.policeblong}</em>
                                        </li>
                                        <li>
                                            <span>警号:</span>
                                            <em>{this.state.policedata.policeid}</em>
                                        </li>
                                        <li>
                                            <span>最近走访时间:</span><br/>
                                            <em>{this.state.policedata.recentdate}</em>
                                        </li>
                                        <li>
                                            <span>走访情况:</span>
                                            <em>{this.state.policedata.situation}</em>
                                        </li>
                                    </ul>
                        </div>
                        <div className="police_detail_right">
                                         <div className="tit">
                                            <span>民警轨迹更新时间:</span>
                                            <em>2019_01-01 00:00:00</em>
                                         </div>
                                         <Table className="table_data" dataSource={data} columns={columns} pagination={ false } scroll={{ y: 240 }}  />
                        </div>
                 </div>
            </div>
        )
    }
}
export default defaultEquipment;