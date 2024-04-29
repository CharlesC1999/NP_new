import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product_review', // 类名称，通常首字母大写
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允许 NULL，表示评论可能不关联具体的产品
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允许 NULL，表示评论可能不关联具体的用户
      },
      comment: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATEONLY, // 使用 DATEONLY 因为只存储日期部分
        allowNull: true,
      },
    },
    {
      tableName: 'product_reviews', // 直接提供数据表名称
      timestamps: false, // 不使用自动的 createdAt 和 updatedAt
      underscored: true, // 使用蛇形命名规则
    }
  )
}
