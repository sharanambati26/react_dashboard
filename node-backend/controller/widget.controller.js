import Category from "../model/Category.js";

export const getWidgets = async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        let formattedData = categories.map(prev => ({id: prev._id, name: prev.name, widgets: prev.widgets.map(prevWid => ({id: prevWid._id, name: prevWid.name, content: prevWid.content, isActive: prevWid.isActive, created: prevWid.created}))}))
        res.status(200).json({ status: 1, data: formattedData}); // Send the data as JSON
    } catch (err) {
        res.status(500).json({ status: 0, message: err });
    }
}

export const addWidget = async (req, res) => {
    const widget = req.body;
        const category = await Category.findById(widget.type);
    
        if (!category) {
            return res.status(404).send(JSON.stringify({status: 0, msg: 'Category not found'}));
        }

        // Add new widget to the category's widgets array
        category.widgets.push({
            name: widget.name,
            content: widget.content,
            isActive: 1
        });

        // Save the updated category
        await category.save();
    res.send(JSON.stringify({status: 1, msg: 'Data Inserted'}));
}

export const removeWidget = async (req, res) => {
    try {
        // Find the category and remove the widget from its widgets array
        const {categoryId, widgetId } = req.body;
        const category = await Category.findOneAndUpdate(
            { _id: categoryId }, 
            { $pull: { widgets: { _id: widgetId } } }, // Removing the widget with widgetId from widgets array
            { new: true }
        );

        if (!category) {
            return res.status(404).send({ status: 0, msg: 'Category not found' });
        }

        res.send({ status: 1, msg: `Widget ${widgetId} removed successfully` });
    } catch (err) {
        console.error('Error removing widget:', err);
        res.status(500).send({ status: 0, msg: 'Failed to remove widget' });
    }
}

export const hideWidgets = async (req, res) => {
    try {
        const checkboxState  = req.body;
        const updatePromises = [];
        for (const categoryId in checkboxState) {
            for (const widgetId in checkboxState[categoryId]) {
                const isActive = checkboxState[categoryId][widgetId] ? 1 : 0;
                updatePromises.push(
                    Category.updateOne(
                        { _id: categoryId, 'widgets._id': widgetId },  
                        { $set: { 'widgets.$.isActive': isActive } }    
                    )
                );
            }
        }
        await Promise.all(updatePromises);
        res.send({ status: 1, msg: 'Widgets updated successfully' });
    } catch (err) {
        console.error('Error removing widget:', err);
        res.status(500).send({ status: 0, msg: 'Failed to hide widget' });
    }
}