import {makeAutoObservable} from "mobx";

export default class FlowerStore {
    constructor() {
        this._loading = true
        this._categories = []
        this._flowers = []
        this._liked = localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : []
        this._page = 1
        this._currentFilter = 'isNew'
        this._totalCount = 0
        this._currentCateory = undefined
        this._limit = 12
        makeAutoObservable(this)
    }

    setLoading(bool) {
        this._loading = bool
    }


    setLiked(liked) {
        this._liked = liked
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

    setFilter(filter) {
        this._currentFilter = filter
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

    get liked() {
        return this._liked
    }

    get flowers() {
        return this._flowers
    }

    get loading(){
        return this._loading
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get filter() {
        return this._currentFilter
    }

    get limit() {
        return this._limit
    }

    get currentCategory() {
        return this._currentCateory
    }
}