import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'fone-chrome-extension',
  description: '',
  version: '0.0.0',
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    // default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
    // "default_title":"fone",
  },
  options_page: 'batchscript.html',
  // devtools_page: "devtools.html",
  // background: {
  //   service_worker: 'src/background/index.js',
  //   type: 'module',
  // },
  content_scripts: [
    {
      matches: ['https://fone.risen.com/*', 'http://10.10.9.27:8080/*'],
      js: ['src/content/index.js'],
    },
  ],
  // allow sending messages from web pages
  externally_connectable: {
    matches: ['https://fone.risen.com/*', 'http://10.10.9.27:8080/*'],
  },
  web_accessible_resources: [
    {
      resources: [
        'img/logo-16.png',
        'img/logo-34.png',
        'img/logo-48.png',
        'img/logo-128.png',
        'inject.js',
      ],
      matches: ['https://fone.risen.com/*', 'http://10.10.9.27:8080/*'],
    },
  ],
  permissions: ['webRequest', 'activeTab', 'scripting', 'storage', 'tabs', "declarativeNetRequest", "declarativeNetRequestFeedback", "<all_urls>"],
  host_permissions: [
    'https://fone.risen.com:80/*',
    'http://10.10.9.27:8080/*',
    'http://10.10.9.27:80/*',
    'http://xuxiyao.com/*',
    'https://esbtest.risen.com/*',
    'https://object.risen.com/*',
  ],
})
