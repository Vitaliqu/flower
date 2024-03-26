import {makeAutoObservable} from "mobx";
import {flowers, flowers_category} from "../database.js";

export default class FlowerStore {
    constructor() {
        this._categories = flowers_category
        this._flowers = flowers
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categoryes = categories
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