/*
 * Describe: 
 * File: Main193000701.ts
 * Created Date: Sunday, July 9th 2023, 6:45:23 pm
 * Author: coyeking (coyeking385@gmail.com)
 * -----
 * QQ: 2903475819
 * github: https://github.com/coyeking
 * gitee: https://gitee.com/coyeking
 * Copyright (c) 2023 https://www.xiaowo6.cn
 * ----------	---	---------------------------------------------------------
 */

import { BUNDLENAME193000701, UICF193000701, UIID193000701 } from "./const/UIConfig193000701";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main193000701 extends base.MainViewModel {
    protected onLoad(): void {
        super.onLoad();
        var _this = this;
        // base.GUI.getInstance().popup.active = true;
        // 安装GUI
        base.GUI.getInstance().addUIConf(UICF193000701,BUNDLENAME193000701);
        
        // let handler = base.Handler.create(this,()=>{
            
        // });
        base.GUI.getInstance().openAsync(UIID193000701.room,BUNDLENAME193000701).then(()=>{
            _this.node.destroy();
        });
    }

    protected start(): void {
    }
}
