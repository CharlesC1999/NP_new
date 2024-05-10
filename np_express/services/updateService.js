import { Sequelize, Op } from 'sequelize'
import Member_update from '##/models/Member_update.js'
import Line_member from '##/models/Line_member.js'
import Google_member from '##/models/Google_member.js'

async function syncMemberUpdates() {
  const updates = await Member_update.findAll({
    where: { call_back: { [Sequelize.Op.not]: null } },
  })

  for (const update of updates) {
    switch (update.type_of_member) {
      case 'line':
        await Line_member.update(
          { call_back: update.callback_id },
          { where: { id: update.third_party_id } }
        )
        break
      case 'google':
        await Google_member.update(
          { call_back: update.callback_id },
          { where: { id: update.third_party_id } }
        )
        break
    }

    // 標記為已處理，避免重複更新
    await update.update({ processed: true })
    console.log('Processed update for ID:', update.id)
  }
}

export default syncMemberUpdates
