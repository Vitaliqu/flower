import {makeAutoObservable} from "mobx";

export default class FlowerStore {
    constructor() {
        this._categories = []
        this._flowers = []
        makeAutoObservable(this)
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
}