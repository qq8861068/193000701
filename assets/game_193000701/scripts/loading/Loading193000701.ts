/*
 * Describe: 加载页
 * File: Loading.ts
 * Created Date: Wednesday, May 3rd 2023, 10:52:00 pm
 * Author: coyeking (coyeking385@gmail.com)
 * -----
 * QQ: 2903475819
 * github: https://github.com/coyeking
 * gitee: https://gitee.com/coyeking
 * Copyright (c) 2023 https://www.xiaowo6.cn
 * ----------	---	---------------------------------------------------------
 */

import { BUNDLENAME193000701 } from "../const/UIConfig193000701";


const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Loading193000701 extends base.LoadingModel {
    @property(cc.ProgressBar)
    private ui_progressBar:cc.ProgressBar = null;

    protected onLoad(): void {
        super.onLoad && super.onLoad();
        this.resize();
        this.ui_progressBar.progress = 0;
        this.bundleName = BUNDLENAME193000701;

        this.load();
    }

    /** 加载完成 */
    protected loadCompleteCallBack():void{
        // 加载子游戏main预制
        let mainprefab:cc.Prefab = base.ResLoader.get('prefabs/main',cc.Prefab,this.bundleName);
        if (!mainprefab) return cc.error('prefabs/main.prefab is not find!');

        let node:cc.Node = cc.instantiate(mainprefab);
        cc.find('Canvas').addChild(node);
        this.node.destroy();
    };
    /** 加载进度 */
    protected loadProgress(progress:number){
        this.ui_progressBar.progress = progress;
    };
    
}
 
