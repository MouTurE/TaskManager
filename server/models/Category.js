module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Category;
} 