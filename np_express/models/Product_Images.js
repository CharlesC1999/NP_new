import { DataTypes } from 'sequelize'

export default function (sequelize) {
  const ProductImage = sequelize.define(
    'Product_Image', // 类名称，通常首字母大写
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
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true, // 允许 NULL
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      upload_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'product_images', // 直接提供数据表名称
      timestamps: false, // 如果您的表中没有自动生成的时间戳字段
      underscored: true, // 使用蛇形命名规则
    }
  )

  return ProductImage
}
