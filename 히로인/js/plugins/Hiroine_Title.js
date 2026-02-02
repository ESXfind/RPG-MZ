/*:
 * @target MZ
 * @plugindesc 메인 타이틀 화면 수정
 * @author Friends
 *
 * @help Hiroine_Title
 *
 *  플러그인 Hiroine_Title
 * 버전 1.0
 * 
 * 원본 소스 : rmmz_scenes.js
 * @param backgroundName
 * @text 매인메뉴 편집
 * @type file
 */

function Scene_Title() {
    this.initialize(...arguments);
}

Scene_Title.prototype = Object.create(Scene_Base.prototype);
Scene_Title.prototype.constructor = Scene_Title;

Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    //this.createForeground();
    //this.createWindowLayer();
    //this.createCommandWindow();
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
   // this.adjustBackground();
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Title.prototype.update = function() {
    if (!this.isBusy()) {
        //this.commandWindow.open();
    }
        Scene_Base.prototype.update.call(this);
        //this._commandWindow.open();
        this.title_Animation();
        this.select();
        this.select_option();
};

Scene_Title.prototype.isBusy = function() {
    return (
        //this._commandWindow.isClosing() ||
        Scene_Base.prototype.isBusy.call(this)
    );
};

Scene_Title.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
    if (this._gameTitleSprite) {
        this._gameTitleSprite.bitmap.destroy();
    }
};

Scene_Title.prototype.createBackground = function() {
    this._back_image = new Sprite(
    ImageManager.load_Title("Background_main")
    );
    this._back_Title = new Sprite(
    ImageManager.load_Title("Title_main")
    );
    this._Start_main = new Sprite(
    ImageManager.load_Title("Start_main")
    );
    this._Continue_main = new Sprite(
    ImageManager.load_Title("Continue_main")
    );
    this._Option_main = new Sprite(
        ImageManager.load_Title("Option_main")
    );
    this._End_main = new Sprite(
    ImageManager.load_Title("End_main")
    );    

    // 좌표
    this._back_Title.x = 162;
    this._back_Title.y = 72;

    this._Start_main.x = 532;
    this._Start_main.y = 490;

    this._Continue_main.x = 532;
    this._Continue_main.y = 545;

    this._Option_main.x = 532;
    this._Option_main.y = 600;

    this._End_main.x = 532;
    this._End_main.y = 650;

    

    this.addChild(this._back_image);
    this.addChild(this._back_Title);
    this.addChild(this._Start_main);
    this.addChild(this._Continue_main);
    this.addChild(this._Option_main);
    this.addChild(this._End_main);
};

Scene_Title.prototype.playTitleMusic = function() {
    AudioManager.playBgm({name: 'Battle1', pan: 0, pitch: 100, volume: 10});
    AudioManager.stopBgs();
    AudioManager.stopMe();
};

var select_menu = 0;
Scene_Title.prototype.select = function() {
    if (Input.isTriggered("up")){
        AudioManager.playSe({name: 'knock', pan: 0, pitch: 100, volume: 100});
        select_menu--;
        if (select_menu < 0) select_menu = 3; 
    }
    if (Input.isTriggered("down")){
        AudioManager.playSe({name: 'knock', pan: 0, pitch: 100, volume: 100});
        select_menu++;
        if (select_menu > 3) select_menu = 0; 
    }

     
    // 1. 모든 버튼 이미지를 '선택 안 된 상태'로 초기화
    this._Start_main.bitmap = ImageManager.load_Title("Start_main");
    this._Continue_main.bitmap = ImageManager.load_Title("Continue_main");
    this._Option_main.bitmap = ImageManager.load_Title("Option_main");
    this._End_main.bitmap = ImageManager.load_Title("End_main");

    // 2. 현재 선택된 메뉴만 '선택된 상태' 이미지로 변경
    if (select_menu === 0) {
        this._Start_main.bitmap = ImageManager.load_Title("Start_Select_main");
    } else if (select_menu === 1) {
        this._Continue_main.bitmap = ImageManager.load_Title("Continue_Select_main");
    } else if (select_menu === 2) {
        this._Option_main.bitmap = ImageManager.load_Title("Option_Select_main");
    } else if (select_menu === 3) {
        this._End_main.bitmap = ImageManager.load_Title("End_Select_main");
    }
};
Scene_Title.prototype.select_option = function() {

    // 선택된 버튼을 눌렀을 때(OK) 처리
    if (Input.isTriggered("ok")) {
        AudioManager.playSe({name: 'Battle1', pan: 0, pitch: 100, volume: 100});
        if (select_menu === 0) {
            SceneManager.goto(Scene_Map);
        } else if (select_menu === 1) {
            SceneManager.push(Scene_Load);
        } else if (select_menu === 2) {
            SceneManager.push(Scene_Options);
        } else if (select_menu === 3) {
            SceneManager.exit();
        }
    }
};

var a = 0
var b = 0
Scene_Title.prototype.title_Animation = function() {
    if(this._back_Title.opacity == 255){
         a = 1
         b = 0
    }
    if(this._back_Title.opacity == 150){
         a = 0
         b = 1
    }
    this._back_Title.opacity = this._back_Title.opacity - a;
    this._back_Title.opacity = this._back_Title.opacity + b;
};
ImageManager.load_Title = function(filename) {
    return this.loadBitmap("img/pictures/01_Title/", filename);
};
