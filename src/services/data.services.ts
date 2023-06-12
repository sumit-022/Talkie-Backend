import Data from "../model/data.model"

/* Fetch all data from Data */
export const fetchAllData = async () => {
  try {
    const data = await Data.find({})
    return data
  } catch (error) {
    throw new Error(error)
  }
}
