/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Face'
import $ from 'jquery'
import {
  Row,
  Col,
  Spin,
  Button,
  Select,
  Modal,
  Card,
  Progress
  // EnterAnimation
} from 'antd'
import {
  WS_URL
} from '../../../../fetch/apis'  
import '../style/Face.less'
import '../../../../static/css/animate.css'
import '../../../../static/css/tooltip-line.css'
import mapStyleJson from '../../../../static/json/mapStyleJson.json'
import utils from '../../../../util/util';
import sxt1 from '../../../../static/images/sxt1.gif'
import sxt3 from '../../../../static/images/sxt3.gif'
import rlsx1 from '../../../../static/images/rlsx1.png'
import rlsx3 from '../../../../static/images/rlsx3.png'
import marker_blue from '../../../../static/images/gawing/marker_blue_face.png'
import marker_red from '../../../../static/images/gawing/marker_red_face.png'
import marker_hover from '../../../../static/images/gawing/marker_hover_face.png'
import gsbg5 from '../../../../static/images/gawing/map_window_bg.png'
import SearchBtn from '../../../../static/images/gawing/search_btn_icon.png'
import TopCascaderModal from '../../component/TopCascaderModal/TopCascaderModal'

import TopButtons from '../../component/TopButtons/TopButtons'
import TopCascader from '../../component/TopCascader/TopCascader'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

const Option = Select.Option


var faceData1 = "{\"code\":0,\"msg\":\"操作成功\",\"value\":{},\"data\":{\"currentPage\":0,\"pageSize\":10,\"totalCount\":371,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":[{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"260537$1$0$0\",\"devName\":\"梅子青酒店\",\"address\":null,\"capTureTime\":1544848063000,\"capTureTimeStr\":\"2018-12-15 12:27:43\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3NDM3NjQxMzg3LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzQzNzQ4MTcyNjg4MTEyLmpwZw==\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765094395083648716\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"260537$1$0$0\",\"devName\":\"梅子青酒店\",\"address\":null,\"capTureTime\":1544848063000,\"capTureTimeStr\":\"2018-12-15 12:27:43\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3NDMyOTQxMzg5LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzQzMjYyMTcyNjg4MTA3LmpwZw==\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765094395083648715\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"320537$1$0$0\",\"devName\":\"极乐汇浴\",\"address\":null,\"capTureTime\":1544848061000,\"capTureTimeStr\":\"2018-12-15 12:27:41\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3NDE0NjgxOTU3LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzQxMjc0NTIxNjM1Ny5qcGc=\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765305501316181706\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"260537$1$0$0\",\"devName\":\"梅子青酒店\",\"address\":null,\"capTureTime\":1544848060000,\"capTureTimeStr\":\"2018-12-15 12:27:40\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3NDA3NjAxMzg0LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzQwNTkxMTcyNjg4MDUxLmpwZw==\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765094395083648713\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"350537$1$0$0\",\"devName\":\"赛码城超市1\",\"address\":null,\"capTureTime\":1544848060000,\"capTureTimeStr\":\"2018-12-15 12:27:40\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzU2LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3NDA2ODEzMzUuanBn\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzU2LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzQwNDczMTM1NDUwNDMuanBn\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765481423176625864\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"320537$1$0$0\",\"devName\":\"极乐汇浴\",\"address\":null,\"capTureTime\":1544848059000,\"capTureTimeStr\":\"2018-12-15 12:27:39\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3Mzk0MTYxOTU2LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzM5MjM1NTIxNjMxMS5qcGc=\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765305501316181703\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"170516$1$0$0\",\"devName\":\"蔡马大门进口\",\"address\":null,\"capTureTime\":1544848056000,\"capTureTimeStr\":\"2018-12-15 12:27:36\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzcyLzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3MzYxNjIzMTk3My5qcGc=\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzcyLzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzM2MTYyMzE5NzMuanBn\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765762898153336518\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"320537$1$0$0\",\"devName\":\"极乐汇浴\",\"address\":null,\"capTureTime\":1544848054000,\"capTureTimeStr\":\"2018-12-15 12:27:34\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3MzQxNDAxOTU1LmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzQ2LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzMzOTUyNTIxNjE4MC5qcGc=\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765305501316181701\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"260537$1$0$0\",\"devName\":\"梅子青酒店\",\"address\":null,\"capTureTime\":1544848054000,\"capTureTimeStr\":\"2018-12-15 12:27:34\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3MzQwOTUxMzgwLmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzM0MDgwMTcyNjg3ODU5LmpwZw==\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765094395083648708\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true},{\"currentPage\":0,\"pageSize\":0,\"totalCount\":0,\"totalPage\":0,\"orderBy\":null,\"startPosition\":0,\"endPosition\":0,\"countType\":null,\"queryType\":null,\"dataList\":null,\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":\"260537$1$0$0\",\"devName\":\"梅子青酒店\",\"address\":null,\"capTureTime\":1544848053000,\"capTureTimeStr\":\"2018-12-15 12:27:33\",\"faceMinUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvU21hbGxQaWMvMjAxODEyMTUxMjI3MzMxMDIxMzgxLmpwZw==\",\"hitFaceUrl\":null,\"imageUrl\":\"http://41.198.192.31:7300/storage/v1/image?uri_base64=QEZEMXZDVmZ2YW5mNzI3ODYwL3BpY3MvMTAwMzM0LzIwMTgvMTIvMTUvMTIvQmlnUGljLzIwMTgxMjE1MTIyNzMzMDkxMTcyNjg3ODM3LmpwZw==\",\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":null,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":\"1765094395083648707\",\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":\"\",\"cityStr\":\"\",\"sexStr\":\"\",\"phoneNO\":null,\"syncMode\":true}],\"page\":false,\"id\":null,\"devId\":null,\"devChnId\":null,\"devName\":null,\"address\":null,\"capTureTime\":null,\"capTureTimeStr\":null,\"faceMinUrl\":null,\"hitFaceUrl\":null,\"imageUrl\":null,\"leftTopX\":null,\"leftTopY\":null,\"rightBtmX\":null,\"rightBtmY\":null,\"name\":null,\"idNumber\":null,\"sex\":null,\"age\":null,\"race\":null,\"nationality\":null,\"sourceId\":null,\"sourceType\":null,\"score\":null,\"startId\":8104452,\"photoUrl\":null,\"userName\":null,\"isAlarm\":0,\"carNo\":null,\"birthday\":null,\"libName\":null,\"faceImageIdStr\":null,\"longitude\":null,\"latitude\":null,\"faceLibId\":null,\"imageData\":null,\"capTureTimeStart\":null,\"capTureTimeEnd\":null,\"devChnIds\":null,\"idCard\":null,\"startAge\":null,\"endAge\":null,\"libType\":null,\"province\":null,\"city\":null,\"phoneNumber\":null,\"position\":null,\"remarks\":null,\"fringe\":null,\"glasses\":null,\"uygur\":null,\"faceUuid\":null,\"provinceStr\":null,\"cityStr\":null,\"sexStr\":null,\"phoneNO\":null,\"syncMode\":true},\"ok\":true}"

var faceDataJson1 = JSON.parse(faceData1)

console.log(faceDataJson1);
console.log(faceDataJson1.data.dataList);


@connect(
    state => state,
    {...actions}
)

class Face extends Component {
  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.selectUnVisiable = this.selectUnVisiable.bind(this)
    this.selectToggle = this.selectToggle.bind(this)
    this.state = {
      map: null,
      time: null,
      pieHeight: 0,
      barHeight: 0,
      isHalf1: true,
      isHalf2: true,
      isHalf3: true,
      isHalf4: true,
      btnsVisiable: false,
      selectVisiable: 'select_unvisiable',
      markerVisible: false,
      faceVisible: false,
      stompClient: null,
      homeEntryAndExitList: [],
      homeEntryAndExitBig: null,
      cascaderLabel: localStorage.getItem('label') ? localStorage.getItem('label') : '拱墅区'
    }
  }

  restartWebSocket = () => {
    let _this = this
    this.state.s_websocket.close()
    var localLevel = localStorage.getItem('levelValue');
    var userId = localStorage.getItem('userId');
    // var userId = this.props.GSFace.userInfo.userId
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
            type:"gatebrake"
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
                bottomData: res.obj,
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
    // this.restartWebSocket()
  }  

  handleAdd = () => {
    var _this = this
    var pictureLists = this.props.pictureLists

    console.log('aaa')
    if (pictureLists&&pictureLists.length>0) {
      var newdata = this.props.pictureLists
      this.setState({
        // homeEntryAndExitList: newdata.concat(_this.state.homeEntryAndExitList).slice(0,8),
        homeEntryAndExitList: newdata.slice(0,8),
        homeEntryAndExitBig: newdata[8],
      })    

    } else {
      var num = Math.floor(Math.random()*30+1);
      console.log(num)
      var newdata = [{
        id: num,
        pictureUrlCatch: '/images/test/('+ num +').jpg'
      }]
      var ldata = newdata.concat(_this.state.homeEntryAndExitList)
      this.setState({
        homeEntryAndExitList: ldata.slice(0,8),
        homeEntryAndExitBig: ldata[8],
        // homeEntryAndExitList: newdata.slice(0,8),
      })        
    }
  }

  // 显示地图点位弹窗
  showMarkerModal = () => {
    console.log('aaa')
    this.setState({
      markerVisible: true,
    });
  }

  // 隐藏地图点位弹窗
  markerHandleCancel = () => {
    this.setState({
      markerVisible: false,
    });
  }

  // 显示人脸详情弹窗
  showFaveModal = () => {
    console.log('bbbb')
    this.setState({
      faceVisible: true,
    });
  }

  // 隐藏人脸详情弹窗
  faceHandleCancel = () => {
    this.setState({
      faceVisible: false,
    });
  }

  selectUnVisiable = () => {
    console.log('qqqq')
    this.setState({
      selectVisiable: 'select_unvisiable',
    })
  }

  selectToggle = () => {
    var select_visiable = this.state.selectVisiable
    console.log(select_visiable)
    if(select_visiable == 'select_unvisiable'){
      this.setState({
        selectVisiable: 'select_visiable',
      })
    } else {
      this.setState({
        selectVisiable: 'select_unvisiable',
      })
    }
  }

  initMap = (map, Long, Dat) => {
    const point = new BMap.Point(Long, Dat);
    map.centerAndZoom(point, 14); 
    // this.getBoundary(map)
  }

  // 编写自定义函数,创建标注
  addMarker = (map, services) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude) {
        let imgObj = null
        if(item.type.indexOf('编码通道') > -1) {
          if(item.state) {
            imgObj = rlsx3
          } else {
            imgObj = rlsx1
          }
        }
        if(item.type.indexOf('门禁通道') > -1) {
          if(item.state) {
            imgObj = sxt3
          } else {
            imgObj = sxt1
          }
        }
        const point = new BMap.Point(item.longitude, item.latitude);
        const myIcon = new BMap.Icon(imgObj, new BMap.Size(20,37));
        const marker = new BMap.Marker(point, {
          icon: myIcon
        });
        map.addOverlay(marker);
      }
    })
  }

  addWindow = (map, services, totals) => {
    services.forEach((item, index) => {
      if(item.longitude && item.latitude && totals) {
        var point = new BMap.Point(item.longitude, item.latitude);
        const blueIcon = new BMap.Icon(marker_blue, new BMap.Size(20,37));
        const redIcon = new BMap.Icon(marker_hover, new BMap.Size(20,37));
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
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
                        </div>
                      </div>`
                      
        const sDom2 = `<div id="xq_window" class="xq_window">
                        <div class="xq_window_wrap animated fadeInDown">
                          <span class="xq_window_text xq_window_title">`+ item.name +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">常住人口:</label>
                          <span class="xq_window_text">`+ (totals.longTimeTotal ? totals.longTimeTotal : '') +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">暂住人口:</label>
                          <span class="xq_window_text">`+ totals.flowTotal +`</span>
                        </div>
                        <div class="xq_window_wrap animated fadeInRight">
                          <label class="xq_window_label">设备数:</label>
                          <span class="xq_window_text">`+ totals.EqptEquipmentChannelTotal +`</span>
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
          // console.log('aaa');
          marker.setLabel(label)
          marker.setIcon(redIcon)
        })
        marker.addEventListener('mouseout', function() {
          // console.log('bbb');
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.GSFace.xqInfo && this.state.map) {
      this.initMap(this.state.map, nextProps.GSFace.xqInfo.longitude, nextProps.GSFace.xqInfo.latitude)   
    } 
    if(this.state.map) {
      if(nextProps.GSFace.xqList && nextProps.GSFace.xqList.length > 0) {
        this.state.map.clearOverlays(); 
        // this.addMarker(this.state.map, nextProps.GSFace.servicesChannelList)
        this.getBoundary(this.state.map)
        this.addWindow(this.state.map, nextProps.GSFace.xqList, nextProps.GSFace.zoneTotal)
        // 此处需要一个小区列表，包含基本详情和小区信息
      } else {
        this.state.map.clearOverlays(); 
      }
    }
  }

  allPost = () => {
    this.props.getEquipmentTotal()
    this.props.getDistributionData()
    this.props.distributionResult()
    this.props.getEquipmentList()
    this.props.getFacePictureSearch()
    // this.props.getFacePicture()
  }

  componentWillMount() {
    this.props.getLevel();
    this.allPost()
  }

  componentDidMount() {
    let _this = this
    let screenH = document.documentElement.clientHeight
    let mainDom = document.getElementsByClassName("data_info_item")
    let leftBottom = document.querySelector(".data_info_left_bottom")
    mainDom[0].style.height = screenH/12 + 'rem'
    mainDom[1].style.height = screenH/12 + 'rem'
    leftBottom.style.height = screenH/12 - 42 + 'rem'

    const map = new BMap.Map("dimap", {MAXZOOM: 18}); 
    // 初始化地图,设置中心点坐标和地图级别
    var point = new BMap.Point(120.149018,30.32539);    
    map.centerAndZoom(point,14);                     
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); 
    
    let Long, Dat;
    const {
      xqInfo
    } = this.props.GSFace 
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
      // styleJson: mapStyleJson
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
    this.setState({
      map: map,
    })
    window.onresize = function() {
      let screenH = document.documentElement.clientHeight
      let mainDom = document.getElementsByClassName("data_info_item")
      let leftBottom = document.querySelector(".data_info_left_bottom")
      mainDom[0].style.height = screenH/12 + 'rem'
      mainDom[1].style.height = screenH/12 + 'rem'
      leftBottom.style.height = screenH/12 - 42 + 'rem'
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      _this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }
    clearTimeout(timer2)
    let timer2 = setTimeout(() => {
      let pieWrapDom = document.querySelector('.data_info_right_3')
      let pieWrapDomHeight = utils.getStyle(pieWrapDom, 'height').height
      this.setState({
        pieHeight: parseFloat(pieWrapDomHeight.split('px')[0]),
      })
    }, 1000)

    // this.timer3 = setInterval(
    //   () => this.props.getPersonnelRecord(),
    //   10000
    // );
    this.timer4 = setInterval(
      () => {
        // this.props.getQueryRecordTotal()
        this.props.getFacePictureSearch()
        // this.handleAdd()
      },
      1000
    );

  }
  
  componentWillUnmount() {
    // clearInterval(this.timer3);
    clearInterval(this.timer4);
  }

  render() {
    const {
      cascaderLabel,
      homeEntryAndExitList,
      homeEntryAndExitBig,
    } = this.state
    let {
      diLoading,
      eqptEquipmentInfo,
      distributionList,
      equipmentList,
      pictureData,
      distributionResult,
      level,
    } = this.props.GSFace
    
    // const toCascaderProps = {
    //   userKey: this.props.GSCar.userKey,
    //   changev: this.props.changev,
    //   allPost: this.allPost,
    //   changeOnSelect: true
    // }

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

    var faceDataJson = []
    var faceDataBig = null
    var faceTotal = null
    var faceAlarmTotal = null
    var faceDataToJson = null

    if (pictureData) {
      faceTotal = pictureData.total
      faceAlarmTotal = JSON.parse(pictureData.faceAlarm).data.total
      if (pictureData) {
        var faceData = pictureData.viasFace
        faceDataToJson = JSON.parse(faceData)
        if (faceDataToJson) {
          faceDataJson = faceDataToJson.data.dataList.slice(0,8)
          faceDataBig = faceDataToJson.data.dataList[8]
        }
      }      
    }

    let newData = []

    if (distributionResult) {
      distributionResult.forEach((item, index) => {
        newData.push(item)
        if(item.dahuaData) {
          newData[index].dahuaDataJson = JSON.parse(item.dahuaData)
        } else {
          newData[index].dahuaDataJson = []
        }
      })      
    }

    console.log(newData)
    
    return (
      <Spin size="large" spinning={diLoading}>
        <div className="animated slideInLeft">
          <Row>
            <Col span={18}  className="data_info_item data_info_left">
              <Row>
                <TopButtons {...toTopButtonsProps} />
              </Row> 
            
              
                <div className="data_info_left_bottom" id="dimap"></div>

                <div className="bottom_fix clearfix">
                  <div className="bottom_left_block fl">
                    <Row gutter={8}>
                      <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {
                          faceDataJson.length > 0 ? faceDataJson.map((item,index) => {
                            let pic1 = item.imageUrl
                            return (
                                    <Col span={6} key={index}>
                                      <div className="bottom_monitor_item ">
                                        <img src={pic1}></img>
                                      </div>
                                    </Col>
                            )
                          }): null
                        }

                      </ReactCSSTransitionGroup>   
                    </Row>
                  </div>
                  <div className="bottom_right_block fl">
                    {/* bottom_monitor_danger */}
                    <div className="bottom_right_box ">
                      <div className="bottom_monitor_block">   
                        {/* <Button className="fr" type="primary" onClick={this.showMarkerModal}>Open Modal</Button> */}
                        <img src={faceDataBig ? faceDataBig.imageUrl : 'https://avatars2.githubusercontent.com/u/8030067?v=4'}></img>
                      </div>

                      {/* <div className="danger_mask">
                        <div className="fl danger_face_img">
                          <img src="https://avatars2.githubusercontent.com/u/8030067?v=4"></img>
                          <img src="https://avatars2.githubusercontent.com/u/8030067?v=4"></img>
                        </div>
                        <div className="danger_face_info">
                          <h3>重点布控人员</h3>
                          <p>姓名：账单</p>
                          <p>年龄：账单</p>
                          <p>身份证号：账单</p>
                          <p>姓名：账单</p>
                          <p>对比相似度：90%</p>
                        </div>
                      </div> */}
                    </div>
                  </div> 
                </div>
            </Col>
            <Col span={6}  className="data_info_item data_info_right">
              <div className="data_info_right_item data_info_right_1">
                <div className="top_data_title1">
                  <div className="select_block">
                    {/* <TopCascader {...toCascaderProps} /> */}
                    {toCascaderProps ? <TopCascaderModal {...toCascaderProps} /> : '' }
                  </div>
                </div>
                <Row gutter={16}>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon1}/> */}
                              <div className="img_block img_block1"></div>
                              <p className="face_top_label">人脸相机数</p>
                              <p className="face_top_value">{eqptEquipmentInfo?eqptEquipmentInfo.total:'0'}</p>
                          </div>
                  </Col>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon2}/> */}
                              <div className="img_block img_block2"></div>
                              <p className="face_top_label">采集人脸数</p>
                              <p className="face_top_value">{faceTotal?faceTotal:'0'}</p>
                          </div>
                  </Col>
                  <Col span={8} >
                          <div className="face_top_block">
                              {/* <img src={top_icon3}/> */}
                              <div className="img_block img_block3"></div>
                              <p className="face_top_label">比中情况</p>
                              <p className="face_top_value">{faceAlarmTotal?faceAlarmTotal:'0'}</p>
                          </div>
                  </Col>
                </Row>
              </div>
              <div className="data_info_right_item data_info_right_2">
                {/* <div className="ext_btn">详情</div> */}
                <div className="top_data_title2">
                  <p>警员布控</p>             
                </div>
                <div className="card_container">
                  { distributionList ? distributionList.map((item,index) => {
                    return(                    
                      <div key={index} className="police_block clearfix">
                        <div className="block_title">
                          <p>布控原因：{item.label}</p>
                        </div>
                        <div className="police_img fl">
                          <img src={item.pictureUrl}></img>
                        </div>
                        <div className="police_text fl">
                          <Row>
                            <Col span={12}>
                              <p>姓名：{item.realName}</p>
                              <p>籍贯: {item.realName}</p>
                              <p>身份证：{item.idCard}</p>
                            </Col>
                            <Col span={12}>
                              <p>布控单位：{item.distributionCompany}</p>
                              <p>布控时间：{item.createDate}</p>
                              <p>民警姓名：{item.policeName}</p>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )
                  }) : ''}
                </div>
              </div>
              <div className="data_info_right_item data_info_right_3">
                <div className="search_box">
                  <Row gutter={16}>
                      <Col span={8}>
                          <input className="search_form" name="name" placeholder="姓名" />
                      </Col>
                      <Col span={12}>
                          <input className="search_form" name="idcardnum" placeholder="身份证" />
                      </Col>
                      <Col span={2}>
                          <button><img src={SearchBtn} /></button>
                      </Col>
                  </Row>
                </div>
                <div className="card_container">




                  {newData&&newData.length>0?newData.map((item, index)=>{
                    return(
                      <div className="right_monitor_block">
                        <div className="right_top_btn" onClick={this.showFaveModal}>详细数据</div>
                        <p className="right_monitor_title">布控比中人员</p>
                        <img src={item.matchImgUrl}></img>
                        <img src={item.pictureUrl}></img>
                        <div className="right_monitor_info">
                          <p>姓名：{item.realName}</p>
                          <p>年龄：{item.dahuaDataJson&&item.dahuaDataJson.data&&item.dahuaDataJson.data.dataList&&item.dahuaDataJson.data.dataList[0] ? item.dahuaDataJson.data.dataList[0].age : '未知'}</p>
                          <p>身份证：{item.idCard}</p>
                          <p>位置：{item.dahuaDataJson&&item.dahuaDataJson.data&&item.dahuaDataJson.data.dataList&&item.dahuaDataJson.data.dataList[0] ? item.dahuaDataJson.data.dataList[0].localeName : '未知'}</p>
                          <p>对比相似度：90%</p>
                        </div>
                      </div>
                    )}) : <div className="nodata">暂无数据</div>
                  }
                </div>
              </div>
            </Col>
          </Row>

          {/* 点位位置 */}
          <Modal
            className="face_page_modal marker_modal"
            visible={this.state.markerVisible}
            onOk={this.handleOk}
            onCancel={this.markerHandleCancel}
            footer={false}
          >
            <h3>点位位置：</h3>
            <p>拱墅区·某街道·某小区·几幢几单元·1号人脸监控</p>
            <h3>上线时间：</h3>
            <p>2010-05-29</p>
            <h3>设备参数：</h3>
            <p>2010-05-29</p>
            <h3>抓拍人脸数量：<span>500</span></h3>
            <h3>比中人脸数量：<span>50</span></h3>
            <h3>故障次数：<span>0</span></h3>
            <div className="modal_title">数据详情</div>
          </Modal>

          {/* 人脸比对详细信息 */}
          <Modal
            className="face_page_modal face_modal"
            width="79.83rem"
            visible={this.state.faceVisible}
            onOk={this.handleOk}
            onCancel={this.faceHandleCancel}
            footer={false}
          >
            <h3>人脸对比详细：</h3>

            <div className="fl modal_monitor_face">
              <img src="https://avatars2.githubusercontent.com/u/26716802?v=4"></img>
              <img src="https://avatars2.githubusercontent.com/u/20151912?v=4"></img>
            </div>
            <div className="fl modal_monitor_info">
              <div className="modal_info_block">
                <div className="info_item">
                  <label>姓名：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>性别：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>省份证号：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>年龄：</label>
                  <p>20</p>
                </div>
                <div className="info_item">
                  <label>户籍地址：</label>
                  <p>王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王野王</p>
                </div>
                <div className="info_item">
                  <label>基本案情：</label>
                  <p>王野王野王野王野王野王野王野王野王</p>
                </div>
                <div className="info_item">
                  <label>现场抓拍：</label>                
                </div>
                <div className="info_item">                
                  <img src="https://avatars2.githubusercontent.com/u/26716802?v=4"></img>
                  <img src="https://avatars2.githubusercontent.com/u/20151912?v=4"></img>
                  <img src="https://avatars2.githubusercontent.com/u/20151912?v=4"></img>
                </div>
                <div className="info_item">
                  <label>抓拍摄像头位置：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>抓拍时间：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>比中时间：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>布控单位：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>布控民警：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>布控时间：</label>
                  <p>王野</p>
                </div>
                <div className="info_item">
                  <label>布控原因：</label>
                  <p>王野</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Spin>
    )
  }
}

export default Face;
