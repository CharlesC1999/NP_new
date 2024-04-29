import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Class_image',
    {
      Image_ID: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      F_Class_ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      Image_URL: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true, // 允許空值，因為 mediumtext 在 Sequelize 中沒有對應類型
      },
      Sort_order: {
        type: DataTypes.INTEGER(5),
        allowNull: false, // 允許空值
      },
      Upload_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'class_image', // 直接提供資料表名稱
      timestamps: false, // 不使用自動時間戳記
      paranoid: false, // 軟刪除
      underscored: true, // 所有自動產生的欄位都將使用蛇形命名法(snake_case)
    }
  )
}
