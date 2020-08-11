import {RouteInterface, RoutePathEnum} from "../types/router";
import ContactList from "../pages/ContactList";
import About from "../pages/About";

export const routeList: RouteInterface[] = [
  {
    component: About,
    path: RoutePathEnum.about,
    exact: true
  },
  {
    component: ContactList,
    path: RoutePathEnum.root,
    exact: true
  }
]
