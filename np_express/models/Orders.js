import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Order',
    {
      Order_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      Member_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Order_date: {
        type: DataTypes.DATE, // 正確的資料類型應該是 DATE
        allowNull: false,
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
      },
      Shipping_address: {
        type: DataTypes.STRING, // 正確的資料類型應該是 STRING
        allowNull: false,
      },
    },
    {
      tableName: 'Order', // 不需要引號
      timestamps: true, // 根據需要保留或刪除
      paranoid: false, // 軟性刪除
    }
  )
}
