import mock from '@/fake-db/mock.js'

// Contact
const data = {
contacts: [
{
uid: 1,
displayName: 'sakshi.jain@gmail.com',
about: 'hello',
photoURL: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
status: 'offline'
},
{
uid: 2,
displayName: 'pankaj@gmail.com',
about: 'hello',
photoURL: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
status: 'do not disturb'
},
{
uid: 3,
displayName: 'sakshi.jain@gmail.com',
about: 'how can I help You',
photoURL: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
status: 'do not disturb'
},
{
uid: 4,
displayName: 'Verla Morgano',
about: 'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
photoURL: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
status: 'online'
},
{
uid: 5,
displayName: 'Margot Henschke',
about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
photoURL: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
status: 'do not disturb'
},
{
uid: 6,
displayName: 'Sal Piggee',
about: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
photoURL: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
status: 'online'
},
{
uid: 7,
displayName: 'Miguel Guelff',
about: 'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
photoURL: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
status: 'online'
},
{
uid: 8,
displayName: 'Mauro Elenbaas',
about: 'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
photoURL: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
status: 'away'
},
{
uid: 9,
displayName: 'Bridgett Omohundro',
about: 'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
photoURL: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
status: 'offline'
},
{
uid: 10,
displayName: 'Zenia Jacobs',
about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
photoURL: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
status: 'away'
}
],
chats: {
1: {
isPinned: true,
msg: [

{
textContent: '',
time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
isSent: true,
isSeen: true
},
]
},


}
}

// Functions
const chatDataOfUser = (id) => {
return data.chats[Object.keys(data.chats).find(key => key == id)]
}

// GET : Contacts List
mock.onGet('/api/apps/chat/contacts').reply((request) => {

// Filter contact based on search query
const filteredContacts = data.contacts.filter((contact) => {
return contact.displayName.toLowerCase().includes(request.params.q.toLowerCase())
})

return [200, filteredContacts]
})


// GET : Get All Contacts
// mock.onGet('/api/apps/chat/contacts').reply(() => {
// return [200, data.contacts]
// })

// GET : Get All Chats
// mock.onGet('/api/apps/chat/chats').reply(() => {
// return [200, data.chats]
// })

// GET : Chats List
// mock.onGet('/api/apps/chat/chat-contacts').reply((request) => {

// const chatContactsArray = data.contacts.filter((contact) => {
// if (data.chats[contact.uid]) return data.chats[contact.uid] && contact.displayName.toLowerCase().includes(request.params.q.toLowerCase())
// })

// return [200, chatContactsArray]
// })


// POST : Mark all msgs as seen
mock.onPost('/api/apps/chat/mark-all-seen/').reply((request) => {
const contactId = JSON.parse(request.data).contactId


// Get chat data
const chatLog = chatDataOfUser(contactId)

// console.log(chatLog);
chatDataOfUser(1) == chatLog

// Loop over all msg & mark them as seen
chatLog.msg.forEach((msg) => {
msg.isSeen = true
})

// Set unsen Msg flag to 0
chatLog.unseenMsg = 0

// console.log(data.chats[0] == chatDataOfUser(contactId));

return [200]
})


mock.onPost('/api/apps/chat/set-pinned/').reply((request) => {
const {contactId, value} = JSON.parse(request.data)
const index = Object.keys(data.chats).find(key => key == contactId)
data.chats[index].isPinned = value
return [200, data.chats[index]]
})


mock.onPost('/api/apps/chat/msg').reply((request) => {
const payload = JSON.parse(request.data).payload

// Get chat data
payload.chatData = chatDataOfUser(payload.id)

if (payload.chatData) {
// If there's already chat. Push msg to existing chat
data.chats[Object.keys(data.chats).find(key => key == payload.id)].msg.push(payload.msg)
} else {
// Create New chat and add msg
data.chats[payload.id] = {isPinned: payload.isPinned,
msg: [payload.msg]}
}

return [200]
})


mock.onPost('/api/apps/chat/mark-all-seen').reply((request) => {
const uid = JSON.parse(request.data).id

// Get chat data
const chatLog = chatDataOfUser(uid)

chatLog.msg.forEach((msg) => {
msg.isSeen = true
})

return [200]
})