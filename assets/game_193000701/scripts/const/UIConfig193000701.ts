
export const BUNDLENAME193000701 = 'game_193000701'

//弹窗
export enum UIID193000701 {
    UI_HELP = 1000,
    room,
    GM
}

export const UICF193000701: { [key: number]: base.UIConfig } = {
    [UIID193000701.UI_HELP]: { layer: base.LayerType.PopUp, prefab: "prefabs/help/help", bundle: BUNDLENAME193000701,isDestroy:true,isTouch:false},
    [UIID193000701.room]: { layer: base.LayerType.UI, prefab: "prefabs/room/room", bundle: BUNDLENAME193000701,isDestroy:true,isTouch:true},
    [UIID193000701.GM]: { layer: base.LayerType.PopUp, prefab: "prefabs/gm/gm", bundle: BUNDLENAME193000701,isDestroy:true,isTouch:false},
}