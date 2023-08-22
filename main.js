const { app, BrowserWindow, desktopCapturer, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Register the global hotkey for screenshot capture
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    captureScreenshot();
  });

  mainWindow.loadFile('index.html');
});

function captureScreenshot() {
  desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } })
    .then(sources => {
      const source = sources[0];
      if (source) {
        const stream = source.thumbnail.toPNG();
        console.log("Screenshot captured!")
        const screenshotDataUrl = `data:image/png;base64,${stream.toString('base64')}`;
        updateImageSrc(screenshotDataUrl);
      }
    })
    .catch(err => {
      console.error('Error capturing screenshot:', err);
    });
}

function updateImageSrc(dataUrl) {
  mainWindow.webContents.executeJavaScript(`
    const screenshotImg = document.getElementById('screenshotImg');
    screenshotImg.src = '${dataUrl}';
  `);
}
