# async-storage-db

A simple, asynchronous, unencrypted, persistent, JSON based JavaScript database for React Native.

## Installation

### Get library

#### npm

```bash
npm install async-storage-db
```

#### yarn

```bash
yarn add async-storage-db
```

## Usage

### Importing

```js
import AsyncStorageDB from 'async-storage-db'
```

## API

AsyncStorageDB has an asynchronous API, supporting promises, and async functions. Most of the API is exposed as:

```js
db.doSomething(args...)
```

### Create a database

```js
const db = new AsyncStorageDB([name])
```

This method creates a database or opens an existing one.

**Example**:

```js
const db = new AsyncStorageDB('test')
```

`.info()` can be used to confirm the creation of the database. It returns the name of the database.

```js
db.info()
// test
```

### Delete a database

```js
db.destroy()
```

Delete the database.

### Create/update a document

```js
db.post(doc)
```

Creates a new document or updates an existing document. To create a new document, the `doc` must contain the content of the document. The document ID must be provided in the `doc` while updating, as the \_id property. While creating a new document, if \_id property is provided in `doc`, it will be used as the ID of the document created, otherwise a new uuid will be assigned as the document ID.

**Example (creating without ID)**:

```js
db.post({ foo: 'bar' })
	.then(res => {
		console.log(res)
		// { foo: 'bar' }
	})
	.catch(err => {
		// handle error
	})
```

**Example (creating with ID / updating)**:

```js
db.post({ _id: 'test_doc', foo: 'bar' })
	.then(res => {
		console.log(res)
		// { _id: 'test_doc', foo: 'bar' }
	})
	.catch(err => {
		// handle error
	})
```

### Fetch a document

```js
db.get(id)
```

Retrieves a document whose ID is specified by `id`.

**Example**:

```js
db.get('test_doc')
	.then(res => {
		console.log(res)
		// { _id: 'test_doc', foo: 'bar' }
	})
	.catch(err => {
		// handle error
	})
```

### Delete a document

```js
db.remove(id)
```

Deletes the document whose ID is specified by `id`.

**Example**:

```js
db.remove('test_doc')
	.then(res => {
		console.log(res)
		// { status: 'OK' }
	})
	.catch(err => {
		// handle error
	})
```

## License

MIT.
