import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import OpenAI from 'openai'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

const configuration = {
  apiKey:
    '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',
  organization: 'org-f7Q7ypJpglT8flHx55RJA605'
}

const openai = new OpenAI(configuration)

ipcMain.handle('assistantQuestion', async (_, { relevantPosts, prompt }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: `Jesteś asystentem, który pomaga tworzyć wpisy na platformie instagram. Konto przeznaczone jest marce obówniczej. Powinieneś tworzyć gotowe do opublikowania wpisy w języku polskim bardzo mocno inspirowane w stylu tymi, które już istnieją i zostały podane poniżej. Nie używaj emoji. Pamiętaj o odpowiednim formatowaniu wpisu i całej swojej odpowiedzi. Unikaj przechwalającego się tonu. Poszczególne poprzednie wpisy będą oddzielone znakiem |. Możesz zadać pytanie, aby dowiedzieć się więcej na temat wpisu, który chcesz stworzyć. Nie wolno ci odpowiadać na pytania niezwiązane z powyszym tematem. Odpowiadaj tylko i wyłącznie w formie {"type": "suggestion" | "post", content }. Wpisy: ${relevantPosts}`
          }
        ]
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt
          }
        ]
      }
    ]
  })

  try {
    const answer = completion.choices[0].message.content || ''

    const parsedAnswer = await JSON.parse(answer)
    return parsedAnswer
  } catch (error) {
    console.error('Error fetching OpenAI response:', error)
    return 'error'
  }
})

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
