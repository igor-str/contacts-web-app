import {RouteInterface, RoutePathEnum} from "../types/router";
import ContactList from "../pages/ContactList";
import Root from "../pages/Root";

export const routeList: RouteInterface[] = [
  {
    component: Root,
    path: RoutePathEnum.root,
    exact: true
  },
  {
    component: ContactList,
    path: RoutePathEnum.contactList,
    exact: true
  }
]
