import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Orders',
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2), // 假设总金额需要两位小数
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipient_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coupon_id: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        // references: {
        //   model: 'coupons', // 假设优惠券表名为 'coupons'
        //   key: 'id', // 假设优惠券表的主键是 'id'
        // }
      },
      discount_Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      product_Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'orders',
      timestamps: true, // 如果你想要 Sequelize 自动处理 createdAt 和 updatedAt
      paranoid: true, // 如果你想要启用软删除功能
      underscored: true, // 使用蛇形命名法 (snake_case) 对于数据库字段名
    }
  )
}
