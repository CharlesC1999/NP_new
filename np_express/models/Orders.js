import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Orders',
    {
      order_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        comment: 'UUID',
      },
      user_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      // 原本是total_amount
      amount_total: {
        type: DataTypes.INTEGER(10), // 假设总金额需要两位小数
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING(50),
        defaultValue: null,
        comment: 'line pay, 信用卡, ATM',
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      recipient_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      shipping_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contact_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // 原本是   coupon_id
      o_coupon_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        // references: {
        //   model: 'coupons', // 假设优惠券表名为 'coupons'
        //   key: 'id', // 假设优惠券表的主键是 'id'
        // }
      },
      discount_Amount: {
        type: DataTypes.DECIMAL(10),
        allowNull: true,
      },

      //
      order_total_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM,
        values: ['處理中', '已完成', '取消', '已退款'],
        defaultValue: '處理中',
        allowNull: true,
      },

      // product_Type: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

      // line的status

      status: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        comment: 'pending, paid, fail, cancel, error',
      },

      // 這邊是linepay 所需欄位
      transaction_id: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      order_info: {
        type: DataTypes.TEXT,
        comment: 'send to line pay',
      },
      reservation: {
        type: DataTypes.TEXT,
        comment: 'get from line pay',
      },
      confirm: {
        type: DataTypes.TEXT,
        comment: 'confirm from line pay',
      },
      return_code: {
        type: DataTypes.STRING(255),
        defaultValue: null,
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
