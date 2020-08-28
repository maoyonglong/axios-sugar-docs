module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'axios-sugar',
      description: 'A wrapper for axios.js'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'axios-sugar',
      description: 'axios.js的二次封装'
    }
  },
  themeConfig: {
    sidebarDepth : 2,
    repo: 'maoyonglong/axios-sugar',
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api/' }
        ],
        sidebar: {
          '/guide/': [
            ['', 'beginning'],
            'configuration',
            ['repeat', 'repeated request'],
            'retry',
            ['network', 'network status'],
            ['save', 'response storage'],
            ['httpstatushandlers', 'handlers for HTTP Response Status']
          ],
          // '/api/': {
          //   sidebar: 'auto'
          // }
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/' },
          { text: 'API', link: '/zh/api/' }
        ],
        sidebar: {
          '/zh/guide/': [
            ['', '开始'],
            ['configuration', '配置'],
            ['repeat', '重复请求'],
            ['retry', '错误重传'],
            ['network', '网络状态'],
            ['save', '响应存储'],
            ['httpstatushandlers', 'HTTP响应状态码处理']
          ],
          // '/zh/api/': {
          //   sidebar: 'auto'
          // }
        }
      }
    } 
  }
}