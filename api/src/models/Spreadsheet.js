// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Spreadsheet",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        client:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        month:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grossPayoutETH:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grossPayoutUSDT:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grossPayoutPercentage:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        energyCostETH:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        energyCostUSDT:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        energyCostPercentage:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managementFeETH:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managementFeUSDT:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managementFePercentage:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        netPayoutETH:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        netPayoutUSDT:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        netPayoutPercentage:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};