// import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import abiERC20 from '../public/erc20-abi.json'

const Layout = ({ children }) => {
    const [account, setAccount] = useState('');
    const [daiBalance, setDaiBalance] = useState('');
    const [ethBalance, setEthBalance] = useState('');

    useEffect(async () => {
        await fetchAccountDetails();
    }, [])

    async function fetchAccountDetails() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        const web3 = window.web3;

        const acc = web3.currentProvider.selectedAddress;
        setAccount(acc);

        const ethWei = await web3.eth.getBalance(acc);
        const ethBal = web3.utils.fromWei(ethWei.toString(), 'Ether');
        setEthBalance(ethBal);

        const daiToken = new web3.eth.Contract(abiERC20, "0xad6d458402f60fd3bd25163575031acdce07538d");
        const daiWei = await daiToken.methods.balanceOf(acc).call();
        const daiBal = web3.utils.fromWei(daiWei.toString(), 'Ether');
        setDaiBalance(daiBal);
    }

    return (
        <>
            <Nav account={account} eth={ethBalance} dai={daiBalance} />
            <div >
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout
