import {CATALOG_ROUTE} from "./utils/consts.jsx";

export const catalogNavigate = (flower,navigate,page) => {
    const queryParams = [];
    flower.setPage(page)

    if (flower.currentCategory) queryParams.push(`category=${flower.currentCategory}`);
    if (flower.filter) queryParams.push(`sort=${flower.filter}`);
    if (flower.page) queryParams.push(`page=${flower.page}`);
    navigate(CATALOG_ROUTE + (queryParams.length > 0 ? `?${queryParams.join('&')}` : ''));
}