import './Spinner.css'

function tempRandom() {
    //THIS WILL BE DONE WITH SERVER IN THE FUTURE


}

function startSpin() {
    const image = document.getElementsByClassName("image");
    const grid = document.getElementsByClassName("square")[0].getBoundingClientRect(); //getting y position of square
    let rowPosition = Array(12);
    for(let i=0; i<image.length; i++)
        image[i].style.animationPlayState = "running";

    }


function funnyButton(e, isHover){
    if(isHover)
        e.target.innerHTML = "Spin &#129297;";
    else 
        e.target.innerHTML = "Spin"
}

function Spinner() {
    return (
        <div class="mainWindow">
            <div class="slots">
                <div class="chuj">
                    {[...Array(3)].map((_, id) => 
                    <div class="square">
                        <img src='./src/images/snowman.png' class="image"></img>
                        <img src='./src/images/snowflake.png' class="image"></img>
                        <img src='./src/images/kakao.png' class="image"></img>
                        <img src="./src/images/icecube.png" class="image"></img>
                    </div>
                    )}
                </div>
            </div>
            <button class="spinButton" onClick={startSpin} onMouseEnter={(e) => funnyButton(e, true)} onMouseLeave={(e) => funnyButton(e, false)}>Spin</button>
        </div>
    )
}
export default Spinner