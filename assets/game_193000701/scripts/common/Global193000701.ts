/**
 * 全局变量
 */

import { GameState193000701 } from "../const/Const193000701";
import { GameEventNames } from "../evnet/GameEventNames";

export default class Global193000701 {

    private static _instance: Global193000701 = null;
    private constructor() { }
    public static getInstance() {
        if (!Global193000701._instance) {
            Global193000701._instance = new Global193000701();
        }
        return Global193000701._instance;
    }


    // 重置数据
    public reset() {
    }

    /** 筹码配置 */
    public clipConfig:Array<number> = [1,2,5,10,20,50,100];
    /** 当前筹码 */
    public curChipIndex: number = 0;
    /** 游戏阶段 */
    private _state:GameState193000701 = GameState193000701.wait;
    /** 游戏阶段 */
    public get state(){
        return this._state;
    }
    public set state(value:GameState193000701){
        this._state = value;
        base.MessageManager.getInstance().dispatchEvent(GameEventNames.mess_roomStageChange,this._state);
    }
    /** 游戏模式 */
    public gamePattern: number = 1;
}
