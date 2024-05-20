import { GameEventNames } from "../evnet/GameEventNames";
import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Config193000701 from "../const/Config193000701";
import ChipItem193000701 from "./ChipItem193000701";
import Global193000701 from "../common/Global193000701";
import { GameState193000701 } from "../const/Const193000701";
const { ccclass, property } = cc._decorator;

@ccclass
export class ChipsManager193000701 extends cc.Component {
    public chipList: ChipItem193000701[] = [];

    protected onLoad(): void {
        this.node.children.forEach((e,i)=>{
            e.on(cc.Node.EventType.TOUCH_END,this.onClickChip.bind(this,i),this);
            // this.chipList.push(e.getComponent(ChipItem193000701));
            e.getChildByName('chipIcon').getChildByName('num').getComponent(cc.Label).string = Global193000701.getInstance().clipConfig[i].toString();
            e.getChildByName('light').active = i == Global193000701.getInstance().curChipIndex;
        })
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
    }
    protected onDestroy(): void {
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
    }
    private roomStageShow(ent: string, stage: GameState193000701): void {
        if (stage == GameState193000701.bet){

        }
    }
    
    /**
     * 筹码点击
     */
    onClickChip(index: number, ent?: any){
        if (Global193000701.getInstance().state != GameState193000701.bet) return;
            
        Global193000701.getInstance().curChipIndex = index;
        this.node.children.forEach((e,i)=>{
            e.getChildByName('light').active = i == index;
        })
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Switch_Chips, false, Config193000701.gameBundle);
    };
}


