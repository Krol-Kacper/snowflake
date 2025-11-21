import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Snowfall } from "../components/Snowfall";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import "./styles/Login.css";

const Payment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // brakujące stany dla formularza wypłaty
  const [clientAddress, setClientAddress] = useState("");
  const [clientWithdrawAmount, setClientWithdrawAmount] = useState("");

  useEffect(() => {
    document.documentElement.classList.add('auth-page');
    document.body.classList.add('auth-page');
    return () => {
      document.documentElement.classList.remove('auth-page');
      document.body.classList.remove('auth-page');
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const endpoint = "http://localhost:5000/api/withdraw";
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated. Please log in.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: clientAddress,
          amount: parseFloat(clientWithdrawAmount) || 0,
        }),
        credentials: "include",
      });

      if (response.ok) {
        // minimalna obsługa sukcesu
        alert("Payment request sent.");
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Sending Payment failed.");
      }
    } catch (err) {
      console.error("Network error during payment:", err);
      setError("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Snowfall />

      <div className="logo-section">
        <div className="logo-icon">❄️</div>
        <h1 
          className="logo-text"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          Snowflake Casino
        </h1>
      </div>

      <div className="login-card-wrapper">

        <div className="side-buttons">
        <button
          type="button"
          className="login-card__side login-card__side--left"
          aria-label="Withdraw"
        >
          Withdraw
        </button>

        <button
          type="button"
          className="login-card__side login-card__side--right"
          aria-label="Deposit"
        >
          Deposit
        </button>

        </div>

        <div className="login-card">
          <h2 className="welcome-text">
            Maybe one more spin...?
          </h2>

          <form onSubmit={handlePayment} className="login-form">

            <div className="input-group">
              <label className="input-label">
                Your Wallet Address
              </label>
              <Input
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Amount to Withdraw
              </label>
              <Input
                value={clientWithdrawAmount}
                onChange={(e) => setClientWithdrawAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
                className="input-field"
                required
              />
            </div>
            
            {error && (
                <p className="error-message">{error}</p>
            )}

            <Button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending Payment..." : "Send Payment"}
            </Button>

          </form>
        </div>
      </div>

      <div className="decorative-background" />
    </div>
  );
};

export default Payment;