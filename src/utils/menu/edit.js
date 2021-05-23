export default {
  label: "Edit",
  submenu: [
    {
      label: "Undo",
      accelerator: process.platform === "darwin" ? "Cmd+Z" : "Ctrl+Z",
      click() {
        console.log("Teste");
      },
    },
    {
      label: "Redo",
      accelerator:
        process.platform === "darwin" ? "Cmd+Shift+Z" : "Ctrl+Shift+Z",
      click() {
        console.log("Teste");
      },
    },
  ],
};
