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
 *    사용할 이미지 파일은 `프로젝트폴더/img/pictures/text_bar/` 폴더 안에 있어야 합니다.
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





// Window.Message -> Window_Message 수정
// $$gameMessage -> $gameMessage 수정
// 기존 함수를 덮어쓰지 않도록 Alias 패턴 적용
// 기존의 메시지 시작 함수를 별칭으로 저장하고, 새로운 기능을 덧붙입니다.
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    // 기존의 startMessage 함수를 먼저 실행하여 메시지 창이 정상적으로 열리게 합니다.
    _Window_Message_startMessage.call(this);
    // 메시지 창이 열릴 때, 1번 그림으로 'text_bar' 이미지를 화면에 표시합니다.
    // (그림 ID, 파일명, 원점, x, y, 가로비율, 세로비율, 불투명도, 혼합방식)
    $gameScreen.showPicture(1, 'text_bar/text_bar', 0, 0, 540, 100, 100, 255, 0);    
};

// Window_Base -> Window_Message 로 변경하여 다른 윈도우에 영향이 없도록 수정
// this.closing -> this._closing (MZ 내부 변수명)
// 기존의 메시지 닫기 함수를 별칭으로 저장하고, 새로운 기능을 덧붙입니다.
const _Window_Message_close = Window_Message.prototype.close;
Window_Message.prototype.close = function() {
    // 기존의 close 함수를 먼저 실행하여 메시지 창이 정상적으로 닫히기 시작하게 합니다.
    _Window_Message_close.call(this);
    // 닫히는 중(_closing)일 때, 화면에 표시했던 1번 그림을 지웁니다.
    if (this._closing) {
        $gameScreen.erasePicture(1);
    }
};

// Window.Message -> Window_Message 수정
// 기존의 메시지 배경 업데이트 함수를 별칭으로 저장하고, 새로운 기능을 덧붙입니다.
const _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
Window_Message.prototype.updateBackground = function() {
    // 기존의 updateBackground 함수를 먼저 실행합니다.
    _Window_Message_updateBackground.call(this);
    // 메시지 창의 배경 타입을 '투명(2)'으로 설정합니다.
    // 이렇게 해야 showPicture로 보여준 이미지가 윈도우 뒤에 비쳐 보입니다.
    // [참고] setBackgroundType(type)의 종류
    //   - 0: 일반 (기본 윈도우스킨을 사용하는 반투명 배경)
    //   - 1: 흐리게 (테두리 없이 어둡게 처리된 배경)
    //   - 2: 투명 (배경과 테두리를 모두 그리지 않음)
    this.setBackgroundType(2);
};