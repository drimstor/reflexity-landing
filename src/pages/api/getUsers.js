import db from '../../../db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await db.getUsers()
    res.status(200).json(users)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
