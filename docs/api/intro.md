# 微前端API参考

微前端 `API` 是由微前端主项目创建并传递到子项目的对象和方法，子项目使用这些 `API` 与主项目和其他子项目交互。

## 概述

主项目作为宿主容器统一管理用户的登录、菜单、权限等功能，子项目嵌入到主项目之后要正常运行需要获取用户的登录、权限等信息，`API` 提供了以下几个模块供子项目调用，如下：

- [user](./user.md)：用户模块，提供用户信息获取、退出登录、重置用户信息等功能。
- [auth](./auth.md)： 验证模块，提供用户登录验证 `uiticket`、`sid` 、`content-kapt` 等功能。
- [emitter](./emitter.md)： 事件模块，提供主系统、子系统事件通知功能。
- [microApp](./microapp.md)： 微应用模块，提供获取微应用信息、菜单信息、状态栏信息、主应用设置参数等功能。
- [tagsView](./tagsview.md): 页签模块，提供打开页签、关闭页签、刷新页签等页签、路由相关功能。
- [options](./options.md): `options` 对象，提供微前端应用启动参数信息。

## 子项目如何使用？

主项目加载子项目，子项目在 `mounted` 的时候会接受到主项目下传的 `API` 对象，在子项目中可以通过以下方式访问该对象，如下：

``` javascript
import { getMainProps } from "@/micro-frontends"

// 获取当前加载的微应用信息
function getCurrentApp() {
    const { microApp } = getMainProps()
    const appInfo = microApp.getCurrentAppInfo()
    return appInfo
}
```

此外 `API` 对象还会挂接到 `vue` 全局原型链中，子项目中 `vue` 组件除了上面的方式还可以通过 `this.$MF` 访问到该对象，如下:

``` javascript
export default {
    methods: {
        // 获取当前加载的微应用信息
        getCurrentApp() {
            const { microApp } =  this.$MF
            const appInfo = microApp.getCurrentAppInfo()
            return appInfo
        }
    }
}
```

## 常用功能

### 子应用获取用户登录 `token`、`sid`

子应用数据请求需要在在 `headers` 中增加验证信息， [auth](./auth.md) 模块的提供了这些功能接口，下面示例演示如何在 `axios` 前置拦截器中增加验证信息。

``` javascript
import axios from 'axios'
import { getMainProps } from '@/micro-frontends'

// axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 3 * 60 * 1000 // request timeout
})

// request前置拦截器
service.interceptors.request.use(
  config => {
    const headers = config.headers
    if (store.getters.token) {
      const props = getMainProps()
       // 使用auth模块setAuthHeaders方法设置headers中uiticket、sid
      props && props.auth.setAuthHeaders(headers)
      // 如果headers中key需要自定义，使用下面代码代替
      // if(props) {
      //    const { getToken, getSid } = props.auth
      //    headers["custom-uitickt"] = getToken();
      //    headers["custom-sid"] = getSid();
      // }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

```

### 子应用获取用户信息

子应用中需要用户登录用户信息、退出登录，[user](./user.md) 模块的提供了这些功能接口，下面示例演示如何在 `vue` 组件中获取用户信息，
当然使用 `api`方式 `getMainProps` 也是可以的。

``` javascript
export default {
    methods: {
        getUser() {
            const { user } =  this.$MF
            const userInfo = user.getUserInfo()
            return userInfo
        },
        logout() {
            const { user } =  this.$MF
            user.logout() 
        }
    }
}

```

最佳实践：对于使用 `vue` 子应用模块的子项目，使用 `store` 是最佳方式，子项目模板中在 `store -> user` 模块中同步了主项目用户信息，并监听了用户信息的改变，下面的使用方式更加贴近传统的 `vue` 项目，而且可以使用 `watch` 监听用户信息改变，如下：

``` javascript
import { mapGetters } from 'vuex'

export default {
    computed: {
     ...mapGetter(['userInfo'])
    },
    methods: {
        test() {
            console.log(this.userInfo)
        }
    },
    watch: {
        // 监听userInfo
        userInfo(val) {
            console.log(val);
        }
    }
}
```

### 子系统打开、关闭、刷新页签

传统的 `vue` 应用中需要使用 `router` 进行导航，其本质是使用 `History Api` ，在微前端的应用中同样也是如此，既可以使用
`vue router`，还可以使用 [tagsView](./tagsview.md) 模块提供的方法。

::: warning
1. 使用 `vue router` 导航时路由有范围限制，它仅能在本子系统的路由范围内导航，不能调用其他子系统的路由，比如：在白蚁防治子系统中使用
`vue router` 它仅能导航白蚁防治子系统的路由，不能导航主项目和安全鉴定等其他子系统的路由。
1. 使用 `tagsView` 模块可以导航所有主项目、子项目路由，它需要传递 `appName` 参数，使用 `vue router` 导航则不需要此参数，它默认是在本子系统中导航。
2. 推荐统一使用 `tagsView` 模块导航路径。
:::

1. 使用 `tagsView` 模块，示例如下：

``` javascript
export default {
    methods: {
        openView() {
            const { tagsView, microApp  } =  this.$MF
            // 1、打开主应用dashboard视图
            tagsView.openView({
                appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
                path: "/dashboard"
            })
            // 2、打开白蚁防治子应用委托受理信息页面
            tagsView.openView({
                appName: 'byfz',   
                path: "/entrustDisposeInfo"
            })
            // 3：带查询参数(参数在路径中)
            tagsView.openView({
                appName: "byfz",
                path: "/entrustDisposeInfo?id=1234"
            })
            // 4：带查询参数(参数在query)
            tagsView.openView({
                appName: "byfz",
                path: "/entrustDisposeInfo",
                query: { id: 1234 }
            })
            // 5：路径参数(参数在路径中)
            tagsView.openView({
                appName: "byfz",
                path: "/entrustDisposeInfo/1",
            })
            // 6：路径参数(参数在params)
            tagsView.openView({
                appName: "byfz",
                path: "/entrustDisposeInfo",
                params: { id: 1 }
            })
        },
        closeView() {
            const { tagsView, microApp  } =  this.$MF
           // 1、关闭主应用dashboard视图
            tagsView.closeView({
                appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
                path: "/dashboard"
            })
            // 2、关闭白蚁防治子应用委托受理信息页面
            tagsView.closeView({
                appName: 'byfz',   
                path: "/entrustDisposeInfo"
            })
        },
        refreshView() {
            const { tagsView, microApp  } =  this.$MF
           // 1、刷新主应用dashboard视图
            tagsView.refreshView({
                appName: microApp.MAIN_APP_NAME,   // 传'main'也可以
                path: "/dashboard"
            })
            // 2、刷新白蚁防治子应用委托受理信息页面
            tagsView.refreshView({
                appName: 'byfz',   
                path: "/entrustDisposeInfo"
            })
        },
        closeCurentView() {
            const { tagsView } =  this.$MF
            // 关闭当前打开视图
            tagsView.closeCurentView();
        },
        refreshCurrentView() {
            const { tagsView } =  this.$MF
            // 刷新当前打开视图，刷新后缓存将失效
            tagsView.refreshCurrentView();
        }
    }
}

```

2. 使用 `vue router` 模块，示例如下：

``` javascript
// 白蚁防治子系统组件
export default {
    methods: {
        openView() {
            // 1、导航到子本系统内委托受理信息页面
            this.$router.push("/entrustDisposeInfo");
            // 2：带查询参数(参数在路径中)
            this.$router.push("/entrustDisposeInfo?id=1234");
            // 3：带查询参数(参数在query)
            this.$router.push({
                path: "/entrustDisposeInfo",
                query: { id: 1234 }
            })
            // 4：路径参数(参数在路径中)
            this.$router.push("/entrustDisposeInfo/1")
            // 5：路径参数(参数在params)
            this.$router.push({
                path: "/entrustDisposeInfo",
                params: { id: 1 }
            })
        }
    }
}
```

### 子系统、路由菜单信息

子系统需要获取后台配置的子系统和路由菜单信息，[microapp](./microapp.md) 模块的提供了这些功能接口，下面示例演示如何在 `vue` 组件中获取白蚁防治子系统、路由菜单信息。

``` javascript
export default {
    methods: {
        getAppAndMenus() {
            const { microApp } =  this.$MF
            // 子系统信息
            const appInfo = microApp.getAppInfo("byfz")
            // 子系统路由菜单信息
            const appMenus = microApp.getAppMenu("byfz")
            return { appInfo, appMenus }
        }
    }
}

```


### 子系统通信

子项目需要和主项目或者其他子项目通信，[emitter](./emitter.md) 模块的提供了全局的事件对象，可以通过此对象监听、发送消息，示例如下：

``` javascript
// 白蚁防治子系统
export default {
    methods: {
        sendMsg() {
            const { emitter } = this.$MF
            emitter.emit('say', {
                appName: "byfz",
                payload: "hello"
            });
        }
    }
}
```

``` javascript
// 安全鉴定子系统
export default {
    mounted() {
        const { emitter } = this.$MF
        emitter.on('say', this.recieveMsg);
    },
    beforeDestroy() {
        // 组件销毁时需用卸载监听
        const { emitter } = this.$MF
        emitter.off('say', this.recieveMsg);
    },
    methods: {
        recieveMsg(msg) {
            console.log(msg);
        }
    }
}
```
除了自定义消息，主项目中还提供了很多系统消息，详情参考 [microApp](./microapp.md) 、 [tagsView](./tagsview.md) 等模块 `EVENT_`开头的常量。