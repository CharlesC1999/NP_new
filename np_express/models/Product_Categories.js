import { DataTypes } from 'sequelize'

export default function (sequelize) {
  const ProductCategory = sequelize.define(
    'Product_Category', // 类名称，通常首字母大写
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // 允许 NULL
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允许 NULL
      },
    },
    {
      tableName: 'product_categories', // 直接提供数据表名称
      timestamps: false, // 如果您的表中没有自动生成的时间戳字段
      underscored: true, // 使用蛇形命名规则
    }
  )

  // 如果有父子关系，可以设置自参照的关联
  ProductCategory.hasMany(ProductCategory, {
    as: 'Children',
    foreignKey: 'parent_id',
  })
  ProductCategory.belongsTo(ProductCategory, {
    as: 'Parent',
    foreignKey: 'parent_id',
  })

  return ProductCategory
}
