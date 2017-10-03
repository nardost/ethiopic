/**
 * A finite state machine that detects "aab" (case insensitive).
 */

var state = 0;

function fsm(e) {
	var c = e.code;
	switch(c) {
		case 'KeyA':
			if(state == 0) {
				state = 1;
				break;
			} else if(state == 1) {
				state = 2;
				break;
			} else if(state == 2) {
				break;
			} else {
				break;
			}
		case 'KeyB':
			if(state == 0) {
				break;
			} else if(state == 1) {
				state = 0;
				break;
			} else if(state == 2) {
				alert('"aab" detected!');
				state = 0;
				break;
			} else {
				break;
			}
		default:
			if(state == 0) {
				break;
			} else if(state == 1) {
				state = 0;
				break;
			} else if(state == 2) {
				state = 0;
				break;
			} else {
				break;
			}
	}
	return true;
}