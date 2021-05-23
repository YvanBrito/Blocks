import { BrowserWindow } from "electron";

export default {
  label: "File",
  submenu: [
    {
      label: "New Model",
      accelerator: process.platform === "darwin" ? "Cmd+M" : "Ctrl+M",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Delete Model",
      accelerator: process.platform === "darwin" ? "Cmd+W" : "Ctrl+W",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "New Dimension",
      accelerator: process.platform === "darwin" ? "Cmd+D" : "Ctrl+D",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Open Model",
      accelerator: process.platform === "darwin" ? "Cmd+O" : "Ctrl+O",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Save Model",
      accelerator: process.platform === "darwin" ? "Cmd+S" : "Ctrl+S",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Save Model As",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Setting",
      submenu: [
        {
          label: "Change Theme",
          submenu: [
            {
              label: "Light",
              click() {
                BrowserWindow.getFocusedWindow().webContents.send(
                  "change-theme",
                  "light"
                );
              },
            },
            {
              label: "Dark",
              click() {
                BrowserWindow.getFocusedWindow().webContents.send(
                  "change-theme",
                  "dark"
                );
              },
            },
          ],
        },
        {
          label: "Change Locale",
          submenu: [
            {
              label: "Portuguese",
              click() {
                BrowserWindow.getFocusedWindow().webContents.send(
                  "change-locale",
                  "pt-br"
                );
              },
            },
            {
              label: "English",
              click() {
                BrowserWindow.getFocusedWindow().webContents.send(
                  "change-locale",
                  "en-us"
                );
              },
            },
          ],
        },
      ],
    },
  ],
};
