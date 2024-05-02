import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Recipe',
    {
      Recipe_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Title_R_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image_URL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Publish_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Recipe_category_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipe_valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Ingredients_Count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Cooking_Time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Portion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Steps: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'recipe', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
