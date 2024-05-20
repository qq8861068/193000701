import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Config193000701 from "../const/Config193000701";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AreaItem193000701 extends cc.Component {
    @property
    areaId:string = ''

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onClickArea.bind(this),this);
    }
    /**点击区域 */
    public onClickArea(): void {
        // if (Global193000701.getInstance().state != GameState193000701.bet) return;
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Place_Bet, false, Config193000701.gameBundle);

        let node = this.node.getChildByName('ui_light');
        node.active = true;
    }
}
