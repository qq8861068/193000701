export default class Const193000701 {
    public static mess_updateWayListInfo = "mess_updateWayListInfo";

    // public static soundPre = "sounds/" + game.ComUtils.getCurLanguage() + "/";
    public static soundPre = base.LanguageManager.getInstance().getCurLang() == "zh" ? "sounds/zh/" : "sounds/en/";
    public static langKeyPrefix = '193000701_';                // 多语言key值前缀字符串（如使用其它游戏配置，则为 otherGameID_，自己的则为 selfGameID_）
}


/** 结算消息 */
export enum GameState193000701{
    /** 等待阶段 */
    wait,
    /** 准备阶段 */
    ready,
    /** 下注阶段 */
    bet,
    /** 开奖阶段 */
    spread_cards,
    /** 结算阶段 */
    result
}