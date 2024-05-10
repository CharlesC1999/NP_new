import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Coupons',
    {
      Coupon_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Member_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      C_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      C_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      Discount_amount: {
        type: DataTypes.DECIMAL(7, 2),
        defaultValue: null,
      },
      Discount_type: {
        type: DataTypes.ENUM('百分比', '金額'),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      Coupon_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      minimum_spend: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      C_status: {
        type: DataTypes.ENUM('已失效', '可使用', '已使用', '已發送'),
        allowNull: false,
      },
    },
    {
      tableName: 'coupons', // 直接提供資料表名稱
      timestamps: false, // 不使用自動時間戳記
      paranoid: false, // 軟刪除
      underscored: true, // 所有自動產生的欄位都將使用蛇形命名法(snake_case)
    }
  )
}
