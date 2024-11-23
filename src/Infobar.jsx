import './Infobar.css'

function Infobar() {
    return (<div class="infobar">
        <h1 class="infobar-title">Prize table</h1>
        <img src="./src/images/ethcoin.png" width="80px" height="80px" alt="ethereum coin image" class="ethcoin"></img>
        <div class="prize-table">
            <h2 class="small-win">Snowy Win</h2>
            <img src="./src/images/snowman.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowman.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowman.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x1.5</a>
            <h2 class="small-win">Cool Win</h2>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/icecube.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x2</a>
            <h2 class="hot-win">Hot Win</h2>
            <img src="./src/images/kakao.png" width="20px" height="20px" alt="hot chocolate image"></img>
            <img src="./src/images/kakao.png" width="20px" height="20px" alt="hot chocolate icecube image"></img>
            <img src="./src/images/kakao.png" width="20px" height="20px" alt="hot chocolate icecube image"></img>
            <a> = </a>
            <a class="multiplier">x5</a>
            <h2 class="big-win">Snowflake Mega Big Win</h2>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <img src="./src/images/snowflake.png" width="20px" height="20px" alt="icecube image"></img>
            <a> = </a>
            <a class="multiplier">x20</a>
        </div>
    </div>)
}

export default Infobar