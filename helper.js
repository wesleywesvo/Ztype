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

/*
    wrapper variable
*/
helper.wrapper = document.getElementById("wrapper");



export default helper;