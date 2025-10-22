import './styles/Header.css';
import { useNavigate } from "react-router-dom";


function Header() {
    // 1. CALL THE HOOK HERE, directly inside the component body.
    const navigate = useNavigate();
    
    // 2. The function now uses the 'navigate' instance from the component's scope.
    const connectWallet = () => {
        navigate("/login");
    };

    return (
        <header className="game-header">
            <div className="container">
                <div className="header-left">
                    {/* Snowflake icon with a float animation */}
                    <div className="snowflake-icon">❄️</div>
                    <h1 className="casino-name">
                        Snowflake Casino
                    </h1>
                </div>
                
                <div className="header-right">
                    <div className="balance-info">
                        <span className="balance-icon">💎</span>
                        <span className="balance-text">Balance: 0</span>
                    </div>
                    <button 
                        onClick={connectWallet}
                        className="wallet-button"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </header>
    );
}


export default Header;