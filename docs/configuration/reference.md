# 配置项参考

## 子系统扩展配置

包括子系统icon、开发环境、生产环境等扩展配置，配置为后台管理配置，如图：

![子系统配置](/images/configuration/subsystem-config.jpg)

### devPort

- 类型：`Number`

- 默认值：`10000` ，不配置默认从 `10000` 开始，多个子系统会按加载顺序以 `1` 自增

- 必填：`是`

- 描述：`开发环境(dev)` 模式下，主项目加载子系统时的 `端口号`，主项目使用下面规则来生成子项目地址 `devUrl` ：
`http://localhost:${devPort}/` ， 例如： `白蚁防治` 子系统配置为 `9003`, 则子系统加载地址为：`http://localhost:9003/`。

::: warning
此值必须要配置，而且需要配置为 `zhfc-cli` [创建子系统](../guide/getting-started.md#生成子项目) 时使用的 `启动端口`，不配置虽然有默认值，但是由于子系统加载顺序的不确定性，每次端口可能会不一致导致子系统加载失败！
:::

### prodUrl

- 类型：`String`

- 默认值：`""` 

- 必填：`是`

- 描述：`线上环境(prod或stage)` 模式下，主项目加载子系统时的项目地址 `prodUrl`，此值相对于 `devPort`，`dev` 模式不需要配置完整的地址(`ip为localhost`)，只需配置端口号。

::: warning
此值必须要配置，而且需要配置为 [部署](../guide/deploy.md/#子路径部署) `步骤五` 的子系统地址，否则线上环境子系统加载失败！
:::

### icon

- 类型：`String`

- 默认值：`"guide"` 

- 必填：`否`

- 描述：显示在主项目系统切换栏子系统图标，如图：

![子系统图标](/images/configuration/subsystem-icon.jpg)

::: tip
1. icon 格式为 `svg` 。
2. 配置 `icon` 后，需要在主项目 `src/icons/svg` 目录增加同名称图标，否则子系统图标会显示显示空白。
:::

## 子系统菜单扩展配置

包括子系统菜单icon、name、hidden等扩展配置，配置为后台管理配置，如图：

![子系统配置](/images/configuration/subsystem-menu-config.jpg)

### name

- 类型：`String`

- 默认值：`""`

- 必填：`是`

- 描述：菜单项名称。

::: warning
此值必须要配置。此值和菜单地址对应子系统路由的 `name` 属性 以及路由对应组件的 `name` 属性三者保持一致，否则会导致组件缓存失败，切换页签时页面刷新表单已填内容丢失。
:::

![子菜单name](/images/configuration/subsystem-menu-name.jpg)

### icon

- 类型：`String`

- 默认值：菜单组为 `"list"` 菜单项为 `"component"` 

- 必填：`否`

- 描述：显示在主项目菜单栏菜单项图标，如图：

![子系统图标](/images/configuration/subsystem-menu-icon.jpg)

::: tip
1. icon 格式为 `svg` 或者 `el-icon-x element-ui` 的 `icon` 。
2. 如果icon为 `svg`，配置 `icon` 后需要在主项目 `src/icons/svg` 目录增加同名称图标，否则菜单项图标会显示显示空白。
:::

### hidden

- 类型：`Boolean`

- 默认值：`false` 

- 必填：`否`

- 描述：菜单是否显示在主项目菜单栏，设置为 `true` 后在菜单栏不可见，但对应的路由地址依然是可用的，如401，login等页面，或者如一些编辑页面/edit/1。
参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `hidden` 属性。

### redirect

- 类型：`String`

- 默认值：`""` 

- 必填：`否`

- 描述：点击主项目面包屑路由时的重定向地址，当设置 `noRedirect` 的时候该路由在面包屑导航中不可被点击，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `redirect` 属性。

### alwaysShow

- 类型：`Boolean`

- 默认值：菜单组为 `true` , 菜单项为 `false` 

- 必填：`否`

- 描述：此配置仅对菜单组起作用，当菜单组只有一个子菜单项时是否显示菜单组，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `alwaysShow` 属性。

### roles

- 类型：`Array`

- 默认值：`[]` 

- 必填：`否`

- 描述：设置该路由进入的权限，支持多个权限叠加，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `meta.roles` 属性。

### noCache

- 类型：`Boolean`

- 默认值：`false` 

- 必填：`否`

- 描述：如果设置为 `true` 则不会缓存页面，切换页签后页面会刷新，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `meta.noCache` 属性。

### breadcrumb

- 类型：`Boolean`

- 默认值：`true` 

- 必填：`否`

- 描述：如果设置为 `false` 则菜单对应页面不会出现在主项目面包屑导航中，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `meta.breadcrumb` 属性。

### affix

- 类型：`Boolean`

- 默认值：`false` 

- 必填：`否`

- 描述：如果设置为 `true` 则菜单对应页面会固定在页签左侧，不能关闭，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `meta.affix` 属性。

### activeMenu

- 类型：`String`

- 默认值：`""` 

- 必填：`否`

- 描述：路由被匹配时，激活的菜单项地址，参考 [vue-admin-template->路由和侧边栏](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9) `meta.activeMenu` 属性。

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