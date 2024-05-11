import { DataTypes } from 'sequelize'

const Google_member = async (sequelize) => {
  return sequelize.define(
    'Google_member', //- 與檔案同名，要大寫
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      google_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      callback_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      tableName: 'google_member', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}

export default Google_member
