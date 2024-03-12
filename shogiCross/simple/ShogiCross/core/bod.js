/** BOD形式のための関数定義など */
export class Bod{
	/** 角度から駒の文字表示
	 * @type {Map<number, string>}
	 */
	static #deg2PieceChars = new Map([
		[0, " "],
		[90, ">"],
		[180, "v"],
		[270, "<"]
	]);

	/** 駒の文字から角度表示
	 * @type {Map<number, string>}
	 */
	static #pieceChar2Degs = new Map(
		[...Bod.#deg2PieceChars]
		.map(([a, b])=>[b, a])
	);

	/** 角度から持駒の表題表示
	 * @type {Map<number, string>}
	 */
	static #deg2StandTitles = new Map([
		[0, "先手の持駒："],
		[90, "次手の持駒："],
		[180, "後手の持駒："],
		[270, "四手の持駒："]
	]);

	/** 持駒の表題から角度表示
	 * @type {Map<number, string>}
	 */
	static #standTitle2Degs = new Map(
		[...Bod.#deg2StandTitles]
		.map(([a, b])=>[b, a])
	);

	/** 行/持駒用の数字表示(漢数字)
	 * @param {number} num - 数字
	 * @param {boolean} viewOne - 一を表示
	 * @returns {string}
	 */
	static #num2Row(num, viewOne=true){
		if(!viewOne && num<=1) return "";
		const kanI = ["","一","二","三","四","五","六","七","八","九"];
		const kanX = ["","十","二十","三十","四十","五十","六十","七十","八十","九十"];
		const i = num%10;
		const x = 0|num/10;
		return kanX[x]+kanI[i];
	}

	/** 列用の数字表示(全角/2桁)
	 * @param {number} num - 数字
	 * @returns {string}
	 */
	static #num2Col(num){
		if(10<=num) return num;
		const zen = "０１２３４５６７８９";
		const i = num%10;
		return zen[i];
	}

	/** マス目の表示
	 * @type {string}
	 */
	static #panelText = " ・";

	/** 駒のBOD表記
	 * @param {Piece} piece - 駒
	 * @returns {string}
	 */
	static #getPieceText(piece){
		if(!piece) return Bod.#panelText;
		return Bod.#deg2PieceChars.get(piece.deg)+piece.char;
	}

	/** 駒台のBOD表記
	 * @param {Stand} stand - 駒台
	 * @param {number} deg - 角度
	 * @returns {string}
	 */
	static #getStandText(stand, deg=0){
		// 駒数カウント
		const counter = new Map();
		stand.stocks.get(deg).forEach(({char})=>{
			if(!counter.has(char)) counter.set(char, 0);
			counter.set(char, counter.get(char)+1);
		});
		return Bod.#deg2StandTitles.get(deg)+
			[...counter].map(([char, cnt])=>
				char+Bod.#num2Row(cnt)
			).join(" ");
	}

	/** BOD形式テキストを取得
	 * @returns {string}
	 */
	static getText(board){
		const {field, xLen, players, stand} = board;

		let header =
			` ${[...Array(xLen).keys()].map(i=>` ${Bod.#num2Col(xLen-i)}`).join("")}\n`+
			`+${Array(xLen).fill("---").join("")}+\n`;
		let footer = `\n+${Array(xLen).fill("---").join("")}+`;
		let panelOuter = "|";
		let panelSep = "";
		let rowSep = "\n";
		let standHeader = `${Bod.#getStandText(stand, 180)}\n`;
		let standFooter = `${Bod.#getStandText(stand, 0)}`;
		if(players !== 2){
			standHeader = `${Bod.#getStandText(stand, 270)}\n`+standHeader;
			standFooter = `${Bod.#getStandText(stand, 90)}\n`+standFooter;
		}
		return (
			standHeader+
			header+
			field.map((row, i)=>
				panelOuter+
				row.map(panel=>
					Bod.#getPieceText(panel.piece)
				).join(panelSep)+
				panelOuter+
				Bod.#num2Row(i+1)
			).join(rowSep)+
			`${footer}\n`+
			standFooter
		);
	}
}