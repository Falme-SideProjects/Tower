var game;

var possibleSymbol = ["0","1","2","3","4","5","6","7","8","9"];

var possiblePieces = {
	"list" : [
		[possibleSymbol[1]],
		[possibleSymbol[2]],
		[possibleSymbol[3]],
		[possibleSymbol[4]],
		[possibleSymbol[5]],
		[possibleSymbol[6]],
		[possibleSymbol[7]],
		[possibleSymbol[8]],
		[possibleSymbol[9]],
		[possibleSymbol[1],possibleSymbol[0]],
		[possibleSymbol[1],possibleSymbol[1]],
		[possibleSymbol[1],possibleSymbol[2]],
		[possibleSymbol[1],possibleSymbol[3]],
		[possibleSymbol[1],possibleSymbol[4]],
		[possibleSymbol[1],possibleSymbol[5]],
		[possibleSymbol[1],possibleSymbol[6]],
		[possibleSymbol[1],possibleSymbol[7]],
		[possibleSymbol[1],possibleSymbol[8]],
		[possibleSymbol[1],possibleSymbol[9]],
		[possibleSymbol[2],possibleSymbol[0]]
	]
};

/*class PieceCreator{
	constructor(n){
		var _self = this;

		this.init = function(){
			var 
		}

		this.init();
	}
}*/

class PlayerSelector{
	constructor(){

		var _self = this;
		this.p1 = new PlayerStack("#POne", "Player One");
		this.p2 = new PlayerStack("#PTwo", "Player Two");

		this.turn = true;

		this.init = function(){



		}

		this.selectPiece = function(symbols){

			var verifyPlayable = $(symbols).hasClass('avalaible');

			if(verifyPlayable){


				$(symbols).addClass("unavalaible");


				if(_self.turn){
					this.p1.selectPiece(symbols.innerHTML);
				} else {
					this.p2.selectPiece(symbols.innerHTML);
				}

				_self.turn = !_self.turn;
				_self.alternatePlayer();

			}
		}

		this.alternatePlayer = function(){
			if(_self.turn){
				$(""+this.p1.elem).addClass("turn");
				$(""+this.p2.elem).removeClass("turn");
			} else {
				$(""+this.p1.elem).removeClass("turn");
				$(""+this.p2.elem).addClass("turn");
			}

			if($(this.p1.elem+" .row div").length > 0 && $(this.p2.elem+" .row div").length > 0)
				_self.verifyPlayablePieces();
		}


		this.verifyPlayablePieces = function(){

			var elementVerify;

			if(_self.turn){
				elementVerify = $(this.p1.elem+" .row div").last();
			} else {
				elementVerify = $(this.p2.elem+" .row div").last();
			}

			var foundAnyone = false;

			$("#gamePieces .row div").each(function(){

				$(this).removeClass("avalaible");

				var found = false;

				var stings = $(this).html().split("");
				var elementsting = $(elementVerify).html().split("");

				for(var a = 0; a < stings.length; a++){
					for(var b = 0; b < elementsting.length; b++){
						//console.log(stings[a]+" : "+elementsting[b]);
						if(stings[a] == elementsting[b]){
							found = true;
						}
					}
				}

				if((parseInt($(this).html()) == parseInt(elementVerify.html()) * 2) || 
					(parseInt(elementVerify.html()) % 2 == 0 && parseInt($(this).html()) == parseInt(elementVerify.html()) / 2)){
					found = true;
				}

				if(found){

					$(this).removeClass("avalaible");

					if( !$(this).hasClass("unavalaible")){
						$(this).addClass("avalaible");
						foundAnyone=true;
					} else {
						$(this).removeClass("avalaible");
					}

				} else {
					$(this).removeClass("avalaible");

				}
			});

			if(!foundAnyone){
				_self.showVictory();
			}
		}

		this.showVictory = function(){
			var elementVerify;

			if(!_self.turn){
				elementVerify = _self.p1.named;
			} else {
				elementVerify = _self.p2.named;
			}

			$("#gameplay").css("display","none");
			$("#WinnerUI").css("display","block");
			
			$("#WinnerUI #nameWinner").html(elementVerify+" Win!");

		}

		this.init();

	}
}

class PlayerStack{
	constructor(elem, named){


		var _self = this;
		this.elem = elem;
		this.named = named;

		this.init = function(){

		}

		this.selectPiece = function(symbols){
			var html = '<div class="piece used col-xs-12">'+symbols+'</div>';
			var elem = $(html).appendTo( $(_self.elem+' .row') );
		}

		this.init();
	}
}

class PiecesBuilder{
	constructor(){

		var _self = this;

		this.init = function(){
			
			//Create Pieces List by random-eliminating
			for(var a=0; a<possiblePieces.list.length; a++){

				var symbol = (possiblePieces.list[a].length == 1 ? (possiblePieces.list[a][0]):(possiblePieces.list[a][0]+""+possiblePieces.list[a][1]));
				//console.log(symbol);
				var html = '<div class="piece avalaible col-xs-6">'+symbol+'</div>';

				var elem = $(html).appendTo( $('#gamePieces .row') );

				elem.on("click", function(){ 
					var sel = game.playerSelector.selectPiece(this); 
				});
			}



		}

		this.init();
	}
}

class Rules {
	constructor(){

		var _self = this;

		this.init = function(){

			$("#Rules").on("click", function(){
				$("#gameplay").css("display","none");
				$("#rulesUI").css("display","block");
			})

			$("#rulesUI").on("click", function(){
				$("#gameplay").css("display","block");
				$("#rulesUI").css("display","none");
			});
		}

		this.init();

	}
}



/*class Score{
	constructor(){

		//Variaveis
		var _self = this;
		this.correct = 0;
		this.wrong = 0;
		
		//Funções
		this.init = function(){
			this.refreshScore();
		}

		this.refreshScore = function(){
			$("#right span").text("Acertos : "+this.correct);
			$("#wrong span").text("Erros : "+this.wrong);
		}

		this.addRight = function(){
			this.correct++;
		}

		this.addWrong = function(){
			this.wrong++;

		}

		this.init()
	}
}*/



class Game{
	constructor(){
		this.playerSelector = new PlayerSelector();
		this.piecesBuilder = new PiecesBuilder();
		this.rules = new Rules();
		//this.score = new Score();
		//this.newsList = new NewsList();
		//this.clicker = new Clicker();
	
	}
}

$(window).ready(function(){

	game = new Game();

});