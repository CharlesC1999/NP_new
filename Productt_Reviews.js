import { DataTypes } from 'sequelize'

export default function (sequelize) {
  const ProductReview = sequelize.define(
    'ProductReview', // 类名称，通常首字母大写
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
        references: {
          model: 'Product', // 这里应该是模型的名称，而不是表名
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允许 NULL，表示评论可能不关联具体的用户
        references: {
          model: 'User', // 这里应该是模型的名称，而不是表名
          key: 'id',
        },
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

  // 设置模型之间的关联
  ProductReview.belongsTo(sequelize.models.Product, {
    foreignKey: 'product_id',
  })
  ProductReview.belongsTo(sequelize.models.User, { foreignKey: 'user_id' })

  return ProductReview
}
