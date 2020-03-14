document.getElementById("js-animation").animate(
    [
        {transform: 'scale(0.6, 0.6)', background: "#ffff00"},
        {background: "#ffdd00"},
        {background: "#ffbb00"},
        {background: "#ff9900"},
        {background: "#ff7700"},
        {transform: 'scale(1.0, 1.0)', background: "#ff7700"},
        {background: "#ff7700"},
        {background: "#ff9900"},
        {background: "#ffbb00"},
        {background: "#ffdd00"},
        {transform: 'scale(0.6, 0.6)', background: "#ffff00"}
    ],
    {duration: 3000, iterations: Infinity, easing: 'linear'}
);