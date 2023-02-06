# microApp模块

微应用模块，提供获取微应用信息、菜单信息、状态栏信息、主应用设置参数等功能。

## getAllAppInfos

- 类型：`() => AppInfo[]`

- 详情：获取当前用户拥有的所有微应用，包括主应用和所有权限范围内子应用(未加载和已加载)。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appInfos = microApp.getAllAppInfos()
```

## getMicroAppInfos

- 类型：`() => AppInfo[]`

- 详情：获取当前用户拥有的所有微应用，包括所有权限范围内子应用(未加载和已加载)，不包括主应用。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appInfos = microApp.getMicroAppInfos()
```

## getAppInfo

- 类型：`(appName:string) => AppInfo`

- 详情：获取指定微应用信息。
    - `appName`：微应用名称。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appInfo = microApp.getAppInfo("byfz")
```

## getCurrentAppInfo

- 类型：`() => AppInfo`

- 详情：获取获取当前激活的微应用信息。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appInfo = microApp.getCurrentAppInfo()
```

## setApp

- 类型：`(appName:string) => void`

- 详情：设置当前激活的微应用。
    - `appName`：微应用名称
- 示例：

``` javascript
const { microApp } =  this.$MF
microApp.setApp('byfz')
```

## getAllAppMenus

- 类型：`() => MenuInfo[]`

- 详情：获取当前用户拥有的所有微应用的菜单信息，包括主应用和所有权限范围内子应用菜单(未加载和已加载)。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appMenus = microApp.getAllAppMenus()
```

## getMicroAppMenus

- 类型：`() => MenuInfo[]`

- 详情：获取当前用户拥有的所有微应用的菜单信息，包括所有权限范围内子应用菜单(未加载和已加载)，不包括主应用菜单。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appMenus = microApp.getMicroAppMenus()
```

## getAppMenu

- 类型：`(appName:string) => MenuInfo[]`

- 详情：获取指定微应用的菜单信息。
    - `appName`：微应用名称。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appMenus = microApp.getAppMenu("byfz")
```

## getCurrentMenus

- 类型：`() => MenuInfo[]`

- 详情：获取获取当前激活的微应用菜单信息。
- 示例：

``` javascript
const { microApp } =  this.$MF
const appMenus = microApp.getCurrentMenus()
```

## getSidebarStatus

- 类型：`() => boolean`

- 详情：获取主项目侧边栏打开状态。
- 示例：

``` javascript
const { microApp } =  this.$MF
const opened = microApp.getSidebarStatus()
```

## setSidebarStatus

- 类型：`(opened:boolean) => void`

- 详情：设置主项目侧边栏打开状态。
    - `opened`：侧边栏是否打开
- 示例：

``` javascript
const { microApp } =  this.$MF
microApp.setSidebarStatus(true)
```

## getElementSize

- 类型：`() => string`

- 详情：获取主项目 `element-ui` 使用组件 `size`。
- 示例：

``` javascript
const { microApp } =  this.$MF
const size = microApp.getElementSize()
```

## setElementSize

- 类型：`(size:string) => void`

- 详情：设置主项目 `element-ui` 使用组件 `size`。
    - `size`：`element-ui` 组件 `size`
- 示例：

``` javascript
const { microApp } =  this.$MF
microApp.setElementSize('small')
```

## getAppSettings

- 类型：`() => Record<string,any>`

- 详情：获取主项目应用程序设置信息。
- 示例：

``` javascript
const { microApp } =  this.$MF
const settings = microApp.getAppSettings()
```

## setAppSettings

- 类型：`(settings:Record<string,any>) => void`

- 详情：设置主项目应用程序设置信息。
    - `settings`：设置信息
- 示例：

``` javascript
const { microApp } =  this.$MF
microApp.setAppSettings({
  theme: '#0000ff', // 主题
  showSettings: true, // 是否显示右侧边设置面板
  tagsView: true, // 是否显示页签栏
  fixedHeader: true, // 是否固定导航栏
  sidebarLogo: true // 是否显示左侧边Logo
})
```

## EVENT_APP_CHANGE

- 类型：`string`

- 详情：微应用切换事件常量，用来标识接收微应用切换事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, microApp } =  this.$MF
// appName：当前激活的微应用名
emitter.on(microApp.EVENT_APP_CHANGE, (appName) => {
    console.log(appName);
});
```

## EVENT_SIDEBAR_CHANGE

- 类型：`string`

- 详情：主应用侧边栏状态切换事件常量，用来标识接收主应用侧边栏状态切换事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, microApp } =  this.$MF
// opened：侧边栏是否是打开状态
emitter.on(microApp.EVENT_SIDEBAR_CHANGE, (opened) => {
    console.log(opened);
});
```

## EVENT_ELEMENT_SIZE_CHANGE

- 类型：`string`

- 详情：主应用 `element-ui` 组件 `size` 切换事件常量，用来标识接收主应用 `element-ui` 组件 `size` 切换事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, microApp } =  this.$MF
// size：element-ui 组件 size
emitter.on(microApp.EVENT_ELEMENT_SIZE_CHANGE, (size) => {
    console.log(size);
});
```

## EVENT_SETTINGS_CHANGE

- 类型：`string`

- 详情：主应用设置参数切换事件常量，用来标识接收主应用设置参数切换事件，需要结合 [emitter](#emitter模块) 模块使用。
  
- 示例：

``` javascript
const { emitter, microApp } =  this.$MF
// settings：主应用设置参数
emitter.on(microApp.EVENT_SETTINGS_CHANGE, (settings) => {
    console.log(setting);
});
```

## MAIN_APP_NAME

- 类型：`string`

- 详情：主应用应用名常量，值为 `'main'` 。

- 示例：

``` javascript
const { microApp } =  this.$MF
// 输出：'main'
console.log(microApp.MAIN_APP_NAME);
```