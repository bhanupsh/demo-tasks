
const API_BASE_URL = "https://xfzqtyxlm6.execute-api.ap-south-1.amazonaws.com/";

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    } finally {
        console.log("Fetch attempt completed");
    }
};  

