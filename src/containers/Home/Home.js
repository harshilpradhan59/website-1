import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { getClientWidthFunc, getNavButtonFunc, changeLangFunc} from 'redux/modules/auth';
import { joinOpenFunc, joinCloseFunc, joinMsgFunc } from 'redux/modules/joinWarning';
import JoinwarningModal from '../../components/JoinWarn';

import {homeUlEn, homePcUlEn, homeUl, homePcUl} from './utils/homeUl';
import config from '../../config';

import Div1 from './components/Div1/Div1';
import Div2 from './components/Div2/Div2';
import Div3 from './components/Div3/Div3';
import Div4 from './components/Div4/Div4';
import { _ } from 'core-js';

@connect(
    state => ({clientWidth: state.auth.clientWidth, navButton: state.auth.navButton, language: state.auth.language, titleState: state.auth.titleState,
        icoMsg: state.joinWarning.icoMsg, joinWarningModal: state.joinWarning.joinWarningModal, }),
    {getClientWidthFunc, getNavButtonFunc, changeLangFunc, joinOpenFunc, joinCloseFunc, joinMsgFunc})
export default class Home extends Component {
    static propTypes = {
      clientWidth: PropTypes.number,
      getClientWidthFunc: PropTypes.func,
      navButton: PropTypes.bool,
      getNavButtonFunc: PropTypes.func,
      changeLangFunc: PropTypes.func,
      language: PropTypes.string,
      hrefSrc: PropTypes.string,
      titleState: PropTypes.string,

      icoMsg: PropTypes.string,
      joinCloseFunc: PropTypes.func,
      joinOpenFunc: PropTypes.func,
      joinWarningModal: PropTypes.bool,
      joinMsgFunc: PropTypes.func,
    };

    constructor() {
      super();
      this.state = {
        isShow: 'false',
        showTime: true,
        textEn: 'Bidding period starts in',
        textCn: '离竞选开始还有',
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      };
    }

    componentWillMount() {
      this.props.joinCloseFunc();
      this.props.changeLangFunc(global.language);
    }
    componentDidMount() {
      const width = document.documentElement.clientWidth;
      this.props.getClientWidthFunc(width);
      this.countFun('Fri, 15 Mar 2019 00:00:00 GMT');
    }

    componentWillUnmount() {
      // clearInterval(this.interval);
      this.props.getNavButtonFunc(false);
      clearInterval(this.timer);
    }

    onClick() {
      this.props.joinOpenFunc();
    }

    getNav() {
      const navButton = this.props.navButton;
      this.props.getNavButtonFunc(!navButton);
    }

    countFun(time) {
      const localTime = new Date(time).toString();
      const endTime = new Date(localTime).getTime();
      let sysSecond = (endTime - new Date().getTime());
      this.timer = setInterval(() => {
      // 防止倒计时出现负数
        if (sysSecond > 1000) {
          sysSecond -= 1000;
          const day = Math.floor((sysSecond / 1000 / 3600) / 24);
          const hour = Math.floor((sysSecond / 1000 / 3600) % 24);
          const minute = Math.floor((sysSecond / 1000 / 60) % 60);
          const second = Math.floor(sysSecond / 1000 % 60);
          this.setState({
            day: day,
            hour: hour < 10 ? '0' + hour : hour,
            minute: minute < 10 ? '0' + minute : minute,
            second: second < 10 ? '0' + second : second
          });
        } else {
          clearInterval(this.timer);
          // 倒计时结束时触发父组件的方法
          if (time === 'Fri, 15 Mar 2019 00:00:00 GMT') {
            this.setState({
              textEn: 'Bidding Period Ends in',
              textCn: '离竞选结束还有'
            });
            this.countFun('Mon, 01 Apr 2019 00:00:00 GMT');
          }
          if (time === 'Mon, 01 Apr 2019 00:00:00 GMT') {
            this.setState({
              showTime: false
            });
          }
        }
      }, 1000);
    }

    showWarns = () => {
      this.props.joinOpenFunc();
    };
    closeWarns = () => {
      this.props.joinCloseFunc();
    };

    videoCon() {
      if (this.state.isShow === 'true') {
        this.setState({
          isShow: 'false'
        });
        this.refs.video.pause();
      } else {
        this.setState({
          isShow: 'true'
        });
        this.refs.video.play();
      }
    }

  render() {
    const styles = require('./Home.scss');
    const logo = require('./image/logo.png');
    const posTitleEn = require('./image/posTitleEn.png');
    const posTitleZn = require('./image/posTitleZn.png');
    const blocksTech = require('./image/blocks_tech.png');
    const keystore = require('./image/keystore.png');
    const matpool = require('./image/matpool.png');
    const wetez = require('./image/wetez.png');
    const bitrue = require('./image/bitrue.png');
    const valida = require('./image/valida.png');
    const hashquark = require('./image/hashquark.png');
    const snz = require('./image/snz.png');
    const bepal = require('./image/bepal.png');
    const xdrive = require('./image/xdrive.png');
    const mango = require('./image/mango.png');

    const logo2 = require('./image/icoLoho2.png');
    const nav = require('./image/nav1.png');
    const github = require('./image/github.png');
    const github2 = require('./image/icoLog4.png');

    const Telegram = require('./image/Telegram.png');
    const Reddit = require('./image/Reddit.png');
    const Twitter = require('./image/Twitter.png');
    const Discord = require('./image/Discord.png');
    const Facebook = require('./image/Facebook.png');
    const {navButton, clientWidth, language, joinWarningModal} = this.props;

    const style = {display: 'none'};
    const style1 = {display: 'inline_block'};
    var isShow = this.state.isShow;
    var hrefSrc = 'https://wandevs.org';

    return (
        <div>
            <Helmet script={[{src: '/jquery/jquery.min.js'}]} link={[{rel: 'stylesheet', href: '/css/style4.css'}]}/>

            <div className={styles.homeDiv}>
                <div className={styles.homeHeader + ' container'}>
                    <IndexLink to="/"><img src={clientWidth > 320 ? logo : logo2} /></IndexLink>
                    <img src={nav} className={styles.navbarImg} id="homeNav" onClick={this.getNav.bind(this)}/>

                    { !navButton && clientWidth <= 1024 && language !== 'zn' && homeUlEn(styles.homeHeaderUl, style)}
                    { navButton && clientWidth <= 1024 && language !== 'zn' && homeUlEn(styles.homeHeaderUl, style1)}
                    {!navButton && clientWidth > 1024 && language !== 'zn' &&
                    homePcUlEn(styles.homeHeaderUl, style1, styles.homeDropdown, styles['homeDropdown-content'])}

                    { !navButton && clientWidth <= 1024 && language === 'zn' && homeUl(styles.homeHeaderUl, style)}
                    { navButton && clientWidth <= 1024 && language === 'zn' && homeUl(styles.homeHeaderUl, style1)}
                    {!navButton && clientWidth > 1024 && language === 'zn' &&
                    homePcUl(styles.homeHeaderUl, style1, styles.homeDropdown, styles['homeDropdown-content'])}
                </div>

                <div className="container">
                    <div className={styles.homeHeaderBodyDiv1}>
                        <div>
                          <p className={styles.bannerTitle}>{language === 'zn' ? '构建未来金融' : 'Build the Future of Finance'}</p>
                          <div className={styles.bannerLine}>
                            <span className={styles.greenLine}></span>
                            <span className={styles.blueLine}></span>
                          </div>
                          {/*
                          <p className={styles.bannertextP}>
                            {language === 'zn' ? '实现与比特币，以太坊，ERC-20通证的跨链交易' : 'CROSS-CHAIN TRANSACTIONS WITH BITCOIN, ETHEREUM, AND ERC-20 TOKENS'}
                          </p>
                          */}
                        </div>
                        <div id="link" className={styles.videoBtn}>
                          <a href={language === 'zn'
                            ? 'https://mp.weixin.qq.com/s?__biz=Mzg3MTAyOTgxMw==&mid=2247484601&idx=1&sn=3153a681504cc703e07eef30fd3c8bc3&chksm=ce8589e3f9f200f5f27dfe1cf6e5cea489545b30f22583d75632060b1aa60127b28bbd6ec34f&scene=0&xtrack=1&key=3dada79245d9b2b202d688fe2932f5bd3711b272efca991ad41d8bc47a60c0947095fd4e6ea1251ad638809a520b5d4efe4c614d73a150ebcafb5324b77290a67e8f38038ab03306dd75de96454fba2f&ascene=1&uin=ODUyMTI4Mzgw&devicetype=Windows+7&version=62060739&lang=zh_CN&pass_ticket=vvMwkCQA0JsUod3CZunLdqWmGtG%2B4vv4hqbbMYiw7UrSjAGCLhe3yWxshmFphq%2Ba'
                            : 'https://www.youtube.com/watch?v=VeNrqpCH5Q4'
                          } target="_blank" className={styles.read}>{language === 'zn' ? '愿景视频' : 'Vision Video'}</a>
                        </div>
                        <div className={styles.videoBtn} id="start">
                          <a href={hrefSrc} target="_blank" className={styles.read}>{language === 'zn' ? '加入WanDevs' : 'Join WanDevs'}</a>
                        </div>
                        <p className={styles.posStart}>{language === 'zn' ? '星系共识Beta测试已上线' : 'Galaxy Consensus Beta Testnet is Live'}</p>
                        <div id="link" className={styles.videoBtn}>
                          <a
                            href={language === 'zn'
                              ? 'https://mp.weixin.qq.com/s?__biz=Mzg3MTAyOTgxMw==&mid=2247484574&idx=1&sn=297232b1649ad10e856088948771ff5c&chksm=ce8589c4f9f200d2e74ab6c04e88b9f6aeda850ad25bc0556a4e9ec217df6fc55a415e9acc11&scene=0&xtrack=1&key=adf1da94ffba578c14123d69d522814560b5dce79a418276e066b0c544ef089afc85eb04df4ce5054b35f6928d929e3cc0b2db3e780ba442230b527b1fd5e0c534e8b6c7c400eda5a6307832660276c7&ascene=1&uin=ODUyMTI4Mzgw&devicetype=Windows+7&version=62060739&lang=zh_CN&pass_ticket=CsmGf2%2FAfydMZmWIWzC08OsfUlyW3ha4%2FGJToRi2shMJrvadvrjOqKimGa5FuKxK'
                              : 'https://medium.com/wanchain-foundation/wanchain-staking-beta-testnet-live-and-tps-increased-to-1000-19396e11ac4d'}
                            target="_blank" className={styles.read}>{language === 'zn' ? '了解更多' : 'READ MORE'}
                          </a>
                        </div>
                        <div className={styles.bannerShare}>
                            <a href="https://t.me/WanchainANN" target="_blank"><img src={Telegram}/></a>
                            <a href="https://www.reddit.com/r/wanchain/" target="_blank"><img src={Reddit}/></a>
                            <a href="https://twitter.com/wanchain_org" target="_blank"><img src={Twitter}/></a>
                            <a href="https://discord.gg/3DpeV6W" target="_blank"><img src={Discord}/></a>
                            <a href="https://www.facebook.com/wanchainfoundation/" target="_blank"><img src={Facebook}/></a>
                        </div>
                        {/* 倒计时 */}
                        {/* this.state.showTime &&
                          <div className={styles.timecont}>
                            <div className={styles.timeText}>
                              {language === 'zn' ? 'Storeman节点奖励先行计划' : 'Storeman Staking Pilot'}
                            </div>
                            <div className={styles.timeText2}>
                              {language === 'zn' ? this.state.textCn : this.state.textEn}
                            </div>
                            <div className={styles.timeBox}><span className={styles.Timespan}>{this.state.day}</span><span className={styles.TimeF}>:</span><span className={styles.Timespan}>{this.state.hour}</span><span className={styles.TimeF}>:</span><span className={styles.Timespan}>{this.state.minute}</span><span className={styles.TimeF}>:</span><span className={styles.Timespan}>{this.state.second}</span></div>
                          </div>
                        */}
                        <div className={styles.posStyle}>
                          {language === 'zn' ? <img src={posTitleZn} className={styles.img1}/> : <img src={posTitleEn} className={styles.img1}/> }
                          <a target="_blank" href="https://blocks.tech/"><img src={blocksTech} className={styles.img2}/></a>
                          <a target="_blank" href="https://www.keystore.com/#/"><img src={keystore} className={styles.img2}/></a>
                          <a target="_blank" href="https://matpool.io/pos"><img src={matpool} className={styles.img2}/></a>
                          <a target="_blank" href="http://www.wetez.io/pc/wetez"><img src={wetez} className={styles.img2}/></a>
                          <a target="_blank" href="https://www.bitrue.com/"><img src={bitrue} className={styles.img2}/></a>
                          <a target="_blank" href="https://validators.online/"><img src={valida} className={styles.img3}/></a>
                          <a target="_blank" href="https://www.hashquark.io/#/supernode"><img src={hashquark} className={styles.img2}/></a>
                          <a target="_blank" href="https://snzholding.com"><img src={snz} className={styles.img4}/></a>
                          <a target="_blank" href="https://m.bepal.pro"><img src={bepal} className={styles.img2}/></a>
                          <a target="_blank" href="https://www.rivex.io/"><img src={xdrive} className={styles.img7}/></a>
                          <a target="_blank" href="http://mangoberry.io/"><img src={mango} className={styles.img2}/></a>
                          <p className={styles.posPartner}>More partners coming soon</p>
                        </div>
                    </div>
                </div>

                <JoinwarningModal show={joinWarningModal} onHide={this.showWarns} onClose={this.closeWarns}/>
            </div>

            <Div1/>
            <Div2/>
            <Div3/>
            {/* <Div8/> */}
            <Div4/>
            {/* <Div6/> */}
        </div>
    );
  }
}
