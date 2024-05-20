import Global193000701 from "../common/Global193000701";
import { GameState193000701 } from "../const/Const193000701";
import { GameEventNames } from "../evnet/GameEventNames";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("193000701/PopUI193000701")
export default class PopUI193000701 extends cc.Component { 
    
    @property({ type: cc.Node, displayName: "未下注提示节点" })
    betTipNode: cc.Node = null;
    
    @property({ type: cc.Node})
    private ui_gx: cc.Node = null;
    @property({ type: cc.Node})
    private ui_gload: cc.Node = null;
    
    @property({ type: cc.Node, displayName: "赢分特效节点" })
    winEffectNode: cc.Node = null;

    @property({ type: cc.Label, displayName: "赢分数" })
    winNum: cc.Label = null;

    private _winMoney = 0;
    set winMoney(value: number) {
        this._winMoney = value;
        // this.winNum.string = arcade.ArcadeNodeUtil.realFormatNumber(this._winMoney);
        this.winNum.string = this._winMoney.toFixed(2);
    }

    get winMoney(): number {
        return this._winMoney;
    }

    onLoad(): void {
        super.onLoad && super.onLoad();
        // this.resize();

        this.node.active = false;
        this.betTipNode.active = false;
        this.winEffectNode.active = false;

        this.addEventListener();
    }

    onDestroy(): void {
        super.onDestroy && super.onDestroy();

        this.removeEventListener();
    }

    private addEventListener() { 
        base.MessageManager.getInstance().addEventListener(GameEventNames.EVENT_ROOM_NO_BET, this.onShowWinResult, this);
    }

    private removeEventListener() { 
        base.MessageManager.getInstance().removeEventListener(GameEventNames.EVENT_ROOM_NO_BET, this.onShowWinResult, this);
    }

    
    private onEventRoomNoBet(ent: string) { 
        this.node.active = true;
        this.betTipNode.active = true;
        this.scheduleOnce(() => {
            this.node.active = false;
            this.betTipNode.active = false;
        }, 1);
    }
    
    public onShowWinResult(event:string,nWin: number) { 
        this.node.active = true;
        this.winEffectNode.active = true;

        this.ui_gx.angle = 0
        cc.tween(this.ui_gx).to(3,{angle:360}).call(()=>{
            this.ui_gx.angle = 0;
        }).union().repeatForever().start();

        this.winMoney = 0;
        //@ts-ignore
        this.numTween = cc.tween(this).to(2, { winMoney: nWin }).start();

        let ani = this.ui_gload.getComponent(cc.Animation);
        ani.play();

        this.scheduleOnce(() => {
            this.node.active = false;
            this.winEffectNode.active = false;
            Global193000701.getInstance().state = GameState193000701.bet;
        }, 3);
    }
}
