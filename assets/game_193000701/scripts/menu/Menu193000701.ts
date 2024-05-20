// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import { BUNDLENAME193000701, UIID193000701 } from "../const/UIConfig193000701";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu193000701 extends cc.Component {
    @property(cc.Node)
    btnList:cc.Node = null;

    protected onLoad(): void {
        this.btnList.active = false;
    }

    private onclickMenu(){
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.EFFECT_DEFAULT_BTN,false,BUNDLENAME193000701);
        this.btnList.active = !this.btnList.active;
    }
    
    private onclicHelp(){
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.EFFECT_DEFAULT_BTN,false,BUNDLENAME193000701);
        this.btnList.active = false;
        base.GUI.getInstance().open(UIID193000701.UI_HELP,BUNDLENAME193000701);
    }
}
