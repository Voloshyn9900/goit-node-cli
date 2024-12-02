// Код можна запустити через команди з приставками "npm start --" або "node src/index.js"
// Наприклад:
// $ npm start -- -a add -n Mango -e mango@gmail.com -p 322-22-22
// $ node src/index.js -a add -n Mango -e mango@gmail.com -p 322-22-22
// $ node src/index.js -a remove -i qdggE76Jtbfd9eWJHrssH

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("src/db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexRemove = contacts.findIndex((index) => index.id === contactId);
  if (indexRemove === -1) {
    return null;
  }
  const [result] = contacts.splice(indexRemove, 1);
  await updateContacts(contacts);
  return result;
}
