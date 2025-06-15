import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import OpenAI from 'openai'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { autoUpdater, AppUpdater } from 'electron-updater'
import log from 'electron-log'
import { dialog } from 'electron'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

const configuration = {
  // @ts-ignore (define in dts)
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  organization: 'org-f7Q7ypJpglT8flHx55RJA605'
}

const openai = new OpenAI(configuration)

ipcMain.handle('assistantQuestion', async (_, { relevantPosts, prompt, conversation }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
            Jesteś asystentem, który pomaga tworzyć wpisy na platformę Instagram. 
            Konto należy do marki obuwia i Twoim zadaniem jest przygotowywanie gotowych do publikacji wpisów w języku polskim. 
            Wpisy powinny być bardzo mocno inspirowane stylem istniejących przykładów, które są podane poniżej (oddzielone znakiem |). 
            Nie używaj emoji.
            
            Zasady formatowania: 
            - Odpowiednio dziel tekst na paragrafy. 
            - Używaj znaku nowej linii jedynie jako \\u2028. 
            - Przed sekcją z hasztagami zawsze wstaw dokładnie dwa znaki nowej linii.
            
            Tone i styl: 
            - Unikaj przechwalającego się tonu. 
            - W razie potrzeby możesz zadawać pytania, aby lepiej dopasować treść wpisu do potrzeb.
            
            Odpowiedzi: 
            - Odpowiadaj **tylko** w formacie JSON:
              - {"type": "suggestion", "content": "Twoja sugestia..."} 
              - {"type": "post", "content": "Gotowy wpis..."} 
            - Upewnij się, że każda odpowiedź jest poprawnym JSON-em, bez dodatkowych znaków, białych spacji ani nowej linii.
            - Nie odpowiadaj na pytania niezwiązane z powyższym tematem.
            
            Wpisy: ${relevantPosts}
            `
      },
      ...conversation.map((message) => ({
        role: message.isUser ? 'user' : 'assistant',
        content: message.text
      })),
      {
        role: 'system',
        content: `
        Przypomnienie: Odpowiadaj zawsze w formacie JSON:
        {"type": "suggestion", "content": "Twoja sugestia..."}
        {"type": "post", "content": "Gotowy wpis..."}
        `
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

    const parsedAnswer = await JSON.parse(answer.trim())
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

  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-available', (info) => {
  autoUpdater
    .downloadUpdate()
    .then(() => {
      console.log('Update downloaded:', info)
    })
    .catch((error) => {
      log.error('Error downloading update:', error)
      dialog.showErrorBox(
        'Update Error',
        'An error occurred while downloading the update. Please try again later.'
      )
    })
})

autoUpdater.on('update-downloaded', () => {
  const result = dialog.showMessageBoxSync({
    type: 'question',
    buttons: ['Restart now', 'Later'],
    defaultId: 0,
    message: 'A new update is ready. Restart the app to install it?'
  })

  if (result === 0) {
    try {
      log.info('Installing update...')
      autoUpdater.quitAndInstall()
    } catch (error) {
      log.error('Error during update installation:', error)
      dialog.showErrorBox(
        'Update Installation Error',
        'An error occurred while installing the update. Please try again later.'
      )
    }
  }
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
