import {RouteInterface, RoutePathEnum} from "../types/router";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

export const routeList: RouteInterface[] = [
  {
    component: ContactForm,
    path: RoutePathEnum.root,
    exact: true
  },
  {
    component: ContactList,
    path: RoutePathEnum.contactList,
    exact: true
  }
]
