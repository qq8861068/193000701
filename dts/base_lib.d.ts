declare namespace base {
    /** 框架内部全局事件  */
    export enum EventMessage {
        /** 游戏从后台进入 */
        GAME_ENTER = "EventMessage_GAME_ENTER",
        /** 游戏切到后台 */
        GAME_EXIT = "EventMessage_GAME_EXIT",
        /** 游戏画布尺寸变化事件 */
        GAME_RESIZE = "EventMessage_GAME_RESIZE",
        /** 微信原生一排格子广告加载时报 */
        GAME_NO_ADVERTISEMENT = "GAME_NO_ADVERTISEMENT",
        /** 视频广告播放状态 成功，失败，错误 */
        GAME_AD_VIDEO_STATUS = "GAME_AD_VIDEO_STATUS",
        /** 空格按下事件 */
        GAME_MACRO_KEY_SPACE = "GAME_MACRO_KEY_SPACE",
        /** 隐藏倒计时组件 */
        GAME_mess_clockHide = "GAME_mess_clockHide",
        /** 开始倒计时组件 */
        GAME_mess_clockStart = "GAME_mess_clockStart"
    }
    /** 框架内部全局储存键值  */
    export enum GAMELOCALNAME {
        /** 多语言 */
        GAME_LOCAL_LANGUAGE = "GAME_LOCAL_LANGUAGE",
        /** 手机是否震动 */
        GAME_LOCAL_SHORT = "GAME_LOCAL_SHORT"
    }
    /**
     * 本地储存管理
     */
    export class StorageUtil {
        /**
         * 存储本地数据
         * @param key 存储key
         * @param value 存储值
         * @returns
         */
        static set(key: string, value: any): void;
        /**
         * 获取指定关键字的数据
         * @param key          获取的关键字
         * @param defaultValue 获取的默认值
         * @returns
         */
        static get(key: string, defaultValue?: any): string;
        /** 获取指定关键字的数值 */
        static getNumber(key: string, defaultValue?: number): number;
        /** 设置指定关键字的布尔值 */
        static setBoolean(key: string, value: boolean): void;
        /** 获取指定关键字的布尔值 */
        static getBoolean(key: string, defaultValue?: boolean): boolean;
        /** 获取指定关键字的JSON对象 */
        static getJson(key: string, defaultValue?: any): any;
        /**
         * 删除指定关键字的数据
         * @param key 需要移除的关键字
         * @returns
         */
        static remove(key: string): void;
        /** 清空整个本地存储 */
        static clear(): void;
    }
    /**
     * 全局变量
     */
    export class Global {
        private static _instance;
        /** Global管理单例对象 */
        static getInstance(): Global;
        /** 游戏配置 */
        private _gameConfig;
        /** 是否开启短震动 */
        private _isVibrateShort;
        /** app启动参数 */
        private _launchParams;
        private init;
        /**
         * 设置app启动参数
         * @param data
         */
        setLaunchParams(data: any): void;
        /** 获取app启动参数 */
        getLaunchParams(): any;
        /**
         * 设置主游戏配置
         * @param data
         */
        setGameConfig(data: any): void;
        /** 获取主游戏配置 */
        getGameConfig(): any;
        /**
         * 设置震动
         * @param data
         */
        setVibrateShort(isVibrateShort: boolean): void;
        /** 获取是否震动 */
        getVibrateShort(): boolean;
    }
    /**
     * <p><code>Handler</code> 是事件处理器类。</p>
     * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
     */
    export class Handler {
        /**@private handler对象池*/
        protected static _pool: Handler[];
        /**@private */
        private static _gid;
        /** 执行域(this)。*/
        caller: Object | null;
        /** 处理方法。*/
        method: Function | null;
        /** 参数。*/
        args: any[] | null;
        /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
        once: boolean;
        /**@private */
        protected _id: number;
        /**
         * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
         * @param	caller 执行域。
         * @param	method 处理函数。
         * @param	args 函数参数。
         * @param	once 是否只执行一次。
         */
        constructor(caller?: Object | null, method?: Function | null, args?: any[] | null, once?: boolean);
        /**
         * 设置此对象的指定属性值。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
         * @return  返回 handler 本身。
         */
        setTo(caller: any, method: Function | null, args: any[] | null, once?: boolean): Handler;
        /**
         * 执行处理器。
         */
        run(): any;
        /**
         * 执行处理器，并携带额外数据。
         * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
         */
        runWith(data: any): any;
        /**
         * 清理对象引用。
         */
        clear(): Handler;
        /**
         * 清理并回收到 Handler 对象池内。
         */
        recover(): void;
        /**
         * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
         * @return  返回创建的handler实例。
         */
        static create(caller: any, method: Function | null, args?: any[] | null, once?: boolean): Handler;
    }
    /**
     * 全局事件监听方法
     * @param event      事件名
     * @param args       事件参数
     */
    export type ListenerFunc = (event: string, args: any) => void;
    /**
     * 批量注册、移除全局事件对象
     */
    export class MessageEventData {
        private events;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */
        addEventListener(event: string, listener: ListenerFunc, object: object): void;
        /**
        * 移除全局事件
         * @param event     事件名
         */
        removeEventListener(event: string): void;
        /**
         * 触发全局事件
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */
        dispatchEvent(event: string, arg?: any): void;
        /** 清除所有的全局事件监听 */
        clear(): void;
    }
    /**
     * 全局消息管理
     */
    export class MessageManager {
        private static _instance;
        static getInstance(): MessageManager;
        private events;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */
        addEventListener(event: string, listener: ListenerFunc, object: object): void;
        /**
         * 监听一次事件，事件响应后，该监听自动移除
         * @param event     事件名
         * @param listener  事件触发回调方法
         * @param object    侦听函数绑定的作用域对象
         */
        addOnceEventListener(event: string, listener: ListenerFunc, object: object): void;
        /**
         * 移除全局事件
         * @param event     事件名
         * @param listener  处理事件的侦听器函数
         * @param object    侦听函数绑定的作用域对象
         */
        removeEventListener(event: string, listener: Function, object: object): void;
        /**
         * 触发全局事件
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */
        dispatchEvent(event: string, args?: any): void;
    }
        export class ComUtils {
        /**
         * 检测横竖屏幕 返回true 是横屏，否则是竖屏
         * 返回true 就是横屏 ，返回 false 是竖屏
         */
        static checkHorOrVec(): boolean;
        /**
        * 深度拷贝
        * @param {any} sObj 拷贝的对象或数组
        * @returns
        */
        static clone(sObj: any): any;
        /**
         * 播放骨骼特效
         * @param spine
         * @param name
         * @param loop
         * @param completeHandler
         */
        static playSpineAnimation(spine: sp.Skeleton, name: string, loop: boolean, completeHandler?: Handler): void;
        /**
         * 播放龙骨特效
         * @param dragon
         * @param name
         * @param playTimes 循环次数
            0 为无限循环播放。
            >0 为动画的重复次数。
            默认为1
         * @param rmature armatureName 不填播放默认
         * @param completeHandler
         */
        static playArmatureDisplay(dragon: dragonBones.ArmatureDisplay, name?: string, playTimes?: number, completeHandler?: Handler, rmature?: string): void;
        /** 获取应用启动参数 */
        static getLaunchOptionsSync(): any;
        static urlParse(): {};
        /**
         * 修改当前地址栏参数信息
         * @param key
         * @param value
         * @param isJump 是否跳转
         * @returns [url]string
         */
        static changeURLArg(key: string, value: any, isJump?: boolean): string;
    }
    export class BaseView extends cc.Component {
        /** 是否横屏 */
        protected isLandscape: boolean;
        protected onLoad(): void;
        protected onDestroy(): void;
        /**注册事件 */
        protected addEventListener(): void;
        /**注销事件 */
        protected removeEventListener(): void;
        protected resize(): void;
        private onResize;
        private setLayout;
        /**
         * 只要有屏幕尺寸改变就会调用
         */
        layout(): void;
        /**
         * 切换到横屏
         */
        layoutLandscape(): void;
        /**
        * 切换到竖屏
        */
        layoutPortrait(): void;
    }
            export class PopupModel extends BaseView {
        /** 遮罩节点 */
        protected ui_mask: cc.Node;
        /** 控制节点 */
        protected ui_control: cc.Node;
        protected onLoad(): void;
        /**
         * 关闭页面
         * @param isAct 是否动画
         * @param cb 回调
         */
        protected closeAni(isAct?: boolean, cb?: Handler): void;
        /**
         * 打开页面
         * @param isAct 是否动画 默认true
         * @param cb
         */
        protected openAni(isAct?: boolean, cb?: Handler): void;
        closeNode(): void;
    }
            export class AlertParams {
        /** 文本 */
        content: string;
        /** 是否显示取消按钮，默认true*/
        showCancel: boolean;
        /** 点击确定回调 */
        success: Handler;
        /** 点击取消回调 */
        fail: Handler;
        /**
         * Alert窗口参数
         * @param content 文本
         * @param showCancel 是否显示取消按钮，默认true
         * @param success 点击确定回调
         * @param fail 点击取消回调
         */
        constructor(content: string, showCancel?: boolean, success?: Handler, fail?: Handler);
    }
    export class AlertModel extends PopupModel {
        protected ui_label: cc.Label;
        protected ui_btn_Cancel: cc.Node;
        protected ui_btnConfirm_center: cc.Node;
        protected ui_btnConfirm: cc.Node;
        private m_alertParams;
        private m_isDisabled;
        onOpen(data: any, a: any): void;
        /**
         * 按钮确定事件
         * @param event
         * @param customEventData
         */
        protected onConfirm(event: cc.Event, customEventData: string): void;
        /**
         * 按钮取消事件
         * @param event
         * @param customEventData
         */
        protected onCancel(event: cc.Event, customEventData: string): void;
        protected onClose(): void;
    }
        /**
     * Toast类型
     */
    export enum ToastType {
        /**
         * 默认Toast
         */
        DEFAULT = 0,
        /**
         * 成功Toast
         */
        SUCCESS = 1,
        /**
         * 失败Toast
         */
        FAIL = 2
    }
    /** ToastData参数 */
    export class ToasParams {
        /** 消息 */
        msg: string;
        /** 类型 */
        type: ToastType;
        /**
         * @param msg 消息文本
         * @param type 类型
         */
        constructor(msg: string, type?: ToastType);
    }
    export class ToastModel extends BaseView {
        private item;
        show(data: ToasParams): void;
    }
    /**
     * 设备工具
     */
    export class DeviceUtil {
        /**
         * 返回手机屏幕安全区域，如果不是异形屏将默认返回设计分辨率尺寸。目前只支持安卓、iOS 原生平台和微信小游戏平台。
         */
        static getSafeAreaRect(): cc.Rect;
        /** 当前平台 */
        static readonly platform: number;
        /** 当前操作系统 */
        static readonly os: string;
        /** 是否为安卓手机 */
        static readonly isAndroid: boolean;
        /** 是否为原生环境 */
        static readonly isNative: boolean;
        /** 是否为浏览器环境 */
        static readonly isBrowser: boolean;
        /** 是否为手机 */
        static readonly isMobile: boolean;
        /** 是否为苹果手机 */
        static readonly isIPhone: boolean;
        /** 是否为苹果平板 */
        static readonly isIPad: boolean;
        /** 是否为手机浏览器 */
        static readonly isMobileBrowser: boolean;
        /** 是否为桌面浏览器 */
        static readonly isDesktopBrowser: boolean;
        /** 是否为微信小游戏 */
        static readonly isWeChat: boolean;
        /** 是否为 QQ 小游戏 */
        static readonly isQQPlay: boolean;
        /** 是否为字节小游戏 */
        static readonly isByteDance: boolean;
        /** 是否为百度小游戏 */
        static readonly isBaidu: boolean;
        /** 是否为 vivo 小游戏 */
        static readonly isVivo: boolean;
        /** 是否为 OPPO 小游戏 */
        static readonly isOPPO: boolean;
        /** 是否为小米小游戏 */
        static readonly isXiaomi: boolean;
        /** 是否为华为小游戏 */
        static readonly isHuawei: boolean;
        /** 是否为支付宝小游戏 */
        static readonly isAlipay: boolean;
    }
    /** 视频广告用户观看状态 */
    export enum VideoStatus {
        /** 加载错误 */
        ERROR = 100,
        /** 用户点击取消 */
        CLOSE = 101,
        /** 播放完成 */
        success = 102
    }
    /** 微信api管理 */
    export class WxManager {
        private static _instance;
        /** 微信api管理单例对象 */
        static getInstance(): WxManager;
        private _wxAdConfig;
        private bannerAd;
        private interstitialAd;
        private customMatrixAd;
        private customRowGridAd;
        private customGridAd;
        private videoAd;
        private wxclub;
        init(): void;
        /**
         * 手机震动
         * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
         * type有效值为：heavy、medium、light
         * https://developers.weixin.qq.com/minigame/dev/api/device/vibrate/wx.vibrateShort.html
         */
        vibrateShort(type?: string): void;
        /**
         * 登录接口
         */
        wxLogin(): Promise<any>;
        /**
         * 获取用户数据
         */
        private getUserInfo;
        /**
         * 检测版本更新
         */
        updateManager(): void;
        /**
         * 设置系统剪贴板的内容
         */
        setClipboardData(str: string): void;
        /**
         * 设置排行榜数据
         * @param lv 关卡 key
         */
        setWxCloudRankData(lv: number): void;
        /**
         * 小程序左上角被动分享
         * @param title
         * @param imageUrl
         * @returns
         */
        private initMPShare;
        /**
         * 用户主动分享
         * @param title
         * @param query
         * @param imageUrl
         * @returns
         */
        share(title?: string, query?: string, imageUrl?: string): void;
        /**显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
        showLoading(): void;
        hideLoading(): void;
        /**显示消息提示框 */
        showToast(title: string): void;
        /**
         * 显示模态对话框
         * @param content 正文
         * @param showCancel 是否取消按钮
         * @param success
         * @param fail
         */
        showModal(content: string, showCancel?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void): void;
        /**
         * 微信游戏圈
         * @param bool 是否显示
         * @param data 定制参数
         * @returns
         */
        createGameClubButton(bool: boolean, data?: {
            left?: 10;
            top?: 105;
            width?: 40;
            height?: 40;
        }): void;
        /** 广告初始化 */
        private adInit;
        /** 激励视频广告 start*/
        private createVideoAd;
        showVideoAd(): void;
        /** 插屏广告 end*/
        /**显示原生一个格子广告 start*/
        private createCustomGridAd;
        /**
         * 是否显示原生一个格子广告
         * @param isShow
         * @returns
         */
        showCustomGridAd(isShow?: boolean): void;
        /**显示原生一排格子广告 end*/
        /**显示原生一排格子广告 start*/
        private createCustomRowGridAd;
        /**
         * 是否显示原生一排格子广告
         * @param isShow
         * @returns
         */
        showCustomRowGridAd(isShow?: boolean): void;
        /**显示原生一排格子广告 end*/
        /**显示原生多排格子广告 start*/
        private createCustomMatrixAd;
        /**
         * 是否显示原生多排格子广告
         * @param isShow
         * @returns
         */
        showCustomMatrixAd(isShow?: boolean): void;
        /** 创建banner广告 */
        private createBannerAd;
        /**
         * 显示或隐藏Banner
         * @param isShow
         * @returns
         */
        showBanner(isShow?: boolean): void;
        private createInterstitialAd;
        /**显示插屏广告 */
        showInterstitial(): void;
    }
        /*** 界面回调参数对象定义 */
    export class UICallbacks {
        /**
         * 节点添加到层级以后的回调
         * @param node   当前界面节点
         * @param params 外部传递参数
         */
        onOpen?: (node: cc.Node, params: any) => void;
        /**
         * 窗口节点 destroy 之后回调
         * @param node   当前界面节点
         * @param params 外部传递参数
         */
        onClose?: (node: cc.Node | null, params: any) => void;
    }
    /** 弹框层回调对象定义 */
    export class PopViewParams extends UICallbacks {
        /** 是否触摸背景关闭弹窗 */
        touchClose?: boolean;
        /** 控制暗色背景的透明度 默认为190*/
        opacity?: number;
    }
    /** 本类型仅供gui模块内部使用，请勿在功能逻辑中使用 */
    export class ViewParams {
        /** 界面唯一标识 */
        uuid: string;
        /** 预制路径 */
        prefabPath: string;
        /** 传递给打开界面的参数 */
        params: any;
        /** 窗口事件 */
        callbacks: UICallbacks;
        /** 是否在使用状态 */
        valid: boolean;
        /** 界面根节点 */
        node: cc.Node;
        /** 界面配置  */
        UIConfig: UIConfig;
    }
        /** 窗口事件触发组件 */
    export class DelegateComponent extends cc.Component {
        /** 视图参数 */
        viewParams: ViewParams;
        /** 窗口添加 */
        add(): void;
        /** 删除节点，该方法只能调用一次，将会触发onBeforeRemoved回调 */
        remove(isDestroy: boolean): void;
        /** 窗口组件中触发移除事件与释放窗口对象 */
        private removed;
        onDestroy(): void;
        protected applyComponentsFunction(node: cc.Node, funName: string, params: any): void;
    }
    /**
     * 分包资源管理
     */
    export class ResLoader {
        /**
         * 加载一组资源
         * @param bundleName
         * @param paths
         * @param onProgress
         * @param complete
         * @returns
         */
        static loadArrRes<T extends cc.Asset>(bundleName: string, paths: string[], onProgress?: ((progress: number) => void), onComplete?: () => void): void;
        /**
         * 加载资源
         * @param path
         * @param type
         * @param complete
         * @param bundleName
         * @returns
         */
        static loadRes<T extends cc.Asset>(path: string, type: typeof cc.Asset, complete: Function, bundleName: string): any;
        /**
         * 异步加载本地资源
         * @param path 分包下路径
         * @param type 资源类型
         * @param bundleName 分包名
         * @returns
         */
        static load<T extends cc.Asset>(path: string, type: typeof cc.Asset, bundleName: string): Promise<T>;
        /**
         * 获取资源
         * @param path          资源路径
         * @param type          资源类型
         * @param bundleName    资源包名
         */
        static get<T extends cc.Asset>(path: string, type: typeof cc.Asset | null, bundleName: string): T | null;
        /** 打印缓存中所有资源信息 */
        static dump(): void;
        /**
         * 加载本地分包
         * @param bundleName
          * @returns Promise<cc.AssetManager.Bundle>
         */
        static loadBundle(bundleName: string): Promise<cc.AssetManager.Bundle>;
        /**
         * 移除分包
         * @param bundleName
          * @returns Promise
         */
        static removeBundle(bundleName: string): Promise<void>;
        /**
         * 释放分包资源
         * @param bundleName
          * @returns Promise
         */
        static releaseBundle(bundleName: string): Promise<void>;
        /**
         * 加载微信头像，无后缀网络资源
         * @param url
         */
        static loadRemoteWXImg(url: string): Promise<cc.SpriteFrame>;
    }
                /** 界面层对象 */
    export class LayerUI extends cc.Node {
        /** 界面节点集合 */
        protected ui_nodes: Map<string, ViewParams>;
        /** 被移除的界面缓存数据 */
        protected ui_cache: Map<string, ViewParams>;
        /**
         * UI基础层，允许添加多个预制件节点
         * @param name 该层名
         * @param container 容器Node
         */
        constructor(name: string);
        /** 构造一个唯一标识UUID */
        protected getUuid(prefabPath: string): string;
        /**
         * 添加一个预制件节点到层容器中，该方法将返回一个唯一`uuid`来标识该操作节点
         * @param prefabPath 预制件路径
         * @param params     自定义参数
         * @param callbacks  回调函数对象，可选
         */
        add(config: UIConfig, params?: any, callbacks?: UICallbacks): string;
        /**
         * 加载界面资源
         * @param viewParams 显示参数
         */
        protected load(viewParams: ViewParams): void;
        /**
         * 创建界面节点
         * @param viewParams  视图参数
         */
        protected createNode(viewParams: ViewParams): cc.Node;
        /**
         * 根据预制件路径删除，预制件如在队列中也会被删除，如果该预制件存在多个也会一起删除
         * @param prefabPath   预制路径
         * @param isDestroy    移除后是否释放
         */
        remove(prefabPath: string, isDestroy: boolean): void;
        /**
         * 根据唯一标识删除节点，如果节点还在队列中也会被删除
         * @param uuid  唯一标识
         */
        protected removeByUuid(uuid: string): void;
        /**
         * 删除缓存的界面，当缓存界面被移除舞台时，可通过此方法删除缓存界面
         */
        private removeCache;
        /**
         * 根据唯一标识获取节点，如果节点不存在或者还在队列中，则返回null
         * @param uuid  唯一标识
         */
        getByUuid(uuid: string): cc.Node;
        /**
         * 根据预制件路径获取当前显示的该预制件的所有Node节点数组
         * @param prefabPath
         */
        get(prefabPath: string): Array<cc.Node>;
        /**
         * 判断当前层是否包含 uuid或预制件路径对应的Node节点
         * @param prefabPathOrUUID 预制件路径或者UUID
         */
        has(prefabPathOrUUID: string): boolean;
        /**
         * 获取当前层包含指定正则匹配的Node节点。
         * @param prefabPathReg 匹配预制件路径的正则表达式对象
         */
        find(prefabPathReg: RegExp): cc.Node[];
        /** 获取当前层所有窗口事件触发组件 */
        protected __nodes(): Array<DelegateComponent>;
        /** 层节点数量 */
        size(): number;
        /**
         * 清除所有节点，队列当中的也删除
         * @param isDestroy  移除后是否释放
         */
        clearNodes(isDestroy: boolean): void;
    }
                export class LayerPopUp extends LayerUI {
        protected black: cc.BlockInputEvents;
        constructor(name: string);
        private init;
        /**
         * 添加一个预制件节点到PopUp层容器中，该方法将返回一个唯一uuid来标识该操作节点
         * @param prefabPath 预制件路径
         * @param params     传给组件onAdded、onRemoved方法的参数。
         * @param popParams  弹出界面的设置定义，详情见PopViewParams
         */
        add(config: UIConfig, params: any, popParams?: PopViewParams): string;
        remove(prefabPath: string, isDestroy: boolean): void;
        protected removeByUuid(prefabPath: string): void;
        protected setBlackDisable(): void;
        clearNodes(isDestroy: boolean): void;
    }
                export class LayerDialog extends LayerPopUp {
        /** 窗口数据队列 */
        private queue;
        /** 窗口参数队列 - 预防同一资源的窗口参数覆盖 */
        private queue_params;
        /** 当前窗口数据 */
        private current;
        add(config: UIConfig, params?: any, callbacks?: UICallbacks): string;
        protected setBlackDisable(): void;
        private next;
    }
            export class LayerToast extends LayerUI {
        /**
         * 显示toast
         * @param content 文本表示
         */
        show(config: UIConfig, params?: any): void;
    }
                /** 界面层类型 */
    export enum LayerType {
        /** 游戏层,唯一存在 */
        Game = "LayerGame",
        /** 主界面层 */
        UI = "LayerUI",
        /** 弹窗层 */
        PopUp = "LayerPopUp",
        /** 模式窗口层 */
        Dialog = "LayerDialog",
        /** 滚动消息提示层 */
        Toast = "LayerToast",
        /** 新手引导层 */
        Guide = "LayerGuide",
        /** 加载等待 */
        Waiting = "LayerWaiting"
    }
    /**界面配置 */
    export class UIConfig {
        /** 远程包名 */
        bundle: string;
        /** 窗口层级 */
        layer: LayerType;
        /** 预制资源相对路径 */
        prefab: string;
        /** 移除后是否释放 默认 false*/
        isDestroy?: boolean;
        /**是否拦截按键，默认 false */
        isTouch?: boolean;
    }
    export class GUI {
        static _instance: GUI;
        static getInstance(): GUI;
        /** 界面根节点 */
        root: cc.Node;
        /** 界面摄像机 */
        camera: cc.Camera;
        /** 游戏界面层 */
        game: cc.Node;
        /** 新手引导层 */
        guide: cc.Node;
        /** 界面层 */
        private ui;
        /** 弹窗层 */
        private popup;
        /** 只能弹出一个的弹窗 ,队列弹出 */
        private dialog;
        /** 消息提示控制器，请使用show方法来显示 */
        private toasts;
        /** 消息提示控制器，请使用show方法来显示 */
        private waiting;
        /** UI配置 */
        private m_configs;
        /**
         * 添加所有UI的配置对象
         * @param configs 配置对象
         */
        addUIConf(configs: {
            [key: number]: UIConfig;
        }, bundle: string): void;
        /**
         * 清除所有UI的配置对象
         * @param bundle   bundleName
         */
        removeUIConf(bundle: string): void;
        /**
         * dialog窗口参数
         * @param uiId 窗口唯一编号
         * @param bundle
         * @param uiArgs 窗口参数
         * @param callbacks
         * @example base.GUI.instence open(UIID.Loading, null);
         * @returns void
         */
        showModal(uiId: number, bundle: string, uiArgs: AlertParams, callbacks?: UICallbacks): void;
        /**
         * 显示toast
         * @param uiId 窗口唯一编号
         * @param bundle
         * @param uiArgs 窗口参数
         * @param handlerBack 回调对象
         * @param callbacks
         * @example base.GUI.instence open(UIID.Loading, null, handlerBack);
         * @returns void
         */
        toast(uiId?: number, bundle?: string, uiArgs?: ToasParams): void;
        /**
         * loading
         * @param isShow 是否显示
         * @param uiId 窗口唯一编号
         * @param bundle
         * @param uiArgs 窗口参数
         * @param callbacks
         * @example base.GUI.instence open(UIID.Loading, null, handlerBack);
         * @returns void
         */
        loading(isShow: boolean, uiId?: number, bundle?: string, uiArgs?: any, callbacks?: UICallbacks): void;
        /**
         * 同步打开一个窗口
         * @param uiId 窗口唯一编号
         * @param bundle
         * @param uiArgs 窗口参数
         * @param callbacks
         * @example base.GUI.instence open(UIID.Loading, null, handlerBack);
         * @returns void
         */
        open(uiId: number, bundle: string, uiArgs?: any, callbacks?: UICallbacks): void;
        /**
         * 异步打开一个窗口
         * @param uiId          窗口唯一编号
         * @param uiArgs        窗口参数
         * @example
         * var node = await oops.gui.openAsync(UIID.Loading);
         */
        openAsync(uiId: number, bundle: string, uiArgs?: any): Promise<cc.Node | null>;
        /**
         * 缓存中是否存在指定标识的窗口
         * @param uiId 窗口唯一标识
         * @example
         * oops.gui.has(UIID.Loading);
         */
        has(uiId: number, bundle: string): boolean;
        /**
         * 移除指定标识的窗口
         * @param uiId         窗口唯一标识
         * @param isDestroy    移除后是否释放
         * @example
         * base.GUI.remove(UIID.Loading);
         */
        remove(uiId: number, bundle: string): void;
        /**
         * 删除一个通过this框架添加进来的节点
         * @param tagTs          窗口节点
         * @example
         * base.GUI.close(this);
         */
        close(tagTs: any): void;
        /**
         * 清除所有窗口
         * @param isDestroy 移除后是否释放
         * @example
         * oops.gui.clear();
         */
        clear(isDestroy?: boolean): void;
        /**
         * 设置
         * @param root  界面根节点
         */
        setRoot(root: cc.Node): void;
        private create_node;
    }
    export class NativeMger {
        /**
         * 手机震动
         * @param type 有效值为：heavy、medium、light
         * @returns boolean
         */
        static vibrateShort(type?: string): boolean;
        /**
         * 用户主动分享
         * @param _query url参数
         * @param _title 分享标题
         * @param _imgUrl 分享图片
         * @returns
         */
        static onShare(title?: string, query?: string, imgUrl?: string): void;
        /**
         * 打开外部浏览器
         * @param url
         */
        static openBrowser(url: string): void;
        /**
         * 设置系统剪贴板的内容
         * @param str
         */
        static setClipboardData(str: string): void;
    }
    /**
     * 节点池
     */
    export class PoolNodeMger {
        dictPool: any;
        dictPrefab: any;
        static _instance: PoolNodeMger;
        static readonly instance: PoolNodeMger;
        /**
         * 根据预设从对象池中获取对应节点
         * @param prefab
         * @param parent
         * @returns
         */
        getNode(prefab: cc.Prefab, parent?: cc.Node): cc.Node;
        /**
         * 将对应节点放回对象池中
         * @param node
         * @returns
         */
        putNode(node: cc.Node): void;
        /**
         * 根据名称，清除对应对象池
         * @param name
         */
        clearPool(name: string): void;
    }
    /**
     * 数组工具
     */
    export class ArrayUtil {
        /**
         * 复制二维数组
         * @param array 目标数组
         */
        static copy2DArray(array: any[][]): any[][];
        /**
        * Fisher-Yates Shuffle 随机置乱算法
        * @param array 目标数组
        */
        static fisherYatesShuffle(array: any[]): any[];
        /**
        * 混淆数组
        * @param array 目标数组
        */
        static confound(array: any[]): any[];
        /**
         * 数组扁平化
         * @param array 目标数组
         */
        static flattening(array: any[]): any[];
        /**
        * 合并数组
        * @param array1 目标数组1
        * @param array2 目标数组2
        */
        static combineArrays(array1: any[], array2: any[]): any[];
        /**
        * 获取随机数组成员
        * @param array 目标数组
        */
        static getRandomValueInArray(array: any[]): any;
    }
    /**
     * Base64 工具
     */
    export class Base64Util {
        /**
         * 将普通文本编码为 Base64 格式文本
         * @param string
         * @see
         */
        static encodeString(string: string): string;
        /**
         * 将 Base64 格式文本解码为普通文本
         * @param base64
         */
        static decodeString(base64: string): string;
        /**
         * 将普通文本编码为 UTF-8 格式文本
         * @param string
         */
        static encodeUtf8(string: string): string;
        /**
         * 将为 UTF-8 格式文本解码为普通文本
         * @param utf8
         */
        static decodeUtf8(utf8: string): string;
        /**
         * (仅 Web 平台下可用) 将 Base64 文本转为二进制数据
         * @param base64
         */
        static base64ToBlob(base64: string): Blob;
    }
    /**
     * 浏览器工具
     */
    export class BrowserUtil {
        /**
         * 清除当前 URL 的参数（修改历史记录，不会刷新当前网页）
         */
        static clearUrlParam(): void;
        /**
         * 设置当前 URL 的参数（修改历史记录，不会刷新当前网页）
         * @param param 参数
         */
        static setUrlParam(param: string | {
            key: string;
            value: string;
        }[]): void;
        /**
         * 获取当前 URL 的参数
         * @param key 键
         */
        static getUrlParam(key: string): string;
        /**
         * 获取当前 URL 的所有参数
         */
        static getUrlParams(): {
            key: string;
            value: string;
        }[];
        /**
         * 复制文本至设备剪贴板
         * @param value 文本内容
         */
        static copy(value: string): boolean;
    }
    /**
     * 颜色工具
     */
    export class ColorUtil {
        /**
         * 将 16 进制（hex）颜色字符串转为 RGBA 格式
         * @param {string} hex
         * @example
         * ColorUtil.hexToRgba('#FFFFFF'); // { r: 255, g: 255, b: 255, a: 255 }
         */
        static hexToRgba(hex: string): {
            r: number;
            g: number;
            b: number;
            a: number;
        };
        /**
         * 将 RGB 或 RGBA 颜色值转为 16 进制（hex）颜色字符串
         * @param color
         * @example
         * const color = {
         *   r: 255,
         *   g: 255,
         *   b: 255,
         * };
         * ColorUtil.rgbaToHex(color);  // '#FFFFFF'
         */
        static rgbaToHex(color: {
            r: number;
            g: number;
            b: number;
            a?: number;
        }): string;
        /**
         * 测试字符串是否为 16 进制（hex）颜色值
         * @param hex
         */
        static isHex(hex: string): boolean;
    }
    /**
     * 几何工具（无优化）
     */
    export class GeometryUtil {
        /**
         * 判断点是否在线段上
         * @param p 目标点
         * @param a 线段端点 a
         * @param b 线段端点 b
         */
        static pointOnLine(p: cc.Vec3, a: cc.Vec3, b: cc.Vec3): boolean;
        /**
         * 判断点是否在三角形内（同向法）
         * @param p 目标点
         * @param a 三角形顶点 a
         * @param b 三角形顶点 b
         * @param c 三角形顶点 c
         */
        static pointInTriangle(p: cc.Vec3, a: cc.Vec3, b: cc.Vec3, c: cc.Vec3): boolean;
        /**
         * 获取点到线段的最短距离
         * @param p 目标点
         * @param a 线段端点 a
         * @param b 线段端点 b
         */
        static pointLineDistance(p: cc.Vec3, a: cc.Vec3, b: cc.Vec3): number;
    }
    /**
     * 数学工具
     */
    export class MathUtil {
        /**
         * 获取随机数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns
         */
        static getRandom(min: number, max: number): number;
        /**
        * 获取一个 min 到 max 范围内的随机整数 区间[min,max]
        * @param min 最小值
        * @param max 最大值
        */
        static getIntRandom(min?: number, max?: number): number;
        /**
         * 获取一个伪随机整数
         * @param seed 随机种子
         * @param key key
         */
        static getPseudoRandomInt(seed: number, key: number): number;
        /**
         * 获取两点间的角度
         * @param p1 点1
         * @param p2 点2
         */
        static getAngle(p1: cc.Vec2, p2: cc.Vec2): number;
        /**
         * 获取两点间的距离
         * @param p1 点1
         * @param p2 点2
         */
        static getDistance(p1: cc.Vec2, p2: cc.Vec2): number;
        /**
         * 将角度转为弧度
         * @param angle 角度
         */
        static angleToRadian(angle: number): number;
        /**
         * 浮点数加法运算（避免浮点数加法精度问题）
         * @param a 数
         * @param b 数
         */
        static addSafely(a: number, b: number): number;
    }
    /**
     * 节点工具
     */
    export class NodeUtil {
        /**
         * 获取节点在目标节点（容器）下的相对位置
         * @param node 节点
         * @param container 目标节点（容器）
         */
        static getRelativePosition(node: cc.Node, container: cc.Node): cc.Vec2;
        /**
         * 坐标是否在目标节点范围内
         * @param pos 坐标
         * @param target 目标节点
         */
        static isPosOnNodeRect(pos: cc.Vec2, target: cc.Node): boolean;
        /**
         * 两个节点是否重叠
         * @param node1 节点 1
         * @param node2 节点 2
         * @param contains 是否完全包含
         */
        static areNodesOverlap(node1: cc.Node, node2: cc.Node, contains?: boolean): boolean;
        /**
         * 获取节点本身在世界坐标系下的对齐轴向的包围盒（不包含子节点）
         * @param node 节点
         */
        static getNodeSelfBoundingBoxToWorld(node: cc.Node): cc.Rect;
    }
    /**
     * 对象工具
     */
    export class ObjectUtil {
        /**
         * 判断指定的值是否为对象
         * @param value 值
         */
        static isObject(value: any): boolean;
        /**
         * 深拷贝
         * @param target 目标
         */
        static deepCopy(target: any): any;
        /**
         * 拷贝对象
         * @param target 目标
         */
        static copy(target: object): object;
    }
    /**
     * Promise 工具
     */
    export class PromiseUtil {
        /**
         * 等待
         * @param time 时长（秒）
         * @example
         * await PromiseUtil.sleep(1);
         */
        static sleep(time: number): Promise<void>;
    }
    /**
     * 正则工具
     */
    export class RegexUtil {
        /**
         * 判断字符是否为双字节字符（如中文字符）
         * @param string 原字符串
         */
        static isDWORD(string: string): boolean;
    }
    /**
     * 渲染工具
     */
    export class RenderUtil {
        /**
         * 获取节点的 RenderTexture
         * @param node 节点
         * @param out 输出
         */
        static getRenderTexture(node: cc.Node, out?: cc.RenderTexture): cc.RenderTexture;
        /**
         * 使用指定材质来将 RenderTexture 渲染到另一个 RenderTexture
         * @param srcRT 来源
         * @param dstRT 目标
         * @param material 材质
         */
        static renderWithMaterial(srcRT: cc.RenderTexture, dstRT: cc.RenderTexture | cc.Material, material?: cc.Material): cc.RenderTexture;
        /**
         * 获取像素数据
         * @param node 节点
         * @param flipY 垂直翻转数据
         */
        static getPixelsData(node: cc.Node, flipY?: boolean): Uint8Array;
        /**
         * 垂直翻转图像数据
         * @param array 数据
         * @param width 行宽
         */
        static flipY(array: Uint8Array, width: number): Uint8Array;
    }
    /**
     * 验证工具
     */
    export class TestUtil {
        /**
         * 验证电子邮箱格式
         * @param value string
         */
        static email(value: string): boolean;
        /**
         * 验证手机格式
         * @param value string
         */
        static mobile(value: string): boolean;
        /**
         * 验证URL格式
         * @param value string
         */
        static url(value: string): boolean;
        /**
         * 验证日期格式
         * @param value string
         */
        static date(value: string): boolean;
        /**
         * 验证ISO类型的日期格式
         * @param value string
         */
        static dateISO(value: string): boolean;
        /**
         * 验证十进制数字
         * @param value string
         */
        static number(value: string): boolean;
        /**
         * 验证整数
         * @param value string
         */
        static digits(value: string): boolean;
        /**
         * 验证身份证号码
         * @param value string
         */
        static idCard(value: string): boolean;
        /**
         * 验证金额,只允许保留两位小数
         * @param value string
         */
        static amount(value: string): boolean;
        /**
         * 验证是否中文
         * @param value string
         */
        static chinese(value: string): boolean;
        /**
         * 验证是否英文
         * @param value string
         */
        static letter(value: string): boolean;
        /**
         * 验证只能是字母或者数字
         * @param value string
         */
        static enOrNum(value: string): boolean;
        /**
         * 验证是否包含某个值
         * @param value string
         * @param param any
         */
        static contains(value: string, param: any): boolean;
        /**
         * 是否固定电话
         * @param value string
         */
        static landline(value: string): boolean;
        /**
         * 判断是否为空
         * @param value any
         */
        static empty(value: any): boolean;
        /**
         * 是否json字符串
         * @param value any
         */
        static jsonString(value: any): boolean;
        /**
         * 是否数组
         * @param value any
         */
        static array(value: any): boolean;
        /**
         * 是否对象
         * @param value any
         */
        static object(value: any): boolean;
    }
    /**
     * 时间工具
     */
    export class TimeUtil {
        /**
         * 获取当前时间戳
         * @example
         * TimeUtil.getTimestamp(); // 1614616955186
         */
        static getTimestamp(): number;
        /**
         * 获取当前日期（年/月/日）
         * @example
         * TimeUtil.getDate(); // "2021/3/2"
         */
        static getDate(): string;
        /**
         * 获取当天指定时间的时间戳
         * @param hour 时
         * @param minute 分
         * @param second 秒
         * @example
         * const time = TimeUtil.getTargetTimestamp(10, 20, 30); // 1601259630000
         * new Date(time).toLocaleString(); // "上午10:20:30"
         */
        static getTargetTimestamp(hour?: number, minute?: number, second?: number): number;
        /**
         * 将毫秒转为时分秒的格式（最小单位为秒，如："00:01:59"）
         * @param time 毫秒数
         * @param separator 分隔符
         * @param keepHours 当小时数为 0 时依然展示小时数
         * @example
         * TimeUtil.msToHMS(119000); // "00:01:59"
         */
        static msToHMS(time: number, separator?: string, keepHours?: boolean): string;
    }
    /**
     * Tween 工具
     */
    export class TweenUtil {
        /**
         * 水平翻转（卡片翻转）
         * @param node 节点
         * @param duration 总时长
         * @param onMiddle 中间状态回调
         * @param onComplete 完成回调
         */
        static flip(node: cc.Node, duration: number, onMiddle?: Function, onComplete?: Function): Promise<void>;
    }
    /**
     *  UI 工具库
     *    - 坐标转换
     */
    export class UIUtil {
        /**
        * 把一个世界坐标的点，转换到某个节点下的坐标
        * @param {*} node
        * @param {*} worldPoint
        */
        static convetOtherNodeSpaceAR(node: cc.Node, targetNode: cc.Node, pos?: cc.Vec2): cc.Vec2;
        /**
        * 得到一个节点的世界坐标
        * @param {*} node
        * @param {*} pos
        */
        static localConvertWorldPointAR(node: cc.Node, pos: cc.Vec2): cc.Vec2;
        /**
        * 把一个世界坐标的点，转换到某个节点下的坐标
        * @param {*} node
        * @param {*} worldPoint
        */
        static worldConvertLocalPointAR(node: cc.Node, worldPoint: cc.Vec2): cc.Vec2;
    }
    /** 字符串工具 */
    export class StringUtil {
        /** 获取一个唯一标识的字符串 */
        static guid(): string;
        /**
         * 转美式计数字符串
         * @param value 数字
         * @example
         * 123456789 = 123,456,789
         */
        static numberTotPermil(value: number): string;
        /**
         * 转英文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 12.35K
         */
        static numberToThousand(value: number, fixed?: number): string;
        /**
         * 转中文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 1.23万
         */
        static numberToTenThousand(value: number, fixed?: number): string;
        /**
         * 时间格式化
         * @param date  时间对象
         * @param fmt   格式化字符(yyyy-MM-dd hh:mm:ss S)
         */
        static format(date: Date, fmt: string): string;
        /**
         * "," 分割字符串成数组
         * @param str 字符串
         */
        static stringToArray1(str: string): string[];
        /**
         * "|" 分割字符串成数组
         * @param str 字符串
         */
        static stringToArray2(str: string): string[];
        /**
         * ":" 分割字符串成数组
         * @param str 字符串
         */
        static stringToArray3(str: string): string[];
        /**
         * ";" 分割字符串成数组
         * @param str 字符串
         */
        static stringToArray4(str: string): string[];
        /**
         * 字符串截取
         * @param str     字符串
         * @param n       截取长度
         * @param showdot 是否把截取的部分用省略号代替
         */
        static sub(str: string, n: number, showdot?: boolean): string;
        /**
         * 计算字符串长度，中文算两个字节
         * @param str 字符串
         */
        static stringLen(str: string): number;
    }
    /** label倒计时组件 */
    export class LabelTime extends cc.Label {
        countDown: number;
        dayFormat: string;
        timeFormat: string;
        zeroize: boolean;
        private dateDisable;
        private result;
        /** 每秒触发事件 */
        secondHandler: Function;
        /** 倒计时完成事件 */
        completeHandler: Function;
        private replace;
        /** 格式化字符串 */
        private format;
        /** 个位数的时间数据将字符串补位 */
        private coverString;
        /** 设置时间能否由天数显示 */
        setDateDisable(flag: boolean): void;
        /**
         * 设置倒计时时间
         * @param second 倒计时秒数
         * @param completeFunction 倒计时完回调
         * @param secondFunction 每秒回调
         */
        setTime(second: number, completeFunction?: Function, secondFunction?: Function): void;
        private onScheduleSecond;
        private onScheduleComplete;
        /** 开始计时 */
        private timing_start;
        private timing_end;
    }
    /** 只能显示数字的标签组件 */
    export class LabelNumber extends cc.Label {
        /** 数值 */
        _value: number;
        /** 数值 */
        /** 数值 */
        value: number;
        /** 货币符号 */
        _showSym: string;
        /** 货币符号 */
        /** 货币符号 */
        showSym: string;
        isInteger: boolean;
        /** 刷新lab */
        protected updateLabel(): void;
    }
            /** 数值变化动画标签组件 */
    export class LabelChange extends LabelNumber {
        private callback;
        private isBegin;
        private speed;
        private end;
        /**
         * 变化到某值,从当前value开始
         * @param {number} duration 持续时间
         * @param {number} end 最终值
         * @param {Function} [callback]
         */
        changeTo(duration: number, endValue: number, callback?: Handler): void;
        /**
         * 变化值,在当前value加多少
         * @param {number} duration
         * @param {number} value 变化值
         * @param {Function} [callback]
         * @memberof LabelChange
         */
        changeBy(duration: number, value: number, callback?: Handler): void;
        /** 立刻停止 */
        stop(excCallback?: boolean): void;
        /** 播放动画 */
        private playAnim;
        /** 是否已经结束 */
        private isEnd;
        update(dt: number): void;
    }
    /** 支持Map与Array功能的集合对象 */
    export class Collection<K, V> extends Map<K, V> {
        private _array;
        /** 获取数组对象 */
        readonly array: V[];
        /**
         * 设置值
         * @param key       关键字
         * @param value     数据值
         */
        set(key: K, value: V): this;
        /**
         * 删除值
         * @param key       关键字
         */
        delete(key: K): boolean;
        clear(): void;
    }
    /** 行为控制接口 */
    export interface IControl {
        /** 行为处理成功 */
        success(blackboard?: any): void;
        /** 行为处理失败 */
        fail(blackboard?: any): void;
        /** 处理行为逻辑 */
        run(blackboard?: any): void;
        /** 正在处理中 */
        running(blackboard?: any): void;
    }
        /** 行为树节点 */
    export abstract class BTreeNode implements IControl {
        protected _control: IControl;
        title: string;
        constructor();
        start(blackboard?: any): void;
        end(blackboard?: any): void;
        abstract run(blackboard?: any): void;
        setControl(control: IControl): void;
        running(blackboard?: any): void;
        success(): void;
        fail(): void;
    }
            /** 行为树 */
    export class BehaviorTree implements IControl {
        private title;
        /** 根节点 */
        private _root;
        /** 当前执行节点 */
        private _current;
        /** 是否已开始执行 */
        private _started;
        /** 外部参数对象 */
        private _blackboard;
        /** 是否已开始执行 */
        readonly started: boolean;
        /**
         * 构造函数
         * @param node          根节点
         * @param blackboard    外部参数对象
         */
        constructor(node: BTreeNode, blackboard?: any);
        /** 设置行为逻辑中的共享数据 */
        setObject(blackboard: any): void;
        /** 执行行为树逻辑 */
        run(): void;
        running(node: BTreeNode): void;
        success(): void;
        fail(): void;
        /** ---------------------------------------------------------------------------------------------------- */
        static _registeredNodes: Map<string, BTreeNode>;
        static register(name: string, node: BTreeNode): void;
        static getNode(name: string | BTreeNode): BTreeNode;
    }
        /** 复合节点 */
    export abstract class BranchNode extends BTreeNode {
        /** 子节点数组 */
        children: Array<BTreeNode>;
        /** 当前任务索引 */
        protected _actualTask: number;
        /** 正在运行的节点 */
        protected _runningNode: BTreeNode;
        protected _nodeRunning: BTreeNode | null;
        /** 外部参数对象 */
        protected _blackboard: any;
        constructor(nodes: Array<BTreeNode>);
        start(): void;
        run(blackboard?: any): void;
        /** 执行当前节点逻辑 */
        protected _run(blackboard?: any): void;
        running(node: BTreeNode): void;
        success(): void;
        fail(): void;
    }
        /**
     * 装饰器是条件语句只能附加在其他节点上并且定义所附加的节点是否执行
     * 如果装饰器是true 它所在的子树会被执行，如果是false 所在的子树不会被执行
     */
    export class Decorator extends BTreeNode {
        node: BTreeNode;
        constructor(node?: string | BTreeNode);
        protected setNode(node: string | BTreeNode): void;
        start(): void;
        end(): void;
        run(blackboard: any): void;
    }
        /** 优先 */
    export class Priority extends BranchNode {
        success(): void;
        fail(): void;
    }
        /**
     * 逻辑或关系
     * 只要子节点有一个返回true，则停止执行其它子节点，并且Selector返回true。如果所有子节点都返回false，则Selector返回false。
     */
    export class Selector extends BranchNode {
        success(): void;
        fail(): void;
        protected _run(blackboard?: any): void;
    }
        /** 任务行为节点 */
    export class Task extends BTreeNode {
        run(blackboard?: any): void;
    }
    /** 日志类型 */
    export enum LogerType {
        /** 网络层日志 */
        Net = 1,
        /** 数据结构层日志 */
        Model = 2,
        /** 业务逻辑层日志 */
        Business = 4,
        /** 视图层日志 */
        View = 8,
        /** 配置日志 */
        Config = 16,
        /** 标准日志 */
        Trace = 32
    }
    /**
     * 日志管理
     * @example
    base.Loger.trace("默认标准日志");
    base.Loger.logConfig("灰色配置日志");
    base.Loger.logNet("橙色网络日志");
    base.Loger.logModel("紫色数据日志");
    base.Loger.logBusiness("蓝色业务日志");
    base.Loger.logView("绿色视图日志");
     */
    export class Loger {
        private static tags;
        private static init;
        /**
         * 设置显示的日志类型，默认值为不显示任何类型日志
         * @example
    base.Loger.setTags(LogerType.View|LogerType.Business)
         */
        static setTags(tag?: LogerType): void;
        /**
         * 记录开始计时
         * @param describe  标题描述
         * @example
    base.Loger.start();
    ...
    省略N行代码
    ...
    base.Loger.end();
         */
        static start(describe?: string): void;
        /**
         * 打印范围内时间消耗
         * @param describe  标题描述
         * @example
    base.Loger.start();
    ...
    省略N行代码
    ...
    base.Loger.end();
         */
        static end(describe?: string): void;
        /**
         * 打印表格
         * @param msg       日志消息
         * @param describe  标题描述
         * @example
    var object:any = {uid:1000, name:"base"};
    base.Loger.table(object);
         */
        static table(msg: any, describe?: string): void;
        /**
         * 打印标准日志
         * @param msg       日志消息
         */
        static trace(msg: any, color?: string): void;
        /**
         * 打印网络层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        static logNet(msg: any, describe?: string): void;
        /**
         * 打印数据层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        static logModel(msg: any, describe?: string): void;
        /**
         * 打印业务层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        static logBusiness(msg: any, describe?: string): void;
        /**
         * 打印视图日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        static logView(msg: any, describe?: string): void;
        /** 打印配置日志 */
        static logConfig(msg: any, describe?: string): void;
        private static orange;
        private static violet;
        private static blue;
        private static green;
        private static gray;
        private static isOpen;
        /**
         * 输出日志
         * @param tag       日志类型
         * @param msg       日志内容
         * @param color     日志文本颜色
         * @param describe  日志标题描述
         */
        private static print;
        private static stack;
        private static getDateString;
    }
    export class LanguageLabel extends cc.Component {
        protected key: string;
        /** bundleName */
        protected bundleName: string;
        /** 设置bundleName */
        protected setBundle(name: string): void;
        /** 获取bundleName */
        getBundle(): string;
        getString(): string;
        onLoad(): void;
        updateLabel(): void;
    }
    /** 多语言配置 */
    export class LangSpPraams {
        /**语言 */
        language: string;
        /**语言 */
        scale: number;
        /**语言 */
        pos: cc.Vec2;
    }
    export class LanguageSprite extends cc.Component {
        /**是否为图集下贴图 */
        private isAtlasType;
        /** 单贴图地址 */
        private path;
        /** 图集地址 */
        private atlasPath;
        /** 贴图资源名称 */
        private spriteFrame;
        private onlyInLanguages;
        /**多语言配置 */
        private params;
        /** bundleName */
        protected bundleName: string;
        /** 设置bundleName */
        protected setBundle(name: string): void;
        /** 获取bundleName */
        getBundle(): string;
        onLoad(): void;
        /**
         * 更新多语言精灵
         * @returns
         */
        updateSprite(): void;
    }
    /**
     * 语种
     * @param ZH 简中
     * @param EN 英文
     * @param JA 日语
     * @param KO 韩语
     * @param TH 泰语
     * @param VI 越南语
     * @param PT 葡语
     * @param ID 印尼语
     * @param ES 西班牙语
     * @param RU 俄语
     * @param DE 德语
     * @param sv 瑞典文
     * @param IT 意大利
     * @param DA 丹麦文
     * @param NL 荷兰文
     * @param FI 芬兰
     * @param FR 法文
     * @param NO 挪威
     * @param PL 波兰
     * @param RO 罗马尼亚
     * @param TR 土耳其
     * @param MY 缅甸
     */
    export enum LanguageType {
        ZH = "zh",
        EN = "en",
        JA = "ja",
        KO = "ko",
        TH = "th",
        VI = "vi",
        PT = "pt",
        ID = "id",
        ES = "es",
        RU = "ru",
        DE = "de",
        SV = "sv",
        IT = "it",
        DA = "da",
        NL = "nl",
        FI = "fi",
        FR = "fr",
        NO = "no",
        PL = "pl",
        RO = "ro",
        TR = "tr",
        MY = "my"
    }
    export class LanguageManager {
        private static _instance;
        static getInstance(): LanguageManager;
        /**支持的语言列表 */
        private _support;
        /** 当前语言 */
        private _curLangType;
        /**
         * 语言配置
         */
        private _languageData;
        /**
         * 初始化语言配置文件信息
         * @param defaultLan 默认语言
         * @param supportLanguages 设置多语言系统支持哪些语种
         * @param bundleName
         */
        initLangConf(defaultLan: string, supportLanguages: Array<string>): void;
        /**是否包含该语言 */
        isExist(lang: string): boolean;
        /**
         * 改变语种，会自动下载对应的语种，下载完成回调
         * @param lang
         */
        switchLang(lang: string, bundleName: string, callback?: Function): void;
        /**
         * 获取key值对应文本字符串（通配符替换后）
         * @param key 键值
         */
        getDstStr(key: string, bundleName: string): string;
        /**
         * 获取当前语种
         */
        getCurLang(): string;
        /**
         * 加载语言包素材资源,包括语言json配置和语言纹理包
         * @param lang
         * @param bundleName
         * @param callback
         */
        loadLanguageAssets(lang: any, bundleName: string, callback?: Function): void;
    }
    /**
     * 定时跳动组件
     * @example
        export class Test extends Component {
            // 创建一个定时跳动组件
            private timer: Timer = new Timer(1);
    
            update(dt: number) {
                if (this.timer.update(dt)) {
                    console.log(每一秒触发一次);
                }
            }
        }
     */
    export class Timer {
        callback: Function | null;
        private _elapsedTime;
        readonly elapsedTime: number;
        private _step;
        /** 触发间隔时间（秒） */
        step: number;
        readonly progress: number;
        constructor(step?: number);
        update(dt: number): boolean;
        reset(): void;
        stop(): void;
    }
    /** 时间管理 */
    export class TimerManager extends cc.Component {
        /** 倒计时数据 */
        private times;
        /** 当前游戏进入的时间毫秒值 */
        private initTime;
        /** 服务器时间与本地时间同步 */
        private serverTime;
        update(dt: number): void;
        /** 触发倒计时完成事件 */
        private onTimerComplete;
        /**
         * 在指定对象上注册一个倒计时的回调管理器
         * @param object        注册定时器的对象
         * @param field         时间字段
         * @param onSecond      每秒事件
         * @param onComplete    倒计时完成事件
         * @returns
         * @example
        export class Test extends Component {
            private timeId!: string;
            
            start() {
                // 在指定对象上注册一个倒计时的回调管理器
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
            
            private onSecond() {
                console.log("每秒触发一次");
            }
    
            private onComplete() {
                console.log("倒计时完成触发");
            }
        }
         */
        register(object: any, field: string, onSecond: Function, onComplete: Function): any;
        /**
         * 在指定对象上注销一个倒计时的回调管理器
         * @param id         时间对象唯一表示
         * @example
        export class Test extends Component {
            private timeId!: string;
    
            start() {
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
    
            onDestroy() {
                // 在指定对象上注销一个倒计时的回调管理器
                oops.timer.unRegister(this.timeId);
            }
        }
         */
        unRegister(id: string): void;
        /**
         * 服务器时间与本地时间同步
         * @param val   服务器时间刻度
         *
         */
        setServerTime(val?: number): number;
        getServerTime(): number;
        /**
         * 格式化日期显示
         * @param format 格式化字符串（例：yyyy-MM-dd hh:mm:ss）
         * @param date   时间对象
         */
        format(format: string, date: Date): string;
        /** 获取游戏开始到现在逝去的时间 */
        getTime(): number;
        /** 获取本地时间刻度 */
        getLocalTime(): number;
        /** 游戏最小化时记录时间数据 */
        save(): void;
        /** 游戏最大化时回复时间数据 */
        load(): void;
    }
        export enum ANIMATION_TYPE {
        /**序列帧动画 */
        SPRITE_FRAMES_CLIP = 0,
        /**spin动画 */
        SKELETON = 1
    }
    export class AniParam {
        /**类型，spin或者序列帧 */
        aniType: ANIMATION_TYPE;
        /**
         * 1、若为spin则为spin资源的地址，2、若为序列帧，则为图集的地址，也可传入多张图片的地址，参数为字符串数组
         */
        url: string | string[];
        /**本地填resources */
        bundleName: string;
        /**动画名 */
        aniName: string;
        /**加载完成的回调 */
        loadCompleteHandler?: Handler;
        /**动画速率 */
        timeScale: number;
        /**spine-是否启用预乘 默认false */
        premultipliedAlpha: boolean;
        /**spine-是否启用 */
        isAlphaBlendMode: boolean;
        /**spine-默认皮肤 默认default*/
        defaultSkin: string;
        /** 序列帧-混合模式*/
        dstBlendFactor: cc.macro.BlendFactor;
        /**序列帧-帧率,默认30 */
        sample?: number;
        /**序列帧-是否使用非图集 true:加载地址下的所有图片， false：加载图集*/
        isLoadDir: boolean;
        /**序列帧-精灵尺寸调整模式 */
        sizeMode: cc.Sprite.SizeMode;
        /**序列帧-是否使用裁剪模式 */
        trim: boolean;
        /**
         *
         * @param aniType 动画类型
         * @param url 路径
         * @param bundleName 分包名
         * @param aniName 动画名
         * @param handler 加载成功回调
         * @param sample 序列帧-帧率 默认30
         */
        constructor(aniType: ANIMATION_TYPE, url: string | string[], bundleName: string, aniName: string, handler?: Handler, sample?: number);
    }
    export class AnimationExtend extends cc.Component {
        private aniComp;
        private skComp;
        private aniName;
        /** 播放完成回调 */
        private playCompleteHandler;
        /**资源加载是否完成 */
        private isResLoaded;
        private isReadyPlay;
        private loop;
        private aniParam;
        /**
         * 初始化
         * @param param AniParam
         */
        init(param: AniParam): void;
        /**
         * 播放动画
         * @param name 动画名
         * @param loop 是否循环
         * @param complete 播放完回调，loop为false时有效
         */
        play(name: string, loop?: boolean, complete?: Handler): void;
        /**
         * 停止动画
         */
        stop(): void;
        private playSkeleton;
        private loadSekeleton;
        private addAnimationComp;
        private addAnimation;
        private loadSpriteFrames;
        private playSpriteFramesClip;
        private spFrameClipFinish;
    }
    export class CommonAdapt {
        private isHor;
        private designSize;
        private resoultPolicy;
        private sceneBg;
        private sceneGroup;
        private static _instance;
        static getInstance(): CommonAdapt;
        init(): void;
        destory(): void;
        /**如果没有特别需要，一般不调用，有默认的 横版 1920*1080 竖版 1080*1920 showAll适配模式 */
        setDesignSzie(width: number, height: number, resolutionPolicy?: number): void;
        /**设置背景相机组 */
        setSceneCamera(groupIndex: number): void;
        protected createBg(): void;
        /**设置背景颜色 */
        setBgFrameColor(color: cc.Color): void;
        /**
      * 设置场景的模糊背景图 ，和canvas 同层级
       */
        setBgFrame(spriteFrame: cc.SpriteFrame): void;
        private refreshBgSize;
        /**
         *  屏幕分辨率有变化的时候调用
         *  */
        protected resizeHandle(): void;
        static bgAdapt(node: cc.Node): void;
    }
        export class LoadingModel extends BaseView {
        protected horBgSpriteFrame: cc.SpriteFrame;
        protected verBgSpriteFrame: cc.SpriteFrame;
        /** bundleName */
        protected bundleName: string;
        /**
         * 加载分包
         */
        protected load(): void;
        /**
         * 加载资源
         */
        protected loadRes(data: any): void;
        /** 加载完成 */
        protected loadCompleteCallBack(): void;
        /** 加载进度 */
        protected loadProgress(progress: number): void;
        /** 加载多语言包配置 */
        /**
         * 切换到横屏
         */
        layoutLandscape(): void;
        /**
        * 切换到竖屏
        */
        layoutPortrait(): void;
    }
        export class WaitingModel extends PopupModel {
    }
    /**
     * 字体效果
     * - 阴影
     * - 描边
     * - 描边阴影
     * - 颜色渐变
     * - 扫光效果
     * - 外发光
     */
    export class LabelShader extends cc.Component {
        shadowUse: boolean;
        shadowOffset: cc.Vec2;
        shadowColor: cc.Color;
        outlineUse: boolean;
        outlineWidth: number;
        outlineColor: cc.Color;
        olShadowUse: boolean;
        olShadowOffset: cc.Vec2;
        olShadowColor: cc.Color;
        flowLightUse: boolean;
        flSpeed: number;
        flRot: number;
        flWidth: number;
        flColor: cc.Color;
        gradient: number;
        color1: cc.Color;
        color2: cc.Color;
        color3: cc.Color;
        glow: number;
        glowWidth: number;
        glowDepth: number;
        glowColor: cc.Color;
        private _mtl;
        private _time;
        onLoad(): void;
        initMat(): void;
        use(): void;
        update(dt: number): void;
    }
        export class MainViewModel extends BaseView {
        /**行为树 */
        protected horBgSpriteFrame: cc.SpriteFrame;
        protected verBgSpriteFrame: cc.SpriteFrame;
        /**
         * 切换到横屏
         */
        layoutLandscape(): void;
        /**
        * 切换到竖屏
        */
        layoutPortrait(): void;
    }
    /**
     * 粒子换装
     * 实现功能：多重（也可以只有一个）粒子节点，动态替换图集中精灵贴图，并且随机起始贴图。
     * 使用方式：将组件挂载在粒子节点的直接父节点上
     */
    export class MultiPSRandomRefreshTool extends cc.Component {
        private atlas;
        private aniFps;
        /**ParticleSystem节点数量 */
        private psNodeNum;
        private emissionRate;
        /**粒子系统贴图当前下标集合 */
        private psIndexArray;
        /**粒子发射器节点集合 */
        private psArray;
        /**图集序列总帧数 */
        private count;
        /**图集序列帧集合 */
        private spriteArray;
        protected onLoad(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        private refreshSprite;
    }
    /**
     * 实现功能：粒子节点，动态替换图集中精灵贴图
     */
    export class ParticleSystemSpriteFramesRefresh extends cc.Component {
        atlas: cc.SpriteAtlas;
        private aniFps;
        private ps;
        private index;
        private count;
        /**图集序列帧集合 */
        private spriteArray;
        protected onLoad(): void;
        private refreshSprite;
    }
    export enum Orientation {
        /** 自动横竖屏 */
        Auto = 1,
        /** 固定竖屏 */
        Portrait = 2,
        /** 固定横屏 */
        Landscape = 3
    }
    export enum UIID {
        /** loading 页面UIID */
        Loading = 1
    }
    /** 游戏界面屏幕自适应管理 */
    export class GUIView extends cc.Component {
        /** 游戏二维摄像机 */
        camera: cc.Camera;
        /** 是否为竖屏显示 */
        isPortrait: boolean;
        /** 设计尺寸 */
        private m_designSize;
        /** 设计尺寸长边 */
        private m_longSize;
        /** 设计尺寸短边 */
        private m_shortSize;
        /** 设计模式   游戏的横竖 1：自动，会跟随屏幕切换横竖版  2：固定竖版  3：固定横版*/
        private m_orientation;
        protected onLoad(): void;
        /** 初始化引擎 */
        protected init(): void;
        /** 游戏画布尺寸变化 */
        resize(): void;
    }
    export class Layout {
        static readonly isLandscape: boolean;
        private static _designCanvasW;
        static canvasW: number;
        private static _designCanvasH;
        static canvasH: number;
        /**
         * 根据当前分辨率缩放节点
         * @param node
         */
        static setNodeResolutionSize(node: cc.Node): void;
        /**
         * 设置横向布局
         * @param node
         * @param spacingX 相邻节点的水平间隔
         * @param containerHeight 容器高度 默认设为第一个子元素高度
         * @param direction 排列子点方向
         * @param resizeMode 缩放模式
         */
        static setHorizontalLayout(node: cc.Node, spacingX?: number, containerHeight?: number, direction?: number, resizeMode?: number): void;
        /**
        * 设置纵向布局
        * @param node
        * @param spacingY 相邻节点的垂直间隔
        * @param containerWidth 容器宽度 默认为第一个子节点宽度
        * @param direction 排列子点方向
        * @param resizeMode 缩放模式
        */
        static setVerticalLayout(node: cc.Node, spacingY?: number, containerWidth?: number, direction?: number, resizeMode?: number): void;
        /**
         * 根据配置设置Layout
         * @param node 要设置的节点
         * @param data 配置数据(例:{
                                        "landscape": {
                                                    "spacingY": 30,
                                                    "spacingX": 0,
                                                },
                                                "portrait": {
                                                    "spacingX": 30,
                                                    "spacingY": 0,
                                                }
                                            })
         */
        static setLayout(node: cc.Node, data: any): void;
        /**
         * 根据配置设置widget
         * @param node
         * @param data 配置数据(例: {
                                "landscape": {
                                    "top": 180,
                                    "left": 50,
                                    "horizontalCenter":0,
                                    "verticalCenter":0
                                },
                                "portrait": {
                                    "top": 860,
                                    "left": 50,
                                    "horizontalCenter":0,
                                    "verticalCenter":0
                                }
                            })
         */
        static setWidget(node: cc.Node, data: any, target?: cc.Node): void;
        private static openWidgetProperty;
        /**
         * 等比缩放节点到屏幕大小 无黑边 可截断 返回值：最终放大比例
         * @param node 待缩放的节点
         */
        static scaling(node: cc.Node, spriteFrame?: cc.SpriteFrame): number;
        /**
         * 通过width/height属性等比缩放节点到指定矩形大小; 覆盖无黑边,返回缩放比例
         * @param node 待缩放的节点
         * @param spriteFrame 若节点图片为动态加载，这里传入动态图
         * @param rect 目标矩形尺寸，默认为全屏cc.winSize
         */
        static scalingToCoverRectBySize(node: cc.Node, spriteFrame?: cc.SpriteFrame, rect?: cc.Size): number;
        /**
         * 通过scale属性等比缩放节点到指定矩形大小; 覆盖无黑边,返回缩放比例
         * @param node 待缩放的节点
         * @param spriteFrame 若节点图片为动态加载，这里传入动态图
         * @param rect 目标矩形尺寸，默认为全屏cc.winSize
         */
        static scalingToCoverRectByScale(node: cc.Node, spriteFrame?: cc.SpriteFrame, rect?: cc.Size): number;
        /**
         * 获取设计分辨率的缩放率
         */
        static getDesignResolutionScale(): number;
        /**
       * 获取设计分辨率的缩放率
       */
        static newGetDesignResolutionScale(node: any): void;
        static setNodeScaleByDesign(node: cc.Node): void;
    }
            export class MainLayout extends BaseView {
        /**默认canvas设计尺寸 */
        protected defalutDisCanvasW: number;
        protected defalutDisCanvasH: number;
        /**适配模式 */
        protected orientationMode: Orientation;
        protected onLoad(): void;
        layout(): void;
    }
    export class Root extends cc.Component {
        /**游戏配置 */
        gameConfig: cc.JsonAsset;
        /** 持久根节点 */
        persistRootNode: cc.Node;
        protected onLoad(): void;
        protected onDestroy(): void;
        /** 初始化游戏界面 */
        protected initGui(): void;
        init(gameConfig: cc.JsonAsset): void;
        private initMainLayout;
    }
    export class SoundVO {
        clip: cc.AudioClip;
        clipId: number;
        /**原始音量最大占比 */
        maxVolumePercentage: number;
        /**音效单独的音量大小 */
        volume: number;
        path: string;
        bundle: string;
    }
    /**
     * 音效管理器
     */
    export class SoundManager {
        static IGNORE_VOLUME: number;
        /**音乐音量的百分比 */
        private musicVolume;
        /**音效音量的百分比 */
        private effectVolume;
        /**正在播放等音效列表 */
        private effectList;
        private currentMusic;
        private musicList;
        private showHideVolume;
        private isInit;
        private static _instance;
        static getInstance(): SoundManager;
        constructor();
        /**
         * 初始化
         */
        init(): void;
        private gameHide;
        private gameShow;
        private setHideShowVolume;
        /**
         * 加载本地声音缓存，存储用户设置音量大小，
         * @param gameId 游戏id
         */
        loadLocalVolume(gameId?: string): void;
        /**
         * 获取声音值（背景音乐）
         */
        getMusicVolume(): number;
        /**
         * 获取音效值（音效）
         */
        getEffectVolume(): number;
        /**
         * 设置音乐大小，并且缓存本地
         * @param volume 音量大小 （0--1）
         * @param gameId 游戏id
         */
        setMusicVolume(volume: number, gameId?: string): void;
        /**
         * 设置指定单个音乐的音量大小
         * @param path 音效路径
         * @param volume 音量大小（值范围：[0,1]，当某个音乐不想被总开关控制，例如需要同步音轨，可以设置成game.SoundManager.IGNORE_VOLUME）
         */
        setSingleMusicVolume(path: string, volume: number): void;
        /**
        * 设置音效大小，并且缓存本地
        * @param volume 音量大小 （0--1）
        * @param gameId 游戏id
        */
        setEffectVolume(volume: number, gameId?: string): void;
        /**
         * 设置指定单个音效的音量大小
         * @param path 音效路径
         * @param volume 音量大小（值范围：[0,1]，当某个音效不想被总开关控制，例如需要同步音轨，可以设置成game.SoundManager.IGNORE_VOLUME）
         */
        setSingleEffectVolume(path: string, volume: number): void;
        /**
         * 播放背景音乐
         * @param path 音乐资源路径
         * @param loop 是否循环播放
         * @param bundle bundle名
         * @param endFunc 播放结束后的回调 可选
         * @param loadFunc 加载完成的回调  可选
         * @param maxVolume 原始音量最大值,默认值100（0，100）
         * @param isStopPrev 是否停止之前的背景音乐（默认停止，只有一个背景音乐）
         */
        playMusic(path: string, loop: boolean, bundle: string, endFunc?: Function, loadFunc?: Function, maxVolume?: number, isStopPrev?: boolean): void;
        /**
         * 播放音效文件
         * @param path 音效路径，相对于bundle
         * @param bool 是否循环
         * @param bundle bundle名
         * @param isSpecial 是否特殊音乐（可能捕猎一些长音效）
         * @param loadfinish 加载完成的回调
         * @param playfinish 播放完成的回调
         * @param maxVolume 原始音量最大值,默认值100（0，100）
         */
        playEffect(path: string, loop: boolean, bundle: string, loadfinish?: Function, playfinish?: Function, maxVolume?: number): void;
        /**
         * 播放音效结束回调函数
         * @param soundId 声音的id
         */
        private onFinishSound;
        /**
         * 获取音效对象 cc.AudioClip ,有些传入相同的路径名字。 进行playEffect。
         * @param path  播放声音资源路径
         */
        getClipByPath(path: string): SoundVO | SoundVO[];
        /**
         * 暂停背景音乐的播放
         * @param path 背景音乐资源路径
         */
        pauseMusic(path?: string): void;
        /**
         * 恢复背景音乐资源的播放
         * @param path 背景音乐路径
         */
        resumeMusic(path?: string): void;
        /**
         * 暂停所有背景音乐的播放
         */
        pauseAllMusic(): void;
        /**
         * 恢复所有背景音乐的播放
         */
        resumeAllMusic(): void;
        /**
         * 暂停音效资源的播放
         * @param path 音效资源路径
         */
        pauseEffect(path: string): void;
        /**
         * 恢复音效资源的播放
         * @param path 音效资源路径
         */
        resumeEffect(path: string): void;
        /**
         * 暂停所有音效的播放
         */
        pauseAllEffect(): void;
        /**
         * 恢复所有音效的播放
         */
        resumeAllEffect(): void;
        /**
         * 暂停所有背景音乐和音效
         */
        pauseAll(): void;
        /**
         * 恢复所有背景音乐和音效
         */
        resumeAll(): void;
        /**
         * 获取音效当前到播放时长
         * @param path 声音资源路径
         */
        getMusicCurPlayTime(path?: string): number;
        /**
         * 停止背景音乐
         * @param path 传入播放声音资源路径 ,若不传，停止当前的音乐
         */
        stopMusic(path?: string): void;
        /**
         * 停止所有背景声音，并且在列表中的也全部清理
         */
        stopAllMusic(): void;
        /** 列表中是否存在 背景音乐 */
        hasMusicClip(path: string): boolean;
        /**
         * 停止某个音效  可能存在多个音效，但是会自动加后缀，所以遍历的时候 查找字符
         * @param path 音效资源路径
         */
        stopEffect(path: string): void;
        /**
         * 停止全部音效
         */
        stopAllEffect(): void;
        /**
         * 设置当前的音频时间。
         * @param path 音效资源路径
         * @param sec 时间
         */
        setMusicCurrentTime(path: string, sec: number): void;
        /**
         * 设置当前的音频时间。
         * @param path 音效资源路径
         * @param sec 时间
         */
        setEffectCurrentTime(path: string, sec: number): void;
    }
        export class GM extends PopupModel {
        protected ui_btnSure: cc.Node;
        protected ui_btnClose: cc.Node;
        protected ui_btnLanguages: cc.Node;
        protected ui_btnFPS: cc.Node;
        protected ui_btnLanguageItem: cc.Node;
        protected ui_LanguagePanels: cc.Node;
        onOpen(...args: any[]): void;
        private onClickLanguageChange;
        removeEvent(): void;
        /** 点击多语言 */
        protected onClickLanguage(): void;
        /** 点击FPS */
        protected onClickFPS(): void;
        /** 点击确定 */
        protected onClickSure(): void;
        /** 点击取消 */
        protected onClickClose(): void;
    }
    export enum CustomBtnTransition {
        /**
         * 不做任何过渡
         */
        NONE = 0,
        /**
         * 颜色过渡
         */
        COLOR = 1,
        /**
         * 精灵过渡
         */
        SPRITE = 2,
        /**
         * 缩放过渡
         */
        SCALE = 3,
        /**
         * 颜色+缩放
         */
        COLOR_SCALE = 4,
        /**
         * 精灵+缩放
         */
        SPRITE_SCALE = 5
    }
    export enum CustomBtnState {
        NORMAL = 0,
        HOVER = 1,
        PRESSED = 2,
        DISABLED = 3
    }
    export enum CustomBtnLongTouchType {
        /**
         * 不支持长按
         */
        NONE = 0,
        /**
         * 单次触发
         */
        ONCE = 1,
        /**
         * 多次触发
         */
        MULTIPLE = 2
    }
    export class StateSprite {
        normalSprite: cc.SpriteFrame;
        pressedSprite: cc.SpriteFrame;
        hoverSprite: cc.SpriteFrame;
        disabledSprite: cc.SpriteFrame;
    }
    export class StateColor {
        normalColor: cc.Color;
        pressedColor: cc.Color;
        hoverColor: cc.Color;
        disabledColor: cc.Color;
    }
    export class CustomButton extends cc.Component {
        target: cc.Node;
        protected _interactable: boolean;
        interactable: boolean;
        protected _enableAutoGrayEffect: boolean;
        enableAutoGrayEffect: boolean;
        longTouchType: CustomBtnLongTouchType;
        triggerElapsed: number;
        triggerInterval: number;
        transition: CustomBtnTransition;
        duration: number;
        zoomScale: number;
        spriteSetIdx: number;
        spriteSet: StateSprite[];
        colorSetIdx: number;
        colorSet: StateColor[];
        clickEvents: cc.Component.EventHandler[];
        protected _pressed: boolean;
        protected _hovered: boolean;
        protected _fromColor: cc.Color;
        protected _toColor: cc.Color;
        protected _time: number;
        protected _transitionFinished: boolean;
        protected _fromScale: cc.Vec2;
        protected _toScale: cc.Vec2;
        protected _originalScale: cc.Vec2;
        protected _sprite: cc.Sprite;
        protected _curState: CustomBtnState;
        readonly curState: CustomBtnState;
        protected _longTouchTime: number;
        protected _longTouchTriggered: boolean;
        /**是否冷却中防止多点触发 */
        private static _isOnCooling;
        onLoad(): void;
        protected _resetState(): void;
        onEnable(): void;
        onDisable(): void;
        switchSpriteSet(index: number): void;
        switchColorSet(index: number): void;
        protected _getTarget(): cc.Node;
        protected _onTargetScaleChanged(): void;
        protected _setTargetColor(color: cc.Color): void;
        protected _getStateColor(state: CustomBtnState): cc.Color;
        protected _getStateSprite(state: CustomBtnState): cc.SpriteFrame;
        update(dt: number): void;
        protected _registerNodeEvent(): void;
        protected _unregisterNodeEvent(): void;
        protected _registerTargetEvent(target: cc.Node): void;
        protected _unregisterTargetEvent(target: cc.Node): void;
        protected _getTargetSprite(target: cc.Node): any;
        protected _applyTarget(): void;
        protected _onTouchBegan(event: cc.Event.EventTouch): void;
        protected _onTouchMove(event: cc.Event.EventTouch): void;
        _onTouchEnded(event: cc.Event.EventTouch): void;
        _onTouchCancel(): void;
        _onMouseMoveIn(): void;
        _onMouseMoveOut(): void;
        protected _updateState(): void;
        protected _getButtonState(): CustomBtnState;
        protected _updateColorTransitionImmediately(state: CustomBtnState): void;
        protected _updateColorTransition(state: CustomBtnState): void;
        protected _updateSpriteTransition(state: CustomBtnState): void;
        protected _updateScaleTransition(state: CustomBtnState): void;
        protected _zoomUp(): void;
        protected _zoomBack(): void;
        protected _applyTransition(state: CustomBtnState): void;
        protected _updateDisabledState(force?: boolean): void;
        /**
         * 设置灰色滤镜
         * @param gray true变灰
         * @param node node节点
         * @param recursive 是否递归影响子节点
         */
        protected _switchGrayMaterial(gray: boolean, node: cc.Node, recursive: boolean): void;
        private static _setTimeOutId;
        /**获取是否冷却中*/
        /**设置是否冷却中 */
        static isOnCooling: boolean;
    }
    export class NodeUiConfig extends cc.Component {
        controlActive: boolean;
        controlSpriteFrame: boolean;
        controlSize: boolean;
        ui_config: string;
    }
    /**
     * 控制器插件
     */
    export class MController extends cc.Component {
        inheritedAttrList: {
            "cc.Node": {
                x: number;
                y: number;
                scaleX: number;
                scaleY: number;
                anchorX: number;
                anchorY: number;
                width: number;
                height: number;
                active: boolean;
                opacity: number;
                color: {
                    r: number;
                    g: number;
                    b: number;
                };
                angle: number;
            };
            "cc.Label": {
                enabled: boolean;
                horizontalAlign: number;
                verticalAlign: number;
                overflow: number;
                fontSize: number;
            };
            "cc.Widget": {
                isAlignBottom: boolean;
                isAlignLeft: boolean;
                isAlignRight: boolean;
                isAlignTop: boolean;
                isAlignHorizontalCenter: boolean;
                isAlignVerticalCenter: boolean;
                _isAbsBottom: boolean;
                _isAbsHorizontalCenter: boolean;
                _isAbsLeft: boolean;
                _isAbsRight: boolean;
                _isAbsTop: boolean;
                _isAbsVerticalCenter: boolean;
                top: number;
                bottom: number;
                left: number;
                right: number;
                horizontalCenter: number;
                verticalCenter: number;
                enabled: boolean;
            };
            "cc.Sprite": {
                enabled: boolean;
                spriteFrame: {};
            };
            "cc.Layout": {
                enabled: boolean;
                type: number;
                resizeMode: number;
                paddingBottom: number;
                paddingLeft: number;
                paddingRight: number;
                paddingTop: number;
                spacingX: number;
                spacingY: number;
                horizontalDirection: number;
                verticalDirection: number;
                startAxis: number;
                affectedByScale: boolean;
            };
            "cc.ScrollView": {
                enabled: boolean;
                horizontal: boolean;
                vertical: boolean;
                inertia: boolean;
                brake: number;
                elastic: boolean;
                bounceDuration: number;
            };
            "cc.BoxCollider": {
                enabled: boolean;
                tag: number;
                offset: {
                    x: number;
                    y: number;
                };
                size: {
                    width: number;
                    height: number;
                };
            };
            "cc.CircleCollider": {
                enabled: boolean;
                tag: number;
                offset: {
                    x: number;
                    y: number;
                };
                radius: number;
            };
            "cc.PolygonCollider": {
                enabled: boolean;
                threshold: number;
                tag: number;
                offset: {
                    x: number;
                    y: number;
                };
                points: {
                    x: number;
                    y: number;
                }[];
            };
        };
        /** 保存配置 */
        private _saveConfig;
        /** 保存配置 */
        private saveConfig;
        /** 控制器ID */
        private _stateIndex;
        /** 控制器ID */
        stateIndex: number;
        protected readChildrenProp(node: cc.Node): void;
        /**
         * 遍历读取属性
         * @param node
         */
        protected readNodeProp(node: cc.Node): void;
        /**
         * 遍历设置属性
         */
        protected setChildrenProp(e: cc.Node): void;
        /**
         * 替换图集
         * @param comp
         * @param sobj "spriteFrame": {"uuid": "c134059b-d04d-4e31-b804-ff304455dad4","bundle": "game_1000001" }
         */
        protected changeSpriteFrame(comp: cc.Sprite, sobj: any): void;
        protected delaySetWidget(node: cc.Node, cfgObj: any): void;
        protected resetLayoutChildPosition(node: cc.Node): void;
        /**
         * 更新配置
         */
        protected updateConfig(): void;
        /**
         * 更新页面布局
         */
        protected updateLayout(): void;
        protected isExistFileByUuid(uuid: any): any;
    }
    /**
     * 闹钟传参类型参数
     */
    export class ClockParamType {
        /** 倒计时完成回调 */
        completeFunction?: Function;
        /** 每秒回调 */
        secondFunction?: Function;
        /** 进入关键时刻回调 */
        enterCrucialCall?: Function;
        /**到计时间总时间（单位秒） */
        countDown: number;
        /** 关键时刻时间 */
        crucialSecond: number;
        /** 倒计时结束是否自动隐藏 */
        isAutoHide?: boolean;
    }
    /** label倒计时组件 */
    export class ClockTimer extends cc.Component {
        timeLabel: cc.Label;
        /** 关键时刻是否震动 */
        isShake: boolean;
        clockParam: ClockParamType;
        private preTween;
        protected onLoad(): void;
        protected onDestroy(): void;
        private clockStart;
        /**
         * 刷新倒计时
         * @param clockParam
         */
        protected resetData(clockParam?: ClockParamType): void;
        /**
         * 初始化倒计时组件
         * @param clockParam
         */
        protected initData(clockParam: ClockParamType): void;
        /** 格式化字符串 */
        private tick;
        private onScheduleSecond;
        private onScheduleComplete;
        /** 开始计时 */
        private timing_start;
        private timing_end;
        private shakeAni;
        private shakeTween;
        /** 倒计时开始，子类可重写 */
        protected timerStart(): void;
        /** 倒计时结束，子类可重写 */
        protected timerEnd(): void;
        /** 倒计时关键时候，子类可重写 */
        protected timerCrucial(): void;
        /** 倒计时隐藏 */
        protected clockHide(): void;
    }

}