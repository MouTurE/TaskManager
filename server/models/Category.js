module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        categoryName : {
            type: DataTypes.STRING,
            allowNull: false
        } 
    });

    Category.associate = function(models) {
        Category.hasMany(models.Task, {
            foreignKey : 'categoryId',
            onDelete: 'CASCADE',
        });
    }

    return Category;

};