import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories', // 指定外鍵對應的表名
          key: 'id', // 指定外鍵對應的表中的列
        },
      },
      product_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_description: {
        type: DataTypes.TEXT('medium'), // 或者 DataTypes.MEDIUMTEXT 根據 Sequelize 的版本
        allowNull: true, // 根據您的圖表允許 NULL
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許 NULL
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許 NULL
      },
      upload_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'products', // 直接提供資料表名稱
      timestamps: false, // 如果您的表中没有自動生成的時間戳字段
      underscored: true, // 使用蛇形命名規則
    }
  )

  return Product
}
