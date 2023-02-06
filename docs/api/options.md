# options对象

`options` 对象，提供微前端应用启动参数信息，此参数是**只读**的。

## prefetch

- 类型：`boolean`

- 详情：微前端启动时是否启用预加载，[prefetch 详情](../configuration/subproject.md.md/#vue-app-micro-prefetch)。
  
- 示例：

``` javascript
const { options } =  this.$MF
// prefetch
console.log(options.prefetch)
```

## sandbox

- 类型：`SanboxOption`

    ``` typescript 
    interface SanboxOption {
        // 是否启用样式隔离，默认值为true
        experimentalStyleIsolation: boolean
    }
    ```

- 详情：是否启用沙箱隔离，[sandbox 详情](../configuration/subproject.md/#vue-app-micro-style-isolation)。
  
- 示例：

``` javascript
const { options } =  this.$MF
// sandbox
console.log(options.sandbox)
```

## keepAlive

- 类型：`boolean`

- 详情：微前端启动时是否启用keepAlive模式，[keepAlive 详情](../configuration/subproject.md/#vue-app-micro-keep-alive)。
  
- 示例：

``` javascript
const { options } =  this.$MF
// keepAlive
console.log(options.keepAlive)
```