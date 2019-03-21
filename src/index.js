import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'
import Page from './containers/Page';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './fetch/config'

// iconfont css
import './static/css/font.css'
import './static/css/index.less'
import './static/css/animate.css';

moment.locale('zh-cn');

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render((
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}><Page /></LocaleProvider>
    </Provider>
    // <Router />
), document.getElementById('root'));
registerServiceWorker();
