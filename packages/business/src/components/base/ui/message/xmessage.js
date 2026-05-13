import Message from '../message'
let messageInstance = null
const mainMessage = options => {
  if (messageInstance) messageInstance.close()
  messageInstance = Message(options)
}
const arr = ['success', 'warning', 'info', 'error']
arr.forEach(type => {
  mainMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return mainMessage(options)
  }
})
const XMessage = mainMessage
export default XMessage
