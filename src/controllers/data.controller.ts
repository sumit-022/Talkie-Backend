import { fetchAllData } from "../services/data.services"

/* Get all data */
export const getAllData = async (req, res) => {
  try {
    const data = await fetchAllData()

    res.status(200).json({ message: "Data fetched successfully", data: data, error: null })
  } catch (error) {
    res.status(500).json({ message: "An error occured!", data: null, error: error.message })
  }
}
