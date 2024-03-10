/** キャンバスの画像を取得する
 * @param {HTMLCanvasElement}} canvas - キャンバス
 * @param {string} fileName - 拡張子を除くファイル名
 * @param {string} ext - 拡張子
 * @returns {Promise<void>}
 */
export function downloadImage(canvas: any, fileName?: string, ext?: string): Promise<void>;
