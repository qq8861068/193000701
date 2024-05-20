/*
 * Describe: 多语言精灵图集
 * File: LanguageSprite193000701.ts
 * ----------	---	---------------------------------------------------------
 */

import { BUNDLENAME193000701 } from "../const/UIConfig193000701";


const { ccclass, property,menu } = cc._decorator;
/** 多语言配置 */

@ccclass
@menu("193000701/LanguageSprite193000701")
export class LanguageSprite193000701 extends base.LanguageSprite {
    onLoad(): void {
        this.setBundle(BUNDLENAME193000701);
        super.onLoad();
    }
}
