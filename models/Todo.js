export default class Todo {
  // * The following class variables can be omitted, constructor will initialize them anyway
  title
  body
  userId

  constructor(title, body, userId) {
    this.title = title
    this.body = body
    this.userId = userId
  }
}
