import './Header.css'

function Header() {

    return (
        <header>
            <img src="./src/images/snowflake.png" width="80px" height="90px" class="logo" alt="Snowflake image"></img>
            <h1 class="casino-name">Snowflake Casino</h1>
            <button class="wallet-button">Connect Wallet</button>
            <img src="./src/images/ethcoin.png" width="30px" height="30px" alt="ethereum coin image" class="wallet-coin"></img>
            <a class="balance-display">Balance: 0</a>
        </header>
    )
}

export default Header