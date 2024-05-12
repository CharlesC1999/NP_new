import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Class',
    {
      Class_ID: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Class_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Class_description: {
        type: DataTypes.TEXT,
        allowNull: true, // 允許空值，因為 mediumtext 在 Sequelize 中沒有對應類型
      },
      C_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      C_discount_price: {
        type: DataTypes.INTEGER(5),
        allowNull: true, // 允許空值
      },
      F_Speaker_ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      Current_person: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      Class_person_limit: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      Start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      End_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Class_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Class_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Class_category_ID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'class', // 直接提供資料表名稱
      timestamps: false, // 不使用自動時間戳記
      paranoid: false, // 軟刪除
      underscored: true, // 所有自動產生的欄位都將使用蛇形命名法(snake_case)
    }
  )
}
