export default class Task {
  constructor(category, description) {
    this.category = category;
    this.description = description;
    this.addTime = new Date();
    this.id = this.addTime.getTime();
  }
}