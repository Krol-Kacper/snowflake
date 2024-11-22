import './Header.css'

function Header() {

    return (
        <header>
            <img src="./src/images/snowflake.png" width="80px" height="90px" class="logo" alt="Snowflake image"></img>
            <h1>Snowflake Casino</h1>
            <button class="wallet-button">Connect Wallet</button>
            <a class="balance-display">Balance: 0</a>
        </header>
    )
}

export default Header