import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'ProductImage', // 類名稱，通常首字母大寫
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // 指定外鍵對應的表名
          key: 'id', // 指定外鍵對應的表中的列
        },
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 預設排序為0，可以根據需要進行調整
      },
    },
    {
      tableName: 'product_images', // 直接提供資料表名稱
      timestamps: false, // 若不需要自動的創建時間和更新時間
      paranoid: false, // 不使用軟刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
    }
  )
}
