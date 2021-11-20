import styles from '../styles/Nav.module.css'
import Image from 'next/image'
import Identicon from 'identicon.js';

const Nav = ({ account, eth, dai }) => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <div className={styles.card}>
                        {account
                            ? <img
                                className='ml-50'
                                width='50'
                                height='50'
                                src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                            />
                            : <span></span>
                        }
                        {account}
                    </div>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li>
                    <Image src="/metamask.svg" alt="Meta" width={36} height={36} />
                    <p className={styles.bal}>DAI : {dai}</p>
                    <p className={styles.bal}>ETH : {eth}</p>
                </li>
            </ul>
        </nav>
    )
}

export default Nav