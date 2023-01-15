# 子系统配置

上一节生成了脚手架工程，运行主项目可以看到登录页面，但是登录账号、子系统、菜单还没有创建，这一章节将会帮助你在 `V7平台` 系统管理中创建这些后台配置，并在子系统中创建菜单对应路由 `vue router`、页面 `vue component` 。

## 创建子系统后台配置

### 创建子系统

使用管理员账号 `admin` 登陆 `V7平台` 管理端，打开 `权限->子系统管理` 添加子系统，如图：

![创建子系统](/images/guide/create-subsystem.jpg)

::: tip
1. 名称：子系统标题，显示在主项目系统切换菜单栏的标题<span class='c-red'>（必填）</span>。
2. 代号：子系统代码，为了减少部署的麻烦，此值需要和上一节 [生成子项目](./getting-started.md/#生成子项目) 时输入的 `应用名` 保持一致，此值同时定义了子系统的 [激活规则](./intro.md/#子系统加载)，规则为: `/${代号}`，此例中当路由地址为：`/byfz/xxxxx` 时会加载此子系统<span class='c-red'>（必填）</span>。
3. 扩展配置：扩展配置定义了子系统的额外配置，主要配置作用如下：
   - devPort：子系统在开发模式（本地运行）时的启动端口，此值需要和上一节 [生成子项目](./getting-started.md/#生成子项目) 时输入的 `启动端口` 保持一致，<span class='c-red'>不正确的值会导致开发模式下子系统加载失败！（必填）</span>。
   - prodUrl：子系统在产品模式（发布）时的应用地址，这里暂时可以先配置为 `""`，等部署到生产环境后再修改，更多细节请参考 [子路径部署](./deploy.md/#子路径部署) `步骤五` , <span class='c-red'>不正确的值会导致部署模式下子系统加载失败！（必填）</span>。
   - icon：子系统图标，显示在主项目系统切换菜单栏的图标。
:::

扩展配置示例，更多配置请参考 [子系统扩展配置](../configuration/reference.md#子系统扩展配置) ：

``` json
{ 
    "devPort": 9003, 
    "prodUrl": "http://192.168.0.159:9070/sub_byfz/",
    "icon": "byfz" 
}
```

### 创建子系统菜单

使用管理员账号 `admin` 登陆 `V7平台` 管理端，打开 `权限->功能定义` 添加子系统菜单组、菜单，配置前需先切换到上一步配置的子系统，如图：

![创建子系统菜单](/images/guide/create-menu.jpg)

::: tip
1. 上一级：菜单组或菜单项的父级节点，用来生成上下级关系<span class='c-red'>（必填）</span>。
2. 名称：菜单组或菜单项的标题，显示在主项目菜单栏的标题<span class='c-red'>（必填）</span>。
3. 有效：菜单组、菜单项是否有效。<span class='c-red'>（必填）</span>。
4. 节点类型：如果是菜单组选择 `目录` ， 菜单项选择 `功能` ，其他选项暂时无用。<span class='c-red'>（必填）</span>。
5. 页面路径：此值对应子系统中路由地址，仅菜单项有实际意义，此值必须与子系统 `vue router` 定义的 `path` 保持一致，当在主系统中点击菜单项时，会加载子系统路由对应的页面， <span class='c-red'>不正确的值会导致加载菜单项时出现空白页面！（必填）</span>
6. 弹窗类型、后台路径对前端暂时无意义。
7. 扩展配置：扩展配置定义了菜单组、菜单项的额外配置，主要配置作用如下：
   - name：菜单组或菜单项名称，同时也是路由对应 `vue组件` 的 `name` 属性，由于此值对于页面组件缓存有着重要作用，<span class='c-red'>不正确的值会导致页签切换时缓存失效页面刷新，之前表单输入内容会丢失！（必填）</span>
   - icon: 菜单组或菜单项图标，显示在显示在主项目菜单栏的图标。
::: 

扩展配置示例，扩展配置还支持 `vue-admin-template` 中 `router` 定义的所有配置，更多配置请参考 [子系统扩展菜单配置](../configuration/reference.md#子系统菜单扩展配置) ：

``` json
{ 
   "name": "ProjectEntrust",
   "icon": "list" 
}
```

### 租户绑定子系统菜单

使用管理员账号 `admin` 登陆 `V7平台` 管理端，打开 `权限->租户管理->功能` 绑定子系统菜单，如图：

![编辑租户功能](/images/guide/rent-manage-1.jpg)

在 `租户功能详情` 中点击编辑按钮，进入 `租户功能管理` 页面，选中新添加的菜单组、菜单项，保存租户功能，如图：

![保存租户功能](/images/guide/rent-manage-2.jpg)

保存后租户就绑定了新添加的功能，下一步将使用租户管理员进行角色功能绑定。

### 创建角色

使用租户管理员账号 `zhadmin` 登陆 `V7平台` 管理端，打开 `权限->角色管理->添加角色` 创建角色，如图：

![创建角色](/images/guide/create-role.jpg)

::: tip
1. 名称：角色名称
2. 其他配置按照图中默认配置。
:::

### 角色绑定子系统菜单

使用租户管理员账号 `zhadmin` 登陆 `V7平台` 管理端，打开 `权限->角色管理->权限分配` 绑定子系统菜单，如图：

![权限分配](/images/guide/role-func-1.jpg)

在 `角色功能详情` 中点击编辑按钮，进入 `角色功能管理` 页面，选中新添加的菜单组、菜单项，保存角色功能，如图：

![权限分配保存](/images/guide/role-func-2.jpg)

保存后角色就绑定了新添加的功能，下一步将使用租户管理员创建组织、账号。

### 创建组织、账号

使用租户管理员账号 `zhadmin` 登陆 `V7平台` 管理端，打开 `权限->组织管理->添加` 创建组织、账号，如图：

![添加组织](/images/guide/add-org.jpg)

::: tip
1. 名称：组织名称
2. 其他配置按照图中默认配置。
:::

打开 `权限->用户权限->添加人员` 创建账号，需要先选择之前创建组织，如图：

![添加人员](/images/guide/add-account.jpg)

::: tip
用户类型：选择 `普通` 。
:::

### 账号绑定角色

使用租户管理员账号 `zhadmin` 登陆 `V7平台` 管理端，打开 `权限->角色管理->成员管理` 账号绑定角色，如图：

![账号绑定角色](/images/guide/member-manage-1.jpg)

在 `角色分配用户` 中点击添加用户按钮，选中新添加组织，再选择用户保存，如图：

![权限分配保存](/images/guide/member-manage-2.jpg)

::: warning
使用权限：需要选择 `权管` 或者 `权管+使用` ， 仅选择 `使用` 登录后会看不到子系统。
:::

## 创建子系统路由视图

在 [子系统后台配置](#创建子系统后台配置) 中配置了 **子系统**、**菜单**、**角色**、**组织**、**账号**、**权限绑定**，使用创建的账号 `by01` 登录后已经可以看到子系统、菜单，如图：

### 测试子系统加载

首先测试一下子系统是否已正常加载，在浏览器地址栏输入地址： `http://localhost:${主项目启动端口}/${子项目代号}`，如图：

![测试子系统](/images/guide/subsystem-test.jpg)

说明子系统已加载成功。

::: tip
子系统代号: 参考 [创建子系统](#创建子系统) 中 `代号` 设置。
:::

### 测试子系统菜单加载

点击菜单项 `委托受理信息` ， 发现子系统页面空白，如图：

![子系统空白](/images/guide/subsystem-blank.jpg)

说明子系统菜单项对应的路由 `/entrustDisposeInfo` 在子系统代码中没有对应路由匹配，这是因为上一章节创建的子系统脚手架只有一个默认的
保留路由 `/` , 用来 [测试子系统加载](#测试子系统加载)，其他菜单项配置的路由需要自行添加，如图：

![子系统保留路由](/images/guide/cli-reserved-router.jpg)

::: warning
子系统的 `/` 路由为保留路由，不要修改它。
:::

### 创建子系统路由和视图

接下来在子项目中创建路由 `/entrustDisposeInfo` 以及路由对应的视图

路由：

``` javascript
export const constantRoutes = [
  {
    path: '/',
    name: "Portal",
    component: () => import("@/views/portal")
  },
  {
    path: '/entrustDisposeInfo',
    name: "EntrustDisposeInfo",
    component: () => import('@/views/projectEntrust/entrustDisposeInfo'),
  }
]
```

视图：

![子系统视图](/images/guide/subsystem-view.jpg)

::: warning
1. 子系统的路由仅需要 `path`、`name`、`component` 三个属性，其他如 `vue-admin-template` 中的 `meta` 等属性不再需要在路由中配置，
   因为微应用主项目直接从后台配置中生成菜单、路由，不再需要子系统提供这些属性，路由的 `meta` 属性全部迁移到 [创建子系统菜单](#创建子系统菜单) 的
   `扩展配置` 中配置。
2. 子系统的路由不在需要使用 `children` 子路由，全部都配置为一级路由，原因同上，上下级关系直接由后台配置的菜单生成。
3. 路由的 `name` 属性，组件的 `name` 属性， 以及 [后台菜单项](#创建子系统菜单) `扩展配置` 的 `name` 属性这三者必须要保持一致，否则会出现切换页签缓存丢失的问题！
:::

修改完成后，在主项目中重新打开 `白蚁防治->委托受理信息` 就能看到新添加的页面功能，如图：

![子系统视图加载成功](/images/guide/subsystem-view-loaded.jpg)

切换到欢迎页面，再切换回当前页面发现表单输入还在，说明页面缓存已生效，如果不生效请检查 `name` 属性是否一致。

## 系统截图

1. 主项目系统登录  

![系统登录](/images/guide/start-master-login.jpg)  

2. 登录后加载白蚁防治系统（<span class='c-red'>成功</span>）

![白蚁防治加载成功](/images/guide/start-master-byfz.jpg)  

3. 登录后加载安全鉴定系统（<span class='c-red'>失败</span>）  

![安全鉴定加载失败](/images/guide/start-master-aqjd.jpg)  

4. 独立运行白蚁防治系统

![独立运行白蚁防治](/images/guide/start-sub-byfz.jpg)  