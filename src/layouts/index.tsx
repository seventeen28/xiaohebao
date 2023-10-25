import { Outlet } from 'umi';
import styles from './index.less';
import { NavBar, Space, Toast } from 'antd-mobile';
// import index from '../pages/index';
// import transferIn from '../pages/transferIn'

export default function Layout() {
  // const back = () =>
  //   Toast.show({
  //     content: '点击了返回区域',
  //     duration: 1000,
  //   })

  return (
    <div className={styles.navs}>
      <div className={styles.container}><Outlet /></div>
    </div>
  );
}
