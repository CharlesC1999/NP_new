import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Member', //- 與檔案同名，要大寫
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      User_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      Account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Create_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Last_login: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valid: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
        defaultValue: 1,
      },
      User_image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'member', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
