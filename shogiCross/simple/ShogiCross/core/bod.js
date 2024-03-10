/** BOD形式のための関数定義など */
export class Bod{
	/** 駒の角度表示
	 * @type {Object<string, string>}
	 */
	static pieceDegChars = {
		0: " ",
		180: "v"
	};

	/** マス目の表示
	 * @type {string}
	 */
	static panelText = " ・";

	/** 持駒の角度表示
	 * @type {Object<string, string>}
	 */
	static standDegChars = {
		0: "先手の持駒：",
		180: "後手の持駒："
	};

	/** 行/持駒用の数字表示(漢数字)
	 * @param {number} num - 数字
	 * @param {boolean} viewOne - 一を表示
	 * @returns {string}
	 */
	static num2Row(num, viewOne=true){
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
	static num2Col(num){
		if(10<=num) return num;
		const zen = "０１２３４５６７８９";
		const i = num%10;
		return zen[i];
	}
}