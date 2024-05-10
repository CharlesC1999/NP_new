import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Line_member', //- 與檔案同名，要大寫
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      line_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line_access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'line_member', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
