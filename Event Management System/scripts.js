class Event {
  constructor(id, title, date, desc, attendees, isComplete) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.desc = desc;
    this.attendees = attendees;
    this.isComplete = isComplete;
  }

  registerAttendee(attendee) {
    this.attendees.push(attendee);
  }

  markAsCompleted(event) {
    if (!event.isComplete) this.isComplete = true;
  }
}

const birthday = new Event(
  1,
  "CHIDERAS DAY",
  "May 24",
  "A day to remember a queen",
  ["Babatuday", "Yenka"],
  false
);
birthday.registerAttendee("Tudka");
birthday.markAsCompleted(true);

console.log(birthday);

class EventManager {
  constructor() {
    this.events = [];
  }

  addEvent(event) {
    this.events.push(event);
  }

  findEventByTitle(title) {
    return this.events.find((event) => event.title == title);
  }

  removeEvent(title) {
    const titleEvent = this.findEventByTitle(title);
  }

  displayEvents() {
    this.events.forEach((event) => {
      if (event.isComplete) return;
      console.log(
        `This is a event named ${event.title} with an id of ${event.id}, happening on ${event.date}. The event is about ${event.desc}`
      );
    });
  }
}

const eventManager = new EventManager();
eventManager.addEvent(birthday);
eventManager.removeEvent("CHIDERAS DAY");

console.log(eventManager);
