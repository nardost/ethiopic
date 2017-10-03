/**
 * 
 */
var reserved = [0x12b1, 0x12b6, 0x125e, 0x12bf, 0x12d7, 0x1257, 0x12b7, 0x125f, 0x12c1, 0x1316, 0x137d, 0x1249, 0x124e, 0x128e, 0x1311, 0x1317, 0x137e, 0x1259, 0x124f, 0x128f, 0x12c6, 0x135b, 0x137f, 0x12c7, 0x135c, 0x1289, 0x139f, 0x2d97, 0x2d98, 0x2d99, 0x2d9a, 0x2d9b, 0x2d9c, 0x2d9d, 0x2d9e, 0x2d9f, 0x2da7, 0x2daf, 0x2db7, 0x2dbf, 0x2dc7, 0x2dcf, 0x2dd7, 0x2ddf, 0xab00, 0xab08, 0xab10, 0xab18, 0xab19, 0xab1a, 0xab1b, 0xab1c, 0xab1d, 0xab1e, 0xab1f, 0xab07, 0xab0f, 0xab17, 0xab1f, 0xab27, 0xab2f, 0x139a, 0x139b, 0x139c, 0x139d, 0x139e, 0x139f];

function detectRadix(str) {
    re16 = /[0-9A-Fa-f]+/;
    re10 = /[0-9]+/;
    if(str.slice(0, 2) == '0x') {
        if(re16.test(str.slice(2))) {
            return 16;
        }
        return 0;
    }
    if(re10.test(str)) {
        return 10;
    }
    return 0;
}
function showChar() {
	str = document.forms['f']['c'].value;
    rdx = detectRadix(str);
    if(rdx == 0) {
        document.getElementById('out').innerHTML = '<b>' + str + ': </b>not valid. ' + String.fromCharCode(0x270e);
        return false;
    }
    c = parseInt(str);
    ch = (reserved.indexOf(c) != -1)?String.fromCharCode(0x274f):String.fromCharCode(c);
    document.getElementById('out').innerHTML = '0x' + c.toString(16) + '  ' + String.fromCharCode(0x27ab) + '  ' + ch; 
    return false; /** should return false as there is no any other action for this form except to show the character.*/
}
function writeTable(from, to, cols) {
	document.write('<span class="btn-x" onclick="this.parentElement.style.display=\'none\'">&#x274e;</span>');
	document.write('<table class="fidel-table">');
	if(cols == 16) {
		document.write('<tr><td class="fidel-col-2"></td>');
		for(var i = 0; i < cols; i++) {
			document.write('<td class="fidel-col-2">' + i.toString(16) + '</td>');
		}
		document.write('</tr>');
	}
	for(var i = from; i <= to; i += cols) {
		document.write('<tr><td class="fidel-col-1">U+' + i.toString(16) + ' - U+' + ((i+cols-1).toString(16)) + '</td>'); 
		for(var j = i; j <= i+cols-1; j++) {
	        fidel = (reserved.indexOf(j) != -1)?String.fromCharCode(0x274f):String.fromCharCode(j);
	        document.write('<td class="fidel-col-2">' + fidel + '</td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');
}
function displayTabs(e, tab_content_id, tab_link_class, tab_content_class) {
    // Declare all variables
	var i, tabcontent, tablinks;

    // Get all elements with class name of tab_content_class and hide them
    tabcontent = document.getElementsByClassName(tab_content_class);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class name of tab_link_class and remove the class "active"
    tablinks = document.getElementsByClassName(tab_link_class);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab_content_id).style.display = "block";
    e.currentTarget.className += " active";
}

function clearContent(e, clr, lnk) {
	document.getElementById(clr).value = '';
	document.getElementById(lnk).click();
	document.getElementById(clr).focus();
	return false;
}