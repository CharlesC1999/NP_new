import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product', // 類名稱，通常首字母大寫
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false, // 描述可以為空
      },
      origin_price: {
        type: DataTypes.DECIMAL(10, 2), // 假設價格有兩位小數
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // 折扣價可能為空，表示沒有折扣
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      upload_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'products', // 直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
