import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Speaker_Categories', //- 與檔案同名，要大寫
    {
      speaker_cate_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      speaker_cate_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      }
    },
    {
      tableName: 'speaker_categories', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
