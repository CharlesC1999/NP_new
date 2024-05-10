import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Speaker', //- 與檔案同名，要大寫
    {
      speaker_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      speaker_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      speaker_title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      speaker_description: {
        type: DataTypes.TEXT('medium'), // mediumtext 對應 Sequelize 中的 DataTypes.TEXT('medium')
        allowNull: false,
      },
      speaker_experience: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      speaker_license: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      speaker_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      f_speaker_cate_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      valid: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: 'speaker', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
