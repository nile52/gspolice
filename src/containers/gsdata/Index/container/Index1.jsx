/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Index'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Card,
  Progress,
  Cascader
  // EnterAnimation
} from 'antd'
import QueueAnim from 'rc-queue-anim';
import '../style/Index.less'
import {
  WS_URL
} from '../../../../fetch/apis'
import utils from '../../../../util/util';
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import marker_blue from '../../../../static/images/gawing/marker_blue.png'
import marker_red from '../../../../static/images/gawing/marker_red.png'
import gsbg5 from '../../../../static/images/gawing/map_window_bg.png'
import gsbg4 from '../../../../static/images/gs_bg_04.png'
import cardicon1 from '../../../../static/images/gs_icon_01.png'
import cardicon2 from '../../../../static/images/gs_icon_02.png'
import cardicon3 from '../../../../static/images/gs_icon_03.png'
import cardicon4 from '../../../../static/images/gs_icon_04.png'
import top_title from '../../../../static/images/gawing/gs_title.png'


import TopButtons from '../../component/TopButtons/TopButtons'
import TopCascader from '../../component/TopCascader/TopCascader'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'
import SearchBox from "../../component/SearchBox/SearchBox";
import XQHouseTypePie from './XQHouseTypePie'
import XQServicesBar from './XQServicesBar'
import XQHouseGauge from './XQHouseGauge'
import { blockParams } from 'handlebars';
import '../../../../static/css/animate.css';
import '../../../../static/css/tooltip-line.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

var MacData = [
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604482000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 5.2,
                  "firstCollectTime": 1544604482000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "1048b1aacc14",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "305a3acbf8f8",
                  "terminalBrand": "Beijing Duokan Technology Limited",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2.2,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "0025ab541f2e",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "006b8e8b6a1f",
                  "terminalBrand": "AIO LCD PC BU / TPV",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604483000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 5.4,
                  "firstCollectTime": 1544604483000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "f0b4297d97eb",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "f0b4297d97ec",
                  "terminalBrand": "Xiaomi Communications Co Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602645000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 6.2,
                  "firstCollectTime": 1544602645000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "28c2ddd92bc6",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "fcd733f61c68",
                  "terminalBrand": "Azurewave Technologies Inc.",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602944000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 7.2,
                  "firstCollectTime": 1544602944000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "a456024b366f",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "a456024b366f",
                  "terminalBrand": "fenglian Technology Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602646000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 7.6,
                  "firstCollectTime": 1544602646000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "80ed2c3d3f0b",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "7844fd427d19",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604485000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 7.8,
                  "firstCollectTime": 1544604485000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b8c1117ee78c",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "703a730067e7",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602645000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 3.4,
                  "firstCollectTime": 1544602645000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "a444d1586fc9",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "8ca6df3fb408",
                  "terminalBrand": " Wingtech Group (HongKong)Limited",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604485000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 1.8,
                  "firstCollectTime": 1544604485000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "ec26caea1fca",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "ec26caea1fca",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602644000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 6.4,
                  "firstCollectTime": 1544602644000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "8ca6df67c80b",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "8ca6df67c80b",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602948000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 1.8,
                  "firstCollectTime": 1544602948000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "689c5e719880",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "AcSiP Technology Corp.",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602648000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.2,
                  "firstCollectTime": 1544602648000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "08ea40bfbd21",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "Shenzhen Bilian Electronic Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602950000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 3,
                  "firstCollectTime": 1544602950000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "90671c9daed1",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "90671c9daed4",
                  "terminalBrand": "Huawei Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604485000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 3,
                  "firstCollectTime": 1544604485000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "f483cde1ee0e",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "f483cde1ee0e",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604490000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 5.6,
                  "firstCollectTime": 1544604490000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "10417f9fa023",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "a80cca024d6f",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602950000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.4,
                  "firstCollectTime": 1544602950000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "bc54fc5398d2",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "a456024b366f",
                  "terminalBrand": "Shenzhen Mercury Communication Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604484000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 10,
                  "firstCollectTime": 1544604484000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b0411d3a04df",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "ITTIM Technologies",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "bc5ff6058e00",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "Shenzhen Mercury Communication Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602646000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 7.6,
                  "firstCollectTime": 1544602646000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "7844fd427d19",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "7844fd427d19",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604486000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 6,
                  "firstCollectTime": 1544604486000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "94d9b324ab0c",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "94d9b324ab0c",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.2,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "7c49ebcd9084",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "XIAOMI Electronics,Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604488000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 2.4,
                  "firstCollectTime": 1544604488000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "9c2ea10f33dd",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "a80cca024d47",
                  "terminalBrand": "Xiaomi Communications Co Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 5.8,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "0823b29453ca",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b4750e39c3fc",
                  "terminalBrand": "vivo Mobile Communication Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602946000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 1.6,
                  "firstCollectTime": 1544602946000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b4432607bed8",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b4432607bee0",
                  "terminalBrand": "",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.4,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b4750e39c3fc",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b4750e39c3fc",
                  "terminalBrand": "Belkin International Inc.",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602647000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.4,
                  "firstCollectTime": 1544602647000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "3ca6163bba3c",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b0958e6a39f6",
                  "terminalBrand": "vivo Mobile Communication Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604489000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 6,
                  "firstCollectTime": 1544604489000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "d4ee075037f0",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "d4ee075037f0",
                  "terminalBrand": "HIWIFI Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602644000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2.6,
                  "firstCollectTime": 1544602644000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "30459606d940",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "30459606d940",
                  "terminalBrand": "",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602647000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.4,
                  "firstCollectTime": 1544602647000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b0958e6a39f6",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b0958e6a39f6",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 5.8,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b4750e39c3fb",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "b4750e39c3fc",
                  "terminalBrand": "Belkin International Inc.",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602645000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 3.4,
                  "firstCollectTime": 1544602645000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "8ca6df3fb408",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "8ca6df3fb408",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604485000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 1.8,
                  "firstCollectTime": 1544604485000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "60a37d9fb98c",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "ec26caea1fca",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602949000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2.4,
                  "firstCollectTime": 1544602949000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "0c9a42ad1ef8",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602648000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 4.2,
                  "firstCollectTime": 1544602648000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "7c49ebcd9084",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "XIAOMI Electronics,Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602950000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 5.2,
                  "firstCollectTime": 1544602950000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "d4a14891df10",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "d4a14891df18",
                  "terminalBrand": "Huawei Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602644000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2.4,
                  "firstCollectTime": 1544602644000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "0810795b5c80",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "0810795b5c80",
                  "terminalBrand": "",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602945000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 7.8,
                  "firstCollectTime": 1544602945000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "a03be345ac16",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "8ca6df67c80b",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544605135000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 7.4,
                  "firstCollectTime": 1544605135000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "c4b30184067a",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "703a730067e7",
                  "terminalBrand": "Apple",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544604490000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 1.6,
                  "firstCollectTime": 1544604490000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "c8ff286405f9",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "Liteon Technology Corporation",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602648000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 5.6,
                  "firstCollectTime": 1544602648000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "b0411d3d18b1",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "",
                  "terminalBrand": "ITTIM Technologies",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544605135000,
                  "devNo": "1921688231",
                  "devType": 0,
                  "fieldIntensity": 4,
                  "firstCollectTime": 1544605135000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "0c4b548bdebd",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "0c4b548bdebd",
                  "terminalBrand": "TP-Link Technologies Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              },
              {
                  "collectDevDimensionality": 0,
                  "collectDevLongitude": 0,
                  "collectTime": 1544602648000,
                  "devNo": "192168585",
                  "devType": 0,
                  "fieldIntensity": 2.4,
                  "firstCollectTime": 1544602648000,
                  "historySSID": "",
                  "inOutFlag": 0,
                  "lastCollectTime": 0,
                  "linkageDevCode": "",
                  "mACAddress": "18bc5ab6e3eb",
                  "msgType": 2,
                  "scanTime": 0,
                  "aPMacAddress": "08107685a239",
                  "terminalBrand": "Zhejiang Tmall Technology Co. Ltd",
                  "vendor": "",
                  "version": "0",
                  "x": 0,
                  "y": 0
              }]

@connect(
    state => state,
    {...actions}
)

class Index extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
      bottomData: null,
      nowleval: null,
      boxVisiable: true,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区',

      entranceGuardRecord: [],
      macRecord: [],
      recPersonnelRecord: [],
      recVehicleRecord: [],
    }
  }

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    // this.getBoundary(map)
  }

  // 编写自定义函数,创建标注
  addWindow = (map, services) => {    
    services.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(30,30));
        const redIcon = new BMap.Icon(marker_red, new BMap.Size(30,30));
        var marker = new BMap.Marker(point, {
          icon: blueIcon,
          title: item.name
        });

        const sDom = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (item.temporaryTotal ? item.temporaryTotal : '0') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ item.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ item.equipmentTotal +`</span>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (item.temporaryTotal ? item.temporaryTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ item.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ item.equipmentTotal +`</span>
                        </div>
                      </div>`
        


        var label = new BMap.Label(sDom,{offset:new BMap.Size(48,-70)});
        var label2 = new BMap.Label(sDom2,{offset:new BMap.Size(48,-70)});
        const _iw = new BMap.InfoWindow(sDom); 
        label.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          animationName: "fadeInUp",
          animationDuration: "1s",
          animationFillMode: "both",
        })
        label2.setStyle({
          background: "url("+ gsbg5 +")",
          backgroundSize: '100% 100%',
          border: "none",
          animationName: "fadeInUp",
        })    
        marker.addEventListener('mouseover', function() {
          marker.setLabel(label)
          marker.setIcon(redIcon)
        })
        marker.addEventListener('mouseout', function() { 
          setTimeout(
            function(){
              map.removeOverlay(label)
            }, 1000
          )
          marker.setIcon(blueIcon)
        })
        // marker.addEventListener("click", function(e) {
        //   marker.setLabel(label2);
        //   marker.setIcon(redIcon)
        // });
        // label2.addEventListener("click", function(e) {
        //   map.removeOverlay(label2)
        //   marker.setIcon(blueIcon)
        // });

        map.addOverlay(marker);
      }
    });
  }

  getBoundary = (map) => {       
    // var bdary = new BMap.Boundary();
    // var name = '拱墅区';
    // bdary.get(name, function(rs){       //获取行政区域  
    //     var count = rs.boundaries.length; //行政区域的点有多少个
    //     for(var i = 0; i < count; i++){
    //         var ply = new BMap.Polygon(rs.boundaries[i], {
    //           strokeWeight: 2, 
    //           strokeColor: 'rgb(139, 246, 235)',
    //           strokeOpacity:0.0, 
    //           fillOpacity: 0.1, 
    //           fillColor: "#000000"
    //         }); //建立多边形覆盖物
    //         map.addOverlay(ply);  //添加覆盖物
    //         //map.setViewport(ply.getPath());    //调整视野         
    //     }                
    // });   
    // 拱墅区边界值
    var boundaries = ["120.222992, 30.393995;120.203612, 30.40048;120.20292, 30.408115;120.2016, 30.404957;120.19589, 30.40402;120.198441, 30.398465;120.180906, 30.377503;120.176822, 30.3816;120.176122, 30.377313;120.165658, 30.378298;120.165131, 30.381243;120.159651, 30.38163;120.159175, 30.386611;120.152609, 30.384059;120.153309, 30.381788;120.146373, 30.381877;120.145325, 30.386325;120.135927, 30.388758;120.1374, 30.365563;120.143318, 30.346349;120.135562, 30.348854;120.130001, 30.344109;120.121766, 30.343334;120.112659, 30.34882;120.091752, 30.337377;120.102608, 30.332171;120.110122, 30.313959;120.111097, 30.29871;120.147653, 30.300067;120.161017, 30.27841;120.16646, 30.278819;120.166446, 30.288391;120.162318, 30.288637;120.158892, 30.295183;120.172792, 30.300579;120.163484, 30.315077;120.193322, 30.353097;120.214315, 30.361274;120.216988, 30.35715;120.220761, 30.36005;120.217244, 30.363487;120.221882, 30.37;120.216622, 30.37566;120.21574, 30.38447;120.211944, 30.385565;120.222992, 30.393995"]
    var count = boundaries.length;
    for(var i = 0; i < count; i++){
      var ply = new BMap.Polygon(boundaries[i], {
        strokeWeight: 2, 
        strokeColor: 'rgb(139, 246, 235)',
        strokeOpacity:0.0, 
        fillOpacity: 0.3, 
        fillColor: "#000000"
      }); //建立多边形覆盖物
      map.addOverlay(ply);  //添加覆盖物     
    }  
  }

  toggleBox = () => {
    var visiable = this.state.boxVisiable
    this.setState({
      boxVisiable: !visiable
    })
  }

  restartWebSocket = () => {
    let _this = this
    this.state.s_websocket.close()
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSIndex.userInfo.userId
    var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []

    var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
    var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
    var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
    var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0
    var websocket = new WebSocket(WS_URL)
    websocket.onopen = function () {
        // console.log("socket has been opened");
        var message = {
            action: "register",
            userId: userId,
            districtId:districtId,
            streetId:streetId,
            communityId:communityId,
            zoneId:zoneId,
            type:"pushIndexInfo"
        };
        message = JSON.stringify(message);        
        websocket.send(message);
        _this.setState({
          nowleval: localLevel
        })
    }
    websocket.onmessage = function (event) {
        // console.log(event.data);
        const res = JSON.parse(event.data);
        if(res.obj) {
            _this.setState({
                bottomData: res.obj
            })
        }
    }
    this.setState({
      s_websocket: websocket
    })
  }

  // 拿到TopCascaderModalContent组件级联选择的数据
  confirmCascaderChange = (value) => {
    this.props.changev({
      levelValue: value.levelValue,
      level: value.level,
      levelId: value.levelId,
    })
    localStorage.setItem('levelValue', value.levelValue)
    localStorage.setItem('level', value.level)
    localStorage.setItem('levelId', value.levelId)
    localStorage.setItem('label', value.label)
    this.setState({
      cascaderLabel: value.label
    })
    this.allPost()
    this.restartWebSocket()
  }


  allPost = () => {
    this.props.getHousingInfo()
    this.props.getEquipmentInfo()
    this.props.getPopulationInfo()
    this.props.getPointPosition()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GSIndex.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSIndex.xqInfo.longitude, nextProps.GSIndex.xqInfo.latitude)   
    } 
    if(this.state.map) {      
      if(nextProps.GSIndex.pointList && nextProps.GSIndex.pointList.length > 0) {
        this.state.map.clearOverlays(); 
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSIndex.pointList)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  componentWillMount() {
    this.props.getLevel();
    this.allPost();
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH + 'px'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSIndex 
    if(xqInfo && xqInfo.longitude && xqInfo.latitude) {
      Long = xqInfo.longitude
      Dat = xqInfo.latitude
    } else {
      Long = 120.156919
      Dat = 30.332474 
    }
    if (xqInfo) {
      this.initMap(map, Long, Dat)   
    }  

    map.enableScrollWheelZoom();  
    map.setMapStyle({
      style:'midnight',
      styleJson: mapStyleJson
    });
    
    clearInterval(timer1)
    let timer1 = setInterval(() => {
      let nowTime = new Date().getTime();
      let weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      var weekDay = new Date().getDay();
      _this.setState({
        time: utils.timeToHMS(nowTime) + ' ' + weekArr[weekDay]
      })
    }, 1000)
    
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH + 'px'
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      let barWrapDom = document.querySelector('.data_info_right_4')
      let barWrapDomHeight = utils.getStyle(barWrapDom, 'height').height
      this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
        barHeight: parseFloat(barWrapDomHeight.split('px')[0])
      })
    }, 1000)
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSIndex.userInfo.userId
    var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []

    var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
    var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
    var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
    var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0

    var websocket = new WebSocket(WS_URL)
    websocket.onopen = function () {
        // console.log("socket has been opened");
        var message = {
            action: "register",
            userId: userId,
            districtId:districtId,
            streetId:streetId,
            communityId:communityId,
            zoneId:zoneId,
            type:"pushIndexInfo"
        };
        message = JSON.stringify(message);
        websocket.send(message);
        _this.setState({
          nowleval: localLevel
        })
    }
    websocket.onmessage = function (event) {
        // console.log(event.data);
        const res = JSON.parse(event.data);
        console.log(res);

        var entranceGuardRecord = _this.state.entranceGuardRecord
        var macRecord = _this.state.macRecord
        var recPersonnelRecord = _this.state.recPersonnelRecord
        var recVehicleRecord = _this.state.recVehicleRecord

        if(res.obj) {
            _this.setState({
              entranceGuardRecord: res.obj.entranceGuardRecord.concat(entranceGuardRecord),
              macRecord: res.obj.macRecord.concat(macRecord),
              recPersonnelRecord: res.obj.recPersonnelRecord.concat(recPersonnelRecord),
              recVehicleRecord: res.obj.recVehicleRecord.concat(recVehicleRecord),
            })
        }
    }
    this.setState({
      map: map,
      s_websocket: websocket
    })
  }

  // componentDidUpdate() {
  //   let _this = this
  //   var localLevel = localStorage.getItem('levelValue');
  //   if (localLevel != this.state.nowleval) {
  //     var userId = this.props.GSIndex.userInfo.userId
  //     var cascaderLevel = localStorage.getItem('levelValue') ? localStorage.getItem('levelValue').split(",") : []
  //     console.log(cascaderLevel)
  //     var districtId = cascaderLevel[0] ? cascaderLevel[0] : 0
  //     var streetId = cascaderLevel[1] ? cascaderLevel[1] : 0
  //     var communityId = cascaderLevel[2] ? cascaderLevel[2] : 0
  //     var zoneId = cascaderLevel[3] ? cascaderLevel[3] : 0
  //     console.log(districtId, streetId, communityId, zoneId)
  //     var websocket = new WebSocket(WS_URL)
  //     websocket.onopen = function () {
  //         // console.log("socket has been opened");
  //         var message = {
  //             action: "register",
  //             userId: userId,
  //             districtId:districtId,
  //             streetId:streetId,
  //             communityId:communityId,
  //             zoneId:zoneId,
  //             type:"pushIndexInfo"
  //         };
  //         message = JSON.stringify(message);
  //         websocket.send(message);
  //         _this.setState({
  //           nowleval: localLevel
  //         })
  //     }
  //     websocket.onmessage = function (event) {
  //         // console.log(event.data);
  //         const res = JSON.parse(event.data);
  //         console.log(res);
  //         if(res.obj) {
  //             _this.setState({
  //                 bottomData: res.obj,
  //             })
  //         }
  //     }
  //   }
  // }

  render() {
    let {
      bottomData,
      entranceGuardRecord,
      macRecord,
      recPersonnelRecord,
      recVehicleRecord,
      boxVisiable,
      cascaderLabel
    } = this.state
    const {
      diLoading,
      populationInfo,
      housingInfo,
      equipmentInfo,
      level
    } = this.props.GSIndex

    let {
      isHalf1, 
      isHalf2, 
      isHalf3, 
      isHalf4,
    } = this.state;

    entranceGuardRecord = entranceGuardRecord ? entranceGuardRecord.slice(0, 3) : null
    macRecord           = macRecord ? macRecord.slice(0, 3) : null
    recPersonnelRecord  = recPersonnelRecord ? recPersonnelRecord.slice(0, 3) : null
    recVehicleRecord    = recVehicleRecord ? recVehicleRecord.slice(0, 3) : null

    const toGaugeProps = {
      populationInfo: populationInfo
    }
    const toBarProps = {
      equipmentInfo: equipmentInfo
    }
    const toPieProps = {
      housingInfo: housingInfo
    }
  
    let toCascaderProps = null
    if (level) {
      toCascaderProps = {
        confirmCascaderChange: this.confirmCascaderChange,
        changeOnSelect: true,
        level: level,
        label: cascaderLabel,
      }      
    }

    const toTopButtonsProps = {
      userKey: this.props.GSCar.userKey,
    }

    var classString1 = 'bottom_fix_item ' + (isHalf1 ? 'block_half' : 'block_all');
    var classString2 = 'bottom_fix_item ' + (isHalf2 ? 'block_half' : 'block_all');
    var classString3 = 'bottom_fix_item ' + (isHalf3 ? 'block_half' : 'block_all');
    var classString4 = 'bottom_fix_item ' + (isHalf4 ? 'block_half' : 'block_all');

    const cardTitle1 = <p><img src={cardicon4}></img> 人脸捕获记录</p>
    const cardTitle2 = <p><img src={cardicon3}></img> 门禁进出比对</p>
    const cardTitle3 = <p><img src={cardicon2}></img> 车辆进出记录</p>
    const cardTitle4 = <p><img src={cardicon1}></img> MAC 探针记录</p>
1
    let cardDoms1, cardDoms2, cardDoms3, cardDoms4 = null
    cardDoms1 = recPersonnelRecord && recPersonnelRecord.length > 0 ? <QueueAnim delay={500} className="queue-simple">{  
      recPersonnelRecord.map((item, key)=>{
      return (
        <p key={key}><img style={{width: "40px", float: "left", marginRight: "5px"}} src={item.pictureUrlCatch}/>{utils.timeToHMS(item.inOutDate)}<br/>【{utils.getZoneName(item.zoneId)}】{item.equipmentChannelName}</p>
      ) 
    })}</QueueAnim>:'暂无记录'


    // equipmentName: "5幢西负二"
    // openDoorTime: 1544665733000
    // userName: "idCard未知"
    // zoneName: "中天西城纪"

    cardDoms2 = entranceGuardRecord &&  entranceGuardRecord.length > 0 ? <QueueAnim delay={500} className="queue-simple">{ 
      entranceGuardRecord.map((item, key)=>{
        let content = `【${item.zoneName}】${item.equipmentChannelName}：${item.userName}`
        return (
          <p title={item.equipmentName+ " " +item.userName } key={key}>【{item.zoneName}】{utils.timeToHMS(item.openDoorTime)}<br/>{item.equipmentName}：{item.userName}</p>
        )
      })
    }</QueueAnim>:'暂无记录'

    cardDoms3 = recVehicleRecord && recVehicleRecord.length > 0 ? <QueueAnim delay={500} className="queue-simple">{ recVehicleRecord.map((item, key)=>{
      let content = `【${utils.getZoneName(item.zoneId)}】${item.equipmentChannelName}：${item.licenseNumber}`
      return (
        <p title={item.equipmentChannelName + " " +item.licenseNumber} key={key}>【{utils.getZoneName(item.zoneId)}】{utils.timeToHMS(item.inOutDate)}<br/>{item.equipmentChannelName}：{item.licenseNumber}</p>
      )
    })}</QueueAnim>:'暂无记录'

    {/* 
    "collectDevDimensionality": 0,
    "collectDevLongitude": 0,
    "collectTime": 1544603731000,
    "devNo": "1921688232",
    "devType": 0,
    "fieldIntensity": 2.4,
    "firstCollectTime": 1544603731000,
    "historySSID": "",
    "inOutFlag": 0,
    "lastCollectTime": 0,
    "linkageDevCode": "",
    "mACAddress": "94d9b3280cad",
    "msgType": 2,
    "scanTime": 0,
    "aPMacAddress": "94d9b3280cad",
    "terminalBrand": "TP-Link Technologies Co. Ltd",
    "vendor": "",
    "version": "0",
    "x": 0,
    "y": 0 */}

    cardDoms4 = macRecord && macRecord.length > 0 ? <QueueAnim delay={500} className="queue-simple">{macRecord.map((item, key)=>{
      let content = `【${utils.getZoneName(item.zoneId)}】${item.equipmentChannelName}：${item.licenseNumber}`
      return (
        <p key={key}>{utils.timeToHMS(item.collectTime)}<br/>{item.mACAddress}</p>
      )
    })}</QueueAnim>:'暂无记录'

    // cardDoms4 = macData && macData.length > 0 ? <QueueAnim delay={500} className="queue-simple">{macRecord.map((item, key)=>{
    //   let content = `【${utils.getZoneName(item.zoneId)}】${item.equipmentChannelName}：${item.licenseNumber}`
    //   return (
    //     <p key={key}>{utils.timeToHMS(item.collectTime)}<br/>{item.mACAddress}</p>
    //   )
    // })}</QueueAnim>:'暂无记录'

    return (
      <Spin size="large" spinning={diLoading}>
        <div className="animated slideInLeft">
          <Row>
            <Col span={18}  className="data_info_item data_info_left">
              <Row>
                <TopButtons {...toTopButtonsProps} />
              </Row> 
              
                <div className="data_info_left_bottom" id="dimap"></div>
                    <Row className={boxVisiable ? 'bottom_fix animated zoomInUp' : 'bottom_fix box_closed animated pulse'}>
                      <div className="b-toggle" onClick={this.toggleBox}></div>

                      <Col className={classString1} span={6}>
                          <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
                            <line className="top" x1="0" y1="0" x2="900" y2="0"></line>
                            <line className="left" x1="0" y1="300" x2="0" y2="-600"></line>
                            <line className="bottom" x1="300" y1="300" x2="-600" y2="300"></line>
                            <line className="right" x1="300" y1="0" x2="300" y2="1380"></line>
                          </svg>                      
                        <div className="gap">
                          <Card title={cardTitle1}>
                            {cardDoms1}
                          </Card>
                        </div>
                      </Col>

                      <Col className={classString2} span={6}>
                          <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
                            <line className="top" x1="0" y1="0" x2="900" y2="0"></line>
                            <line className="left" x1="0" y1="300" x2="0" y2="-600"></line>
                            <line className="bottom" x1="300" y1="300" x2="-600" y2="300"></line>
                            <line className="right" x1="300" y1="0" x2="300" y2="1380"></line>
                          </svg>                      
                        <div className="gap">
                          <Card title={cardTitle2}>
                            {cardDoms2}
                          </Card>                          
                        </div>
                      </Col>

                      <Col className={classString3} span={6}>
                          <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
                            <line className="top" x1="0" y1="0" x2="900" y2="0"></line>
                            <line className="left" x1="0" y1="300" x2="0" y2="-600"></line>
                            <line className="bottom" x1="300" y1="300" x2="-600" y2="300"></line>
                            <line className="right" x1="300" y1="0" x2="300" y2="1380"></line>
                          </svg>                      
                        <div className="gap">
                          <Card title={cardTitle3}>
                            {cardDoms3}
                          </Card>
                        </div>  
                      </Col>

                      <Col className={classString4} span={6}>
                          <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
                            <line className="top" x1="0" y1="0" x2="900" y2="0"></line>
                            <line className="left" x1="0" y1="300" x2="0" y2="-600"></line>
                            <line className="bottom" x1="300" y1="300" x2="-600" y2="300"></line>
                            <line className="right" x1="300" y1="0" x2="300" y2="1380"></line>
                          </svg>                          
                        <div className="gap">
                          <Card title={cardTitle4}>
                            {cardDoms4}
                          </Card>
                        </div>  
                      </Col>
                    </Row>    
            </Col>
            <Col span={6}  className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_1">
                <div className="top_data_title1">
                  {/* <TopCascader {...toCascaderProps} /> */}
                  {toCascaderProps ? <TopCascaderModal {...toCascaderProps} /> : '' }
                  

                </div>
              </div>
              <div className="data_info_right_item data_info_right_2">
                <XQHouseGauge {...toGaugeProps}/>
              </div>
              <div className="data_info_right_item data_info_right_3">
                <XQHouseTypePie {...toPieProps}/>
              </div>
              <div className="data_info_right_item data_info_right_4">
                <XQServicesBar {...toBarProps}/>
              </div>
            </Col>
          </Row>

        </div>
      </Spin>
    )
  }
}

export default Index;
