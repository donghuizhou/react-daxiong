import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

class Iframe extends Component {
  static defaultProps = {
    className: '',
    src: '',
    height: '100%',
  };
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    height: PropTypes.string, // auto自适应内容 screen自适应浏览器窗口
  };
  state = {
    intervalId: null,
    frameId: this.guid(),
  };

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  setHeightToFitContent() {
    // 自适应iframe高度
    try {
      let iframe = document.getElementById(this.state.frameId);
      let doc = iframe.contentDocument || iframe.document;
      let cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight);
      let sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      let height = Math.max(cHeight, sHeight);
      iframe.height = height;
    } catch (ex) {}
  }

  setHeightToFitScreen() {
    // 设置iframe高度, 使iframe下沿与浏览器窗口下沿对齐
    try {
      let iframe = document.getElementById(this.state.frameId);
      let cHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let height = cHeight - iframe.offsetTop - 5;
      iframe.height = height;
    } catch (ex) {}
  }

  setHeight(height) {
    try {
      let iframe = document.getElementById(this.state.frameId);
      iframe.height = height;
    } catch (ex) {}
  }

  componentDidMount() {
    let self = this;
    let intervalId = null;

    if (this.props.height == 'auto') {
      intervalId = setInterval(function() {
        self.setHeightToFitContent();
      }, 500);
    } else if (this.props.height == 'screen') {
      intervalId = setInterval(function() {
        self.setHeightToFitScreen();
      }, 500);
    } else {
      self.setHeight(this.props.height);
    }

    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    const { src, className } = this.props;

    return (
      <iframe
        src={src}
        id={this.state.frameId}
        className={classNames(className, styles.iframe)}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        scrolling="no"
        width="100%"
      />
    );
  }
}

export default Iframe;
