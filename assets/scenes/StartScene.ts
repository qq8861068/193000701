/*
 * Describe: 程序入口
 * File: Main.ts
 * Created Date: Wednesday, May 3rd 2023, 9:50:05 pm
 * Author: coyeking (coyeking385@gmail.com)
 * -----
 * QQ: 2903475819
 * github: https://github.com/coyeking
 * gitee: https://gitee.com/coyeking
 * Copyright (c) 2023 https://www.xiaowo6.cn
 * ----------	---	---------------------------------------------------------
 */

const {ccclass, property} = cc._decorator;
@ccclass
export default class StartScene extends cc.Component {
    /**游戏配置 */
    @property({
        tooltip: "游戏ID"
    })
    gameId: number = 0;

    gamebundle: string = "";
    
    onLoad() {
        this.gamebundle = "game_" + this.gameId;
        //初始化
        this.intoGame();
    }

    /**
     * 进入子游戏配置和子游戏bundle，然后添加子游戏的层
     */
    async intoGame(): Promise<void> {
        base.CommonAdapt.getInstance().init();
        await this.loadGameBundle();
        let config = await this.loadGameBundleConfig();
        await this.addRoot(config);
        // await this.addblurryBg();
        
        await this.loadLanguagePack();
        await this.addGamePrefab();
    }
    
    /**
     * 加载子游戏bundle
     */
    async loadGameBundle(): Promise<any> {
        return base.ResLoader.loadBundle(this.gamebundle);
    }
    /**
     * 加载子游戏配置
     */
    async loadGameBundleConfig(): Promise<cc.JsonAsset> {
        return base.ResLoader.load('configs/GameConfig',cc.JsonAsset,this.gamebundle);
    }
    /**
     * 加载子游戏配置
     */
    async addRoot(config:cc.JsonAsset): Promise<void> {
        return new Promise<void>((resolve, reject)=>{
            let com = this.node.addComponent(base.Root);
            com.init(config);
            resolve();
        })
    }
    
    /**
     * 加载游戏节点
     */
    async addGamePrefab(): Promise<void> {
        return new Promise((resolve, reject) => {
            base.ResLoader.load("prefabs/loading/loading",cc.Prefab,this.gamebundle).then((prefab:cc.Prefab)=>{
                let gameNoe = cc.instantiate(prefab);
                cc.Canvas.instance.node.addChild(gameNoe);
                resolve();
            }).catch(()=>{
                reject();
            })

        });
    }

    /**
     * 加载模糊背景
     */
    async addblurryBg(): Promise<void> {
        return new Promise((resolve, reject) => {
            let blurryUrl = base.Global.getInstance().getGameConfig().blurryUrl;
            if(!blurryUrl || blurryUrl == "") return resolve();
            base.ResLoader.load(blurryUrl,cc.SpriteFrame,this.gamebundle).then((spriteFrame:cc.SpriteFrame)=>{
                base.CommonAdapt.getInstance().setBgFrame(spriteFrame);
                resolve();
            }).catch(()=>{
                reject();
            })

        });
    }
    /** 加载多语言包配置 */
    private loadLanguagePack(): Promise<void> {
        return new Promise((resolve, reject) => {
            base.LanguageManager.getInstance().loadLanguageAssets(base.LanguageManager.getInstance().getCurLang(),this.gamebundle,()=>{
                resolve();
            });
        });
    }
    
}
 
