/*
 * Describe: 多语言精灵图集
 * File: LanguageLabel193000701.ts
 * ----------	---	---------------------------------------------------------
 */

import { BUNDLENAME193000701 } from "../const/UIConfig193000701";



const { ccclass, property,menu } = cc._decorator;

@ccclass
@menu("193000701/LanguageLabel193000701")
export class LanguageLabel193000701 extends base.LanguageLabel {
    onLoad(): void {
        this.setBundle(BUNDLENAME193000701)
        super.onLoad();
    }
}
