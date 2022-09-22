import { useState, useEffect } from 'react';

import '../../style/components/Header.css';

function Header(props: any) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [ethAmmount, setEthAmmount] = useState(0);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="Header">
      <div className="header-container">
        {
          currentAccount ?
          <button className="connect-wallet-button">{ethAmmount} eth</button> :
          <button className="connect-wallet-button" onClick={connectWalletAction}>Connect</button>
        }
      </div>
    </div>
  )
}

export default Header;
