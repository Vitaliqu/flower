import {$authHost, $host} from "./index.jsx";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category/create', category)
    return data
}
export const editCategory = async (id, category) => {
    const {data} = await $authHost.post(`api/category/edit/${id}`, category)
    return data
}
export const deleteCategory = async (id) => {
    const {data} = await $authHost.get(`api/category/delete/${id}`)
    return data
}
export const fetchCategory = async () => {
    const {data} = await $host.get('api/category')
    return data
}
export const createFlower = async (category) => {
    const {data} = await $authHost.post('api/flower/create', category)
    return data
}
export const fetchFlower = async () => {
    const {data} = await $host.get('api/flower')
    return data
}