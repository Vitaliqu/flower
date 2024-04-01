import {makeAutoObservable} from "mobx";

export default class FlowerStore {
    constructor() {
        this._categories = []
        this._flowers = []
        this._page = 1
        this._totalCount = 0
        this._currentCateory = null
        this._limit = 10
        makeAutoObservable(this)
    }

    setCurrentCategory(category) {
        this._currentCateory = category
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setLimit(limit) {
        this._limit = limit
    }

    setCategories(categories) {
        this._categories = categories
    }

    setFlowers(flowers) {
        this._flowers = flowers
    }

    get categories() {
        return this._categories
    }

    get flowers() {
        return this._flowers
    }

    get Page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }

    get currentCategory(){
        return this._currentCateory
    }
}