/** キャンバスの画像を取得する
 * @param {HTMLCanvasElement}} canvas - Canvas要素
 * @param {string} fileName - 取得するファイル名(拡張子を除く)
 * @param {string} ext - 拡張子
 * @param {"base64"|"blob"} urlType - 生成URLタイプ
 * @returns {Promise<void>}
 */
export function downloadImage(canvas: any, fileName?: string, ext?: string, urlType?: "base64" | "blob"): Promise<void>;
