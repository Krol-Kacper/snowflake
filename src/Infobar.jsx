import './Infobar.css'

function Infobar() {
    return (<div class="infobar">
        <h1 class="infobar-title">Prize table</h1>
        <img src="./src/images/ethcoin.png" width="80px" height="80px" alt="ethereum coin image" class="ethcoin"></img>
        <ul class="prize-table">
            <li>Snowy Win</li>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x1.5</a>
            <li>Cool Win</li>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x2</a>
            <li>Hot Win</li>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x5</a>
            <li>Snowflake Mega Big Win</li>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x20</a>
        </ul>
    </div>)
}

export default Infobar