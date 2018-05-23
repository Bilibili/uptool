'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    }
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    // if you see this, don't do strange things to my account, thank you
    const cookies = [
      { url: 'http://.bilibili.com', name: 'fts', value: '1501048940' },
      { url: 'http://.bilibili.com', name: 'buvid3', value: '88CAFD7C-792F-466D-AE57-84C7307ACF3C37219infoc' },
      { url: 'http://.bilibili.com', name: 'sid', value: '78qho50i' },
      { url: 'http://.bilibili.com', name: 'pgv_pvi', value: '7117887488' },
      { url: 'http://.bilibili.com', name: 'biliMzIsnew', value: '1' },
      { url: 'http://.bilibili.com', name: 'biliMzTs', value: '0' },
      { url: 'http://.bilibili.com', name: 'rpdid', value: 'oxmsqkxpimdosookomsxw' },
      { url: 'http://.bilibili.com', name: 'LIVE_BUVID', value: 'AUTO3615149494578886' },
      { url: 'http://.bilibili.com', name: 'member_v2', value: '1' },
      { url: 'http://.bilibili.com', name: 'DedeUserID', value: '1289279' },
      { url: 'http://.bilibili.com', name: 'DedeUserID__ckMd5', value: 'f86a6724c93d4704' },
      { url: 'http://.bilibili.com', name: 'SESSDATA', value: '7f409d3b%2C1528614941%2C336bae34' },
      { url: 'http://.bilibili.com', name: 'bili_jct', value: '8744bd3cb59e8256a75fd3cfc9643f57' },
      { url: 'http://.bilibili.com', name: '_dfcaptcha', value: '19baee554fbe158fe0880834bf7844ea' },
      // your cookie goes here (testing only)
    ]

    const { session } = require('electron')
    for (var i = 0; i < cookies.length; i++) {
      console.log(cookies[i])
      session.defaultSession.cookies.set(cookies[i], (error) => {
        if (error) console.error(error)
      })
    }
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
