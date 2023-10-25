import { SetStateAction, useState } from 'react';
import styles from './transferIn.less'
import { NavBar, Space, Toast, Button, Input } from 'antd-mobile'
import { useNavigate, history } from 'umi';

export default function transferIn() {
    const navigator = useNavigate();
    const [inputMoney, setInputMoney] = useState('');
    const [expression, setExpression] = useState('')

    const handleInputChange = (value: SetStateAction<string>) => {
        // console.log(value)
        setInputMoney(value)
    }

    const handleBtnInput = (data: SetStateAction<string>) => {
        setInputMoney(data)
    }

    const handleInputExp = (data: SetStateAction<string>) => {
        if(data.length == 0){
            // setExpression(data)
            setExpression('转入')
        }else{
            // setExpression('转入')
            setExpression(data)
        }
    }

    const handleTransfer = () => {
        if (inputMoney.trim() !== '') {
            const transferMoney = parseFloat(inputMoney);
            if (!isNaN(transferMoney)) {
                if (transferMoney <= 20000) {
                    // navigator("/", {
                    //     state: {
                    //         money: transferMoney
                    //     }
                    // })
                    history.push('/', { transferMoney, expression });
                    // 带参数跳转到指定路由
                    // history.push({
                    //     pathname: '/',
                    //     search: '?money='+{transferMoney},
                    // });
                } else {
                    setInputMoney('')
                    Toast.show({
                        content: '转入最大金额为2万元',
                        duration: 1000,
                    })
                }
            }
        } else {
            Toast.show({
                content: '请填写金额~',
                duration: 1000,
            })
        }

        // const money = 666;
        // // history.push('/', { money: money });
        // navigator("/", {
        //     state: {
        //         money: money
        //     },
        // });
    }

    const goBackPage = () => {
        window.history.back()
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <NavBar onBack={goBackPage}>小荷包</NavBar>
            </div>
            <div className={styles.transferCard}>
                <div className={styles.tfTitle}>
                    <span className={styles.left}>转入金额</span>
                </div>

                <div className={styles.tfInput}>
                    <span className={styles.rmbTxt}>￥</span>
                    <Input
                        className={styles.moneyInput}
                        placeholder='请输入金额，单人单日最高2万元'
                        type="number"
                        value={inputMoney}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.tfBtn}>
                    <Button onClick={() => handleBtnInput("50")} color='primary' shape='rounded' size='small' fill='outline'>
                        ￥50
                    </Button>
                    <Button onClick={() => handleBtnInput("100")} color='primary' shape='rounded' size='small' fill='outline'>
                        ￥100
                    </Button>
                    <Button onClick={() => handleBtnInput("1000")} color='primary' shape='rounded' size='small' fill='outline'>
                        ￥1000
                    </Button>
                    <Button onClick={() => handleBtnInput("13.14")} color='primary' shape='rounded' size='small' fill='outline'>
                        ￥13.14
                    </Button>
                </div>
                <div className={styles.tfText}>
                    <Input
                        placeholder='填写转入说明'
                        value={expression}
                        onChange={handleInputExp}
                        clearable />
                </div>
            </div>
            <div className={styles.tfSubmit}>
                <Button
                    onClick={handleTransfer}
                    block
                    shape='rounded'
                    size='middle'
                    color='primary'>
                    确认转入
                </Button>
            </div>
            <div className={styles.tfNotice}>
                <span>特别说明:</span>
            </div>
        </div>
    );
}