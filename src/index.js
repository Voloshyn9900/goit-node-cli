// Код можна запустити через команди з приставками "npm start --" або "node src/index.js"
// Наприклад:
// $ npm start -- -a add -n Mango -e mango@gmail.com -p 322-22-22
// $ node src/index.js -a add -n Mango -e mango@gmail.com -p 322-22-22
// $ node src/index.js -a remove -i qdggE76Jtbfd9eWJHrssH

import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await contactsService.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
