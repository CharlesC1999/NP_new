import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Orders_detail',
    {
      order_Item_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // order_id: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      //   // primaryKey: true,
      //   comment: 'UUID',
      // }, 跟下面是依樣
      order_detail_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // primaryKey: true,
        comment: 'UUID',
      },
      // 新增欄位
      thing_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },

      // 等於product_id
      commodity_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true, // Make nullable to accommodate orders that might only include classes
        // references: {
        //   model: 'products', // Assumes the table name for products is 'products'
        //   key: 'Product_ID', // Assumes the primary key for products is 'Product_ID'
        // }
      },
      class_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true, // Make nullable to accommodate orders that might only include products
        // references: {
        //   model: 'classes', // Assumes the table name for classes is 'classes'
        //   key: 'Class_ID', // Assumes the primary key for classes is 'Class_ID'
        // }
      },
      quantity: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10),
        allowNull: false,
      },
      product_type: {
        type: DataTypes.ENUM,
        values: ['product', 'class'],
        allowNull: false,
      },
    },
    {
      tableName: 'orders_detail', // Directly provide the table name
      timestamps: false, // Do not use automatic timestamps
      paranoid: false, // Disable soft deletes
      underscored: true, // Use snake_case for all automatically generated fields
    }
  )
}
