import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const SRC_TOKEN = "DAI"
const DST_TOKEN = "ETH"
const SRC_TOKEN_ADDRESS = "0xad6d458402f60fd3bd25163575031acdce07538d";
const DST_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
//0x6b175474e89094c44da98b954eedeac495271d0f -> mainnet
//0xad6d458402f60fd3bd25163575031acdce07538d ropsten
const KYBER_NETWORK_PROXY_ADDRESS = "0x818E6FECD516Ecc3849DAf6845e3EC868087B755";
const KYBER_NETWORK_PROXY_ABI = [{ "constant": false, "inputs": [{ "name": "alerter", "type": "address" }], "name": "removeAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "enabled", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOperators", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "destAddress", "type": "address" }, { "name": "maxDestAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }, { "name": "walletId", "type": "address" }, { "name": "hint", "type": "bytes" }], "name": "tradeWithHint", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapTokenToEther", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "maxGasPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAlerter", "type": "address" }], "name": "addAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kyberNetworkContract", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "user", "type": "address" }], "name": "getUserCapInWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapTokenToToken", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "claimAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "minConversionRate", "type": "uint256" }], "name": "swapEtherToToken", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdminQuickly", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAlerters", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "src", "type": "address" }, { "name": "dest", "type": "address" }, { "name": "srcQty", "type": "uint256" }], "name": "getExpectedRate", "outputs": [{ "name": "expectedRate", "type": "uint256" }, { "name": "slippageRate", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "user", "type": "address" }, { "name": "token", "type": "address" }], "name": "getUserCapInTokenWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOperator", "type": "address" }], "name": "addOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_kyberNetworkContract", "type": "address" }], "name": "setKyberNetworkContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "operator", "type": "address" }], "name": "removeOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "field", "type": "bytes32" }], "name": "info", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "srcAmount", "type": "uint256" }, { "name": "dest", "type": "address" }, { "name": "destAddress", "type": "address" }, { "name": "maxDestAmount", "type": "uint256" }, { "name": "minConversionRate", "type": "uint256" }, { "name": "walletId", "type": "address" }], "name": "trade", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "token", "type": "address" }, { "name": "user", "type": "address" }], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_admin", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "trader", "type": "address" }, { "indexed": false, "name": "src", "type": "address" }, { "indexed": false, "name": "dest", "type": "address" }, { "indexed": false, "name": "actualSrcAmount", "type": "uint256" }, { "indexed": false, "name": "actualDestAmount", "type": "uint256" }], "name": "ExecuteTrade", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newNetworkContract", "type": "address" }, { "indexed": false, "name": "oldNetworkContract", "type": "address" }], "name": "KyberNetworkSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "TokenWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "EtherWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pendingAdmin", "type": "address" }], "name": "TransferAdminPending", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAdmin", "type": "address" }, { "indexed": false, "name": "previousAdmin", "type": "address" }], "name": "AdminClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAlerter", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "AlerterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newOperator", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "OperatorAdded", "type": "event" }];
const ERC20_ABI = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "supply", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "digits", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];
const MAX_ALLOWANCE = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
const REF_ADDRESS = "0x00934685C430777b911940d160B9aa00e6590eAe"; // test-acc

export default function ConvertEthToDai() {
    const router = useRouter();
    const [ethQty, setEthQty] = useState('');
    const [daiQty, setDaiQty] = useState('');

    function calcDstQty(srcQty, srcDecimals, dstDecimals, rate) {
        const PRECISION = (10 ** 18);
        if (dstDecimals >= srcDecimals) {
            return (srcQty * rate * (10 ** (dstDecimals - srcDecimals))) / PRECISION;
        } else {
            return (srcQty * rate) / (PRECISION * (10 ** (srcDecimals - dstDecimals)));
        }
    }

    async function getEstimate() {
        const web3 = window.web3;

        // Get the DAI qty to convert from
        const daiQtyWei = web3.utils.toWei(daiQty, 'ether');
        console.log("daiQtyWei : ", daiQtyWei);

        // Get the KyberNetworkContract instances
        const KYBER_NETWORK_PROXY_CONTRACT = new web3.eth.Contract(KYBER_NETWORK_PROXY_ABI, KYBER_NETWORK_PROXY_ADDRESS);
        console.log("KYBER_NETWORK_PROXY_CONTRACT: ", KYBER_NETWORK_PROXY_CONTRACT)

        // Obtain slippage rate
        const rate = await KYBER_NETWORK_PROXY_CONTRACT.methods.getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, daiQtyWei).call();
        console.log("JSON.stringify(rate): ", JSON.stringify(rate));

        // calculate dstQty
        const dstQty = calcDstQty(daiQtyWei, 18, 18, rate.expectedRate)
        console.log("dstQty: ", dstQty / 10 ** 18)
        setEthQty(dstQty / 10 ** 18);
    }

    // Function to approve KNP contract
    async function approveContract(allowance) {
        const accounts = await window.web3.eth.getAccounts();
        const userAccount = accounts[0];
        console.log("Approving KNP contract to manage DAI");
        const SRC_TOKEN_CONTRACT = new web3.eth.Contract(ERC20_ABI, SRC_TOKEN_ADDRESS);
        let tx = await SRC_TOKEN_CONTRACT.methods
            .approve(KYBER_NETWORK_PROXY_ADDRESS, allowance)
            .send({ from: userAccount })
            .on('transactionHash', (hash) => {
                console.log("hash : ", hash);
            })
        console.log("tx : ", tx);
    }

    async function convertDaiToEth() {
        const web3 = window.web3;
        const userAddr = web3.currentProvider.selectedAddress;
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];

        // Get the DAI qty to convert from
        const daiQtyWei = web3.utils.toWei(daiQty, 'ether');
        console.log("daiQtyWei : ", daiQtyWei);

        // Get the KyberNetworkContract & dai instances
        const KYBER_NETWORK_PROXY_CONTRACT = new web3.eth.Contract(KYBER_NETWORK_PROXY_ABI, KYBER_NETWORK_PROXY_ADDRESS);
        console.log("KYBER_NETWORK_PROXY_CONTRACT: ", KYBER_NETWORK_PROXY_CONTRACT)
        const SRC_TOKEN_CONTRACT = new web3.eth.Contract(ERC20_ABI, SRC_TOKEN_ADDRESS);

        // Obtain slippage rate
        const rate = await KYBER_NETWORK_PROXY_CONTRACT.methods.getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, daiQtyWei).call();
        console.log("JSON.stringify(rate): ", JSON.stringify(rate));

        // Check KyberNetworkProxy contract allowance
        let contractAllowance = await SRC_TOKEN_CONTRACT.methods
            .allowance(userAccount, KYBER_NETWORK_PROXY_ADDRESS)
            .call();
        // If insufficient allowance, approve else convert DAI to ETH.
        if (daiQtyWei > contractAllowance) {
            await approveContract(daiQtyWei);
        }
        // trade
        console.log(`Converting ${SRC_TOKEN} to ${DST_TOKEN}`);
        let tx = await KYBER_NETWORK_PROXY_CONTRACT.methods
            .trade(SRC_TOKEN_ADDRESS, daiQtyWei, DST_TOKEN_ADDRESS, userAddr, MAX_ALLOWANCE, rate.expectedRate, REF_ADDRESS)
            .send({ from: userAccount })
            .on('transactionHash', (hash) => {
                console.log("hash : ", hash);
            })
        console.log("tx : ", tx);
        router.push('/');
    }

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input
                        placeholder="From DAI"
                        className="mt-8 border rounded p-4"
                        onChange={e => setDaiQty(e.target.value)}
                    />
                    <input
                        placeholder="To ETH"
                        className="mt-2 border rounded p-4"
                        value={ethQty}
                        onChange={e => setEthQty(e.target.value)}
                    />
                    <button onClick={convertDaiToEth} className="font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg">
                        Convert
                    </button>
                    <button onClick={getEstimate} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
                        Get Estimate
                    </button>
                    <div className={styles.grid}>
                        <a href="/" className={styles.card}>
                            <h3>Go Back &rarr;</h3>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
