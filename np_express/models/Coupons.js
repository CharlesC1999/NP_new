import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Coupons',
    {
      Coupon_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      Member_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      C_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      C_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      Discount_amount: {
        type: DataTypes.DECIMAL(7, 2),
        defaultValue: null,
      },

      Discount_type: {
        type: DataTypes.ENUM('百分比', '金額'),
        allowNull: false,
      },

      Coupon_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },

      Valid_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      Valid_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      coupon_image: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },

      minimum_spend: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      C_status: {
        type: DataTypes.ENUM('已失效', '可使用', '已使用'),
        allowNull: false,
      },
    },
    {
      tableName: 'coupons',
      timestamps: false,
      paranoid: false,
    }
  )
}
