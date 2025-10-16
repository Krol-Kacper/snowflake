import './Infobar.css'

function PrizeRow({ titleClass, title, image, multiplier }) {
    return (
        <div className="prize-item">
            <h2 className={titleClass}>{title}</h2>
            <div className="prize-icons">
                <img src={`./src/images/${image}.png`} width="20px" height="20px" alt={`${image} icon`} />
                <img src={`./src/images/${image}.png`} width="20px" height="20px" alt={`${image} icon`} />
                <img src={`./src/images/${image}.png`} width="20px" height="20px" alt={`${image} icon`} />
            </div>
            <div className="prize-value">
                <span> = </span>
                <span className="multiplier">{multiplier}</span>
            </div>
        </div>
    );
}

function Infobar() {
    return (
        <aside className="infobar">
            <h1 className="infobar-title">Prize table</h1>
            <img src="./src/images/ethcoin.png" width="80px" height="80px" alt="ethereum coin" className="ethcoin" />
            
            <div className="prize-table">
                <PrizeRow titleClass="small-win" title="Snowy Win" image="snowman" multiplier="x1.5" />
                <PrizeRow titleClass="small-win" title="Cool Win" image="icecube" multiplier="x2" />
                <PrizeRow titleClass="hot-win" title="Hot Win" image="kakao" multiplier="x5" />
                <PrizeRow titleClass="big-win" title="Snowflake Mega Big Win" image="snowflake" multiplier="x20" />
            </div>
        </aside>
    );
}

export default Infobar;