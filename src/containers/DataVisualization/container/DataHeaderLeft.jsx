import React, {Component} from 'react';
import { Form, Row, Col, Input, AutoComplete, Modal, Icon} from 'antd';
import '../style/DataVisualization.less'
const FormItem = Form.Item;
const confirm = Modal.confirm;

class DataHeaderLeft extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      dataSource: [],
      visible: false,
      selectValue: '',
    }
  }

  handleOk = () => {
    let _this = this
    this.props.xqList.forEach((item) => {
      if(item.name === this.state.selectValue) {
        this.props.changev({
          id: item.id,
          xqInfo: item,
        })
        localStorage.setItem('id', item.id)
        window.location.reload()
        // this.props.getHomePageTotal()
        // this.props.getBuildList(() => {
        //   // upVisible: true,
        //   // downVisible: false,
        //   // layerVisible: false,
        //   // roomVisible: false,
        //   // inOutVisible: false,
        //   // residentVisible: true,
        //   // floatingVisible: true,
        //   // videoVisible: true,
        //   // videoInfoVisible: true,
        //   // videoContentVisible: false,
        //   // isShortCut: false,
        //   // residentListVisible: false
        //   _this.props.handleCancel([
        //     'layerVisible', 
        //     'roomVisible', 
        //     'inOutVisible',
        //     'videoContentVisible',
        //     'residentListVisible'
        //   ])
        //   _this.props.handleOk([
        //     'upVisible',
        //     'residentVisible', 
        //     'floatingVisible', 
        //     'videoVisible', 
        //     'videoInfoVisible'
        //   ])
        //   _this.props.getHomePageTotal()
        //   _this.props.getPieChart()
        //   _this.props.getBarChart()
        //   _this.props.getBuildList()
        //   _this.props.getServicesChannelList()
        //   _this.props.getKeyAndValue()
        // })
        // _this.setState({
        //   visible: false,
        //   selectValue: ''
        // })
        
      }
    })
  }

  handleCancel = () => {
    this.props.form.setFieldsValue({
      headeer_left_xq: this.props.xqInfo.name
    });
    this.setState({
      visible: false,
      selectValue: '',
    })
  }

  handleSearch = (value) => {
    const xqList = this.props.xqList
    let dataSource = []
    if(xqList.length > 0) {
      xqList.forEach((item) => {
        if(item.name.indexOf(value) > -1) {
          dataSource.push(item.name)
        }
      })
    }
    this.setState({
      dataSource: dataSource,
    });
  }

  onSelect = (value, option) => {
    let _this = this
    if(value !== this.props.xqInfo.name) {
      this.setState({
        visible: true,
        selectValue: value
      })
    }
  }

  showDeleteConfirm = () => {
    confirm({
      title: '切换小区',
      content: '您即将离开对本小区操作，当前未提交的修改可能无法正确保存，是否切换？',
      onOk() {
        this.handleOk()
      },
      onCancel() {
        this.handleCancel()
      },
    });
  }

  componentDidMount() {
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 23 },
      },
    }
    
    return (
      <div className="data_header_left">
        <Row>
          <Col span={6}>
            <div className="header_left_layout"><span className="header_left_layout_btn" onClick={this.props.logout}>退出</span></div>  
          </Col>
          <Col span={1}></Col>
          <Col span={15}>
            <div className="header_left_user">用户{this.props.userInfo.userName}已登录</div>  
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{height: '0.5rem'}}></div>
          </Col>
        </Row>
        <Row>
          {this.props.xqInfo?<FormItem
              {...formItemLayout1}
                  label={null}
              >
              {getFieldDecorator('headeer_left_xq', {
                  initialValue: this.props.xqInfo.name,
              })(
                  // <Input 
                  //   placeholder="请输入小区名" 
                  //   prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  //   className="header_left_input"
                  // />
                  <AutoComplete
                    dataSource={this.state.dataSource}
                    style={{ width: 200 }}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    className="header_left_autocomplete"
                    getPopupContainer={() => document.getElementById('datavisualization')}
                  >
                    <Input 
                      placeholder="请输入小区名" 
                      prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      className="header_left_input"
                    />
                  </AutoComplete>

              )}
          </FormItem>:null}
        </Row>
        <Modal
          title="切换小区"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          keyboard={true}
          okText="确认"
          cancelText="取消"
        >
          <p>您即将离开对本小区操作，当前未提交的修改可能无法正确保存，是否切换？</p>
        </Modal>
      </div>
    )
  }

}

export default Form.create()(DataHeaderLeft);