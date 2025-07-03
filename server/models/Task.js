module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        content : {
            type: DataTypes.STRING,
            allowNull : false
        },
        completed : {
            type : DataTypes.BOOLEAN
            
        }
    })
    
    Task.associate = function(models) {
        Task.belongsTo(models.Category, {
            foreignKey: 'categoryId',
        });
    };

    return Task;

}