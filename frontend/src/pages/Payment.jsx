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
  const [clientAddress, setClientAddress] = useState("");
  const [clientWithdrawAmount, setClientWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [mode, setMode] = useState("deposit");
  
  const sitePublicAddress ="0x78845589616dE3Aae6a132968cA9E426fc959F7E";

  // Reset deposit fields when switching to deposit mode
  useEffect(() => {
    if (mode === "deposit") {
      setDepositAmount("");
      setConnectedAccount(null);
      setError("");
    }
  }, [mode]);

  useEffect(() => {
    document.documentElement.classList.add('auth-page');
    document.body.classList.add('auth-page');
    return () => {
      document.documentElement.classList.remove('auth-page');
      document.body.classList.remove('auth-page');
    };
  }, []);

  const connectWallet = async () => {
    setError("");
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts[0]) setConnectedAccount(accounts[0]);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("Could not connect wallet.");
    }
  };

  const handleDeposit = async (e) => {
    e?.preventDefault?.();
    setError("");
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
      return;
    }
    if (!depositAmount || isNaN(parseFloat(depositAmount)) || parseFloat(depositAmount) <= 0) {
      setError("Enter a valid deposit amount.");
      return;
    }
    setIsLoading(true);

    try {
      // ensure connected
      if (!connectedAccount) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (!accounts || !accounts[0]) {
          setError("Wallet not connected.");
          setIsLoading(false);
          return;
        }
        setConnectedAccount(accounts[0]);
      }

      // convert ETH amount to wei (simple conversion)
      const amountFloat = parseFloat(depositAmount);
      const wei = BigInt(Math.round(amountFloat * 1e18));
      const txParams = {
        from: connectedAccount,
        to: sitePublicAddress,
        value: "0x" + wei.toString(16),
      };

      // send transaction via MetaMask
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams],
      });

      // send txHash to backend with JWT
      const token = window.localStorage.getItem("token");
      const endpoint = "http://localhost:5000/api/deposit";
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          "txHash" : txHash,
        }),
        credentials: "include",
      });

      if (resp.ok) {
        alert("Deposit transaction sent. TX: " + txHash);
      } else {
        const errData = await resp.json().catch(() => ({}));
        setError(errData.message || "Failed to record deposit on server.");
      }
    } catch (err) {
      console.error("Network / tx error during deposit:", err);
      setError("A network or transaction error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        const data = await response.json().catch(() => ({}));
        if (data && data.txHash) {
          alert("Payment request sent. TX: " + data.txHash);
        } else {
          alert("Payment request sent.");
        }
        //navigate("/");
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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(sitePublicAddress);
    } catch {
      alert("Failed to copy address. Please copy it manually: " + sitePublicAddress);
    }};

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
          className={`login-card__side login-card__side--left ${mode === "withdraw" ? "active" : ""}`}
          aria-label="Withdraw"
          onClick={() => setMode("withdraw")}
        >
          Withdraw
        </button>

        <button
          type="button"
          className={`login-card__side login-card__side--right ${mode === "deposit" ? "active" : ""}`}
          aria-label="Deposit"
          onClick={() => setMode("deposit")}
        >
          Deposit
        </button>

        </div>

          <div className="login-card">

            {mode === "withdraw" && (<h2 className="welcome-text">
              Maybe one more spin...?
            </h2>
            )}

            {mode === "deposit" && (<h2 className="welcome-text">
              Need more ammo captain?
            </h2>
            )}

          {/* Render depending on selected mode */}
          {mode === "withdraw" && (
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
          )}

          {mode === "deposit" && (
            <div className="deposit-view">
              <div className="input-group">
                <label className="input-label">Amount to Deposit (ETH)</label>
                <Input
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.01"
                  className="input-field"
                />
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                {connectedAccount ? (
                  <div style={{ fontSize: 12, color: "#333" }}>
                    Connected: {connectedAccount.slice(0, 6)}...{connectedAccount.slice(-4)}
                  </div>
                ) : (
                  <Button type="button" onClick={connectWallet} disabled={isLoading}>Connect Wallet</Button>
                )}

                <Button type="button" onClick={handleDeposit} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Deposit"}
                </Button>
              </div>

              <p style={{ marginTop: 12, color: "#666" }}>
                Our wallet address: <span className="site-address" style={{ wordBreak: "break-all" }}>{sitePublicAddress}</span>
              </p>
              <Button type="button" onClick={handleCopyAddress}>Copy Address</Button>

              {error && <p className="error-message" style={{ marginTop: 8 }}>{error}</p>}
            </div>
          )}
        </div>
       </div>

       <div className="decorative-background" />
     </div>
   );
 };

 export default Payment;