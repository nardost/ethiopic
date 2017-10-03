function isVowel(char) {
	switch(char)
	{
	case 'a':
	case 'A':
	case 'e':
	case 'E':
	case 'i':
	case 'I':
	case 'o':
	case 'O':
	case 'u':
	case 'U': return true;
	}
	return false;
}
function isW(ch) {
	switch(ch)
	{
	case 'W': return true;
	}
	return false;
}
function isStopper(ch) {
	switch(ch)
	{
	case "'": return true;
	}
	return false;
}

function ethiopicRootCharCode(str) {
	/**returns the Unicode hex value of the Ethiopic 
	 * character represented by str
	*/
	switch(str) 
	{
	case 'a':	return 0x12A0;
	case 'A':	return 0x12D0;
	
	case 'b':
	case 'B':	return 0x1265;
	
	case 'c':	return 0x127D;
	case 'C':	return 0x132D;
	
	case 'd':	return 0x12F5;
	case 'D':	return 0x12FD;
	
	case 'e':	return 0x12A5;
	case 'E':	return 0x12A4;
	case 'ee':	return 0x12D5;
	case 'EE':	return 0x12D4;
	
	case 'f':
	case 'F':	return 0x134D;
	
	case 'g':
	case 'G':	return 0x130D;
	
	case 'h':	return 0x1205;
	case 'hh':	return 0x1285;
	case 'H':	return 0x1215;
	
	case 'i':
	case 'I':	return 0x12A2;
	
	case 'j':
	case 'J':	return 0x1305;
	
	case 'k':
	case 'K':	return 0x12AD;
	
	case 'l':
	case 'L':	return 0x120D;
	
	case 'm':
	case 'M':	return 0x121D;
	
	case 'n':	return 0x1295;
	case 'N':	return 0x129D;
	
	case 'o':	return 0x12A6;
	case 'O':	return 0x12D6;
	
	case 'p':	return 0x1355;
	case 'P':	return 0x1335;
		
	case 's':	return 0x1235;
	case 'ss':	return 0x1225;
	case 'S':	return 0x133D;
	case 'SS':	return 0x1345;
	}
}
function isRootEthiopicCharacter(char) {
	code = char.charCodeAt(0);
	if((code >= 0x1205 && code <= 0x12B5) && ((code - 5) % 0x0010 == 0) 
			|| ((code >= 0x120D && code <= 0x12BD) && ((code - 13) % 0x0010 == 0))
			|| ((code >= 0x12C5 && code <= 0x1355) && ((code - 5) % 0x0010 == 0))
			|| ((code >= 0x12CD && code <= 0x134D) && ((code - 13) % 0x0010 == 0))
	)return true;
	return false;
}

function getCharacterCode(e) {
	var evt=(e)?e:(window.event)?window.event:null;
	if(evt){
		return key=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));		
	}
	return null;
}
function getEthiopicRootCharacter(key) {
	return String.fromCharCode(ethiopicRootCharCode(String.fromCharCode(key)));
}
function ethiopicWritingMachine(e) {
	state = 0;
	txt = document.getElementById('text').innerHTML;
	currentIndex = txt.length; //modify when mouse clicked
	nn=(document.layers)?true:false;
	ie=(document.all)?true:false;
	if(currentIndex == 0) lastCharacter == null;
	else lastCharacter = txt.charAt(currentIndex);
	if(lastCharacter == null || !isRootEthiopiccharacter(lastCharacter)) {
	var currentCharacter = getEthiopicRootCharacter(getCharacterCode(e));
	txt += currentCharacter;
	document.getElementById('text').innerHTML = txt;
	}
	if(isRootEthiopicCharacter(currentCharacter))
		alert(currentCharacter);
}