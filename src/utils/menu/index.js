import { Menu, MenuItem } from "electron";
import file from "./file";
import edit from "./edit";

const menu = new Menu();
menu.append(new MenuItem(file));
menu.append(new MenuItem(edit));

export default menu;
