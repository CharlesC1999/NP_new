import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Recipe_Categories',
    {
      Recipe_cate_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Recipe_cate_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      R_Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Recipe_cate_img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'recipe_categories', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
