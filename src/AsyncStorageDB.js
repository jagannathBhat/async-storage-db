import AsyncStorage from '@react-native-community/async-storage'
import { v4 as uuidv4 } from 'uuid'

export default class AsyncStorageDB {
	constructor(name) {
		this.DB_NAME = name
	}

	destroy() {
		return new Promise((resolve, reject) => {
			AsyncStorage.getAllKeys()
				.then(res => AsyncStorage.multiRemove(res))
				.then(() => {
					this.DB_NAME = null
					resolve({ status: 'OK' })
				})
				.catch(err => reject(err))
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			if (!id) reject(new Error('Invalid ID'))

			const key = this.DB_NAME + id

			AsyncStorage.getItem(key)
				.then(docJSON => {
					if (!docJSON) reject(new Error('Document not found'))
					resolve(JSON.parse(docJSON))
				})
				.catch(err => reject(err))
		})
	}

	info() {
		return this.DB_NAME
	}

	post(doc) {
		return new Promise((resolve, reject) => {
			if (!doc || doc === {}) reject(new Error('Cannot store empty document'))
			if (!doc._id) doc._id = uuidv4()

			const key = this.DB_NAME + doc._id

			AsyncStorage.setItem(key, JSON.stringify(doc))
				.then(() => resolve(doc))
				.catch(err => reject(err))
		})
	}

	remove(id) {
		return new Promise((resolve, reject) => {
			if (!id) reject(new Error('Invalid ID'))

			const key = this.DB_NAME + id

			AsyncStorage.removeItem(key)
				.then(() => resolve({ status: 'OK' }))
				.catch(err => reject(err))
		})
	}
}
