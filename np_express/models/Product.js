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
        allowNull: true,
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
      tableName: 'product', // 直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )

  return Product
}
