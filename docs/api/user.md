# user模块

提供用户信息获取、退出登录、重置用户信息等功能。

## getUserInfo

- 类型：`() => UseInfo`

- 详情：获取当前用户信息。

- 示例：

``` javascript
const { user } =  this.$MF
const userInfo = user.getUserInfo()
```

## logout

- 类型：`() => void`

- 详情：退出用户登录。

- 示例：

``` javascript
const { user } =  this.$MF
user.logout()
```
::: warning
退出登录后不是切换路由到 `/login` ，而是会刷新页面 `(window.reload)`，因为 `qiankun` 没有提供销毁微应用的方法，为了防止微应用状态出现问题而使用了刷新策略。
:::

## resetUserInfo

- 类型：`(toLogin:boolean) => void`

- 详情：重置用户信息。  
`toLogin`: 是否重置后退到登录页面。

- 示例：

``` javascript
const { user } =  this.$MF
user.resetUserInfo(true)
```
