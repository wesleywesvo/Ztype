const helper = {
    ww: window.innerWidth,
    wh: window.innerHeight
}


/*
    Generate random between [min, max)
*/
helper.random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

helper.wrapper = document.getElementById("wrapper");

/*
    Diagonal distance of view for spawn area
*/
helper.radius = Math.sqrt(helper.ww * helper. ww + helper.wh * helper.wh) / 4;



export default helper;