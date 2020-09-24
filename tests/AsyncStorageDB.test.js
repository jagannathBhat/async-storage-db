import AsyncStorageDB from '../src/index'

const db = new AsyncStorageDB('users')

const testDoc = { _id: 'test', username: 'jb' }

test('create database', () => {
	const dbName = db.info()
	expect(dbName).toBe('users')
})

test('post doc', () => {
	return db.post(testDoc).then(doc => {
		expect(doc).toMatchObject(testDoc)
	})
})

test('post null', () => {
	return expect(db.post(null)).rejects.toThrow('Cannot store empty document')
})

test('get doc', () => {
	return db.get('test').then(doc => {
		expect(doc).toMatchObject(testDoc)
	})
})

test('get null', () => {
	return expect(db.get(null)).rejects.toThrow('Invalid ID')
})

test('get non existent doc', () => {
	return expect(db.get('fake')).rejects.toThrow('Document not found')
})

test('remove doc', () => {
	return db.remove('test').then(res => {
		expect(res.status).toBe('OK')
	})
})

test('remove null', () => {
	return expect(db.remove(null)).rejects.toThrow('Invalid ID')
})

test('destroy db', () => {
	return db.destroy().then(res => {
		expect(res.status).toBe('OK')
	})
})

test('get from destroyed db', () => {
	return expect(db.get('test')).rejects.toBeTruthy()
})
