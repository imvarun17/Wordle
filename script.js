let exit = false;
let maxtries = 6;
	
let input = document.querySelector('input');
let win = document.querySelector('#win');
let hint = document.querySelector('#hint');
let hint_initial = document.querySelector("#hintinitial");
let attempt = document.querySelector('#attempt');
let chibi = document.querySelector('#chibi')
	
let tries = 0;
let anslist = ["cream","range","right"]
fetch('words.txt')
.then(response => response.text())
.then(wordlist => wordlist.split('\n'))
.then(wordlist => main(wordlist));

function addGuessDisplay(answer, guess, len, hint) {
	
	let cat = ""
	for (var i = 0; i < len; i++) {
		if (guess.charAt(i) != answer.charAt(i) && !(answer.includes(guess.charAt(i))) ) {
			cat += '<span style="color: #595959">' + guess.charAt(i) + "</span>";
		} else if (guess.charAt(i) != answer.charAt(i) && (answer.includes(guess.charAt(i))) ) {
			cat += '<span style="color: #bebe00">' + guess.charAt(i) + "</span>";
		} else if (guess.charAt(i) == answer.charAt(i)) {
			cat += '<span style="color: #00ff00">' + guess.charAt(i) + "</span>";
		}
	}
	hint.innerHTML += cat + "</br>";
	
}

function image(thisImg) {
	var img = document.createElement("IMG");
	img.src = thisImg;
	img.style.width = 250+"px";
	img.style.maxWidth = 600+"px";
	document.getElementById('chibi').appendChild(img);
}

function checkAnswer(event, answer, len, wordlist) {
	
	event.preventDefault();
	input.value = input.value.toLowerCase();

	if (!exit) {
		if (wordlist.includes(input.value)) {
			addGuessDisplay(answer, input.value, len, hint);
			tries++;
			if (input.value == answer) {
				win.innerHTML = "You won :)";
                image("pat pat.gif");
				exit = true;
			} else {
				win.innerHTML = "Not quite right!";
			}
			if (tries >= maxtries && !exit) {
				win.innerHTML = "You lost :( </br> Better luck next time! </br> The word was " + answer;
				image("better luck nxt time.gif");
				exit = true;
			}
			attempt.innerHTML = tries + " attempt";
			if (tries > 1) {
				attempt.innerHTML += "s";
			}
		} 	
	}
}

function redirectTomenu() {
    window.location.href = "wordle.html";
}

function main(wordlist) {
	
	let wordlen = anslist.length;
	let randomword = Math.floor(Math.random() * wordlen);

	let answer = anslist[randomword];
	console.log(answer);
	let len = answer.length;
	
	input.setAttribute("maxlength", len);
	hint_initial.innerHTML = "Word is of length: " + len + "</br>";
	
	let form = document.querySelector('form');
	form.addEventListener("submit", function() { checkAnswer(event, answer, len, wordlist);
		document.getElementById('raju').value = ""; });
	

}
