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
    
    return Task;

}