var div = document.querySelectorAll('div');
var score = 0;
var difficult="";
var time = 0;
var temps="";


function ini(){
	document.body.style.backgroundImage="url('img/fondmenu.jpg')"
	body.style.animation='grow2 0.6s linear'
	var homepage = document.createElement('section')
	homepage.classList.add('start')
	homepage.insertAdjacentHTML('afterbegin','<h1>Sweet Nightmare</h1><aside class="bouton"><bouton class="boutonstart" >START</bouton>	</aside>');
	homepage.insertAdjacentHTML('beforeend', '<aside class="hud"><aside class="difficult"></aside><aside class="timer"></aside><aside class="score"></aside></aside><aside class="game"></aside>')
	document.body.appendChild(homepage);
	

	//start screen//
	var bouton = document.querySelector('.bouton');
	var start = document.querySelector('.start');
	var h1 = document.querySelector('h1')
	var section = document.querySelector('section');
	var boutonstart = document.querySelector('.boutonstart')
	boutonstart.addEventListener('mousedown',playSound);
	var startremove = function(){h1.remove();}

	//animation thunder+bom//
	window.setInterval(thunder, 6000);
	function thunder(){
		section.classList.toggle('thunder');
		bouton.classList.toggle('bom');	
		//playSound('sound/thunder.waw');
	}

	//fear pop//
	//gameplay(0,10);
	//transition start/choose your destiny//
	boutonstart.addEventListener('click',function(){
		h1.textContent='Choose Your Destiny';
		boutonstart.remove();
		menu();

	});		

	

	function playSound(){
		var audio = document.createElement('audio');
		audio.src="sound/intro.mp3";
		audio.autoplay = "true";
		audio.loop = "true";
		document.body.appendChild(audio);
	}

	//start screen song//
	
}

function menu(){
	var bouton = document.querySelector('.bouton')
	bouton.insertAdjacentHTML('afterbegin','<bouton class="bouton1" >Noob</bouton><bouton class="bouton2">Hardcore</bouton><bouton class="bouton3">Crazy</bouton>');

		//choose your destiny//
		var btnnoob = document.querySelector('.bouton1')
		btnnoob.addEventListener("click",function(){
			game("noob",20,3,60);
		})
		var btnhard = document.querySelector('.bouton2')
		btnhard.addEventListener("click",function(){
			game("hard",80,20,45);
		})
		var btnultra = document.querySelector('.bouton3')
		btnultra.addEventListener("click",function(){
			game("Crazy",200,70,30);
		})
	}

	function game(difficult,candy,fear,sec){
		document.querySelector(".difficult").textContent= difficult;
		document.querySelector(".score").textContent = score + "/" +candy;
	//document.querySelector('audio').remove();
	score = 0;
	clearBody();
	gameplay(candy,fear);
	timer(sec);
	var sound = document.querySelector('audio');
	sound.pause("sound/intro.mp3");
	playSound("sound/09.mp3");	
}

function win(){
	var hud = document.querySelector('.hud')
	removeAllChild(document.querySelector('.game'));
	removeAllChild(hud);
	document.querySelector('.game').classList.add('win');
	var win =document.querySelector('.win');
	win.textContent="YOU WIN";
	clearInterval(temps);
	hud.classList.add("retour");
	var retour = document.querySelector('.retour')
	retour.textContent="RETOUR"
	retour.addEventListener("click",function(){
		removeAllChild(body);
		ini();})
}

function loose(){
	var hud = document.querySelector('.hud')
	removeAllChild(document.querySelector('.game'));
	removeAllChild(hud);
	document.querySelector('.game').classList.add('loose');
	var loose = document.querySelector('.loose');
	hud.classList.add("retour");
	var retour = document.querySelector('.retour')
	retour.textContent="RETOUR"
	loose.textContent="YOU LOOSE";
	clearInterval(temps);
	retour.addEventListener("click",function(){
		removeAllChild(body);
		ini();})
}

function timer(sec){
	var timer = document.querySelector('.timer')
	var time = sec
	temps = window.setInterval(decreast,1000);
	function decreast(){
		if(time === 0){
			loose();
			clearInterval(temps);
		}
		time--;
		timer.textContent=time;
	}	
}

function clearBody(){
	var h1 = document.querySelector('h1')
	var homepage = document.querySelector('section')
	var bouton = document.querySelector('.bouton')
	var game = document.querySelector('.game');
	homepage.className=('divJeu')
	h1.remove();
	bouton.remove();
	document.body.style.backgroundImage="url('img/f.jpg')";
	removeAllChild(game);
}

function removeAllChild(e){
	while (e.firstChild) {
		e.removeChild(e.firstChild);
	}
}



function gameplay (a , b) {
	for (i = 0; i < a + b; i++){	
		var game = document.querySelector('.game');

		if (i < b){
			var pos_x = Math.floor((Math.random()*90));
			var pos_y = Math.floor(Math.random()*90);
			game.insertAdjacentHTML('beforeend', '<div class="i"></div>');
			var div = document.querySelector('.i');
			div.style.left = pos_x + "vw";
			div.style.top = pos_y + "vh";
			div.style.animation = getRandomAnim()+ " " +getRandomInt(40)+ 's '+ getverse() + " infinite";	
			div.className = getRandomFear();
			
		}
		if (i < a){
			var pos_x = Math.floor((Math.random()*90));
			var pos_y = Math.floor(Math.random()*90);
			game.insertAdjacentHTML('beforeend', '<div class="i"></div>');
			var div = document.querySelector('.i');
			div.style.left = pos_x + "vw";
			div.style.top = pos_y + "vh";
			div.style.animation = getRandomAnim()+ " " +getRandomInt(40)+ 's '+ getverse() + " infinite";	
			div.className = getRandomCandy() ;
			
		}
		disapear(a , b)
	}	
}	


function disapear(a , b){
	var tabDiv=document.querySelectorAll("div");
	tabDiv[i].addEventListener("click", function(){
		calculScore(this);
		var tabDiv=document.querySelectorAll("div");
		document.querySelector(".game").removeChild(this);
		if(tabDiv.length - b === 1){win();}			
		document.querySelector(".score").textContent = score + "/" + a;
	})
}




function calculScore(div){
	if(div.classList.contains(rccandy(div.className))){
		score = score+1;
	}
	else if (div.classList.contains(rcfear(div.className))){
		loose();
		clearInterval(temps);
	}
}


function rcfear(e){
	var fear = ["bat","bat2", "citrouille", "face", "frog","spider", "ghost", "ghost2", "witch"]
	for(i=0; i < fear.length; i++){
		if(fear[i] == e ){
			return fear[i]}
		}
	}

	function rccandy(e){
		var candy= ["candycorn", "pink","brown","y","sucette","lolilpop","glace"]
		for(i=0; i < candy.length; i++){
			if(candy[i] == e ){
				return candy[i]}
			}
		}


		function getRandomCandy() {
			var candy = ["candycorn", "pink", "brown", "y", "sucette", "lolilpop", "glace"]
			return candy[getRandomInt(candy.length)]
		}

		function getRandomFear() {
			var fear = ["bat","bat2", "citrouille", "face", "frog","spider", "ghost", "ghost2", "witch"]
			return fear[getRandomInt(fear.length)]
		}

		function getRandomAnim() {
			var anim = ["raw", "grow", "square", "spin",]
			return anim[getRandomInt(anim.length)]

		}
		function getverse() {
			var anim = ["reverse", " "]
			return anim[getRandomInt(anim.length)]

		}

		function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}


		function playSound(src){
			var audio = document.createElement('audio');
			audio.src= src;
			audio.autoplay = "true";
			audio.loop = "true";
			document.body.appendChild(audio);
		}

		ini();


