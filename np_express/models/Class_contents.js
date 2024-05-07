import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Class_contents',
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      F_class_ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      F_classImageOrder_ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      contents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'class_contexts', // 直接提供資料表名稱
      timestamps: false, // 不使用自動時間戳記
      paranoid: false, // 軟刪除
      underscored: false,
    }
  )
}
