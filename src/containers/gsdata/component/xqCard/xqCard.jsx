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
import './xqCard.less'
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


    componentDidMount(){
        var cards = $('.card-drop'), 
        toggler = cards.find('.toggle'), 
        links = cards.find('ul>li'), 
        li = links, 
        count = links.length, width = 100;
        li.each(function (i) {
            $(this).css('z-index', count - i);
        });
        function setClosed() {
            var cards = $('.card-drop');
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
        toggler.on('mousedown', function () {
            var $this = $(this),
                li = $this.siblings('ul').find('li');
                // console.log(li);
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

        
        // links.on('click', function (e) {
        $('.card-drop ul>li').on('click', function (e) {
            var $this = $(this), 
                label = $this.data('label'),
                li = $this
            li.removeClass('active');
            $this.parent().parent().find('li').removeClass('active');        
            $this.addClass('active');
            $this.parent().parent().siblings('.toggle').text(label);
            // console.log($this)
            // console.log($this.children('span'))
            setClosed();
            e.preventDefault;
        });
            

    }

    render() {

        const xqList = this.props.xqList


        return (
            <div class="card-drop">
                <span class="toggle">请选择行政区</span>
                <ul>
                    {xqList ? xqList.map((item, index) => {
                        <li key={index} data-value={item.id} class="closed">{item.name}</li>
                    }) : ''}

                </ul>
            </div>
        );
    }
}

export default withRouter(TopCascaderModalContent);