# emitter模块

事件模块，提供主系统、子系统事件通知功能，内部使用了 `mitt`，详细文档参考 [mitt](https://github.com/developit/mitt)

## on

- 类型：`(type:string,handler:Function) => void`

- 详情：订阅事件。
    - `type`: 事件类型
    - `handler`: 事件处理函数
- 示例：

``` javascript
const { emitter } =  this.$MF
emitter.on('say',(payload)=> {
    console.log(payload)
})
```

## off

- 类型：`(type:string,handler:Function) => void`

- 详情：移除事件订阅。
    - `type`: 事件类型
    - `handler`: 事件处理函数
- 示例：

``` javascript
const { emitter } =  this.$MF
emitter.off('say',someFunction)
```

## emit

- 类型：`(type:string,evt:any) => void`

- 详情：移除事件订阅。
    - `type`: 事件类型
    - `evt`: 事件参数
- 示例：

``` javascript
const { emitter } =  this.$MF
emitter.emit('say',"hello")
```
