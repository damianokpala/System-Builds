### Prototype Basics

In JavaScript, every object has an internal property called `[[Prototype]]`, which is a reference to another object. This other object is known as the prototype. The prototype object can have its own prototype, and so on, forming a chain called the prototype chain.

1. **Creating Objects with Prototypes:**

   - When you create an object using a constructor function, the prototype of that constructor function becomes the prototype of the new object.

   ```javascript
   function Person(name) {
     this.name = name;
   }

   Person.prototype.greet = function () {
     console.log("Hello, my name is " + this.name);
   };

   const alice = new Person("Alice");
   alice.greet(); // Output: Hello, my name is Alice
   ```

2. **Accessing the Prototype:**

   - You can access an object's prototype using `Object.getPrototypeOf(obj)` or the deprecated `__proto__` property.

   ```javascript
   console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
   console.log(alice.__proto__ === Person.prototype); // true (not recommended to use)
   ```

3. **Prototypal Inheritance:**
   - Objects can inherit properties and methods from their prototype.
   ```javascript
   const bob = new Person("Bob");
   bob.greet(); // Output: Hello, my name is Bob
   ```

### Prototype Chain

The prototype chain is the mechanism by which JavaScript objects inherit properties and methods. When you try to access a property or method on an object, JavaScript will first look for that property on the object itself. If it doesn't find it, it will look at the object's prototype, and then the prototype's prototype, and so on, until it reaches the end of the chain (usually `Object.prototype`).

1. **Property Lookup:**

   - If a property is not found on the object, the lookup continues up the prototype chain.

   ```javascript
   console.log(alice.toString()); // toString is not on alice, so it looks up the chain to Object.prototype
   ```

2. **Prototype Chain Example:**

   ```javascript
   function Animal(voice) {
     this.voice = voice || "grunt";
   }

   Animal.prototype.speak = function () {
     console.log(this.voice);
   };

   function Cat(name, color) {
     Animal.call(this, "Meow");
     this.name = name;
     this.color = color;
   }

   // Set up inheritance
   Cat.prototype = Object.create(Animal.prototype);
   Cat.prototype.constructor = Cat;

   const fluffy = new Cat("Fluffy", "white");
   fluffy.speak(); // Output: Meow
   console.log(fluffy.constructor === Cat); // true
   console.log(Object.getPrototypeOf(fluffy) === Cat.prototype); // true
   ```

3. **End of the Prototype Chain:**
   - The chain ends with `Object.prototype`, whose prototype is `null`.
   ```javascript
   console.log(Object.getPrototypeOf(Object.prototype)); // null
   ```

### Summary

- **Prototypes** are objects that other objects inherit properties and methods from.
- **Prototype Chain** is the hierarchy of objects that JavaScript follows when looking up properties and methods.
- Every object has a `[[Prototype]]` which can be accessed (but not recommended) via `__proto__` or more safely via `Object.getPrototypeOf(obj)`.
- Prototypal inheritance allows for property and method sharing between objects.

---

### Exploring ES6 Classes

ES6 (ECMAScript 2015) introduced a class syntax that provides a more familiar and concise way to create and manage objects and inheritance in JavaScript. Let's break down the key features of ES6 classes.

### 1. Class Syntax

**Defining a Class:**

A class in JavaScript is defined using the `class` keyword. Here's the basic structure:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

// Creating an instance of the class
const alice = new Person("Alice", 30);
alice.greet(); // Output: Hello, my name is Alice and I am 30 years old.
```

- **Constructor:** The `constructor` method is a special method for creating and initializing an object created with a `class`.
- **Methods:** Methods are defined within the class body, and they are added to the prototype of the class.

### 2. Inheritance

**Creating Subclasses:**

Inheritance in ES6 classes is achieved using the `extends` keyword, and the `super` keyword is used to call the constructor of the parent class.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls the constructor of the parent class
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} the ${this.breed} barks.`);
  }
}

const rex = new Dog("Rex", "German Shepherd");
rex.speak(); // Output: Rex the German Shepherd barks.
```

- **`extends` keyword:** Used to create a subclass.
- **`super` keyword:** Used to call the constructor and methods of the parent class.

### 3. Static Methods

**Defining Static Methods:**

Static methods are called on the class itself, not on instances of the class. They are defined using the `static` keyword.

```javascript
class MathUtil {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
}

console.log(MathUtil.add(5, 3)); // Output: 8
console.log(MathUtil.subtract(5, 3)); // Output: 2
```

- **Static Methods:** Are called on the class itself, not on instances. They are useful for utility functions.

### Summary

- **Class Syntax:** Provides a clear and concise way to define classes with constructors and methods.
- **Inheritance:** Allows creating subclasses using `extends` and calling parent class methods using `super`.
- **Static Methods:** Belong to the class itself rather than any instance, useful for defining utility functions.

Here's a combined example to demonstrate all these features:

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  describe() {
    console.log(`This vehicle is a ${this.make} ${this.model}.`);
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model);
    this.doors = doors;
  }

  describe() {
    super.describe();
    console.log(`It has ${this.doors} doors.`);
  }

  static compare(car1, car2) {
    return car1.make === car2.make && car1.model === car2.model;
  }
}

const car1 = new Car("Toyota", "Corolla", 4);
const car2 = new Car("Toyota", "Camry", 4);

car1.describe(); // This vehicle is a Toyota Corolla. It has 4 doors.
car2.describe(); // This vehicle is a Toyota Camry. It has 4 doors.

console.log(Car.compare(car1, car2)); // false
```

This example defines a `Vehicle` class and a `Car` subclass, shows how to override methods, use `super` to call parent methods, and define static methods for utility purposes.

---

### Practicing Encapsulation in JavaScript

Encapsulation is a core principle of object-oriented programming (OOP) that involves bundling the data (properties) and methods (functions) that operate on the data into a single unit or class. It also restricts access to some of the object's components to protect the internal state of the object from unintended or harmful changes. Let's explore how encapsulation is achieved in JavaScript.

### 1. Public and Private Fields

#### Public Fields

In JavaScript, fields (properties) are public by default, meaning they can be accessed and modified from outside the class.

```javascript
class Person {
  constructor(name, age) {
    this.name = name; // Public field
    this.age = age; // Public field
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

const person = new Person("Alice", 30);
console.log(person.name); // Alice
person.age = 31;
console.log(person.age); // 31
```

#### Private Fields

Private fields are only accessible within the class they are defined. They are prefixed with a `#` symbol.

```javascript
class Person {
  #ssn; // Private field

  constructor(name, age, ssn) {
    this.name = name; // Public field
    this.age = age; // Public field
    this.#ssn = ssn; // Private field
  }

  getSSN() {
    return this.#ssn;
  }
}

const person = new Person("Alice", 30, "123-45-6789");
console.log(person.name); // Alice
console.log(person.getSSN()); // 123-45-6789
console.log(person.#ssn); // SyntaxError: Private field '#ssn' must be declared in an enclosing class
```

### 2. Getters and Setters

Getters and setters are special methods used to control access to an object's properties. They allow you to add logic that runs when a property is accessed or modified.

#### Using Getters

A getter method allows you to define a method that gets the value of a specific property.

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area); // 200
```

#### Using Setters

A setter method allows you to define a method that sets the value of a specific property.

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (value > 0) {
      this._width = value;
    } else {
      console.log("Width must be a positive number.");
    }
  }

  get height() {
    return this._height;
  }

  set height(value) {
    if (value > 0) {
      this._height = value;
    } else {
      console.log("Height must be a positive number.");
    }
  }

  get area() {
    return this._width * this._height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area); // 200
rect.width = -5; // Width must be a positive number.
console.log(rect.width); // 10
```

### Summary

- **Encapsulation** involves bundling data and methods into a single unit and restricting access to some of the object's components.
- **Public Fields** are accessible from outside the class.
- **Private Fields** (using `#`) are only accessible within the class.
- **Getters and Setters** allow controlled access to properties, enabling additional logic to be executed when properties are accessed or modified.

Here is a combined example to demonstrate these features:

```javascript
class BankAccount {
  #balance;

  constructor(owner, balance) {
    this.owner = owner; // Public field
    this.#balance = balance; // Private field
  }

  get balance() {
    return this.#balance;
  }

  set balance(amount) {
    if (amount >= 0) {
      this.#balance = amount;
    } else {
      console.log("Balance cannot be negative.");
    }
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.#balance}`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${this.#balance}`);
    } else {
      console.log("Invalid withdrawal amount.");
    }
  }
}

const account = new BankAccount("John Doe", 1000);
console.log(account.owner); // John Doe
console.log(account.balance); // 1000
account.deposit(500); // Deposited 500. New balance: 1500
account.withdraw(200); // Withdrew 200. New balance: 1300
account.balance = -100; // Balance cannot be negative.
console.log(account.balance); // 1300
```

---

### Mastering Inheritance in JavaScript

Inheritance is a fundamental principle of object-oriented programming that allows one class (subclass or derived class) to inherit properties and methods from another class (superclass or base class). In JavaScript, ES6 introduced a cleaner syntax for implementing inheritance using the `class`, `extends`, and `super` keywords.

### 1. Subclasses

#### Creating Subclasses

You can create a subclass using the `extends` keyword, which allows the subclass to inherit properties and methods from the superclass.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls the constructor of the superclass (Animal)
    this.breed = breed;
  }

  // Overriding the speak method
  speak() {
    console.log(`${this.name} the ${this.breed} barks.`);
  }
}

const dog = new Dog("Rex", "German Shepherd");
dog.speak(); // Output: Rex the German Shepherd barks.
```

In this example, `Dog` is a subclass of `Animal`. The `Dog` class inherits the properties and methods of the `Animal` class and overrides the `speak` method.

### 2. Super Keyword

The `super` keyword is used to call the constructor and methods of the superclass.

#### Calling the Superclass Constructor

When defining the constructor of a subclass, you must call `super` before you can use `this`. The `super` keyword calls the constructor of the superclass.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name); // Calls the constructor of the superclass (Animal)
    this.color = color;
  }

  speak() {
    console.log(`${this.name} the ${this.color} cat meows.`);
  }
}

const cat = new Cat("Whiskers", "black");
cat.speak(); // Output: Whiskers the black cat meows.
```

#### Calling Superclass Methods

You can also use `super` to call methods from the superclass within overridden methods in the subclass.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Bird extends Animal {
  constructor(name, species) {
    super(name);
    this.species = species;
  }

  speak() {
    super.speak(); // Calls the speak method of the superclass (Animal)
    console.log(`${this.name} the ${this.species} chirps.`);
  }
}

const bird = new Bird("Tweety", "canary");
bird.speak();
// Output:
// Tweety makes a sound.
// Tweety the canary chirps.
```

### Summary

- **Inheritance** allows a class to inherit properties and methods from another class.
- **Subclasses** are created using the `extends` keyword.
- **Super Keyword:** `super` is used to call the constructor and methods of the superclass.
- **Overriding Methods:** Subclasses can override methods of the superclass to provide specialized behavior.

Here is a comprehensive example to demonstrate these concepts:

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  describe() {
    console.log(`This vehicle is a ${this.make} ${this.model}.`);
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model); // Calls the constructor of the superclass (Vehicle)
    this.doors = doors;
  }

  describe() {
    super.describe(); // Calls the describe method of the superclass (Vehicle)
    console.log(`It has ${this.doors} doors.`);
  }
}

class ElectricCar extends Car {
  constructor(make, model, doors, batteryLife) {
    super(make, model, doors); // Calls the constructor of the superclass (Car)
    this.batteryLife = batteryLife;
  }

  describe() {
    super.describe(); // Calls the describe method of the superclass (Car)
    console.log(`Its battery life is ${this.batteryLife} hours.`);
  }
}

const tesla = new ElectricCar("Tesla", "Model S", 4, 10);
tesla.describe();
// Output:
// This vehicle is a Tesla Model S.
// It has 4 doors.
// Its battery life is 10 hours.
```

In this example:

- `Vehicle` is the superclass.
- `Car` is a subclass of `Vehicle`.
- `ElectricCar` is a subclass of `Car`.
- Each class can have its own properties and methods, and subclasses can override methods and call the superclass methods using `super`.

---

### Understanding Polymorphism in JavaScript

Polymorphism is a key concept in object-oriented programming that allows methods in a parent class to be overridden in derived classes. This means that the same method name can be used in different contexts, with each context providing its own implementation. Polymorphism makes it easier to handle different data types and perform operations without knowing the exact type of the object.

### 1. Method Overriding

**Method Overriding** occurs when a subclass provides a specific implementation for a method that is already defined in its superclass. The overridden method in the subclass should have the same name and parameters as the method in the superclass.

Here's an example:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this.name} meows.`);
  }
}

const dog = new Dog("Rex");
const cat = new Cat("Whiskers");

dog.speak(); // Output: Rex barks.
cat.speak(); // Output: Whiskers meows.
```

In this example, the `Dog` and `Cat` classes override the `speak` method of the `Animal` class. When the `speak` method is called on instances of `Dog` and `Cat`, the overridden method in the respective subclass is executed.

### 2. Dynamic Method Dispatch

**Dynamic Method Dispatch** refers to the process by which the appropriate method is chosen at runtime rather than compile time. In JavaScript, this determination is based on the type of the object that the method is called on.

```javascript
class Shape {
  constructor(name) {
    this.name = name;
  }

  draw() {
    console.log(`Drawing a shape.`);
  }
}

class Circle extends Shape {
  draw() {
    console.log(`Drawing a circle.`);
  }
}

class Square extends Shape {
  draw() {
    console.log(`Drawing a square.`);
  }
}

const shapes = [
  new Shape("generic shape"),
  new Circle("circle"),
  new Square("square"),
];

shapes.forEach((shape) => shape.draw());
// Output:
// Drawing a shape.
// Drawing a circle.
// Drawing a square.
```

In this example, the `draw` method is overridden in the `Circle` and `Square` subclasses. When iterating through the `shapes` array and calling the `draw` method, JavaScript dynamically determines the appropriate method to execute based on the type of each object in the array.

### Summary

- **Polymorphism** allows methods to be overridden in derived classes, providing specific implementations while using the same method name.
- **Method Overriding** is when a subclass provides a specific implementation for a method defined in its superclass.
- **Dynamic Method Dispatch** ensures that the correct method implementation is executed at runtime based on the object's type.

Here is a more complex example to illustrate these concepts:

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  calculateBonus() {
    return this.salary * 0.1; // Base bonus is 10% of salary
  }
}

class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.2; // Managers get a 20% bonus
  }
}

class Developer extends Employee {
  calculateBonus() {
    return this.salary * 0.15; // Developers get a 15% bonus
  }
}

const employees = [
  new Employee("Alice", 50000),
  new Manager("Bob", 80000),
  new Developer("Charlie", 70000),
];

employees.forEach((employee) => {
  console.log(`${employee.name}'s bonus: ${employee.calculateBonus()}`);
});
// Output:
// Alice's bonus: 5000
// Bob's bonus: 16000
// Charlie's bonus: 10500
```

In this example:

- `Employee` is the base class with a method `calculateBonus`.
- `Manager` and `Developer` are subclasses that override the `calculateBonus` method.
- When iterating through the `employees` array, the correct `calculateBonus` method is called dynamically based on the type of each employee.

---

### Implementing Abstraction in JavaScript

Abstraction in object-oriented programming (OOP) involves hiding complex implementation details and exposing only the necessary features to the users. While JavaScript does not have built-in support for abstract classes and interfaces like some other languages (e.g., Java, C#), you can still simulate these concepts using classes and prototypes.

### 1. Abstract Classes

An abstract class is a class that is designed to be inherited from but not instantiated directly. It typically contains one or more abstract methods that must be implemented by subclasses.

In JavaScript, you can simulate abstract classes by creating a base class with methods that throw errors if they are not overridden.

```javascript
class AbstractAnimal {
  constructor(name) {
    if (this.constructor === AbstractAnimal) {
      throw new Error(
        "Abstract class AbstractAnimal cannot be instantiated directly."
      );
    }
    this.name = name;
  }

  speak() {
    throw new Error("Method 'speak()' must be implemented.");
  }
}

class Dog extends AbstractAnimal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

class Cat extends AbstractAnimal {
  speak() {
    console.log(`${this.name} meows.`);
  }
}

const dog = new Dog("Rex");
dog.speak(); // Output: Rex barks.

const cat = new Cat("Whiskers");
cat.speak(); // Output: Whiskers meows.

// Uncommenting the line below will throw an error
// const animal = new AbstractAnimal('Generic'); // Error: Abstract class AbstractAnimal cannot be instantiated directly.
```

In this example:

- `AbstractAnimal` is a simulated abstract class.
- The constructor of `AbstractAnimal` throws an error if an attempt is made to instantiate it directly.
- The `speak` method is an abstract method that throws an error if not overridden in a subclass.

### 2. Interfaces

JavaScript does not have a built-in concept of interfaces, but you can simulate them using abstract methods or by using object-oriented design principles to enforce the structure.

#### Simulating Interfaces with Abstract Methods

You can use a similar approach to the abstract class example to enforce that certain methods must be implemented.

```javascript
class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error("Cannot instantiate an abstract class.");
    }
  }

  area() {
    throw new Error("Method 'area()' must be implemented.");
  }

  perimeter() {
    throw new Error("Method 'perimeter()' must be implemented.");
  }
}

class Circle extends AbstractShape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends AbstractShape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle(5);
console.log(`Circle area: ${circle.area()}`); // Circle area: 78.53981633974483
console.log(`Circle perimeter: ${circle.perimeter()}`); // Circle perimeter: 31.41592653589793

const rectangle = new Rectangle(4, 7);
console.log(`Rectangle area: ${rectangle.area()}`); // Rectangle area: 28
console.log(`Rectangle perimeter: ${rectangle.perimeter()}`); // Rectangle perimeter: 22

// Uncommenting the line below will throw an error
// const shape = new AbstractShape(); // Error: Cannot instantiate an abstract class.
```

In this example:

- `AbstractShape` is a simulated abstract class.
- The `area` and `perimeter` methods are abstract methods that must be implemented in subclasses (`Circle` and `Rectangle`).

### Summary

- **Abstraction** involves hiding complex implementation details and exposing only the necessary features.
- **Abstract Classes** can be simulated in JavaScript by creating a base class with methods that throw errors if they are not overridden.
- **Interfaces** can be simulated using abstract methods or by adhering to certain design principles to enforce structure and behavior.

By simulating abstract classes and interfaces, you can ensure that your classes adhere to a specific structure and provide the necessary methods, making your code more robust and maintainable.
