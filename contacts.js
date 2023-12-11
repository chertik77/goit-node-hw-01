import fs from 'fs/promises'
import path from 'path'

const contactsPath = path.resolve('db', 'contacts.json')

export const listContacts = async () => JSON.parse(await fs.readFile(contactsPath))

export const getContactById = async (contactId) => {
  const contacts = await listContacts()
  return contacts.find((contact) => contact.id === contactId) || null
}

export async function removeContact(contactId) {
  const contacts = await listContacts()
  const idx = contacts.findIndex((contact) => contact.id === contactId)
  if (idx === -1) return null
  const [result] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: contacts.length + 1, name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}
