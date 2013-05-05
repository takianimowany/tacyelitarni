// ==UserScript==
// @name        Tacy Elitarni
// @namespace   http://smieszneobrazki.pl/~twojstary/
// @description Twój stary jak cię robił
// @include     http://www.karachan.org/*
// @version     1
// @grant none
// ==/UserScript==

function transliterujToken(tekst, pozycja, lista) {
	var wynik = '';
	var token = tekst[pozycja].toUpperCase();
	var czyTrzebaNaMaleLitery = (token != tekst[pozycja]);
	switch(token) {
		case 'A': wynik = 'А'; break;
		case 'Ą': wynik = 'А'; break;
		case 'B': wynik = 'Б'; break;
		
		case 'C':
			if(tekst[pozycja+1].toUpperCase() == 'Z') {
				wynik = 'Ч';
				pozycja++;
			} else if(tekst[pozycja+1].toUpperCase() == 'I') {
				wynik = 'Т';
			} else {
				wynik = 'Ц';
			}
			break;
			
		case 'Ć': wynik = 'ТЬ'; break;
			
		case 'D':
			if(tekst[pozycja+1].toUpperCase() == 'Z') {
				if(tekst[pozycja+2].toUpperCase() == 'I') {
					wynik = 'ДЗ';
					pozycja++;
				} else {
					wynik = 'ДЗ';
					pozycja++;
				}
			} else {
				wynik = 'Д';
			}
			break;
			
		case 'E': wynik = 'Э'; break;
		case 'Ę': wynik = 'Э'; break;
		case 'F': wynik = 'Ф'; break;
		case 'G': wynik = 'Г'; break;
		case 'H': wynik = 'Х'; break;
		
		case 'I':
		case 'J':
			var kolejna = tekst[pozycja+1].toUpperCase();
			switch(kolejna) {
				case 'A':
				case 'Ą':
					wynik = 'Я';
					pozycja++;
					break;
				case 'E':
				case 'Ę':
					wynik = 'Е';
					pozycja++;
					break;
				case 'U':
				case 'Ó':
					wynik = 'Ю';
					pozycja++;
					break;
				case 'O':
					wynik = 'Ё';
					pozycja++;
					break;
				default:
					if(token == 'I') {
						wynik = 'И';
					} else {
						wynik = 'Й';
					}
			}
			break;
			
		case 'K': wynik = 'К'; break;
		
		case 'L':
			if(tekst[pozycja+1].toUpperCase() == 'I') {
				wynik = 'Л';
			} else {
				wynik = 'ЛЬ';
			}
			break;
			
		case 'Ł':
			if(tekst[pozycja+1].toUpperCase() == 'I') {
				wynik = 'ЛЪ';
			} else {
				wynik = 'Л';
			}
			break;
		
		case 'M': wynik = 'М'; break;
		case 'N': wynik = 'Н'; break;
		case 'Ń': wynik = 'НЬ'; break;
		case 'O': wynik = 'О'; break;
		case 'Ó': wynik = 'О'; break;
		case 'P': wynik = 'П'; break;
		
		case 'Q': 
			if(tekst[pozycja+1].toUpperCase() == 'U') {
				wynik = 'КВ';
				pozycja++;
			} else {
				wynik = 'К';
			}
			break;
		
		case 'R':
			if(tekst[pozycja+1].toUpperCase() == 'Z') {
				wynik = 'Ж';
				pozycja++;
			} else {
				wynik = 'Р';
			}
			break;
			
		case 'S':
			if(tekst[pozycja+1].toUpperCase() == 'Z') {
				if(tekst[pozycja+2].toUpperCase() == 'C'
					&& tekst[pozycja+3].toUpperCase() == 'Z') {
					
					wynik = 'Щ';
					pozycja+= 3;
				} else {
					wynik = 'Ш';
					pozycja++;
				}
			} else {
				wynik = 'С';
			}
			break;
			
		case 'Ś': wynik = 'СЬ'; break;
		case 'T': wynik = 'Т'; break;
		case 'U': wynik = 'У'; break;
		case 'V': wynik = 'В'; break;
		case 'W': wynik = 'В'; break;
		case 'X': wynik = 'КС'; break;
		case 'Y': wynik = 'Ы'; break;
		case 'Z': wynik = 'З'; break;
		case 'Ż': wynik = 'Ж'; break;
		case 'Ź': wynik = 'ЗЬ'; break;
		
		default: wynik = token;
	}
	if(czyTrzebaNaMaleLitery) {
		wynik = wynik.toLowerCase();
	}
	lista.push(wynik);
	return pozycja + 1;
}

function transliteruj() {
	var textarea = document.getElementsByName("message")[0];
	var tekst = textarea.value;
	var dlugoscTekstu = tekst.length;
	var lista = [];
	var pozycja = 0;
	while(pozycja < dlugoscTekstu) {
		pozycja = transliterujToken(tekst, pozycja, lista);
	}
	tekst = lista.join('');
	textarea.value = tekst;
	return false;
}

function przygotujGui() {	
	var btnTlumaczTextbox = document.createElement("button");
	btnTlumaczTextbox.innerHTML = "Transliteruj";
	btnTlumaczTextbox.onclick = transliteruj;
	
	var tdWiadomosc = document.getElementById("rtContainer");
	tdWiadomosc.appendChild(document.createElement("br"));
	tdWiadomosc.appendChild(btnTlumaczTextbox);
}

function main() {
	przygotujGui();
}

main();

