import { SidebarConfig } from 'vuepress'

// sidebar configuration
export const sidebar: SidebarConfig = {
    "/guide": [
        {
            text: "指南",
            children: [
                "/guide/intro.md",
                "/guide/getting-started.md",
                "/guide/subsystem-config.md",
                "/guide/deploy.md"
            ]
        }
    ],
    "/configuration": [
        {
            text: "配置",
            children: [
                "/configuration/subsystem.md",
                "/configuration/subproject.md"
            ]
        }
    ],
    "/api": [
        {
            text: "API",
            children: [
                "/api/intro.md",
                "/api/auth.md",
                "/api/user.md",
                "/api/emitter.md",
                "/api/tagsview.md",
                "/api/microapp.md",
                "/api/options.md",
            ]
        }
    ]
}
