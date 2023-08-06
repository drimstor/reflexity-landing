import db from '../../../db'
const TelegramBot = require('node-telegram-bot-api')
const botToken = '6471286629:AAGE74rskDfOtA-ukKd59X6BisBND4W1drk'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { site, email, nickname, description, date } = req.body
      await db.insertUser({ site, email, nickname, description, date })
      const bot = new TelegramBot(botToken, { polling: false })

      const sendToTelegramChannel = (message) => {
        const channelId = 558687674
        bot.sendMessage(channelId, message)
      }

      const message = `Новая заявка: 
      
Сайт - ${site}
Почта - ${email}
Ник в телеграм - ${nickname}
Описание продукта - ${description}`

      sendToTelegramChannel(message)

      res.status(200).json({ message: 'User added successfully' })
    } catch (error) {
      console.error('Error while adding user:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
