export default {
  resizingSidebar() {
    const widthSidebarLeft =
      document.querySelector(".sidebar.left")?.clientWidth || 0;
    const widthSidebarRight =
      document.querySelector(".sidebar.right")?.clientWidth || 0;
    const middleWidth =
      window.innerWidth - (widthSidebarLeft + widthSidebarRight);

    document.querySelector(".middle")?.setAttribute("style", `width:${middleWidth - 6}px`);
  }
}