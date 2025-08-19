/**
 * @typedef {object} OverlayOptions
 * @property {boolean} useDimOverlay - 画面を暗転させるか
 * @property {boolean} showSpinner - スピナーを表示するか
 * @property {number} radius - スピナーの半径
 * @property {number} lineWidth - スピナーの線の太さ
 * @property {string} color - スピナーの色
 * @property {number} speed - スピナーの回転速度
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
    #spinnerElement = null; // HTMLスピナー要素
    #useDimOverlay; // Options
	#showSpinner; // Options

    constructor(canvas, options={}){
        this.canvas = canvas;
        this.#useDimOverlay = options.useDimOverlay ?? true;
		this.#showSpinner = options.showSpinner ?? true;

        this.#createSpinnerElement();
        this.#createDimOverlay();
    }

    /**
     * オーバーレイを開始します。
     */
    start(){
        this.#active = true;
        if(this.#useDimOverlay){
            this.#dimOverlay.style.display = "block";
        }
		if(this.#showSpinner){
			this.#spinnerElement.style.display = "block";
		}
    }

    /**
     * オーバーレイを停止します。
     */
    stop(){
        this.#active = false;
        if(this.#useDimOverlay){
            this.#dimOverlay.style.display = "none";
        }
        this.#spinnerElement.style.display = "none";
    }

    /**
     * HTMLスピナー要素を作成します。
     * @private
     */
    #createSpinnerElement(){
        if(!this.#spinnerElement){
            this.#spinnerElement = document.createElement("div");
            this.#spinnerElement.className = "html-spinner";
            this.#spinnerElement.innerHTML = `<div class="html-spinner-inner"></div>`; // Simplified spinner structure
            document.body.appendChild(this.#spinnerElement); // Append to document.body

            // Inject CSS for the HTML spinner
            if(!document.getElementById("html-spinner-styles")){
                const style = document.createElement("style");
                style.id = "html-spinner-styles";
                style.textContent = `
                    .html-spinner {
                        position: fixed; /* Changed to fixed */
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 10000; /* Highest z-index */
                        display: none; /* Hidden by default */
                    }
                    .html-spinner-inner {
                        width: 50px; /* Adjust size as needed */
                        height: 50px;
                        border: 5px solid rgba(255, 255, 255, 0.3);
                        border-top-color: #FFFFFF;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    /**
     * 暗転用オーバーレイを作成し、表示します。
     * @private
     */
    #createDimOverlay(){
        if(!this.#dimOverlay){
            this.#dimOverlay = document.createElement("div");
            this.#dimOverlay.className = "html-spinner-overlay";
            document.body.appendChild(this.#dimOverlay); // Append to document.body

            // Inject CSS for the overlay
            if(!document.getElementById("html-spinner-overlay-styles")){
                const style = document.createElement("style");
                style.id = "html-spinner-overlay-styles";
                style.textContent = `
                    .html-spinner-overlay {
                        position: fixed; /* Changed to fixed */
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.3); /* Changed opacity to 0.3 */
                        z-index: 9999; /* Above canvas */
                        display: none; /* Hidden by default */
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    /**
     * スピナーとオーバーレイの位置とサイズを更新します。
     */
    updatePosition(){
        const canvasRect = this.canvas.getBoundingClientRect();

        // Update overlay position and size
        this.#dimOverlay.style.top = `${canvasRect.top}px`;
        this.#dimOverlay.style.left = `${canvasRect.left}px`;
        this.#dimOverlay.style.width = `${canvasRect.width}px`;
        this.#dimOverlay.style.height = `${canvasRect.height}px`;

        // Update spinner position (centered on canvas)
        this.#spinnerElement.style.top = `${canvasRect.top + canvasRect.height / 2}px`;
        this.#spinnerElement.style.left = `${canvasRect.left + canvasRect.width / 2}px`;
    }
}
