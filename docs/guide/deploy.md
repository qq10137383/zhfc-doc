# 部署

前面几节已经完成了整个微前端的开发配置功能，这一节将会帮助你如何部署微前端项目到生产环境，部署服务端以 `nginx` 为例，
部署 `ip` 约定为 `192.168.0.159` 。

## 部署主项目

1. **步骤一**：进入主项目目录，输入如下命令：

``` bash
npm run build:prod
```

打包完成后会生成命名方式为 `main_${主项目名}` 的输出目录，将此目录拷贝到 `nginx` 的 `apps` 目录， 如图：

![主项目部署](/images/guide/deploy-main.jpg)

::: tip
1. 输出环境：产品环境使用 `npm run build:prod` , 测试环境使用 `npm run build:stage` 。
2. 输出命名规则：主项目默认以 `main_` 开头，子项目默认以 `sub_` 开头。
:::

2. **步骤二**：打开 `nginx/conf/nginx.conf` 文件，添加以下配置：

```
# XTZHFC
server {
    # 监听端口
    listen       9070;
    server_name  localhost;

    location / {
        # 主项目部署包根路径
        root   D:/dev/nginx-1.21.5_wqd/apps/main_xtzhfc/;
        index  index.html;

        # 解决history路由刷新404的问题
        try_files $uri $uri/ /index.html;

        # 使用协商缓存，解决页面缓存问题
        expires -1s;   
        add_header Cache-Control no-cache;   
        add_header Cache-Control private; 
    }
}
```
::: tip
1. `监听端口` 和 `根目录路径` 按实际修改。
2. 为了减少部署不必要的麻烦，主项目请部署到 <span class='c-red'>根路径</span>： `location /` ，不要部署到子路径如： `location /xtzhfc`
:::

1. **步骤三**：启动 `nginx`， 测试主项目是否部署成功。

启动：

``` bash
# windows 环境
cd D:\dev\nginx-1.21.5_wqd
start nginx
```

打开浏览器，访问地址：`http:/192.168.0.159:9070/`，能看到登录页面，说明部署成功！

## 部署子项目

子系统的部署和主项目基本一致，不同的是它即可以部署在根路径： `location /` , 又可以部署在子路径如：`location /byfz` ， 两种方式任意一种即可。

### 根路径部署

根路径部署模式会将子应用和主应用部署在不同的端口，但路径都是根路径。

1. **步骤一**：修改配置文件 `.env.production`，找到 `VUE_APP_DEPLOY_MODE` 修改为 `1`：

``` 
# 子应用部署方式, 1：独立端口根路径部署，2：与主应用同一端口子路径部署
VUE_APP_DEPLOY_MODE = 1
```

2. **步骤二**：进入子项目目录，输入如下命令：

``` bash
npm run build:prod
```

打包完成后会生成命名方式为 `sub_${子项目名}` 的输出目录，将此目录拷贝到 `nginx` 的 `apps` 目录， 如图：

![子项目根路径部署](/images/guide/deploy-sub-1.jpg)

3. **步骤三**：打开 `nginx/conf/nginx.conf` 文件，修改为以下配置：

``` 
# XTZHFC
server {
    # 监听端口
    listen       9070;
    server_name  localhost;

    location / {
        # 主项目部署包根路径
        root   D:/dev/nginx-1.21.5_wqd/apps/main_xtzhfc/;
        index  index.html;

        # 解决history路由刷新404的问题
        try_files $uri $uri/ /index.html;

        # 使用协商缓存，解决页面缓存问题
        expires -1s;   
        add_header Cache-Control no-cache;   
        add_header Cache-Control private; 
    }
}

# BYFZ 
server {
    # 监听端口
    listen       10003;
    server_name  localhost;

    location / {
        # 子项目部署包根路径
        root   D:/dev/nginx-1.21.5_wqd/apps/sub_byfz/;
        index  index.html;

        # 解决微前端主项目请求子项目跨域问题
        add_header Access-Control-Allow-Methods *;
        add_header Access-Control-Max-Age 3600;
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Allow-Origin $http_origin;
        add_header Access-Control-Allow-Headers $http_access_control_request_headers;

        # 使用协商缓存，解决页面缓存问题
        expires -1s;   
        add_header Cache-Control no-cache;   
        add_header Cache-Control private; 
    }
}
```

::: tip
1. `监听端口` 和 `根目录路径` 按实际修改。
2. 和主项目不同，需要增加跨域头，解决微前端主项目请求子项目跨域问题。
:::

4. **步骤四**：`nginx` 重新读取配置，输入以下命令：

``` bash
# windows 环境
cd D:\dev\nginx-1.21.5_wqd
nginx -s reload
```

5. **步骤五**：修改后台管理子系统配置

使用管理员账号 `admin` 登陆 `V7平台` 管理端，打开 `权限->子系统管理` 编辑子系统，如图：

![编辑子系统](/images/guide/subsystem-edit-1.jpg)

找到 `扩展配置` ，修改 `prodUrl` 为 `http://192.168.0.159:10003/` 。

打开浏览器，访问地址：`http:/192.168.0.159:9070/${子系统代号}`，登录完成后跳转，能看到系统加载成功的信息，如图：

![子系统加载成功](/images/guide/deploy-sub-success.jpg) 

### 子路径部署

子路径部署模式会将子应用和主应用部署在相同的端口，主应用使用根路径，子应用使用子路径。

1. **步骤一**：修改配置文件 `.env.production`，找到 `VUE_APP_DEPLOY_MODE` 修改为 `2`：

``` 
# 子应用部署方式, 1：独立端口根路径部署，2：与主应用同一端口子路径部署
VUE_APP_DEPLOY_MODE = 2
```

2. **步骤二**：进入子项目目录，输入如下命令：

``` bash
npm run build:prod
```

打包完成后会生成命名方式为 `sub_${子项目名}` 的输出目录，将此目录拷贝到 `nginx` 的 `apps` 目录。

3. **步骤三**：打开 `nginx/conf/nginx.conf` 文件，修改为以下配置：

``` bash
server {
    # 监听端口
    listen       9070;
    server_name  localhost;

    # XTZHFC
    location / {
        # 主项目部署包根路径
        root   D:/dev/nginx-1.21.5_wqd/apps/main_xtzhfc/;
        index  index.html;

        # 解决history路由刷新404的问题
        try_files $uri $uri/ /index.html;

        # 使用协商缓存，解决页面缓存问题
        expires -1s;   
        add_header Cache-Control no-cache;   
        add_header Cache-Control private; 
    }

    # BYFZ
    location /sub_byfz {
        # 子项目部署包根路径
        alias   D:/dev/nginx-1.21.5_wqd/apps/sub_byfz/;
        index  index.html;

        # 使用协商缓存，解决页面缓存问题
        expires -1s;   
        add_header Cache-Control no-cache;   
        add_header Cache-Control private; 
    }
}
```

::: tip
1. `监听端口` 和 `根目录路径` 按实际修改。
2. 和根路径部署不同，由于和主项目端口号相同，不存在跨域问题，不需要加跨域头。
:::

4. **步骤四**：`nginx` 重新读取配置，输入以下命令：

``` bash
# windows 环境
cd D:\dev\nginx-1.21.5_wqd
nginx -s reload
```

5. **步骤五**：修改后台管理子系统配置

使用管理员账号 `admin` 登陆 `V7平台` 管理端，打开 `权限->子系统管理` 编辑子系统，如图：

![编辑子系统](/images/guide/subsystem-edit-2.jpg)

找到 `扩展配置` ，修改 `prodUrl` 为 `http://192.168.0.159:9070/sub_byfz/` 。

打开浏览器，访问地址：`http:/192.168.0.159:9070/${子系统代号}`，登录完成后跳转，能看到系统加载成功的信息，如图：

![子系统加载成功](/images/guide/deploy-sub-success.jpg) 

::: tip 
1. 一个应用系统只部署一个主项目，可以部署一个或多个子项目。
2. 多个子项目部署，重复当前部署子项目步骤。
:::