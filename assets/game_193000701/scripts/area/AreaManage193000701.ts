import RoomControl193000701 from "../room/RoomControl193000701";
import { GameEventNames } from "../evnet/GameEventNames";
import Global193000701 from "../common/Global193000701";
import { GameState193000701 } from "../const/Const193000701";
import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Config193000701 from "../const/Config193000701";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AreaManage193000701 extends cc.Component {
    @property({ type: cc.Label, displayName: "总下注" })
    sumBet: cc.Label = null;
    
    @property({ type: cc.Label, displayName: "赢分" })
    ui_winNum: cc.Label = null;
    
    @property({ type: cc.Label, displayName: "余额label" })
    ui_yue: cc.Label = null;

    areas: cc.Node[] = [];
    private maxScore:number = 200000;

    private m_bet :Array<number> = [];
    protected onLoad(): void {
        for (let i = 0; i < this.node.children.length; i++) {
            let node = this.node.children[i];
            node.getChildByName('butt0n_12_dk').getChildByName('selfBetAll').getComponent(cc.Label).string = '0';
            node.getChildByName('clickArea').on(cc.Node.EventType.TOUCH_END,this.onClickArea.bind(this,i),this);
            this.m_bet[i] = 0;
        }
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
    }
    protected onDestroy(): void {
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
    }
    
    private roomStageShow(ent: string, stage: GameState193000701): void {
        if (stage == GameState193000701.bet){
            this.clean();
        }
        this.updateAreaView(stage != GameState193000701.bet);
    }
    
    clean(){
        for (let i = 0; i < this.m_bet.length; i++) {
            this.m_bet[i] = 0;
            let node = this.node.children[i];
            node.getChildByName('butt0n_12_dk').getChildByName('selfBetAll').getComponent(cc.Label).string = '0';
            node.getChildByName('ui_light').active = false;
        }
        this.updateScore();
    }
    
    /**点击区域 */
    public onClickArea(index:number): void {
        if (Global193000701.getInstance().state != GameState193000701.bet) return;
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Place_Bet, false, Config193000701.gameBundle);
        
        this.m_bet[index] += Global193000701.getInstance().clipConfig[Global193000701.getInstance().curChipIndex];

        this.maxScore -= this.m_bet[index];
        for (let i = 0; i < this.node.children.length; i++) {
            let node = this.node.children[i];
            node.getChildByName('butt0n_12_dk').getChildByName('selfBetAll').getComponent(cc.Label).string = this.m_bet[i].toString();
            node.getChildByName('ui_light').active = index == i;
        }
        this.updateScore();
        base.MessageManager.getInstance().dispatchEvent(GameEventNames.mess_areaClick,index+1);
    }

    private updateScore(){
        let score_bet = 0;
        for (let i = 0; i < this.m_bet.length; i++) {
            score_bet += this.m_bet[i];
        }
        this.sumBet.string = score_bet.toFixed(2);
        this.ui_yue.string = this.maxScore.toFixed(2);
    }
    
    updateAreaView(bGRAY: boolean): void {
        for (let i = 0; i < this.node.children.length; i++) {
            this.GrayAllChild(this.node.children[i].getChildByName('clickArea'), bGRAY);
        }
    }
    /**
    * 置灰节点以及子节点
    * @param node 
    * @param type 
    */
    public GrayAllChild(node: cc.Node, bGRAY: boolean) {
        if (!node) return;
        for (let i = 0; i < node.children.length; i++) {
            let childNode = node.children[i];
            if (childNode.getComponent(cc.Button)) {
                childNode.getComponent(cc.Button).interactable = !bGRAY;
            }
        }
    }
}