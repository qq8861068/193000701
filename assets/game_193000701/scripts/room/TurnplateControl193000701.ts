import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Config193000701 from "../const/Config193000701";
import { AREA_ID } from "../common/CommonEnum193000701";
import { GameEventNames } from "../evnet/GameEventNames";
import { GameState193000701 } from "../const/Const193000701";
import Global193000701 from "../common/Global193000701";
const { ccclass, property, menu } = cc._decorator;

const _count = 52;
const _angleArr = [
    48,2,4,2,6,4,2,20,2,4,2,6,2,4,2,6,2,4,2,36,2,6,2,4,20,2,48,2,4,2,20,2,4,2,6,2,4,2,6,2,4,2,6,2,36,4,2,20,2,4,6,2
];
const _angles = 360/_count;
/**
 * 滚轴适配
 */
@ccclass
@menu("193000701/TurnplateControl193000701")
export default class TurnplateControl193000701 extends cc.Component {  
    @property(cc.Node)
    public ui_item: cc.Node = null;
    @property(cc.SpriteFrame)
    public res_spriteFrame: cc.SpriteFrame[] = [];
    @property(cc.SpriteFrame)
    public res_bg: cc.SpriteFrame[] = [];
    @property(cc.Node)
    public ui_nodeAni: cc.Node = null;

    /** 最终的停止目标角度 */
    private nTargetAngle: number;
    
    /** 转动时间 */
    private nTime: number = 10;

    /** 现在的角度 */
    private curAngle: number = 0;

    /** 正常需要转动的角度 */
    private nRotationNum: number = 0;
    public m_cards: cc.Node[] = [];


    private _nAngle = 0
    private set nAngle(v:number) {
        this._nAngle = v;
        this.node.angle = v;
        this.curAngle = v;
    }

    private get nAngle() {
        return this._nAngle;
    }

    protected onLoad(): void {
        this.nAngle = 0;

        this.ui_item.active = false;
        for (let i = 0; i < _count; i++) {
            let node = cc.instantiate(this.ui_item);
            node.angle = -i * _angles;
            node.active = true;
            this.node.addChild(node);
            this.m_cards.push(node);

            node.getChildByName('label').getComponent(cc.Label).string = _angleArr[i].toString();
            let sp = node.getChildByName('ui_zuang').getComponent(cc.Sprite);
            let ui_bg = node.getChildByName('ui_zhuang').getComponent(cc.Sprite);
            ui_bg.spriteFrame = this.res_bg[0];
            if (_angleArr[i] == 2){
                sp.spriteFrame = this.res_spriteFrame[0];
            }else if (_angleArr[i] == 4){
                sp.spriteFrame = this.res_spriteFrame[1];
            }else if (_angleArr[i] == 6){
                sp.spriteFrame = this.res_spriteFrame[2];
            }else if (_angleArr[i] == 20){
                sp.spriteFrame = this.res_spriteFrame[3];
            }else if (_angleArr[i] == 36){
                sp.spriteFrame = this.res_spriteFrame[4];
            }else if (_angleArr[i] == 48){
                sp.spriteFrame = this.res_spriteFrame[5];
                ui_bg.spriteFrame = this.res_bg[1];
            }
            if (i == 0){
                sp.spriteFrame = this.res_spriteFrame[6];
                ui_bg.spriteFrame = this.res_bg[2];
            }
            
            node.getChildByName('ui_light').active = false;
        }
        
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_areaClick,this.mess_areaClick,this);
        // base.MessageManager.getInstance().addEventListener(GameEventNames.RESET_AREA,this.onResetBtnCall,this);
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);

    }
    protected onDestroy(): void {
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_areaClick,this.mess_areaClick,this);
        // base.MessageManager.getInstance().removeEventListener(GameEventNames.RESET_AREA,this.onResetBtnCall,this);
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_roomStageChange, this.roomStageShow, this);
        
    }
    private roomStageShow(ent: string, stage: GameState193000701): void {
        this.onResetBtnCall();
        if (stage == GameState193000701.bet){

        }else if (stage == GameState193000701.spread_cards){
            let winAreaID = base.MathUtil.getIntRandom(1,7);
            this.turnTheWheel(winAreaID,()=>{
                
                base.MessageManager.getInstance().dispatchEvent(GameEventNames.EVENT_ROOM_NO_BET, winAreaID*13);
            });
        }
    }
    
    onResetBtnCall(){
        this.setCardColor()

    }
    private mess_areaClick(event:string,areaId:number){
        //点击区域，其他置灰
        this.setCardColor(areaId)
    }
    
    private setTargetAngle(nType) { 
        
        let arr = [];
        if (nType == 1){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 2) arr.push(i);
        }else if(nType == 2){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 4) arr.push(i);
        }else if(nType == 3){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 6) arr.push(i);
        }else if(nType == 4){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 20) arr.push(i);
        }else if(nType == 5){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 36) arr.push(i);
        }else if(nType == 6){
            arr.push(0);
        }else if(nType == 7){
            arr.push(26);
        }
        let index = base.MathUtil.getIntRandom(0,arr.length-1);

        // let targetTargetAngleArr = this.m_cards[angle];
        // let nCount = targetTargetAngleArr.length;
        // let nIndex = Math.floor(Math.random() * nCount);
        // this.nTargetAngle = this.m_cards[arr[index]].angle;
        this.nTargetAngle = _angles*arr[index];
    }

    turnTheWheel(nType, endCall?: Function) {
        console.log('开奖id=》',nType);
        base.MessageManager.getInstance().dispatchEvent(GameEventNames.UpdateNumWin, 0);
        this.setCardColor();
        // game.SoundManager.getInstance().playEffect(SOUNDS_NAME.Wheel_Turns, true, Config193000701.gameBundle);
        base.SoundManager.getInstance().playEffect(SOUNDS_NAME.Wheel_Turns, false, Config193000701.gameBundle);

        this.setTargetAngle(nType);

        this.nRotationNum = this.nTargetAngle - 360 * 3;
        // cc.easeCubicActionInOut()
        let ani = this.ui_nodeAni.getComponent(cc.Animation);
        ani.play();
        cc.tween(this.node)
            .to(this.nTime, { angle: this.nRotationNum })
            .call(() => {
                base.SoundManager.getInstance().stopEffect(SOUNDS_NAME.Wheel_Turns);
                this.onStopReset();
                this.setCardColor(nType)
                endCall && endCall();
                endCall = null;
                ani.stop();
                this.ui_nodeAni.angle = 0;
            })
            .start();
    }

    private onStopReset() { 
        this.nAngle = this.nTargetAngle;
    }

    setCardColor(areaId?:number){
        for (let i = 0; i < this.m_cards.length; i++) {
            let ui_light = this.m_cards[i].getChildByName('ui_light');
            let ui_zuang = this.m_cards[i].getChildByName('ui_zuang');
            ui_light.active = false;
            if(areaId){
                ui_zuang.color = new cc.Color(86,86,86,255);
            }else{
                ui_zuang.color = new cc.Color(255,255,255,255);
            }
        }
        if(!areaId) return;
        
        let arr = [];
        if (areaId == 1){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 2) arr.push(i);
        }else if(areaId == 2){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 4) arr.push(i);
        }else if(areaId == 3){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 6) arr.push(i);
        }else if(areaId == 4){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 20) arr.push(i);
        }else if(areaId == 5){
            for (let i = 0; i < _angleArr.length; i++) if(_angleArr[i] == 36) arr.push(i);
        }else if(areaId == 6){
            arr.push(0);
        }else if(areaId == 7){
            arr.push(26);
        }
        for (let i = 0; i < arr.length; i++) {
            let node = this.m_cards[arr[i]];
            let ui_light = node.getChildByName('ui_light');
            let ui_zuang = node.getChildByName('ui_zuang');
            ui_light.active = true;
            ui_zuang.color = new cc.Color(255,255,255,255);
            
        }
    }

}
