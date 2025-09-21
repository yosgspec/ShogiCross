import {Panel} from "@/core/panel.js";
import {vi} from "vitest";

describe("Panel.draw", ()=>{
    let mockCtx;
    let mockChar;
    let mockCenter;
    let mockMiddle;
    let mockWidth;
    let mockHeight;
    let mockPX;
    let mockPY;
    let mockBorderWidth;
    let panel;

    beforeEach(()=>{
        mockCtx = {
            save: vi.fn(),
            restore: vi.fn(),
            translate: vi.fn(),
            drawImage: vi.fn(),
            fillRect: vi.fn(),
            strokeRect: vi.fn(),
            beginPath: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            closePath: vi.fn(),
            stroke: vi.fn(),
            fill: vi.fn(),
            measureText: vi.fn(()=>({ width: 10 })),
            fillText: vi.fn(),
        };
        mockChar = "マス";
        mockCenter = 100;
        mockMiddle = 100;
        mockWidth = 50;
        mockHeight = 50;
        mockPX = 1;
        mockPY = 1;
        mockBorderWidth = 2;
        panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        // 描画関連メソッドをスパイ
        vi.spyOn(panel, "drawImage");
        vi.spyOn(panel, "drawPanel");
        vi.spyOn(panel, "drawMask");
    });

    afterEach(()=>{
        vi.restoreAllMocks();
    });

    test("should return if ctx is null", ()=>{
        const panelWithoutCtx = new Panel(
            null, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        // エラーが発生しないことを確認
        expect(()=>panelWithoutCtx.draw()).not.toThrow();
    });

    test("should call drawImage if imgSrc and canvasImage.imported are true", ()=>{
        panel.imgSrc = "test.png";

        panel.draw();

        expect(panel.drawImage).toHaveBeenCalledTimes(1);
        expect(panel.drawPanel).not.toHaveBeenCalled();
    });

    test("should call drawPanel if imgSrc is not set", ()=>{
        panel.imgSrc = null;

        panel.draw();

        expect(panel.drawPanel).toHaveBeenCalledTimes(1);
        expect(panel.drawImage).not.toHaveBeenCalled();
    });

    test("should call drawMask with selectColor if isSelected is true", ()=>{
        panel.isSelected = true;

        panel.draw();

        expect(panel.drawMask).toHaveBeenCalledWith(panel.selectColor);
    });

    test("should call drawMask with targetColor if isTarget is true", ()=>{
        panel.addTarget("test"); // isTargetをtrueにする

        panel.draw();

        expect(panel.drawMask).toHaveBeenCalledWith(panel.targetColor);
    });

    test("should call piece.drawLastMove if piece exists and its id matches lastMovePieceId", ()=>{
        const mockPiece = { id: 1, drawLastMove: vi.fn(), draw: vi.fn() };
        panel.piece = mockPiece;

        panel.draw(1); // lastMovePieceIdを1に設定

        expect(mockPiece.drawLastMove).toHaveBeenCalledTimes(1);
        expect(mockPiece.draw).toHaveBeenCalledTimes(1);
    });

    test("should call piece.draw if piece exists", ()=>{
        const mockPiece = { id: 2, drawLastMove: vi.fn(), draw: vi.fn() };
        panel.piece = mockPiece;

        panel.draw();

        expect(mockPiece.draw).toHaveBeenCalledTimes(1);
        expect(mockPiece.drawLastMove).not.toHaveBeenCalled();
    });

    test("should not call piece.draw or piece.drawLastMove if piece is null", ()=>{
        panel.piece = null;

        panel.draw();

        // nullのpieceに対してメソッドが呼び出されないことを確認
        // vi.fn()でモックしたメソッドが呼び出されないことを確認する
        // panel.pieceがnullなので、spyOnは使えない
        // このテストは、エラーが発生しないことを確認する意味合いが強い
    });
});
