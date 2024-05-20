
import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Global193000701 from "../common/Global193000701";
import { MController193000701 } from "../common/MController193000701";
import { GameState193000701 } from "../const/Const193000701";
import { BUNDLENAME193000701, UIID193000701 } from "../const/UIConfig193000701";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Room193000701 extends base.MainViewModel {

    async onLoad() {
        super.onLoad && super.onLoad();
        this.resize();
    }

    onDestroy() {
        super.onDestroy && super.onDestroy();
    }


    protected start(): void {
        Global193000701.getInstance().state = GameState193000701.bet;
        base.SoundManager.getInstance().playMusic(SOUNDS_NAME.Game_Back_Music,true,BUNDLENAME193000701)
    }

    /**
     * 只要有屏幕尺寸改变就会调用 
     */
    layout(): void {
        super.layout && super.layout();
    }

    /**
     * 切换到横屏
     */
    layoutLandscape(): void {
        super.layoutLandscape && super.layoutLandscape();
        this.node.getComponent(MController193000701).stateIndex = 0;
    }

    /**
    * 切换到竖屏
    */
    layoutPortrait(): void {
        super.layoutPortrait && super.layoutPortrait();
        this.node.getComponent(MController193000701).stateIndex = 1;
    }

    onclickGM(){
        base.GUI.getInstance().open(UIID193000701.GM,BUNDLENAME193000701);
    }

}
