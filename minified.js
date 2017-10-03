/**
*May31,2017
*NardosTessema
*Chicago,IL
*/
/**Globalvariables*/
var state=0;
var token=null;
var output;
var oflag;//iftrue,updatelastcharacterofoutputinsteadofappendingtotheoutput.
var pflag;//trueforpunctuationmarks.addspacebeforeandafterthepunctuationmark.
var aeiou=['A','a','e','E','i','o','u','ae','ea','ee','EE','ii','oo','uu'];
var alpha=['b','B','F','j','J','l','L','M','R','v','V','w','W','x','X','y','Y'];
var beta=['c','C','d','D','G','H','n','N','p','P','t','T','z','Z'];
var gamma=['g','k','K','q','Q'];
var delta=['h','s','S'];
var fia=['f','m','r'];
var doubled=['hh','ss','SS'];
var combo_W=['gW','kW','KW','qW','QW'];
var combo_fia=['fY','mY','rY'];
var l=alpha.concat(beta,gamma,delta,fia);
var lambda=alpha.concat(beta,gamma,delta,fia,doubled,combo_W,combo_fia);
//θ=λ–δ⟺θ∈A∪B∪C
//Preservedefaultbehaviorforsomekeys.
var defaultBehaviorKeys=['Backspace',
'Shift',
'Enter',
'Alt',
'Control',
'OS',
'F1',
'F2',
'F3',
'F4',
'F5',
'F6',
'F7',
'F8',
'F9',
'F10',
'F11',
'F12',
'Tab',
'Backspace',
'Escape',
'Insert',
'Home',
'Delete',
'End',
'PageUp',
'PageDown',
'NumLock',
'ArrowLeft',
'ArrowUp',
'ArrowRight',
'ArrowDown',
'Enter',
'CapsLock',
'ContextMenu'];
/**Testfunction*/
function test(e){
var s=codeToKey(e.code,e.shiftKey,false);//e.key;
var seleda=document.getElementById('editor-seleda');
alert('event.code='+e.code+'\nevent.key='+e.key+'\nCodetoKey:'+codeToKey(e.code,true,false));//CapsLock,e.shiftKey=true|false
if(aeiou.indexOf(s)!=-1){
seleda.innerHTML+=String.fromCharCode(a(s))+'\t'+'<br/>';
}elseif(lambda.indexOf(s)!=-1){
seleda.innerHTML+=String.fromCharCode(geez(s))+'\t'+
String.fromCharCode(kaeeb(s))+'\t'+
String.fromCharCode(salis(s))+'\t'+
String.fromCharCode(rabee(s))+'\t'+
String.fromCharCode(hamis(s))+'\t'+
String.fromCharCode(sadis(s))+'\t'+
String.fromCharCode(sabee(s))+'\t'+
String.fromCharCode(z_rabee(s))+'\t'+'<br/>';
}
seleda.scrollTop=seleda.scrollHeight;//scrollautomaticallyasinputgrows.
}
//repeatedaction.
function doTransition(_state,_token,_output,_oflag){
state=_state;
token=_token;
output=_output;
oflag=_oflag;
}
function transliterate(event){
var shiftKeyDown=event.shiftKey;
var capsLockOn=false;//doCapsLockdetectionlater.
var k=codeToKey(event.code,shiftKeyDown,capsLockOn);
var editor=document.getElementById('geez-editor');
output=null;
oflag=false;
pflag=false;
/**Somekeysretaintheirdefaultbehavior*/
if(defaultBehaviorKeys.indexOf(k)!=-1){
if(event.code=='Backspace'||event.code=='Delete'){
//BackspaceorDeleteleadstostate=0.
doTransition(0,null,null,false);
}
return true;
}
/**ctrl+c,ctrl+v,etcshouldbepossible.*/
if(event.ctrlKey)return true;
/**Transliterationbegins.*/
switch(k){
case 'A':
if(state==0){
doTransition(state,token,a(k),false);
break;
}
if(state==1||state==2||state==3){
doTransition(0,null,a(k),false);
break;
}
case 'a':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='a'){
doTransition(0,null,a('aa'),true);
}elseif(token=='e'){
doTransition(0,null,a('ea'),true);
}elseif(l.indexOf(token)!=-1){
doTransition(0,null,rabee(token),true);
}//else....punctuation&more
break;
}
if(state==2){
doTransition(0,null,a(k),false);
break;
}
if(state==3){
doTransition(0,null,rabee(token),true);
break;
}
break;
case 'e':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='a'){
doTransition(0,null,a(token+k),true);
}elseif(token=='e'){
doTransition(0,null,a(token+k),true);
}elseif(l.indexOf(token)!=-1){
doTransition(2,token,geez(token),true);
}//else....punctuation&more
break;
}
if(state==2){
doTransition(0,null,hamis(token),true);
break;
}
if(state==3){
doTransition(2,token,geez(token),true);
break;
}
case 'E':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='E'){
doTransition(0,null,a(token+k),true);
}elseif(l.indexOf(token)!=-1){
doTransition(0,null,hamis(token),true);
}else{//tokeninaeiou
doTransition(1,k,a(k),false);
}
break;
}
if(state==2){
doTransition(1,k,a(k),false);
break;
}
if(state==3){
doTransition(0,null,hamis(token),true);
break;
}
case 'i':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='i'){
doTransition(0,null,a(token+k),true);
}elseif(l.indexOf(token)!=-1){
doTransition(0,null,salis(token),true);
}else{//tokeninaeiou
doTransition(1,k,a(k),false);
}
break;
}
if(state==2){
doTransition(1,k,a(k),false);
break;
}
if(state==3){
doTransition(0,null,salis(token),true);
break;
}
case 'o':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='o'){
doTransition(0,null,a(token+k),true);
}elseif(l.indexOf(token)!=-1){
doTransition(0,null,sabee(token),true);
}else{//tokeninaeiou
doTransition(1,k,a(k),false);
}
break;
}
if(state==2){
doTransition(1,k,a(k),false);
break;
}
if(state==3){
doTransition(0,null,sabee(token),true);
break;
}
case 'u':
if(state==0){
doTransition(1,k,a(k),false);
break;
}
if(state==1){
if(token=='u'){
doTransition(0,null,a(token+k),true);
}elseif(l.indexOf(token)!=-1){
doTransition(0,null,kaeeb(token),true);
}else{//tokeninaeiou
doTransition(1,k,a(k),false);
}
break;
}
if(state==2){
doTransition(1,k,a(k),false);
break;
}
if(state==3){
doTransition(0,null,kaeeb(token),true);
break;
}
case '':
pflag=true;
doTransition(0,null,0x1361,false);
break;
default:
if(['I','O','U'].indexOf(k)!=-1)return true;//fornow,notusedinthetransliteration.
if(state==0){
if(l.indexOf(k)!=-1){
doTransition(1,k,sadis(k),false);
}//else...punctuation&more
break;
}
if(state==1){
if(aeiou.indexOf(token)!=-1){
doTransition(1,k,sadis(k),false);
}elseif((alpha.concat(beta)).indexOf(token)!=-1){
if(k=='W'){
if(z_rabee(token)){//w,W,y,Y
doTransition(0,null,z_rabee(token),true);
}else{
doTransition(1,k,sadis(k),false);
}
}else{
doTransition(1,k,sadis(k),false);
}
}elseif(fia.indexOf(token)!=-1){
if(k=='Y'){
doTransition(0,null,sadis(token+k),true);//sofartheonlycase wherestategoesto0onsadis.
}else{
if(k=='W'){
doTransition(0,null,z_rabee(token),true);
}else{
doTransition(1,k,sadis(k),false);
}
}
}elseif((gamma.concat(delta)).indexOf(token)!=-1){
if((doubled.concat(combo_W)).indexOf((token+k))!=-1){//hh,ss,SS,gW,kW,KW,qW,QW
doTransition(3,(token+k),sadis((token+k)),true);
}else{
if(k=='W'){
doTransition(0,null,z_rabee(token),true);
}else{
doTransition(1,k,sadis(k),false);
}
}
}
break;
}
if(state==2){
if(l.indexOf(k)!=-1){
doTransition(1,k,sadis(k),false);
}//else...punctuation&more
break;
}
if(state==3){
if((['SS','gW','kW','KW','QW'].indexOf(token)!=-1)&&k=='W'){
doTransition(1,k,sadis(k),false);
break;
}
if(l.indexOf(k)!=-1){
if(k=='W'){
doTransition(0,null,z_rabee(token),true);
}else{
doTransition(1,k,sadis(k),false);
}
}//else...punctuation&more
break;
}
}
if(oflag)editor.value=editor.value.slice(0,editor.value.length-1);//overwritethelastcharacter.
if(pflag)editor.value+='';
editor.value+=String.fromCharCode(output);
if(pflag)editor.value+='';
return false;
}
/**generatesአኡኢኣኤእኦኧዐዑዒዓዔዕዖ*/
function a(x){
switch(x){
case 'A':return 0x12a3;
case 'a':return 0x12a0;
case 'e':return 0x12a5;
case 'E':return 0x12a4;
case 'i':return 0x12a2;
case 'o':return 0x12a6;
case 'u':return 0x12a1;
case 'aa':return 0x12d3;
case 'ae':return 0x12d0;
case 'ea':return 0x12a7;
case 'ee':return 0x12d5;
case 'EE':return 0x12d4;
case 'ii':return 0x12d2;
case 'oo':return 0x12d6;
case 'uu':return 0x12d1;
default:return null;
}
}
/**functionsthatgenerategeez,kaeeb,salis,etc...*/
function sadis(consonant){
if(lambda.indexOf(consonant)!=-1){
switch(consonant){
case 'b':
case 'B':return 0x1265;
case 'f':
case 'F':return 0x134d;
case 'j':
case 'J':return 0x1305;
case 'l':
case 'L':return 0x120d;
case 'm':
case 'M':return 0x121d;
case 'r':
case 'R':return 0x122d;
case 'v':
case 'V':return 0x126d;
case 'w':
case 'W':return 0x12cd;
case 'x':
case 'X':return 0x123d;
case 'y':
case 'Y':return 0x12ed;
case 'c':return 0x127d;
case 'C':return 0x132d;
case 'd':return 0x12f5;
case 'D':return 0x12fd;
case 'G':return 0x131d;
case 'H':return 0x1215;
case 'n':return 0x1295;
case 'N':return 0x129d;
case 'p':return 0x1355;
case 'P':return 0x1335;
case 't':return 0x1275;
case 'T':return 0x1325;
case 'z':return 0x12dd;
case 'Z':return 0x12e5;
case 'g':return 0x130d;
case 'k':return 0x12ad;
case 'K':return 0x12bd;
case 'q':return 0x1245;
case 'Q':return 0x1255;
case 'h':return 0x1205;
case 's':return 0x1235;
case 'S':return 0x133d;
case 'gW':return 0x1313;
case 'kW':return 0x12b3;
case 'KW':return 0x12c3;
case 'qW':return 0x124b;
case 'QW':return 0x125b;
case 'hh':return 0x1285;
case 'ss':return 0x1225;
case 'SS':return 0x1345;
/**specialconditions*/
case 'fY':return 0x135a;
case 'mY':return 0x1359;
case 'rY':return 0x1358;
}
}
return null;
}
function geez(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)-5);
}
return null;
}
function kaeeb(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)-4);
}
return null;
}
function salis(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)-3);
}
return null;
}
function rabee(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)-2);
}
return null;
}
function hamis(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)-1);
}
return null;
}
function sabee(consonant){
if(lambda.indexOf(consonant)!=-1){
return (sadis(consonant)+1);
/**
*Thereareexceptions?No!
*
**/
}
return null;
}
function z_rabee(consonant){
if(lambda.indexOf(consonant)!=-1){
//irregularzemede-rabee.
var z=['g','h','hh','k','K','q','Q','w','W','y','Y','gW','kW','KW','QW','SS'];//Gisinthislistinthewikimediatransliterator.
if(z.indexOf(consonant)==-1){
return (sadis(consonant)+2);
}
switch(consonant){
case 'g':return 0x1313;
case 'h':
case 'hh':return 0x128b;
case 'k':return 0x12b3;
case 'K':return 0x12c3;
case 'q':return 0x124b;
case 'Q':return 0x125b;
case 'w':
case 'W':
case 'y':
case 'Y':
case 'gW':
//case 'G':Wikimediatransliteratordoesnotimplementz_rabee('G').Ihaveyettofindout.
case 'kW':
case 'KW':
case 'QW':
case 'SS':return null;
}
}
return null;
}
function codeToKey(code,shift,caps){
switch(code){
case 'KeyQ':
if((!shift&&caps)||(shift&&!caps))return 'Q';
return 'q';
case 'KeyW':
if((!shift&&caps)||(shift&&!caps))return 'W';
return 'w';
case 'KeyE':
if((!shift&&caps)||(shift&&!caps))return 'E';
return 'e';
case 'KeyR':
if((!shift&&caps)||(shift&&!caps))return 'R';
return 'r';
case 'KeyT':
if((!shift&&caps)||(shift&&!caps))return 'T';
return 't';
case 'KeyY':
if((!shift&&caps)||(shift&&!caps))return 'Y';
return 'y';
case 'KeyU':
if((!shift&&caps)||(shift&&!caps))return 'U';
return 'u';
case 'KeyI':
if((!shift&&caps)||(shift&&!caps))return 'I';
return 'i';
case 'KeyO':
if((!shift&&caps)||(shift&&!caps))return 'O';
return 'o';
case 'KeyP':
if((!shift&&caps)||(shift&&!caps))return 'P';
return 'p';
case 'KeyA':
if((!shift&&caps)||(shift&&!caps))return 'A';
return 'a';
case 'KeyS':
if((!shift&&caps)||(shift&&!caps))return 'S';
return 's';
case 'KeyD':
if((!shift&&caps)||(shift&&!caps))return 'D';
return 'd';
case 'KeyF':
if((!shift&&caps)||(shift&&!caps))return 'F';
return 'f';
case 'KeyG':
if((!shift&&caps)||(shift&&!caps))return 'G';
return 'g';
case 'KeyH':
if((!shift&&caps)||(shift&&!caps))return 'H';
return 'h';
case 'KeyJ':
if((!shift&&caps)||(shift&&!caps))return 'J';
return 'j';
case 'KeyK':
if((!shift&&caps)||(shift&&!caps))return 'K';
return 'k';
case 'KeyL':
if((!shift&&caps)||(shift&&!caps))return 'L';
return 'l';
case 'KeyZ':
if((!shift&&caps)||(shift&&!caps))return 'Z';
return 'z';
case 'KeyX':
if((!shift&&caps)||(shift&&!caps))return 'X';
return 'x';
case 'KeyC':
if((!shift&&caps)||(shift&&!caps))return 'C';
return 'c';
case 'KeyV':
if((!shift&&caps)||(shift&&!caps))return 'V';
return 'v';
case 'KeyB':
if((!shift&&caps)||(shift&&!caps))return 'B';
return 'b';
case 'KeyN':
if((!shift&&caps)||(shift&&!caps))return 'N';
return 'n';
case 'KeyM':
if((!shift&&caps)||(shift&&!caps))return 'M';
return 'm';
case 'BracketLeft':
if(shift)return '{';
return '[';
case 'BracketRight':
if(shift)return '}';
return ']';
case 'Backquote':
if(shift)return '~';
return '`';
case 'Digit1':
if(shift)return '!';
return '1';
case 'Digit2':
if(shift)return '@';
return '2';
case 'Digit3':
if(shift)return '#';
return '3';
case 'Digit4':
if(shift)return '$';
return '4';
case 'Digit5':
if(shift)return '%';
return '5';
case 'Digit6':
if(shift)return '^';
return '6';
case 'Digit7':
if(shift)return '&';
return '7';
case 'Digit8':
if(shift)return '*';
return '8';
case 'Digit9':
if(shift)return '(';
return '9';
case 'Digit0':
if(shift)return ')';
return '0';
case 'Minus':
if(shift)return '_';
return '-';
case 'Equal':
if(shift)return '+';
return '=';
case 'Backslash':
if(shift)return '|';
return '\\';
case 'Semicolon':
if(shift)return ':';
return ';';
case 'Quote':
if(shift)return '"';
return '\'';
case 'Comma':
if(shift)return '<';
return ',';
case 'Period':
if(shift)return '>';
return '.';
case 'Slash':
if(shift)return '?';
return '/';
case 'Space':return '';
case 'Numpad0':return '0';
case 'NumpadDecimal':return '.';
case 'Numpad1':return '1';
case 'Numpad2':return '2';
case 'Numpad3':return '3';
case 'Numpad4':return '4';
case 'Numpad5':return '5';
case 'Numpad6':return '6';
case 'Numpad7':return '7';
case 'Numpad8':return '8';
case 'Numpad9':return '9';
case 'NumpadDivide':return '/';
case 'NumpadMultiply':return '*';
case 'NumpadSubtract':return '-';
case 'NumpadAdd':return '+';
case 'NumpadEnter':return 'Enter';
case 'AltLeft':return 'Alt';
case 'AltRight':return 'Alt';
case 'ControlLeft':return 'Control';
case 'ControlRight':return 'Control';
case 'ShiftLeft':return 'Shift';
case 'ShiftRight':return 'Shift';
case 'OSLeft':return 'OS';
case 'OSRight':return 'OS';
default:return code;
/**
case 'F1':
case 'F2':
case 'F3':
case 'F4':
case 'F5':
case 'F6':
case 'F7':
case 'F8':
case 'F9':
case 'F10':
case 'F11':
case 'F12':
case 'Tab':
case 'Backspace':
case 'Escape':
case 'Insert':
case 'Home':
case 'Delete':
case 'End':
case 'PageUp':
case 'PageDown':
case 'NumLock':
case 'ArrowLeft':
case 'ArrowUp':
case 'ArrowRight':
case 'ArrowDown':
case 'Enter':
case 'CapsLock':
case 'ContextMenu':return code;
*/
}
}
