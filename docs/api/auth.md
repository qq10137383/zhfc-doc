# auth模块

验证模块，提供用户登录验证 `uiticket`、`sid` 、`content-kapt` 等功能。

## getToken

- 类型：`() => string`

- 详情：获取当前用户登录验证 `uiticket`。

- 示例：

``` javascript
const { auth } =  this.$MF
const uiticket = auth.getToken()
```

## setToken

- 类型：`(token:string) => void`

- 详情：设置当前用户登录验证 `uiticket`，子项目不需要调用此方法。  
    - `token`: 用户登录验证 uiticket。

- 示例：

``` javascript
const { auth } =  this.$MF
auth.setToken('1234567890')
```

## removeToken

- 类型：`() => void`

- 详情：清除当前用户登录验证 `uiticket`，子项目不需要调用此方法。

- 示例：

``` javascript
const { auth } =  this.$MF
auth.removeToken()
```

## getSid

- 类型：`() => string`

- 详情：获取当前用户登录验证 `sid`。

- 示例：

``` javascript
const { auth } =  this.$MF
const sid = auth.getSid()
```

## setSid

- 类型：`(sid:string) => void`

- 详情：设置当前用户登录验证 `sid`，子项目不需要调用此方法。  
    - `sid`: 用户登录验证 sid。

- 示例：

``` javascript
const { auth } =  this.$MF
auth.setSid('1234567890')
```

## removeSid

- 类型：`() => void`

- 详情：清除当前用户登录验证 `sid`，子项目不需要调用此方法。

- 示例：

``` javascript
const { auth } =  this.$MF
auth.removeSid()
```

## setAuthHeaders

- 类型：`(headers:Headers) => void`

- 详情：设置验证Headers信息，作用是将 `uiticket`、`sid` 写入请求对象的headers中，内部实际调用 `getToken`、`getSid` 获取信息后设置到 headers，
该方法只是为了方便调用的冗余方法。   
  - `headers`: 用户请求Headers对象。

- 示例：

``` javascript
import axios from 'axios'
import { getMainProps } from '@/micro-frontends'

const service = axios.create({...xxxx})

// axios前置拦截器
service.interceptors.request.use(
  config => {
    const headers = config.headers
    if (store.getters.token) {
        // 设置请求头的验证信息
      const props = getMainProps()
      props && props.auth.setAuthHeaders(headers)
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

## removeAll

- 类型：`() => void`

- 详情：清除当前用户登录所有验证信息，包括 `uiticket`、`sid` 、`content-kapt` 、`content-login` 、`content-lock` ，子项目不需要调用此方法。

- 示例：

``` javascript
const { auth } =  this.$MF
auth.removeAll()
```
