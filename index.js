const moveList = [
    'powerbomb',
    'piledriver',
    'dropkick',
    'leg drop',
    'leglock',
    'faceslam',
    'monkey flip',
    'atomic drop',
    'backbreaker',
    'frankensteiner',
    'elbow drop',
    'suplex',
    'bodyslam',
    'brainbuster',
    'clothesline',
    'chokeslam',
]
walk(document.body);
function walk(node) 
{
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            replaceText(node);
			break;
	}
}


function replaceText(textNode) {
    var v = textNode.nodeValue;
    var singularRegex = /\bslam\b/gi;
    var pluralRegex = /\bslams\b/gi;  
    var pastRegex = /\bslammed\b/gi;

    while ((match = singularRegex.exec(v)) !== null) {
        const newMove = matchCase(match[0], randomMove())
        v = stringSplice(match.input, match.index, match[0].length, newMove)
    }

    while ((match = pluralRegex.exec(v)) !== null) {
        const newMove = matchCase(match[0], randomMove(true))
        v = stringSplice(match.input, match.index, match[0].length, newMove)
    }

    while ((match = pastRegex.exec(v)) !== null) {
        const newMove = matchCase(match[0], randomMove(false, true))
        v = stringSplice(match.input, match.index, match[0].length, newMove)
    }
    
    textNode.nodeValue = v;
}

function stringSplice(string, start, end, replace) {
    return string.slice(0, start) + replace + string.slice(start + end);
}

// Outputs second param with the same casing as the first
function matchCase(text, match) {
    if (text === text.toLowerCase()) {
        return match.toLowerCase()
    } 
    if (text === text.toUpperCase()) {
        return match.toUpperCase()
    }
    if (text === toCapitalized(text)) {
        return toCapitalized(match);
    }
}

// Capitalizes first letter of a string
function toCapitalized(text) {
    const firstLetter = text.slice(0, 1).toUpperCase();
    return firstLetter + text.slice(1)
}

function randomMove(isPlural, isPast) {

    const moveIndex = Math.floor(Math.random()*moveList.length);
    let move = moveList[moveIndex];

    // Oh god why did I start a project involving parsing the english language 🤐
    if (isPlural === true) {
        move += "s";
    } else if (isPast === true) {
        lastLetter = move.substring(move.length - 1);
        if (["m","p"].includes(lastLetter))
        {
            move += lastLetter + "ed";
        } else if (["e"].includes(lastLetter)) {
            move += "d"
        } else {
        move += "ed"
        }
    }
    return move 
}

