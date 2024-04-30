import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Class_categories',
    {
      Class_cate_ID: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Class_cate_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      C_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      valid: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: 'class_categories', // 直接提供資料表名稱
      timestamps: false, // 不使用自動時間戳記
      paranoid: false, // 軟刪除
      underscored: true, // 所有自動產生的欄位都將使用蛇形命名法(snake_case)
    }
  )
}
