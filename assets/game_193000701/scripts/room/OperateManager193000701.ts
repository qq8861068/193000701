import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import CustomButton193000701 from "../common/CustomButton193000701";
import Global193000701 from "../common/Global193000701";
import Config193000701 from "../const/Config193000701";
import { GameState193000701 } from "../const/Const193000701";
import { BUNDLENAME193000701 } from "../const/UIConfig193000701";
import { GameEventNames } from "../evnet/GameEventNames";
const { ccclass, property } = cc._decorator;

@ccclass
export default class OperateManager193000701 extends cc.Component {
    @property({ type: cc.Node, displayName: "开始" })
    startBtn: cc.Node = null;
    @property({ type: CustomButton193000701, displayName: "自动游戏-开始" })
    autoGameStart: CustomButton193000701 = null;

    @property({ type: CustomButton193000701, displayName: "自动游戏-结束" })
    autoGameStop: CustomButton193000701 = null;

    // @property({ type: CustomButton123000401, displayName: "重置" })
    // resetAreaBet: CustomButton123000401 = null;

    private isFirst: boolean = true;
    onLoad() {
        super.onLoad && super.onLoad();
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);


        // base.MessageManager.getInstance().addEventListener(GameEventNames.SET_AUTO_GAME_BTN, this.onSetAutoGameBtn, this);
        base.MessageManager.getInstance().addEventListener(GameEventNames.GREY_ALL_NODE, this.onGreyAllNode, this);
    }

    onDestroy() {
        super.onDestroy && super.onDestroy();
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
        
        // base.MessageManager.getInstance().removeEventListener(GameEventNames.SET_AUTO_GAME_BTN, this.onSetAutoGameBtn, this);
        base.MessageManager.getInstance().removeEventListener(GameEventNames.GREY_ALL_NODE, this.onGreyAllNode, this);
    }
    
    private roomStageShow(ent: string, stage: GameState193000701): void {
        if (stage == GameState193000701.bet){
        }
        this.startBtn.getComponent(CustomButton193000701).interactable = stage == GameState193000701.bet;
    }

    private onSetAutoGameBtn(ent: string, bAuto: boolean) { 
        if (this.isFirst) {
            // @ts-ignore
            this.isAutoBet = true;
            this.isFirst = false;
        }
        this.setAutoBtnState(bAuto);
    }

    private onGreyAllNode(ent: string, bAuto: boolean) {
        // this.resetAreaBet.getComponent(CustomButton193000701).interactable = !bAuto;
    }

    /** 子项目可重写，设定显示自动或停止的方法 */
    // protected autoBetBtnShow(b: boolean) {
    //     if (this.autoBetBtn) { 
    //         let childIndex =  b ? 1 : 0;//1停止，0自动
    //         this.autoBetBtn.getChildByName("autoSp").active = (childIndex == 0);
    //         this.autoBetBtn.getChildByName("stopSp").active = (childIndex == 1);
    //     }
    // }

    /** 点击开始 */
    private onStartBtnClick() {
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Start_Button,false,BUNDLENAME193000701);
        Global193000701.getInstance().state = GameState193000701.spread_cards;
    }
    

 
    // private onCallGameStart() {
    //     base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Start_Button,false,BUNDLENAME193000701);
    //     this.bAutoGame = true;
    //     base.MessageManager.getInstance().dispatchEvent(GameEventNames.SET_AUTO_GAME_STATE, this.bAutoGame);
    // }

    // private onCallGameStop() { 
    //     game.SoundManager.getInstance().playBtnSound();

    //     this.bAutoGame = false;
    //     base.MessageManager.getInstance().raiseEvent(GameEventNames.SET_AUTO_GAME_STATE, this.bAutoGame);
    // }

    public bAutoGame: boolean = false;
    // private bTouch: boolean = true;

    private setAutoBtnState(bAuto: boolean = false) { 

        this.autoGameStart.node.active = !bAuto;
        this.autoGameStop.node.active = bAuto;
        // this.autoGameStart.interactable = this.bTouch && !this.bAutoGame;
        // this.autoGameStop.interactable = this.bTouch && this.bAutoGame;
    }

    // private onResetBtnCall() { 
    //     base.MessageManager.getInstance().raiseEvent(GameEventNames.RESET_AREA);
    // }

}