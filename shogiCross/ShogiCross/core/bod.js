import {Piece} from "./piece.js";

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

	/** 角度から駒の正規表現表示
	 * @type {Map<number, string>}
	 */
	static #deg2PieceRegexes = new Map(
		[...Bod.#deg2PieceChars]
		.map(([a, b])=>[a, new RegExp(b, "g")])
	);

	/** 駒の文字から角度表示
	 * @type {Map<string, number>}
	 */
	static #pieceChar2Degs = new Map(
		[...Bod.#deg2PieceChars]
		.map(([a, b])=>[b, a])
	);

	/** 角度から持駒の表題表示
	 * @type {Map<number, string>}
	 */
	static #deg2StandTitles = new Map([
		[0, "先手の持駒"],
		[90, "次手の持駒"],
		[180, "後手の持駒"],
		[270, "四手の持駒"]
	]);

	/** 持駒の表題から角度表示
	 * @type {Map<string, number>}
	 */
	static #standTitle2Degs = new Map(
		[...Bod.#deg2StandTitles]
		.map(([a, b])=>[b, a])
	);

	static #kanI = ["","一","二","三","四","五","六","七","八","九"];
	static #kanX = ["","十","二十","三十","四十","五十","六十","七十","八十","九十"];

	/** 行/持駒用の数字表示(漢数字)
	 * @param {number} num - 数字
	 * @param {boolean} viewOne - 一を表示
	 * @returns {string}
	 */
	static #num2Kan(num, viewOne=true){
		if(!viewOne && num<=1) return "";
		const i = num%10;
		const x = 0|num/10;
		return Bod.#kanX[x]+Bod.#kanI[i];
	}

	/** 行/持駒用の数字表示(漢数字)
	 * @param {number} num - 数字
	 * @param {boolean} emptyOne - 空文字を1とする
	 * @returns {string}
	 */
	static #kan2Num(kan, emptyOne=true){
		if(emptyOne && kan === "") return 1;
		if(!isNaN(kan)) return 0|kan;
		let x = Bod.#kanX.findIndex(key=>
			key !== "" && (new RegExp("^"+key)).test(kan)
		);
		if(x < 0) x = 0;
		let i = Bod.#kanI.findIndex(key=>
			key !== "" && (new RegExp(key+"$")).test(kan)
		);
		if(i < 0) i = 0;
		return x*10+i;
	}

	/** 列用の数字表示(全角/2桁)
	 * @param {number} num - 数字
	 * @returns {string}
	 */
	static #num2Zen(num){
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
		return Bod.#deg2StandTitles.get(deg)+"："+
			[...counter].map(([char, cnt])=>
				char+Bod.#num2Kan(cnt, false)
			).join(" ");
	}

	/** BOD形式のテキストをボードで扱えるよう変換
	 * @param {string} text - BOD形式のテキスト
	 * @returns {string}
	 */
	static convSetText(text){
		const boardLines = [];
		const standLines = [];
		text.split(/\r|\n|\r\n/).forEach(line=>{
			if([...Bod.#standTitle2Degs.keys()].some(title=>
				new RegExp(`^${title}`).test(line))
			) standLines.push(line);
			else boardLines.push(line.slice(1))
		});

		let boardStr = boardLines.slice(2, -1).join("\n");
		Bod.#deg2PieceRegexes.forEach((bodChar, deg)=>{
			boardStr = boardStr.replace(bodChar, Piece.degChars[deg]);
		})

		const standStr = standLines.flatMap(line=>{
			const [title, paramStr] = line.split(/：/);
			if(paramStr === "") return "";
			const deg = Bod.#standTitle2Degs.get(title);
			const degChar = Piece.degChars[deg];
			const params = paramStr
				.split(/\s/)
				.map(param=>{
					const pieceChar = param[0];
					const kan = param.slice(1);
					return (degChar+pieceChar).repeat(Bod.#kan2Num(kan));
				});
			return params;
		}).join("");

		return `${boardStr}\n${standStr}`;
	}

	/** BOD形式テキストを取得
	 * @returns {string}
	 */
	static getText(board){
		const {field, xLen, players, stand} = board;

		let header =
			` ${[...Array(xLen).keys()].map(i=>` ${Bod.#num2Zen(xLen-i)}`).join("")}\n`+
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
				Bod.#num2Kan(i+1)
			).join(rowSep)+
			footer+"\n"+
			standFooter
		);
	}
}