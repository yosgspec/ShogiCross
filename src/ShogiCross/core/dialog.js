const defaultStyles = {
	dialog: {
		border: "none",
		borderRadius: "12px",
		boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
		padding: "20px",
		width: "300px",
		display: "none",
	},
	buttonContainer: {
		display: "flex",
		flexFlow: "column",
		justifyContent: "flex-end",
		gap: "10px",
		marginTop: "15px",
	},
	title: {
		display: "none",
	},
	message: {
		textAlign: "center",
	},
	button: {
		padding: "5px 12px",
		borderRadius: "6px",
		border: "1px solid #aaa",
		background: "#f5f5f5",
		cursor: "pointer",
	},
	btnHover: {
		background: "#ddd",
	}
};

export class Dialog{
	#title;
	#message;
	#btnContainer;
	#styles;

	constructor(styles={}){
		this.#styles = {...defaultStyles, ...styles};

		this.dialog = document.createElement("dialog");
		document.body.appendChild(this.dialog);
		Object.assign(this.dialog.style, this.#styles.dialog);

		this.#title = document.createElement("h3");
		this.dialog.appendChild(this.#title);
		Object.assign(this.#title.style, this.#styles.title);

		this.#message = document.createElement("p");
		this.dialog.appendChild(this.#message);
		Object.assign(this.#message.style, this.#styles.message);

		this.#btnContainer = document.createElement("div");
		this.dialog.appendChild(this.#btnContainer);
		Object.assign(this.#btnContainer.style, this.#styles.buttonContainer);
		this.isModal = false;
	}

	#onClick(btn){
		this.dialog.close();
		this.dialog.style.display = "none";
		return btn.value;
	}

	async show(title, message, buttons){
		this.#title.textContent = title;
		this.#message.innerHTML = message.replace(/\r|\n|\r\n/g,"<br>");
		this.#btnContainer.innerHTML = "";
		return new Promise(resolve=>{
			for(const btn of buttons){
				const b = document.createElement("button");
				this.#btnContainer.appendChild(b);
				Object.assign(b.style, this.#styles.button);

				b.textContent = btn.label;
				b.addEventListener("mouseover", ()=>Object.assign(b.style, this.#styles.btnHover));
				b.addEventListener("mouseout", ()=>Object.assign(b.style, this.#styles.button));
				b.addEventListener("click", ()=>resolve(this.#onClick(btn)));
			}
			this.dialog.style.display = "block";
			this.dialog.showModal();
		});
	}

	/**
	 * ダイアログのフォントを設定します。
	 * @param {string} fontFamily - 設定するフォントファミリー名
	 */
	setFontFamily(fontFamily){
		if(this.dialog){
			this.dialog.style.fontFamily = fontFamily;
				// ボタンのフォントも設定
				this.#styles.button.fontFamily = fontFamily;
			}
		}
}
