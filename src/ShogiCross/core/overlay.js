const keyframesStyle = document.createElement("style");
keyframesStyle.textContent = `
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;
document.head.appendChild(keyframesStyle);

const defaultStyles = {
	spinner: {
		position: "fixed", /* Changed to fixed */
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		zIndex: 10000, /* Highest z-index */
		display: "none", /* Hidden by default */
	},
	spinnerInner: {
		width: "50px", /* Adjust size as needed */
		height: "50px",
		border: "5px solid rgba(255, 255, 255, 0.3)",
		borderTopColor: "#FFFFFF",
		borderRadius: "50%",
		animation: "spin 1s linear infinite",
	},
	dimOverlay: {
		position: "fixed", /* Changed to fixed */
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.3)", /* Changed opacity to 0.3 */
		zIndex: 9999, /* Above canvas */
		display: "none", /* Hidden by default */
	}
};

/**
 * @typedef {object} OverlayOptions
 * @prop {boolean} useDimOverlay - 画面を暗転させるか
 * @prop {boolean} showSpinner - スピナーを表示するか
 * @prop {Object} styles - スタイルシート
 * @prop {Object<string, any>}} styles.spinner - スピナー
 * @prop {Object<string, any>}} styles.spinnerInner - スピナーの内部要素
 * @prop {Object<string, any>}} styles.dimOverlay - オーバーレイ
 */

/**
 * オーバーレイを描写・管理するクラス
 */
export class Overlay{
	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {OverlayOptions} options - スピナーのオプション
	 */
	#active = false;
	#dimOverlay = null; // 暗転用オーバーレイ要素
	#spinner = null; // HTMLスピナー要素
	#useDimOverlay;
	#showSpinner;
    #styles;

	constructor(canvas, options={}){
        const {
            useDimOverlay=true,
            showSpinner=true,
            styles,
        } = options;
		this.canvas = canvas;
		this.#useDimOverlay = useDimOverlay;
		this.#showSpinner = showSpinner;
        this.#styles = {
            ...defaultStyles,
            ...styles,
        };
		this.#createSpinnerElement();
		this.#createDimOverlay();
	}

	/**
	 * オーバーレイを開始します。
	 */
	async start(){
		this.#active = true;
		this.updatePosition();
		if(this.#useDimOverlay)
			this.#dimOverlay.style.display = "block";
		if(this.#showSpinner)
			this.#spinner.style.display = "block";
	}

	/**
	 * オーバーレイを停止します。
	 */
	stop(){
		this.#active = false;
		this.#dimOverlay.style.display = "none";
		this.#spinner.style.display = "none";
	}

	/**
	 * HTMLスピナー要素を作成します。
	 * @private
	 */
	#createSpinnerElement(){
		if(this.#spinner) return;

        this.#spinner = document.createElement("div");
        document.body.appendChild(this.#spinner);
        Object.assign(this.#spinner.style, this.#styles.spinner);

        const spinerInner = document.createElement("div");
        this.#spinner.appendChild(spinerInner);
        Object.assign(spinerInner.style, this.#styles.spinnerInner);
	}

	/**
	 * 暗転用オーバーレイを作成し、表示します。
	 * @private
	 */
	#createDimOverlay(){
		if(this.#dimOverlay) return;

        this.#dimOverlay = document.createElement("div");
        document.body.appendChild(this.#dimOverlay);
        Object.assign(this.#dimOverlay.style, this.#styles.dimOverlay);
	}

	/**
	 * スピナーとオーバーレイの位置とサイズを更新します。
	 */
	updatePosition(){
		const canvasRect = this.canvas.getBoundingClientRect();

        Object.assign(this.#dimOverlay.style, {
			top: `${canvasRect.top}px`,
			left: `${canvasRect.left}px`,
			width: `${canvasRect.width}px`,
			height: `${canvasRect.height}px`,
		});
		Object.assign(this.#spinner.style, {
			top: `${canvasRect.top + canvasRect.height / 2}px`,
			left: `${canvasRect.left + canvasRect.width / 2}px`,
		});
	}
}
