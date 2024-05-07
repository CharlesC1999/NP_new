import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product_categories', // 类名称，通常首字母大写
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cate_png: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // 允许 NULL
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允许 NULL
      },
    },
    {
      tableName: 'product_categories',
      timestamps: false,
      underscored: true,
    }
  )
}
