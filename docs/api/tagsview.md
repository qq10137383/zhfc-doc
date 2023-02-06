# tagsView模块

页签模块，提供打开页签、关闭页签、刷新页签等页签、路由相关功能。

## isAppView

- 类型：`(appName:string,view:string) => boolean`

- 详情：获取页签是否属于某应用。
    - `appName`: 应用名称
    - `view`: 页签对应路由地址

- 示例：

``` javascript
const { tagsView } =  this.$MF
const isByfzView = tagsView.isAppView('byfz','/entrustDisposeInfo')
```

## getAppVisitedViews

- 类型：`(appName:string) => Route[]`

- 详情：获取某微应用所有页签信息。
    - `appName`: 应用名称

- 示例：

``` javascript
const { tagsView } =  this.$MF
const visitedViews = tagsView.getAppVisitedViews('byfz')
```

## getCachedViews

- 类型：`() => Route[]`

- 详情：获取所有已缓存的页签信息。

- 示例：

``` javascript
const { tagsView } =  this.$MF
const cachedViews = tagsView.getCachedViews()
```

## getAppCachedViews

- 类型：`(appName:string) => Route[]`

- 详情：获取某微应用所有缓存页签信息。
    - `appName`: 应用名称

- 示例：

``` javascript
const { tagsView } =  this.$MF
const cachedViews = tagsView.getAppCachedViews('byfz')
```

## openView

- 类型：`(options:OpenOption) => Promise<Route | Error>`

- 详情：打开某微应用的页签。
    - `viewOption`: 打开视图选项参数  
  
    ``` typescript
    interface OpenOption {
        // 微应用名称，打开主应用页面传'main'或者 microApp.MAIN_APP_NAME，打开子微应用传应用名。
        appName: string;
        // 视图对应路由
        path: string;
        // 路由路径参数(可选)
        params?: Object;
        // 路由查询参数(可选)
        query?: Object;
    }
    ```
    ::: tip
    `OpenOption` 中除了 `appName` 参数，其他参数来着 `vue router push` 方法中 [`location`](https://v3.router.vuejs.org/zh/guide/essentials/navigation.html) 参数。
    :::

- 示例：

``` javascript
const { tagsView, microApp } =  this.$MF
// 1：打开主应用页面
tagsView.openView({
    appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
    path: "/dashboard"
})
// 2：打开白蚁防治子应用委托受理信息页面
tagsView.openView({
    appName: 'byfz',   
    path: "/entrustDisposeInfo"
})
// 3：查询参数
tagsView.openView({
    appName: "byfz",
    path: "/entrustDisposeInfo?id=1234"
})
// 4：查询参数
tagsView.openView({
    appName: "byfz",
    path: "/entrustDisposeInfo",
    query: { id: 1234 }
})
// 5：路径参数
tagsView.openView({
    appName: "byfz",
    path: "/entrustDisposeInfo/1",
})
// 6：路径参数
tagsView.openView({
    appName: "byfz",
    path: "/entrustDisposeInfo",
    params: { id: 1 }
})
```

## closeView

- 类型：`(options:CloseOption) => Promise<Route | Error>`

- 详情：关闭某微应用的页签，对于不可关闭的页签( `affix:true` )无效。
    - `CloseOption`: 关闭视图选项参数  
  
    ``` typescript
    interface CloseOption {
        // 微应用名称，关闭主应用页面传'main'或者 microApp.MAIN_APP_NAME，关闭子微应用传应用名。
        appName: string;
        // 视图对应全路由(包括路径参数和查询参数)
        path: string;
    }
    ```
- 示例：

``` javascript
const { tagsView, microApp } =  this.$MF
// 1：关闭主应用页面
tagsView.closeView({
    appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
    path: "/dashboard"
})
// 2：关闭白蚁防治子应用委托受理信息页面
tagsView.closeView({
    appName: 'byfz',   
    path: "/entrustDisposeInfo"
})
// 3：查询参数
tagsView.closeView({
    appName: "byfz",
    path: "/entrustDisposeInfo?id=1234"
})
// 4：路径参数
tagsView.closeView({
    appName: "byfz",
    path: "/entrustDisposeInfo/1",
})
```

## closeCurrentView

- 类型：`() => Promise<Route>`

- 详情：关闭当前打开的页签，对于不可关闭的页签( `affix:true` )无效。

- 示例：

``` javascript
const { tagsView } =  this.$MF
tagsView.closeCurrentView()
```

## refreshView

- 类型：`(options:RefreshOption) => Promise<Route | Error>`

- 详情：刷新某微应用的页签，刷新后页面缓存会失效。
    - `RefreshOption`: 刷新视图选项参数  
  
    ``` typescript
    interface RefreshOption {
        // 微应用名称，刷新主应用页面传'main'或者 microApp.MAIN_APP_NAME，刷新子微应用传应用名。
        appName: string;
        // 视图对应全路由(包括路径参数和查询参数)
        path: string;
    }
    ```
- 示例：  

``` javascript
const { tagsView, microApp } =  this.$MF
// 1：刷新主应用页面
tagsView.refreshView({
    appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
    path: "/dashboard"
})
// 2：刷新白蚁防治子应用委托受理信息页面
tagsView.refreshView({
    appName: 'byfz',   
    path: "/entrustDisposeInfo"
})
// 3：查询参数
tagsView.refreshView({
    appName: "byfz",
    path: "/entrustDisposeInfo?id=1234"
})
// 4：路径参数
tagsView.refreshView({
    appName: "byfz",
    path: "/entrustDisposeInfo/1",
})
```

## refreshCurrentView

- 类型：`() => Promise<Route>`

- 详情：刷新当前打开的页签。

- 示例：

``` javascript
const { tagsView } =  this.$MF
tagsView.refreshCurrentView()
```

## EVENT_OPEN_VIEW

- 类型：`string`

- 详情：主应用打开页签事件常量，用来标识接收主应用打开页签事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// view：视图信息
emitter.on(tagsView.EVENT_OPEN_VIEW, (view) => {
    console.log(view);
});
```

## EVENT_REFRESH_VIEW

- 类型：`string`

- 详情：主应用刷新页签事件常量，用来标识接收主应用刷新页签事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// view：视图信息
emitter.on(tagsView.EVENT_REFRESH_VIEW, (view) => {
    console.log(view);
});
```

## EVENT_CLOSE_VIEW

- 类型：`string`

- 详情：主应用关闭页签事件常量，用来标识接收主应用关闭页签事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// view：视图信息
emitter.on(tagsView.EVENT_CLOSE_VIEW, (view) => {
    console.log(view);
});
```

## EVENT_CLOSE_OTHERS_VIEW

- 类型：`string`

- 详情：主应用关闭其他页签事件常量，用来标识接收主应用关闭其他页签事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// view：当前视图信息
emitter.on(tagsView.EVENT_CLOSE_OTHERS_VIEW, (view) => {
    console.log(view);
});
```

## EVENT_CLOSE_ALL_VIEW

- 类型：`string`

- 详情：主应用关闭所有页签事件常量，用来标识接收主应用关闭所有页签事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
emitter.on(tagsView.EVENT_CLOSE_ALL_VIEW, () => {

});
```

## EVENT_VISITED_CHANGE

- 类型：`string`

- 详情：主应用页签改变事件常量，用来标识接收主应用页签改变事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// views: 当前打开的视图集合
emitter.on(tagsView.EVENT_VISITED_CHANGE, (views) => {
    console.log(views);
});
```

## EVENT_CACHED_CHANGE

- 类型：`string`

- 详情：主应用页签缓存改变事件常量，用来标识接收主应用页签缓存改变事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, tagsView } =  this.$MF
// views: 当前缓存的视图集合
emitter.on(tagsView.EVENT_CACHED_CHANGE, (views) => {
    console.log(views);
});
```