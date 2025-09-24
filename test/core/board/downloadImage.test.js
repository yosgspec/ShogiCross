import { vi } from "vitest";

vi.doMock("@/core/data.js", () => ({
    canvasFont: {
        // minimal shape used by canvasFontLoader and other modules
        fonts: [["TestFont", 400]],
    },
    boards: {
        "将棋": {
            "players": 2,
            "x": 9,
            "y": 9,
            "z": 1,
            "promZone": 3,
            "field": [
                "香桂銀金玉金銀桂香",
                " 飛 角 ",
                "歩歩歩歩歩歩歩歩歩",
                " ",
                " ",
                " ",
                "歩歩歩歩歩歩歩歩歩",
                " 角 飛 ",
                "香桂銀金玉金銀桂香"
            ]
        }
    },
    panels: {
        " ": { "name": "空白", "text": "　　", "backgroundColor": "#00000000", "borderColor": "#00000000" },
        "香": { "name": "香", "text": "香", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "桂": { "name": "桂", "text": "桂", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "銀": { "name": "銀", "text": "銀", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "金": { "name": "金", "text": "金", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "玉": { "name": "玉", "text": "玉", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "飛": { "name": "飛", "text": "飛", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "角": { "name": "角", "text": "角", "backgroundColor": "#EECC88", "borderColor": "#333333" },
        "歩": { "name": "歩", "text": "歩", "backgroundColor": "#EECC88", "borderColor": "#333333" }
    },
    pieces: {},
    standPieces: [],
    handicaps: {},
    pieceNames: {},
    rules: {},
    ruleNames: [],
    gameInfo: {},
    gameInfos: {},
    variants: {},
}));

// Mock dependencies before they are imported
vi.doMock("@/core/canvasImageLoader.js", () => ({
    canvasImage: {
        importAsync: vi.fn().mockResolvedValue(undefined),
    },
}));
vi.doMock("@/core/canvasFontLoader.js", () => ({
    canvasFont: {
        importAsync: vi.fn().mockResolvedValue(undefined),
        names: "serif",
    },
}));
vi.doMock("@/core/uiControl.js", () => ({
    UIControl: vi.fn().mockImplementation(() => ({
        add: vi.fn(),
        remove: vi.fn(),
        setButtonFont: vi.fn(),
        setRecordFont: vi.fn(),
    })),
}));
vi.doMock("@/core/dialog.js", () => ({
    Dialog: vi.fn().mockImplementation(() => ({
        show: vi.fn(),
        close: vi.fn(),
        setFont: vi.fn(),
    })),
}));
vi.doMock("@/core/mouseControl.js", () => ({
    mouseControl: vi.fn().mockImplementation(() => ({
        resetSelect: vi.fn(),
        removeEvent: vi.fn(),
    })),
}));
vi.doMock("@/core/overlay.js", () => ({
    Overlay: vi.fn().mockImplementation(() => ({
        start: vi.fn(),
        stop: vi.fn(),
        updatePosition: vi.fn(),
    })),
}));

// Now import the modules
const { Board } = await import("@/core/board.js");
const download = await import("@/core/download.js");


describe("Board.downloadImage", () => {
	let board;
	let canvas;
    let downloadImageSpy;

	beforeEach(async () => {
        downloadImageSpy = vi.spyOn(download, 'downloadImage').mockImplementation(() => Promise.resolve());
		document.body.innerHTML = '<canvas id="test-canvas"></canvas>';
		canvas = document.getElementById("test-canvas");

		// getContextのモックを追加
		const mockContext = {
			clearRect: vi.fn(),
			fillRect: vi.fn(),
			strokeRect: vi.fn(),
			beginPath: vi.fn(),
			moveTo: vi.fn(),
			lineTo: vi.fn(),
			closePath: vi.fn(),
			stroke: vi.fn(),
			save: vi.fn(),
			translate: vi.fn(),
			rotate: vi.fn(),
			fillText: vi.fn(),
			restore: vi.fn(),
			measureText: vi.fn(() => ({ width: 0 })),
			drawImage: vi.fn(),
		};
		canvas.getContext = vi.fn(() => mockContext);

		board = new Board(canvas, {
			isHeadless: false,
			name: "test-board",
            playBoard: "将棋",
            gameName: "将棋",
            pieceSet: "不成",
			useUIControl: false,
			autoDrawing: false,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
        vi.clearAllMocks();
	});

	test("should call downloadImage with default arguments", async () => {
		await board.downloadImage();
		expect(downloadImageSpy).toHaveBeenCalledWith(
			canvas,
			"test-board",
			undefined,
			undefined
		);
	});

	test("should call downloadImage with specified arguments", async () => {
		await board.downloadImage("my-board", "jpg", "blob");
		expect(downloadImageSpy).toHaveBeenCalledWith(
			canvas,
			"my-board",
			"jpg",
			"blob"
		);
	});

    test("should call downloadImage with board name", async () => {
        board.name = "my-board-2";
		await board.downloadImage(undefined, "gif", "base64");
		expect(downloadImageSpy).toHaveBeenCalledWith(
			canvas,
			"my-board-2",
			"gif",
			"base64"
		);
	});
});
