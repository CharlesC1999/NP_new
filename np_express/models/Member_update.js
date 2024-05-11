import { DataTypes } from 'sequelize'

const Member_update = async (sequelize) => {
  return sequelize.define(
    'Member_update', //- 與檔案同名，要大寫
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_of_member: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      third_party_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      call_back: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      processed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'member_update', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}

export default Member_update
