# 脚手架配置项参考

脚手架配置项是项目脚手架中的配置文件、配置项，包括 `.env` 等配置。

## 主项目 `.env` 配置

包括主项目服务地址、应用名、微前端参数等配置，如图：

![主项目.env](/images/configuration/mainsystem-env.jpg)

### VUE_APP_BASE_API

- 类型：`String`

- 默认值：`""` 

- 必填：`是`

- 描述：主项目后台服务基地址。

### VUE_APP_NAME

- 类型：`String`

- 默认值：`""` 

- 必填：`是`

- 描述：主项目应用名，值为 `zhfc-cli` [生成主项目](../guide/getting-started.md#生成主项目) 的 `应用名`。

### VUE_APP_ELEMENT_SIZE

- 类型：`String`

- 默认值：`"small"` 

- 必填：`是`

- 描述：主项目 `element-ui` 组件 `size` ，如果子项目也是 `vue + element-ui` ，子项目将继承此配置。

### VUE_APP_MICRO_PREFETCH

- 类型：`Boolean`

- 默认值：开发环境为 `false` ， 线上环境 (prod或stage) 为 `true` 

- 必填：`是`

- 描述：微前端是否启用预加载，配置为 `true` 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源，线上环境可开启选项优化子项目加载速度。

### VUE_APP_MICRO_STYLE_ISOLATION

- 类型：`Boolean`

- 默认值：`true` 

- 必填：`是`

- 描述：微前端是否启用样式隔离，配置为 `true` 时子应用样式会自动增加微前端应用名前缀，参考 [隔离沙箱](../guide/intro.md#隔离沙箱) 中 `样式隔离`

::: tip
1. 由于 `shadow dom` 方式的样式隔离存在一些技术问题，项目中都是使用增加应用名前缀方式。
2. 增加应用名前缀的样式隔离同样存在局限性，对于增加到子应用外的 `dom` 节点样式会失效，例如：`el-dialog`、`el-select` 等组件会将弹出内容添加到 `body` 节点下，而不是在子应用挂载节点下，样式隔离会失效，修改子应用中这些组件样式时应注意！
:::

### VUE_APP_MICRO_KEEP_ALIVE

- 类型：`Boolean`

- 默认值：`true` 

- 必填：`是`

- 描述：微前端是否启用 `KeepAlive` 模式，配置为 `true` 时切换子应用并不会执行子应用 `unmount` 生命周期函数，子应用不会卸载，挂载 `dom` 会隐藏，在这种模式下 [隔离沙箱](../guide/intro.md#隔离沙箱) 还是会执行副作用清理，避免子应用之间的污染，由于子应用并未卸载，当下次重新激活子应用时，子应用还能恢复到之前的状态，隔离沙盒也会重新应用副作用，这样就可以做到子系统之间切换页签时使用缓存，页面不刷新。

::: tip
`qiankun` 框架本身是不支持 `KeepAlive` 模式的，为了解决子系统之间切换页签缓存问题，对 `qiankun` 框架进行了修改，项目中使用的 `qiankun-dhcc` 增加了此功能。
:::

## 子项目 `.env` 配置

包括子项目服务地址、应用名、部署参数等配置，如图：

![子项目.env](/images/configuration/subsystem-env.jpg)

### VUE_APP_BASE_API

- 类型：`String`

- 默认值：`""` 

- 必填：`是`

- 描述：子项目后台服务基地址。

### VUE_APP_NAME

- 类型：`String`

- 默认值：`""` 

- 必填：`是`

- 描述：子项目应用名，值为 `zhfc-cli` [生成子项目](../guide/getting-started.md#生成子项目) 的 `应用名`。

### VUE_APP_DEPLOY_MODE

- 类型：`String`

- 默认值：`"2"` 

- 必填：`是`

- 描述：子应用部署方式, 1：独立端口根路径部署，2：与主应用同一端口子路径部署，参考 [根路径部署](../guide/deploy.md#根路径部署) 和 [子路径部署](../guide/deploy.md#子路径部署)。

::: tip
开发模式配置文件 `.env.development.xxx` 不存在此配置，仅线上环境配置文件有效。
:::