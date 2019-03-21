import React from 'react';

class NotFoundPage extends React.Component {
    state = {
        url: '//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js'
    };
    componentDidMount() {
        let script = document.createElement('script')
        script.src = this.state.url
        script.setAttribute('type', 'text/javascript')
        script.setAttribute('charset', 'utf-8')
        script.setAttribute('homePageUrl', '/')
        script.setAttribute('homePageName', '回到我的主页')
        document.getElementsByTagName('head')[0].appendChild(script)
    }
    componentWillUnmount() {
        let scripts = document.getElementsByTagName('script')
        for (let bb of scripts) {
            if (bb.src.indexOf(this.state.url) > -1) {
            document.getElementsByTagName('head')[0].removeChild(bb)
            }
        }
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default NotFoundPage;