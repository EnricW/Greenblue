var score = 0;
var current = "";

//Document ready
$(document).ready(function() {
	//Change color
    changeColor();
    //Choise trigger
    $("div.choise").on("click", function() {
		//Get the user choise
		choise = $(this).attr("data-value");
		//Check the choise
		check(choise);
		//Update score
		$("#score").html(score);
		//Next color
		changeColor();
	})
});

/**
 * Checks an user choise.
 * 
 * @param  string choise User choise
 * @return void
 */
function check(choise){
	//Correct one
	if(choise==current){
		score++;
	//Calls pointScored()
		pointScored();
	//Incorrect
	}else{
		score = 0;
	//Calls gameOVer()
	//	gameOver();
	}
}

// +1 Animation
function pointScored(){
	if(current=='b'){
		$("#bluepoint").animate({bottom: '+=300px'}, 800, function() {
		//resets position
		$("#bluepoint").removeAttr('style'); 
    	})
	}else{
		$("#greenpoint").animate({bottom: '+=300px'}, 800, function() {
		//resets position
		$("#greenpoint").removeAttr('style'); 
    	})
	}
}
/**
function gameOver(){
	$("#cube").effect("explode");
}

/**
 * Changes #cube color randomly.
 *
 * @return void
 */
function changeColor(){
	//Randomize a color
	var random = Math.random();
	console.log(random);
	//Blue
	if(random <= 0.5){
		//From (hue) 174 to 203
	    color = hslToRgb(getRandom(181,191)*10);
	    current = "b";
	//Green
	}else{
		//From (hue) 153 to 167
	    color = hslToRgb(getRandom(169,179)*10);
	    current = "g";
	}
	console.log(color);
	//Change color
    $("#cube").css("background-color", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
}

/**
 * Returns a random number between min (inclusive) and max (exclusive) and divides by 10.
 *
 * @param int min Min value.
 * @param int max Max value.
 * @return float Random number
 */
function getRandom(min, max) {
    return (Math.random() * (max - min) + min)/10;
}

/**
 * Generates a random RGB color from a single Hue value.
 * 
 * @param   Number  h       The hue [0-360]
 * @return  Array           The RGB representation
 */
function hslToRgb(h){
	//Max and Min for Light and Saturation randomize
	/*var min = 3
	var max = 7;
	//Randomize Light and Saturation
	l = getRandom(min, max);
	s = getRandom(min, max);*/
	l = 0.5;
	s = 0.5;
	//Grade to %
	h = h / 360;
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}