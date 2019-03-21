/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions/Login'
import $ from 'jquery'
import badge from '../../../../static/images/gawing/login/badge.png'
import avatar from '../../../../static/images/gawing/login/avatar.png'
import '../style/Login.less'
import './jquerywarpdrive.js'

// 3D资源
import * as THREE from 'three';
import '../../../../static/css/animate.css';

@connect(
    state => state,
    {...actions}
)

class Login extends Component {
  constructor(props) {
    super(props)

  }

  toPageIndex= () => {
    window.location.href='/gsdata/index'
  }

  // 3D图
  getThree = () => {
        var APP = {
            Player: function () {
                var loader = new THREE.ObjectLoader();
                var camera, scene, renderer;
                var events = {};
                var dom = document.createElement( 'div' );
                this.dom = dom;
                this.width = 500;
                this.height = 500;
                this.load = function ( json ) {
                    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
                    renderer.setClearColor( 0xfff000, 0 );
                    renderer.setPixelRatio( window.devicePixelRatio );
                    var project = json.project;
                    if ( project.gammaInput ) renderer.gammaInput = true;
                    if ( project.gammaOutput ) renderer.gammaOutput = true;
                    if ( project.shadows ) renderer.shadowMap.enabled = true;
                    if ( project.vr ) renderer.vr.enabled = true;
                    dom.appendChild( renderer.domElement );
                    this.setScene( loader.parse( json.scene ) );
                    this.setCamera( loader.parse( json.camera ) );
                    events = {
                        init: [],
                        start: [],
                        stop: [],
                        keydown: [],
                        keyup: [],
                        mousedown: [],
                        mouseup: [],
                        mousemove: [],
                        touchstart: [],
                        touchend: [],
                        touchmove: [],
                        update: []
                    };
                    var scriptWrapParams = 'player,renderer,scene,camera';
                    var scriptWrapResultObj = {};
                    for ( var eventKey in events ) {
                        scriptWrapParams += ',' + eventKey;
                        scriptWrapResultObj[ eventKey ] = eventKey;
                    }
                    var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );
                    for ( var uuid in json.scripts ) {
                        var object = scene.getObjectByProperty( 'uuid', uuid, true );
                        if ( object === undefined ) {
                            // console.warn( 'APP.Player: Script without object.', uuid );
                            continue;
                        }
                        var scripts = json.scripts[ uuid ];
                        for ( var i = 0; i < scripts.length; i ++ ) {
                            var script = scripts[ i ];
                            var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );
                            for ( var name in functions ) {
                                if ( functions[ name ] === undefined ) continue;
                                if ( events[ name ] === undefined ) {
                                    // console.warn( 'APP.Player: Event type not supported (', name, ')' );
                                    continue;
                                }
                                events[ name ].push( functions[ name ].bind( object ) );
                            }
                        }
                    }
                    dispatch( events.init, arguments );
                };
                this.setCamera = function ( value ) {
                    camera = value;
                    camera.aspect = this.width / this.height;
                    camera.updateProjectionMatrix();
                    if ( renderer.vr.enabled ) {
                        dom.appendChild( WEBVR.createButton( renderer ) );
                    }
                };
                this.setScene = function ( value ) {
                    scene = value;
                };
                this.setSize = function ( width, height ) {
                    this.width = width;
                    this.height = height;
                    if ( camera ) {
                        camera.aspect = this.width / this.height;
                        camera.updateProjectionMatrix();
                    }
                    if ( renderer ) {
                        renderer.setSize( width, height );
                    }
                };
                function dispatch( array, event ) {
                    for ( var i = 0, l = array.length; i < l; i ++ ) {
                        array[ i ]( event );
                    }
                }
                var time, prevTime;
                function animate() {
                    time = performance.now();
                    try {
                        dispatch( events.update, { time: time, delta: time - prevTime } );
                    } catch ( e ) {    
                        // console.error( ( e.message || e ), ( e.stack || "" ) );
                    }    
                    renderer.render( scene, camera );    
                    prevTime = time;    
                }    
                this.play = function () {    
                    prevTime = performance.now();    
                    document.addEventListener( 'keydown', onDocumentKeyDown );
                    document.addEventListener( 'keyup', onDocumentKeyUp );
                    document.addEventListener( 'mousedown', onDocumentMouseDown );
                    document.addEventListener( 'mouseup', onDocumentMouseUp );
                    document.addEventListener( 'mousemove', onDocumentMouseMove );
                    document.addEventListener( 'touchstart', onDocumentTouchStart );
                    document.addEventListener( 'touchend', onDocumentTouchEnd );
                    document.addEventListener( 'touchmove', onDocumentTouchMove );    
                    dispatch( events.start, arguments );    
                    renderer.setAnimationLoop( animate );    
                };    
                this.stop = function () {    
                    document.removeEventListener( 'keydown', onDocumentKeyDown );
                    document.removeEventListener( 'keyup', onDocumentKeyUp );
                    document.removeEventListener( 'mousedown', onDocumentMouseDown );
                    document.removeEventListener( 'mouseup', onDocumentMouseUp );
                    document.removeEventListener( 'mousemove', onDocumentMouseMove );
                    document.removeEventListener( 'touchstart', onDocumentTouchStart );
                    document.removeEventListener( 'touchend', onDocumentTouchEnd );
                    document.removeEventListener( 'touchmove', onDocumentTouchMove );    
                    dispatch( events.stop, arguments );    
                    renderer.setAnimationLoop( null );    
                };    
                this.dispose = function () {    
                    while ( dom.children.length ) {    
                        dom.removeChild( dom.firstChild );    
                    }    
                    renderer.dispose();    
                    camera = undefined;
                    scene = undefined;
                    renderer = undefined;    
                };
                function onDocumentKeyDown( event ) {
                    dispatch( events.keydown, event );
                }
                function onDocumentKeyUp( event ) {
                    dispatch( events.keyup, event );
        
                }
                function onDocumentMouseDown( event ) {
                    dispatch( events.mousedown, event );
                }
                function onDocumentMouseUp( event ) {
                    dispatch( events.mouseup, event );
                }
                function onDocumentMouseMove( event ) {
                    dispatch( events.mousemove, event );
                }
                function onDocumentTouchStart( event ) {
                    dispatch( events.touchstart, event );
                }
                function onDocumentTouchEnd( event ) {
                    dispatch( events.touchend, event );
                }
                function onDocumentTouchMove( event ) {
                    dispatch( events.touchmove, event );
                }
            }
        };
        var loader = new THREE.FileLoader();
        loader.load( 'app.json', function ( text ) {
            var player = new APP.Player();
            var wrap3d = document.getElementById('wrap-3d');
            // console.log(wrap3d.offsetWidth)
            player.load( JSON.parse( text ) );
            player.setSize( wrap3d.offsetWidth, wrap3d.offsetHeight );
            player.play();
            wrap3d.appendChild( player.dom );
            window.addEventListener( 'resize', function () {
                player.setSize( wrap3d.offsetWidth, wrap3d.offsetHeight );
            } );
        } );        
  }
   
  componentDidMount() {
    var screenWidth = $(window).width();
    var screenHeight = $(document.body).outerHeight(true)
    var settings = {
        width: screenWidth,
        height: screenHeight,
        autoResize: true,/*enable/disable autoResize*/
        autoResizeMinWidth: null,/*set autoResize min width*/
        autoResizeMaxWidth: null,/*set autoResize max width*/
        autoResizeMinHeight: null,/*set autoResize min height*/
        autoResizeMaxHeight: null,/*set autoResize max height*/
        addMouseControls: true,/*enable/disable mouse controls*/
        addTouchControls: true,/*enable/disable touch controls*/
        hideContextMenu: true,/*enable/disable canvas context menu*/
        starCount: 5000,/*count of active/moving stars*/
        starBgCount: 5000,/*count of inactive/background stars*/
        starBgColor: { r:6, g:30, b:56 },/*background stars color*/
        starBgColorRangeMin: 10,/*background stars color range min of starBgColor*/
        starBgColorRangeMax: 40,/*background stars color range max of starBgColor*/
        starColor: { r:6, g:30, b:56 },/*stars color*/
        starColorRangeMin: 100,/*stars color range min of starBgColor*/
        starColorRangeMax: 1000,/*stars color range max of starBgColor*/
        starfieldBackgroundColor: { r:6, g:30, b:56 },/*background color*/
        starDirection: 1,/*stars moving in which direction*/
        starSpeed: 15,/*stars moving speed*/
        starSpeedMax: 15,/*stars moving speed max*/
        starSpeedAnimationDuration: 2,/*time in seconds from starSpeed to starSpeedMax*/
        starFov: 500,/*field of view*/
        starFovMin: 500,/*field of view min*/
        starFovAnimationDuration: 2,/*time in seconds from starFov to starFovMin*/
        starRotationPermission: true,/*enable/disable rotation*/
        starRotationDirection: 1,/*rotation direction*/
        starRotationSpeed: 0.0,/*rotation speed*/
        starRotationSpeedMax: 1.0,/*rotation speed max*/
        starRotationAnimationDuration: 2,/*time in seconds from starRotationSpeed to starRotationSpeedMax*/
        starWarpLineLength: 2.0,/*line length*/
        starWarpTunnelDiameter: 100,/*tunnel diameter*/
        starFollowMouseSensitivity: 0.025,/*mouse follow sensitivity*/
        starFollowMouseXAxis: true,/*enable/disable mouse follow x axis*/
        starFollowMouseYAxis: true/*enable/disable mouse follow y axis*/
    };
    var warpdrive = new WarpDrive( document.getElementById( 'holder' ), settings );

    this.getThree();
  }
  

  render() {
    return (
      <div className="body">
        <div id="holder"></div>
        <div id="container">
            {/* <img className="cones-inner" src={badge} /> */}
            <div id="wrap-3d"></div>
            <p className="title">智慧安防小区管理平台</p>
            <img className="cones-avatar" src={avatar} />
            <p className="user_name">用户名</p>
            <button className="login_btn" onClick={this.toPageIndex}>KPI 登录</button>
        </div>
    </div>
    )
  }
}

export default Login;
