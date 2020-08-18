module.exports = function(ctx, text, opts) {
	// Default options
	if(!opts)
		opts = {};
	if (!opts.font)
		opts.font = 'sans-serif';
	if (typeof opts.stroke == 'undefined')
		opts.stroke = false;
	if (typeof opts.verbose == 'undefined')
		opts.verbose = false;
	if (!opts.rect)
		opts.rect = {
			x: 0,
			y: 0,
			width: ctx.canvas.width,
			height: ctx.canvas.height,
		}
	if (!opts.lineHeight)
		opts.lineHeight = 1.1;
	if (!opts.minFontSize)
		opts.minFontSize = 10;
	if (!opts.maxFontSize)
		opts.maxFontSize = 100;
	// Default log function is console.log - Note: if verbose il false, nothing will be logged anyway
	if (!opts.logFunction)
		opts.logFunction = function(message) { console.log(message); }


	const words = text.split(' ');

	if (opts.verbose) opts.logFunction('Text contains ' + words.length + ' words')
	let lines = [];
  let fontSize = opts.minFontSize

	// Finds max font size which can be used to print whole text in opts.rec
	for (fontSize; fontSize <= opts.maxFontSize; fontSize++) {

		// Line height
		var lineHeight = fontSize * opts.lineHeight;

		// Set font for testing with measureText()
		ctx.font = ' ' + fontSize + 'px ' + opts.font;

		// Start
		let x = opts.rect.x;
		let y = opts.rect.y + fontSize; // It's the bottom line of the letters
		lines = [];
		let line = '';

		// Cycles on words
		for (var word of words) {
			const breaklineWords = word.split('\n');

			for(let i = 0; i < breaklineWords.length; i++){
				let word = breaklineWords[i];
				if(i > 0){//If there's a brealine
					lines.push({ text: line, x: x, y: y })
					line = word + ' ';
					y += lineHeight;
				}else{
					// If added word exceeds rect width...
					if (ctx.measureText(line + word + ' ').width > (opts.rect.width)) {
						// ..."prints" (save) the line without last word
						lines.push({ text: line, x: x, y: y });
						// New line with ctx last word
						line = word + ' ';
						y += lineHeight;
					} else {
						// ...continues appending words
						line += word + ' ';
					}
				}
			}
		}

		// "Print" (save) last line
		lines.push({ text: line, x: x, y: y });

		// If bottom of rect is reached then breaks "fontSize" cycle
		if (y > opts.rect.height)
			break;

	}

	if (opts.resizeCanvasToFitMinFontSize) {
		ctx.canvas.height = (lines.length-1)*(fontSize) * opts.lineHeight + fontSize
		ctx.font = ' ' + fontSize + 'px ' + opts.font
	}

	if (opts.verbose) opts.logFunction('Font used: ' + ctx.font)

	// Print lines
	for (let line of lines)
		// Fill or stroke
		if (opts.stroke)
			ctx.strokeText(line.text.trim(), line.x, line.y)
		else
			ctx.fillText(line.text.trim(), line.x, line.y)

	// Returns font size
	return fontSize

}