import db from '../../../db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { site, email, nickname, description, date } = req.body
      await db.insertUser({ site, email, nickname, description, date })
      res.status(200).json({ message: 'User added successfully' })
    } catch (error) {
      console.error('Error while adding user:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
