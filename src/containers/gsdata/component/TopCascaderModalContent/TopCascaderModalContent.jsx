import React, { Component } from 'react';
import { 
    Cascader, 
    Modal,
    Button 
} from 'antd';
import $ from 'jquery';
import { withRouter } from 'react-router-dom'
import {CAS_CASCHECK, WEI_ZONE_INFO, CAS_LOGIN} from '../../../../fetch/apis'
import utils from '../../../../util/util.js'
import axios from 'axios'
import './TopCascaderModalContent.less'
import { combinationsReplacement } from 'simple-statistics';

const CHANGEV = "CHANGEV"

@withRouter

class TopCascaderModalContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: [],
            visible: false
        }
    }

    onCascaderChange = (value) => {
        this.props.onCascaderChange(value)
    }

    getLevelName = (key) => {
        var level;
        switch (key) {
            case 'districtId':
                level = '行政区'
                break;
            case 'streetId':
                level = '街道'
                break;
            case 'communityId':
                level = '社区'
                break;
            case 'zoneId':
                level = '小区'
                break;
            default:
                break;
        }
        return level
    }

    loadData = (data) => {
        let  _this = this
        // 生成carddrop div对象 class 为 card-drop
        var carddrop = $('<div>', {'class': 'card-drop'}); 
        // toggle span对象 class 为 toggle
        var toggle = $('<span>', {'class': 'toggle'})
        var placeholder
        // 创建ul
        var select=document.createElement("ul");
        // 循环data 
        for(var i = 0; i<data.length; i++){
            // 取levelname行政级别
            placeholder = this.getLevelName(data[i].level)
            // 创建li
            var li = document.createElement("li");
            // 给每个li设置属性及index
            // 行政地区id
            li.setAttribute('data-value', data[i].value);
            // 行政级别名字
            li.setAttribute('data-label', data[i].label);
            // 行政级别字段
            li.setAttribute('data-level', data[i].level);
            li.setAttribute('index', i);
            li.innerHTML = data[i].label;
            select.appendChild(li);
        }
        // 插入判断标签
        toggle.html('请选择'+ placeholder); 
        // 插入判断标签及行政级别标签
        carddrop[0].appendChild(toggle[0]);
        carddrop[0].appendChild(select);
        // 插入父节点
        document.querySelector("#category").appendChild(carddrop[0]);
        $(select).find('li').on('click', function(){
            // 递归循环
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            while(this.parentNode.parentNode.parentNode.lastChild != this.parentNode.parentNode){
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.lastChild);
            }
            var index = $(this).index();
            if(data[index].children && data[index].children.length > 0){
                _this.loadData(data[index].children);
            } 
        })
    }

    // activeNode = (level_item) => {
    //     let li = $('li[data-label='+ level_item.label +']')
    //     let s_li = li.siblings('ul').find('li')
    //     li.addClass('active');
    //     s_li.removeClass('closed');
    //     s_li.each(function (index) {
    //         $(this).css('top', 60 * (index + 1)).css('width', '100%').css('margin-left', '0px');
    //     })
    //     // li.parent().parent().find('li').removeClass('active');        
    //     // li.addClass('active');
    //     // li.parent().siblings('.toggle').text(level_item.label)
    // }

    // openArea = (level, levelValue, parentArr=[], c_index=0) => {
    //     let _this = this
    //     debugger
    //     if(level.length > 0) {
    //         let item = levelValue[c_index]
    //         if (c_index < levelValue.length) {
    //             if (item != '') {
    //                 let n_parentArr = []
    //                 if (parentArr.length > 0) {
    //                     for(let j=0;j<parentArr.length;j++){
    //                         let level_item = parentArr[j]
    //                         if (level_item.value == item) {
    //                             n_parentArr = level_item.children
    //                             // 打开这层 并选中
    //                             _this.activeNode(level_item)
    //                         }
    //                     }
    //                 } else {
    //                     for(let j=0;j<level.length;j++){
    //                         let level_item = level[j]
    //                         if (level_item.value == item) {
    //                             n_parentArr = level_item.children
    //                             _this.activeNode(level_item)
    //                         }
    //                     }
    //                 }
    //                 let n_index = c_index + 1
    //                 _this.openArea(level, levelValue, n_parentArr, n_index)
    //                 return 
    //             } else {
    //                 return
    //             }
    //         }
    //     }
    // }

    componentDidMount(){
        let _this = this
        var checkedValue = ['', '', '', ''];
        var levelArr = this.props.level            
        if (levelArr) {
            this.loadData(levelArr);
        }
        var cards = $('.card-drop'), 
            links = cards.find('ul>li'), 
            li = links, 
            count = links.length, width = 100;
        li.each(function (i) {
            $(this).css('z-index', count - i);
        });
    
        // 循环本地levelValue打开子级行政地区
        // this.openArea(this.props.level, this.props.levelValue)

        // 关闭
        function setClosed() {
            var cards = $('.card-drop');
            var toggler = cards.find('.toggle')        
            cards.each(function (index) {
                links = $(this).find('ul>li');
                li = links
                li.each(function (index) {
                    $(this).css('top', index * 4).css('width', width - index * 0.5 + '%').css('margin-left', index * 0.25 + '%');
                });
                li.addClass('closed');
                toggler.removeClass('active');
            })
        }
        setClosed();
        $('#category').on('mousedown', '.toggle', function () {
            var $this = $(this),
                li = $this.siblings('ul').find('li');
            if ($this.is('.active')) {
                setClosed();
            } else {
                $this.addClass('active');
                li.removeClass('closed');
                li.each(function (index) {
                    $(this).css('top', 60 * (index + 1)).css('width', '100%').css('margin-left', '0px');
                });
            }
        });
        $('#category').on('click', '.card-drop ul>li', function () {
            var $this = $(this), 
                label = $this.data('label'),
                value = $this.data('value'),
                level = $this.data('level'),
                li = $this
            li.removeClass('active');
            $this.parent().parent().find('li').removeClass('active');        
            $this.addClass('active');
            $this.parent().siblings('.toggle').text(label);
            setClosed();

            if (level == "districtId") {
                checkedValue = ['', '', '', ''];
                checkedValue[0] = value
            } else if (level == "streetId") {
                checkedValue[1] = value
                checkedValue[2] = ''
                checkedValue[3] = ''
            } else if (level == "communityId") {
                checkedValue[2] = value
                checkedValue[3] = ''
            } else if (level == "zoneId") {
                checkedValue[3] = value
            }
            
            _this.onCascaderChange({
                level: level,
                levelValue: checkedValue,
                levelId: value,
                label: label
            })
            
        });
    }

    render() {
        return (
            <div>
                <div id="category"></div>
            </div>
        );
    }
}

export default withRouter(TopCascaderModalContent);