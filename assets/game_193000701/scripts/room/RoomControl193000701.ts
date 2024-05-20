import { GameEventNames } from "../evnet/GameEventNames";
import { SOUNDS_NAME } from "../common/CommonEnum193000701";
import Config193000701 from "../const/Config193000701";
import AreaManage193000701 from "../area/AreaManage193000701";
import PopUI193000701 from "./PopUI193000701";
import TurnplateControl193000701 from "./TurnplateControl193000701";
import { GameState193000701 } from "../const/Const193000701";

const { ccclass, property, menu } = cc._decorator;``
@ccclass
@menu("193000701/RoomControl193000701")
export default class RoomControl193000701 extends base.BaseView {
    @property({ type: cc.Node, displayName: "投注节点" })
    areaNode: cc.Node = null;

    @property({ type: cc.Node, displayName: "旋转转盘" })
    turnplateNode: cc.Node = null;

    @property({ type: cc.Node, displayName: "弹窗节点" })
    popUINode: cc.Node = null;

    public areaBetList: any = [];

    private bAutoGameState: boolean = false;

    public static _instance: RoomControl193000701;
    static get instance(): RoomControl193000701{
        return this._instance;
    }

    onLoad(): void {
        super.onLoad && super.onLoad();
        RoomControl193000701._instance = this;


        this.initTableView();
    }

    onDestroy(): void {
        super.onDestroy && super.onDestroy();
    }

    /** 初始化桌面信息 */
    private initTableView() { 
    }

        /**
     * 切换到横屏
     */
    layoutLandscape(): void {
        super.layoutLandscape && super.layoutLandscape();
        this.resizeHandle();
    }

    /**
    * 切换到竖屏
    */
    layoutPortrait(): void {
        super.layoutPortrait && super.layoutPortrait();
        this.resizeHandle();
    }

    private resizeHandle(): void {
        if (!this.node || !cc.isValid(this.node)) {
            return;
        }
        //返回true 就是横屏 ，返回 false 是竖屏
        // let checkhor = game.ComUtils.checkHorOrVec();
        // if (checkhor) {
        //     this.areaNode.children[0].getComponent(AreaManage193000701).updateArea();
        // } else {
        //     this.areaNode.children[1].getComponent(AreaManage193000701).updateArea();
        // }

        base.MessageManager.getInstance().dispatchEvent(GameEventNames.TOTLA_BET_INFO, this.areaBetList);

    }

    addEventListener() {
        super.addEventListener();
        // base.MessageManager.getInstance().addEventListener(QyxzConst.mess_netgetRoomInfoResp, this.onNetgetRoomInfoResp, this);
        base.MessageManager.getInstance().addEventListener(GameEventNames.mess_roomStageChange, this.onNetSyncRoomStagePush, this);
        // base.MessageManager.getInstance().addEventListener(QyxzConst.mess_netspreadCardsPush, this.onNetspreadCardsPush, this);
        // base.MessageManager.getInstance().addEventListener(QyxzConst.mess_netsettleAccountsPush, this.onNetsettleAccountsPush, this);
        // base.MessageManager.getInstance().addEventListener(QyxzConst.mess_simulateBetResp, this.onSimulateBetResp, this);
        base.MessageManager.getInstance().addEventListener(GameEventNames.SET_AUTO_GAME_STATE, this.onSetAutoGameState, this);
        
    }

    removeEventListener() {
        super.removeEventListener();
        // base.MessageManager.getInstance().removeEventListener(QyxzConst.mess_netgetRoomInfoResp, this.onNetgetRoomInfoResp, this);
        base.MessageManager.getInstance().removeEventListener(GameEventNames.mess_roomStageChange, this.onNetSyncRoomStagePush, this);
        // base.MessageManager.getInstance().removeEventListener(QyxzConst.mess_netspreadCardsPush, this.onNetspreadCardsPush, this);
        // base.MessageManager.getInstance().removeEventListener(QyxzConst.mess_netsettleAccountsPush, this.onNetsettleAccountsPush, this);
        // base.MessageManager.getInstance().removeEventListener(QyxzConst.mess_simulateBetResp, this.onSimulateBetResp, this);
        base.MessageManager.getInstance().removeEventListener(GameEventNames.SET_AUTO_GAME_STATE, this.onSetAutoGameState, this);
        
    }
    
    
    /** 推送房间内信息 */
    private onNetSyncRoomStagePush(ent: string, _state: GameState193000701): void {
        switch (_state) {
            case GameState193000701.ready:
                console.log('121 推送 准备状态 ');
                if (!this.bAutoGameState) {
                    base.MessageManager.getInstance().dispatchEvent(GameEventNames.GREY_ALL_NODE, false);
                }
                break;
            case GameState193000701.bet:
                console.log('121 推送 下注状态 ');

                break;
            case GameState193000701.spread_cards: //翻牌阶段
                console.log('121 推送 翻牌阶段 ');
                base.MessageManager.getInstance().dispatchEvent(GameEventNames.GREY_ALL_NODE, true);
                break;
            case GameState193000701.result:
                console.log('121 推送 结算状态 ');
                break;
        }
    }

    private onNetspreadCardsPush(ent: string, result: any): void {
        cc.log("onNetspreadCardsPush", result);
        let info = result.info;
        let winAreaID = info.num[0].winArea[0].areaId;
        this.turnplateNode.getComponent(TurnplateControl193000701).turnTheWheel(winAreaID);

    }

    private onNetsettleAccountsPush(ent: string, result: any): void {
        cc.log("onNetsettleAccountsPush", result);
        // let info = arcade.QyxzProto.getInstance().gameInfo;
        let info = result.info;
        cc.log("info", info);
        
        // base.MessageManager.getInstance().dispatchEvent(arcade.QyxzConst.mess_winAreaShine, true);

        let winNum: number = 0;
        let bWin: boolean = false;
        for (let k = 0; k < info.length; k++) {
            let areaInfo = info[k] as protoQyxz.area_settle_info;
            if (areaInfo.isWin) {
                bWin = true;
                winNum = Number(areaInfo.profit) + Number(areaInfo.betScores);
                break;
            }
        }

        if (bWin) {
            game.SoundManager.getInstance().playEffect(SOUNDS_NAME.Win_Points, false, Config193000701.gameBundle);
            this.scheduleOnce(() => {
                game.SoundManager.getInstance().playEffect(SOUNDS_NAME.Win_Pop, false, Config193000701.gameBundle);
                this.popUINode.getComponent(PopUI193000701).onShowWinResult(winNum);
            }, 2);
            if(winNum>0){
                base.MessageManager.getInstance().raiseEvent(GameEventNames.UpdateNumWin, winNum);
            }
        } else { 
            game.SoundManager.getInstance().playEffect(SOUNDS_NAME.No_Points, false, Config193000701.gameBundle);
        }
    }

    private onSimulateBetResp(ent: string, result: protoQyxz.bet_resp): void { 
        return;
        if (arcade.GlobalArcade.isSingleMode) {
            if (!result.info[0]) return;
            let areaId = result.info[0].areaId;
            let existIndex: number; 
            this.areaBetList.forEach((element, n) => {
                if (element.areaId === areaId) {
                    existIndex = n;
                }
            });
            if (existIndex >= 0) {
                this.areaBetList[existIndex] = result.info[0];
            } else { 
                this.areaBetList.push(result.info[0]);
            }

            cc.log("this.areaBetList", this.areaBetList);

            base.MessageManager.getInstance().raiseEvent(GameEventNames.TOTLA_BET_INFO, this.areaBetList);
            if (this.bAutoGameState) {
                arcade.SingleModeSimulateManager.instance.sendRealBetReq();
            }
        }

    }
    
    private onSetAutoGameState(ent: string, bAutoGame: boolean) {
        return;
        let stage = arcade.QyxzProto.getInstance().stage;
        switch (stage) {
            case protoQyxz.msg_room_stage.ready:
                this.bAutoGameState = bAutoGame;
                base.MessageManager.getInstance().raiseEvent(GameEventNames.SET_AUTO_GAME_BTN, this.bAutoGameState);

                break;
            case protoQyxz.msg_room_stage.bet:
                if (this.areaBetList.length == 0) {
                    base.MessageManager.getInstance().raiseEvent(arcade.QyxzConst.EVENT_ROOM_NO_BET);
                } else {
                    this.bAutoGameState = bAutoGame;
                    
                    arcade.SingleModeSimulateManager.instance.sendRealBetReq();
                    base.MessageManager.getInstance().raiseEvent(GameEventNames.SET_AUTO_GAME_BTN, this.bAutoGameState);
                }
                break;
            case protoQyxz.msg_room_stage.spread_cards:
                this.bAutoGameState = bAutoGame;
                base.MessageManager.getInstance().raiseEvent(GameEventNames.SET_AUTO_GAME_BTN, this.bAutoGameState);

                break;
            case protoQyxz.msg_room_stage.result:
                this.bAutoGameState = bAutoGame;
                base.MessageManager.getInstance().raiseEvent(GameEventNames.SET_AUTO_GAME_BTN, this.bAutoGameState);

                break;
        }
    }

    /** -------------------------------------------------------------------------------------------------------------------------------------------- */
    /** 监听回调结束 */
    /** -------------------------------------------------------------------------------------------------------------------------------------------- */

    ATestCall(event) { 

        let target = event.target as cc.Node;
        
    }


    
    test111111111111(){
        
        this.popUINode.getComponent(PopUI193000701).onShowWinResult(90);
    }
}