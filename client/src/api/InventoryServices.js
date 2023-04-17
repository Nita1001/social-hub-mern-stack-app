import axios from "axios"

export const createItem = async () => {

    // const body =
    //     {
    //         userId: "643551e6921bee802b820d99",
    //         title: "Item 22",
    //         description: "This is 22",
    //         category: "ok",
    //         image: "something",
    //         status: "trade"
    //     }

}

export const getItems = async (InventoryId) => {
    try {
        const response = await axios.get(`api/inventories/items/${InventoryId}`,)
        console.log('getItem res is:', response.data);
        return response.data;
    } catch (error) {
        console.log('getItemS error', error)
    }
}

export const getItem = async (itemId) => {
    try {
        const response = await axios.get(`api/inventories/items/item/${itemId}`,)
        console.log('getItem res is:', response.data);
        return response.data;
    } catch (error) {
        console.log('getItem error', error)
    }
}

export const updateItem = async (itemId, update) => {
    try {
        const response = await axios.put(`${itemId}`, update)
        console.log('response.body updateItem is:', response.body);
        return response.body;
    } catch (error) {
        console.log('updateItem error', error);
    }
}