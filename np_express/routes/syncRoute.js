import { Router } from 'express'
const router = Router()
import syncMemberUpdates from '##/services/updateService.js'

router.post('/sync-updates', async (req, res) => {
  try {
    await syncMemberUpdates()
    res.send('Updates have been synchronized.')
  } catch (error) {
    console.error('Error during update synchronization:', error)
    res.status(500).send('Failed to synchronize updates.')
  }
})

export default router
