import styles from '../layouts/index.less';
import React from 'react'
import { Tabs } from 'antd-mobile'
// import styles from '../layouts/index.less';

export default () => {
  return (
    <>
      <div className={styles.background}></div>

      <div className={styles.balanceCard}>
        <div className={styles.balanceCardTop}>
          <span className={styles.left}>攒私房钱</span>
          <span className={styles.right}>设置&gt;</span>
        </div>
        <div className={styles.balanceCardMiddle}>
          <span className={styles.middle}>
            总金额(元)
            <img></img>
          </span>
          <div className={styles.balance}>0.00</div>
          <div >
            开启收益
          </div>
        </div>
        <div className={styles.balanceCardFoot}>
          <span className={styles.left}>转出</span>
          <span className={styles.right}>转入</span>
        </div>
      </div>

      <div className={styles.middleCard}>
        <div className={styles.middleCardItem}>付款</div>
        <div className={styles.middleCardItem}>收款</div>
        <div className={styles.middleCardItem}>自动攒</div>
        <div className={styles.middleCardItem}>限额</div>
        <div className={styles.middleCardItem}>权益</div>
      </div>

      <div className={styles.footer}>
        <Tabs>
          <Tabs.Tab title='水果' key='fruits'>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </Tabs.Tab>
          <Tabs.Tab title='动物' key='animals'>
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  )
}