import './Header.css'

function Header() {
    return (
        <header>
            <div className="header-left">
                <img src="./src/images/snowflake.png" width="80px" height="90px" className="logo" alt="Snowflake image" />
                <h1 className="casino-name">Snowflake Casino</h1>
            </div>
            <div className="header-right">
                <button className="wallet-button">Connect Wallet</button>
                <img src="./src/images/ethcoin.png" width="30px" height="30px" alt="ethereum coin image" className="wallet-coin" />
                <a className="balance-display">Balance: 0</a>
            </div>
        </header>
    )
}

export default Header