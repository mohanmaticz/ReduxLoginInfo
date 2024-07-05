exports.FindMany = async (dbModel) => {
    try {
        const data = await dbModel.find()
        return data
    } catch (error) {
        return error.message
    }
}

exports.FindById = async (dbModel, query, selection) => {
    try {
        const data = await dbModel.findOne({...query}, selection)
        return data
    } catch (error) {
        return error.message
    }
}

exports.FindByIdAndUpdate = async (dbModel, query, newData) => {
    try {
        const data = await dbModel.findByIdAndUpdate({...query}, newData, {new: true})
        return data
    } catch (error) {
        return error.message
    }
}

exports.FindByIdAndDelete = async (dbModel, query) => {
    try {
        const data = await dbModel.findByIdAndDelete({...query})
        return data
    } catch (error) {
        return error.message
    }
}