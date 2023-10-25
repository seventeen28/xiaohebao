import styles from './index.less';
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd-mobile'
import { Button, Space, Divider, NavBar, Toast } from 'antd-mobile'
import { useNavigate, history, useLocation, Link } from 'umi';
import profile from '../assets/profile.jpg'
// import styles from '../layouts/index.less';

interface myMoney {
  transferMoney: string;
  expression: string
}

interface Transaction {
  name: 'cat';
  expression: string;
  amount: number;
  time: string
}

export default function index() {
  // const {state} = useLocation() as unknown as {money : string};

  // console.log(state.money);
  const [balance, setBalance] = useState(0.00)
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      // 断言
      const money = (location.state as myMoney).transferMoney;
      const expression = (location.state as myMoney).expression;

      console.log(location)
      console.log(location.state)
      console.log("Received num:", money);

      // const addMoney = parseFloat(money);

      // setBalance((balance) => (parseFloat(balance) + addMoney).toFixed(2));

      const newBalance = balance + parseFloat(money);
      console.log(newBalance)

      const transaction: Transaction = {
        name: 'cat',
        expression: expression,
        amount: parseFloat(money),
        time: new Date().toLocaleString()
      };
      const updatedTransacs = transactions.concat(transaction)
      // console.log(updatedTransacs)

      setBalance(newBalance)
      setTransactions(updatedTransacs)
      // setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    } else {
      console.log("No parameter received.");
    }
  }, [location.state])

  const navigator = useNavigate();

  const transferInClick = () => {
    navigator("/transferIn")
  }

  const transferOutClick = () => {
    if (balance !== 0.00) {
      const transaction: Transaction = {
        name: 'cat',
        expression: '转出',
        amount: parseFloat(balance.toFixed(2)),
        time: new Date().toLocaleString()
      };
      const updatedTransacs = transactions.concat(transaction)
      setBalance(0.00)
      setTransactions(updatedTransacs)
    } else {
      Toast.show({
        content: '余额为空，请转入余额~',
        duration: 1000,
      })
    }
  }

  const [isProfitOpen, setProfitOpen] = useState(false);

  const handleBtnClick = () => {
    if (balance !== 0.00) {
      setProfitOpen(!isProfitOpen);
      if (isProfitOpen == false) {
        Toast.show({
          content: '收益已开启',
          duration: 1000,
        })
      } else {
        Toast.show({
          content: '收益已关闭',
          duration: 1000,
        })
      }
    } else {
      Toast.show({
        content: '余额为0，无法开启收益~',
        duration: 1000,
      })
    }
  }

  const back = () =>
    Toast.show({
      content: '已到主页~',
      duration: 1000,
    })

  return (
    <>
      <div className={styles.header}>
        <NavBar onBack={back}>小荷包</NavBar>
      </div>

      <div className={styles.background}></div>

      <div className={styles.headProfile}>
        <img className={styles.profile} src={profile}></img>
      </div>

      <div className={styles.balanceCard}>
        <div className={styles.balanceCardTop}>
          <span className={styles.left}>攒私房钱</span>
          <span className={styles.right}>设置&gt;</span>
        </div>
        <div className={styles.balanceCardMiddle}>
          <span className={styles.bcTotal}>
            总金额(元)
            <img></img>
          </span>
          <div className={styles.balance}>{balance.toFixed(2)}</div>
          <div >
            <Button
              onClick={handleBtnClick}
              className={styles.earnBtn}
              shape='rounded'
              size='mini'>
              {isProfitOpen ? '收益已开启' : '开启收益'}
            </Button>
          </div>
        </div>
        <div className={styles.balanceCardFoot}>
          <span className={styles.bcleft} onClick={transferOutClick}>转出</span>
          <span className={styles.bcright} onClick={transferInClick}>
            {/* <Link to="/transferIn">转入</Link> */}
            转入
          </span>
        </div>
      </div>

      <div className={styles.middleCard}>
        <div className={styles.middleCardItem}>
          <img src=''></img>
          <span>付款</span>
        </div>
        <div className={styles.middleCardItem}>
          <img src=''></img>
          <span>收款</span>
        </div>
        <div className={styles.middleCardItem}>
          <img src=''></img>
          <span>自动攒</span>
        </div>
        <div className={styles.middleCardItem}>
          <img src=''></img>
          <span>限额</span>
        </div>
        <div className={styles.middleCardItem}>
          <img src=''></img>
          <span>权益</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Tabs className={styles.tabItem}>
          <Tabs.Tab title='账单' key='bills'>

            {transactions.map((transaction, index) => (
              <div key={index}>
                <div className={styles.transItem}>
                  <div className={styles.leftBox}>
                    <img className={styles.profile} src={profile}></img>
                  </div>
                  <div className={styles.middleBox}>
                    <div className={styles.name}>{transaction.name}</div>
                    <div className={styles.expression}>{transaction.expression}</div>
                    <div className={styles.time}>{transaction.time}</div>
                  </div>
                  <div className={styles.rightBox}>
                    <div className={styles.money}>{transaction.amount}</div>
                  </div>
                </div>
              </div>

            ))}


            {/* <div className={styles.transItem}>
              <div className={styles.leftBox}>
                <img className={styles.profile} src={profile}></img>
              </div>
              <div className={styles.middleBox}>
                <div className={styles.name}>111</div>
                <div className={styles.expression}>test</div>
                <div className={styles.time}>今天 15:00</div>
              </div>
              <div className={styles.rightBox}>
                <div className={styles.money}>+0.00</div>
                <div></div>
              </div>
              <Divider></Divider>
            </div> */}
          </Tabs.Tab>
          <Tabs.Tab title='统计' key='vegetables'>
            统计
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  )
}