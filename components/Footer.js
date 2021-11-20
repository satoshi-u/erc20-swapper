import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://www.titans.finance/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/titan.png" alt="Titans Finance" width={50} height={50} />
                </span>
            </a>
        </footer>
    )
}

export default Footer
