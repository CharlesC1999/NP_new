import { DataTypes } from 'sequelize'

const Line_member = async (sequelize) => {
  return sequelize.define(
    'Line_member',
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      line_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line_access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      callback_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      tableName: 'line_member',
      timestamps: false,
      paranoid: false,
      underscored: true,
    }
  )
}

export default Line_member
