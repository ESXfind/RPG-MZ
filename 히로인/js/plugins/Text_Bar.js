/*:
 * @target MZ
 * @plugindesc 텍스트 바 배경을 커스텀 이미지로 변경합니다.
 * @author Friends (modified by Gemini Code Assist)
 *
 * @help Text_Bar.js
 *
 * 이 플러그인은 메시지 윈도우의 배경을 사용자가 지정한 이미지로 변경합니다.
 *
 * [사용 방법]
 * 1. 이 파일을 `프로젝트폴더/js/plugins/` 안에 저장합니다.
 * 2. RPG Maker MZ 에디터의 '도구' -> '플러그인 관리자'를 엽니다.
 * 3. Text_Bar 플러그인을 목록에 추가하고 'ON'으로 설정합니다.
 * 4. 플러그인 파라미터에서 '텍스트 배경 이미지'를 설정합니다.
 *    사용할 이미지 파일은 `프로젝트폴더/img/pictures/` 폴더 안에 있어야 합니다.
 * 5. 게임을 테스트하여 변경된 배경을 확인합니다.
 * 
 * 원본 소스 : rmmz_windows.js 의 Window_Message
 * 
 * @param textBarImage
 * @text 텍스트 배경 이미지
 * @desc 메시지 윈도우의 배경으로 사용할 이미지 파일을 선택합니다.
 * @type file 
 * @dir img/pictures/text_bar/
 * @default
 */

(() => {
    const pluginName = "Text_Bar";
    const parameters = PluginManager.parameters(pluginName);
    const textBarImageFile = parameters["textBarImage"] || "";

    // Window_Message의 초기화 함수를 확장(alias)합니다.
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        _Window_Message_initialize.call(this, rect);
        this.createCustomBackground();
    };

    Window_Message.prototype.createCustomBackground = function() {
        // 플러그인 파라미터에 이미지가 설정되어 있을 경우에만 실행
        if (textBarImageFile) {
            // 기존 윈도우 배경을 투명하게 만듭니다. (type 2)
            // 0: 일반, 1: 배경 흐리게, 2: 투명
            this.setBackgroundType(2);

            // 커스텀 배경으로 사용할 스프라이트를 생성합니다.
            this._customBackgroundSprite = new Sprite();
            this._customBackgroundSprite.bitmap = ImageManager.load_Text_bar(text_bar);
            
            // 윈도우의 가장 뒤에 커스텀 배경을 추가합니다.
            // 이렇게 해야 텍스트보다 뒤에 표시됩니다.
            this.addChildToBack(this._customBackgroundSprite);
        }
    };
})();


ImageManager.load_Text_bar = function(filename) {
    return this.loadBitmap("img/pictures/text_bar/", filename);
};