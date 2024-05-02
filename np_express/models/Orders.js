import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Orders', //- 與檔案同名，要大寫
    {
      Order_ID: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id', // 資料庫中的欄位名稱
      },
      Member_ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        field: 'Member_ID', // 資料庫中的欄位名稱
      },
      Order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'Order_date', // 資料庫中的欄位名稱
      },
      Status: {
        type: DataTypes.ENUM(
          '訂單處理中',
          '已出貨',
          '付款完成',
          '訂單已完成',
          '已取消',
          '已退款'
        ),
        allowNull: false,
        field: 'Status', // 資料庫中的欄位名稱
      },
      Shipping_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'Shipping_address', // 資料庫中的欄位名稱
      },
    },
    {
      tableName: 'orders', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      // underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
