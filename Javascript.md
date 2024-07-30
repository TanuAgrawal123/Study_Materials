https://github.com/alok722/namaste-javascript-notes/tree/master/notes

## Execution Context

Everything in JS happens inside the execution context. Imagine a sealed-off container inside which JS runs. It is an abstract concept that hold info about the env. within the current code is being executed.

- Inn the container the first component is **memory component** and the 2nd one is **code component**
- Memory component has all the variables and functions in key value pairs. It is also called **Variable environment**.
- Code component is the place where code is executed one line at a time. It is also called the **Thread of Execution**.
- JS is a **synchronous**, **single-threaded** language
    - Synchronous:- In a specific synchronous order.
    - Single-threaded:- One command at a time.
- When a JS program is ran, a **global execution context** is created.
- Javascript manages code execution context creation and deletion with the the help of **Call Stack**.
- Call Stack is a mechanism to keep track of its place in script that calls multiple function.
- Call Stack maintains the order of execution of execution contexts. It is also known as Program Stack, Control Stack, Runtime stack, Machine Stack, Execution context stack.
- in memory creation phase it assigns undefined and puts the content of function to function's memory

**Hoisting** is a concept which enables us to extract values of variables and functions even before initialising/assigning value without getting error and this is happening due to the 1st phase (memory creation phase) of the Execution Context.

## Shortest JS Program, this keyword and windows

- The shortest JS program is empty file. Because even then, JS engine does a lot of things. As always, even in this case, it creates the GEC which has memory space and the execution context.
- JS engine creates something known as '**window**'. It is an object, which is created in the global space. It contains lots of functions and variables. These functions and variables can be accessed from anywhere in the program. JS engine also creates a **this** keyword, which points to the **window object** at the global level.
- In different engines, the name of global object changes. Window in browsers, but in nodeJS it is called something else. At global level, this === window
- If we create any variable in the global scope, then the variables get attached to the global object.

## Not defined vs undefined

- **undefined** is when memory is allocated for the variable, but no value is assigned yet.
- If an object/variable is not even declared/found in memory allocation phase, and tried to access it then it is **Not defined**
- Not Defined !== Undefined
- JS is a **loosely typed / weakly typed** language. It doesn't attach variables to any datatype. We can say *var a = 5*, and then change the value to boolean *a = true* or string *a = 'hello'* later on.
- **Never** assign *undefined* to a variable manually. Let it happen on it's own accord.

## Scope Chain and Lexical Enviornment

- **Lexical Environment** = local memory + lexical env of its parent. Hence, Lexical Environement is the local memory along with the lexical environment of its parent
- **Lexical**: In hierarchy, In order
- Whenever an Execution Context is created, a Lexical environment(LE) is also created and is referenced in the local Execution Context(in memory space).
- The process of going one by one to parent and checking for values is called scope chain or Lexcial environment chain.

## Temporal Dead Zone

- let and const declarations are hoisted. But its different from **var**It looks like let isn't hoisted, **but it is**, let's understand
    
    ```jsx
    console.log(a); // ReferenceError: Cannot access 'a' before initialization
    console.log(b); // prints undefined as expected
    let a = 10;
    console.log(a); // 10
    var b = 15;
    console.log(window.a); // undefined
    console.log(window.b); // 15
    ```
    
    - Both a and b are actually initialized as *undefined* in hoisting stage. But var **b** is inside the storage space of GLOBAL, and **a** is in a separate memory object called script, where it can be accessed only after assigning some value to it first ie. one can access 'a' only if it is assigned. Thus, it throws error.
- **Temporal Dead Zone** : Time since when the let variable was hoisted until it is initialized some value.

**let a = 10;
let a = 100**; //this code is rejected upfront as SyntaxError. (duplicate declaration)

**let a = 10;
var a = 100;** // this code also rejected upfront as SyntaxError. (can't use same name in same scope)

```jsx
const b;
b = 10;
console.log(b); // SyntaxError: Missing initializer in const declaration. (This type of declaration won't work with const. const b = 10 only will work)
------------------
const b = 100;
b = 1000; //this gives us TypeError: Assignment to constant variable.
```

## **Block Scope & Shadowing in JS**

**Block** aka *compound statement* is used to group JS statements together into 1 group. We group them within {...}

```jsx
{
    var a = 10;
    let b = 20;
    const c = 30;
}
console.log(a); // 10
console.log(b); // Uncaught ReferenceError: b is not defined
```

*let* and *const* are BLOCK SCOPED. They are stored in a separate mem space which is reserved for this block. Also, they can't be accessed outside this block. But var a can be accessed anywhere as it is in global scope. 

### Shadowing

```jsx
  var a = 100;
  {
      var a = 10; // same name as global var
      let b = 20;
      const c = 30;
      console.log(a); // 10
      console.log(b); // 20
      console.log(c); // 30 
  }
  console.log(a); // 10, instead of the 100 we were expecting. So block "a" modified val of global "a" as well. In console, only b and c are in block space. a initially is in global space(a = 100), and when a = 10 line is run, a is not created in block space, but replaces 100 with 10 in global space itself. 
```

If one has same named variable outside the block, the variable inside the block *shadows* the outside variable. **This happens only for var**

```jsx
const c = 100;
function x() {
    const c = 10;
    console.log(c); // 10
}
x();
console.log(c); // 100
```

### illegal shadowing

```jsx
  let a = 20;
  {
      var a = 20;
  }
  // Uncaught SyntaxError: Identifier 'a' has already been declared
```

- We cannot shadow let with var. But it is **valid** to shadow a let using a let. However, we can shadow var with let.
- All scope rules that work in function are same in arrow functions too.

## Closure

- Function bundled along with it's lexical scope is **closure**.
- JavaScript has a lexcial scope environment. If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent. See Below code, Over here function **y** along with its lexical scope i.e. (function x) would be called a closure.

```jsx
function x() {
    var a = 7;
    function y() {
        console.log(a);
    }
    return y;
}
var z = x();
console.log(z);  // value of z is entire code of function y.
```

In above code, When y is returned, not only is the function returned but the entire closure (fun y + its lexical scope) is returned and put inside z. So when z is used somewhere else in program, it still remembers var a inside x()

***A closure is a function** that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.*

### Advantages of clousre

1. **Module Design Pattern**:
    1. The module design pattern allows us to encapsulate related functionality into a single module or file. It helps organize code, prevent global namespace pollution, and promotes reusability.
2. **Currying** is a technique where a function that takes multiple arguments is transformed into a series of functions that take one argument each. It enables partial function application and enhances code flexibility.
    
    ```jsx
    const calculateTotalPrice = (taxRate) => (price) => price + price * (taxRate / 100);
    
    const calculateSalesTax = calculateTotalPrice(8); // 8% sales tax
    const totalPrice = calculateSalesTax(100); // Price with tax
    console.log(totalPrice); // 108
    
    // example 2
    function sum(a) {
        return function(b){
          if(b){
            return sum(a+b);
          }
          return a;
        }
      }
    console.log(sum(1)());
    console.log(sum(1)(2)());
    console.log(sum(1)(2)(3)());
    
    ```
    
3. `setTimeout` allows scheduling a function to run after a specified delay. It's commonly used for asynchronous tasks, animations, and event handling.

```jsx
function showMessage(message, delay) {
  setTimeout(() => {
    console.log(message);
  }, delay);
}

showMessage('Hello, world!', 2000); // Display after 2 seconds
```

1. **Memmorization**

### Interview question on closure

```jsx
function x() {
for(var i = 1; i<=5; i++){
    setTimeout(function() {
    console.log(i);
    }, i*1000);
    }
    console.log("Namaste Javascript");
}
x();
// Output:
// Namaste Javascript
// 6
// 6
// 6
// 6
// 6
```

- This happens because of closures. When setTimeout stores the function somewhere and attaches timer to it, the function remembers its reference to i, **not value of i**. All 5 copies of function point to same reference of i. JS stores these 5 functions, prints string and then comes back to the functions. By then the timer has run fully. And due to looping, the i value became 6. And when the callback fun runs the variable i = 6. So same 6 is printed in each log
- To avoid this, we can use **let** instead of **var** as let has Block scope. For each iteration, the i is a new variable altogether(new copy of i). Everytime setTimeout is run, the inside function forms closure with new variable i.
- Solving using var

```jsx
function x() {
    for(var i = 1; i<=5; i++){
    function close(i) {
        setTimeout(function() {
        console.log(i);
        }, i*1000);
        // put the setT function inside new function close()
    }
    close(i); // everytime you call close(i) it creates new copy of i. Only this time, it is with var itself!
    }
    console.log("Namaste Javascript");
}
x();
```

```jsx
function outer(str) {
    let a = 10;
    function inner() {
        console.log(a, str);
    }
    return inner;
}
outer("Hello There")(); // 10 "Hello There"
```

 Inner function will now form closure and will have access to both a and str.

```jsx
function outest() {
    var c = 20;
    function outer(str) {
        let a = 10;
        function inner() {
            console.log(a, c, str);
        }
        return inner;
    }
    return outer;
}
let a = 100;
outest()("Hello There")(); // 10 20 "Hello There"
```

: Still the same output, the inner function will have reference to inner a, so conflicting name won't matter here. If it wouldn't have find a inside outer function then it would have went more outer to find a and thus have printed 100. So, it try to resolve variable in scope chain and if a wouldn't have been found it would have given reference error

### Disadvantages

1. Overconsumption of memory when using closure as everytime as those closed over variables are not garbage collected till program expires. So when creating many closures, more memory is accumulated and this can create memory leaks if not handled.
2. **Garbage collector** : Program in JS engine or browser that frees up unused memory. In highlevel languages like C++ or JAVA, garbage collection is left to the programmer, but in JS engine its done implicitly.

## **First Class Functions ft. Anonymous Functions**

### **Function statement/ Function decleration?**

```jsx
function a() {
  console.log("Hello");
}
a(); // Hello

```

## Function Expression

Assigning a function to a variable. Function acts like a value.

```jsx
var b = function() {
console.log("Hello");
}
b();
```

**Anonymous functions are used when functions are used as values**

### **Polyfill:**

Polyfills are a piece of code (usually JavaScript on the web) that provides the functionality that you expect the browser to provide natively. They allow you to use modern JavaScript features in older environments that do not support those features. This is particularly useful for ensuring cross-browser compatibility and supporting users who might be using outdated browsers.

either we can write custom pollyfill or use libraries to import those.

## Call Apply Bind

### **Call() Method**

The call method is basically used to invoke the function with different **this** object

```jsx
<script>
const obj1 = {
firstName: "First_name",
lastName: "Last_name"
};
const obj2 = {
firstName: "Sachin",
lastName: "Tendulkar"
};
function printName() {
console.log(this.firstName + " " + this.lastName + profession + " " + country);
}
printName.call(obj2,"Cricketer", "India"));
```

```jsx
</script>
```

### **Apply() method:**

Just like the call method we can also bind the function to any object. Using apply( ) method also we can invoke a given function with different objects.

**Syntax:**

```
object.objectMethod.apply(objectInstance, arrayOfArguments)
```

**Parameters:** It takes two parameters:

- **ObjectInstance**: It is an object which we want to use explicitly
- **Arguments:** It is arguments that we want to pass to the calling function

### Bind

**The `bind()` method allows an object to borrow a method from another object without copying.**

Parameters

The `bind()` can take **two** parameters:

- `thisArg` - The value provided as [this](https://www.programiz.com/javascript/this) parameter for `func`.
- `arg1, ... argN` (optional) - The value of arguments present inside `func`.

**Notes:** If `thisArg` is not specified, the this of the executing scope is treated as `thisArg`.

• Returns a copy of the given function with the specified `this` value, and initial arguments (if provided).

**arrow functions establish this based on the scope the arrow function is defined within, and the this value does not change based on how the function is invoked**

```jsx
// object definition
const student1 = {
name: "Jack",
grade: "5",
introduction: function () {
console.log([this.name](http://this.name/) + "studies in grade" + this.grade + ".");
},
};
```

```jsx
// object definition
const student2 = {
name: "Jimmy ",
grade: " 6",
};
```

```jsx
// the object student2 is borrowing introduction method from student1
let result= student1.introduction.bind(student2);
```

```jsx
// invoking introduction() function
result();
```

```jsx
// Output:
// Jimmy studies in grade 6.
```

## Event Listener

An event listener is basically a function that waits for an event to occur. That event can be anything like a mouse click event, submitting a form, pressing keys of a keyboard, etc.

```
<element>.addEventListener(<eventName>,
    <callbackFunction>, {capture : boolean});
```

capture tells weather event will be in capture phase or bubbling phase.

**the process of propagating from the closest element to the farthest away element in the DOM (Document Object Modal) is called event bubbling.**

Like if we click on child div then event get bubbled to parent and grandparent div as well.

the process of propagating from the farthest element to the closest element in the DOM is called event capturing.

the propagation of event listeners first goes from outside to inside and then from inside to outside in the DOM. 

- If we do not mention any third parameter in **addEventListener()**, then by default event bubbling will happen.
- Event bubbling and event capturing happen only when the element and it’s all ancestors have the same event listener (in our case, ‘click’ event) attach to them.

• Both can be prevented by using the **stopPropagation()** method.

## High Order function

: Higher-order functions are regular functions that take one or more functions as arguments and/or return functions as a value from

## **Asynchronous JavaScript  &** Event Loop

Browser has JS Engine which has Call Stack which has Global execution context, local execution context etc.

- browser has many other superpowers - Local storage space, Timer, place to enter URL, Bluetooth access, Geolocation access and so on.
- Now JS needs some way to connect the callstack with all these superpowers. This is done using Web APIs.

Web API

1. setTimeOut()
2. fetch
3. console
4. DOM API
5. Local storage
6. location

can access through window object

- As window is global obj, and all the above functions are present in global object, we don't explicity write window but it is implied.

```jsx
console.log("start");
setTimeout(function cb() {
    console.log("timer");
}, 5000);
console.log("end");
```

First GEC is created then console Wrb API is called to modify console . 

Then setTime Function is attached with time for 5 sec . 

Then again call console API for printing “end”

Once timer expires of setTimeOut. SetTimeout cb() comes to callBack queue.

**Event Loop** checks if there is something in callBack queue and if callStack is empty or not. Once callStack is empty it put  cb() back to callStack and then time is printed by console api.

• Eventloop has just one job to keep checking callback queue and if found something push it to call stack and delete from callback queue.

Apart from callBack queue we have microtask queue which has high priority.

**What enters the Microtask Queue ?**

- All the callback functions that come through promises go in microtask Queue.
- **Mutation Observer** : Keeps on checking whether there is mutation in DOM tree or not, and if there, then it execeutes some callback function.
- Callback functions that come through promises and mutation observer go inside **Microtask Queue**.
- All the rest goes inside **Callback Queue aka. Task Queue**.
- If the task in microtask Queue keeps creating new tasks in the queue, element in callback queue never gets chance to be run. This is called **starvation**

## **JS Engine Exposed, Google's V8 Architecture**

- JRE consists of a JS Engine (❤️ of JRE), set of APIs to connect with outside environment, event loop, Callback queue, Microtask queue etc.
- Javascript Engine is not a machine. Its software written in low level languages (eg. C++) that takes in hi-level code in JS and spits out low level machine code.
- ECMAScript is a governing body of JS. It has set of rules which are followed by all JS engines like Chakra(Edge), Spidermonkey(Firefox) v8(Chrome)

Code inside Javascript Engine passes through 3 steps : **Parsing**, **Compilation** and **Execution**

1. **Parsing** - Code is broken down into tokens. In "let a = 7" -> let, a, =, 7 are all tokens. Also we have a syntax parser that takes code and converts it into an AST (Abstract Syntax Tree) which is a JSON with all key values like type, start, end, body etc 
2. **Compilation** - JS has something called Just-in-time(JIT) Compilation - uses both interpreter & compiler. Also compilation and execution both go hand in hand. The AST from previous step goes to interpreter which converts hi-level code to byte code and moves to execeution. While interpreting, compiler also works hand in hand to compile and form optimized code during runtime.([More details of JST](https://medium.com/@aamchora/what-exactly-just-in-time-jit-compilation-is-in-javascript-f7aea482843f))
3. **Execution** - Needs 2 components ie. Memory heap(place where all memory is stored) and Call Stack(same call stack from prev episodes). There is also a garbage collector. It uses an algo called **Mark and Sweep**.

## Async differ  **attributes in <script> tag**

Two things happen in browser

- [**HTML Parsing**](https://www.geeksforgeeks.org/html-parsing-and-processing/)
- Loading of the scripts

When browser do html parsing and if it incounter script tag Then the browser stops parsing at that time as it sees the script tag which fetches the script from the network, gets into your browser then runs that script. Now, the browser starts parsing after that script tag again. This situation creates a blocking nature which results in slow loading.

Two overcome this situation we use Async and Differ tag

### Differ

This attribute makes sure that all the scripts are downloaded but it will not be executed until the DOM is ready.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/964ec8f4-9e34-4705-a682-905c8366da08/Untitled.png)

Defer attribute will load scripts in the order specified. It allows you to structure which script comes first.

### Async

This attribute is preferred when the scripts included in the page are not dependent on each other. It is also very useful for loading scripts in the middle of the DOM which are already there.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/79e34a3d-b948-48af-a540-3135bcc20afb/Untitled.png)

### Error Handling mechanism

1. Try, Catch Finally : 
- **`try`**: Contains code that may throw an error.
- **`catch`**: Catches and handles the error.
- **`finally`**: Executes code after the `try` and `catch` blocks, regardless of the outcome.
1. Use Throw Statement

## Map Filter and Reduce

### Map Function

Used to transform array . map() method creates a new array with the results of calling a function for every array element.

```jsx
const arr = [5, 1, 3, 2, 6];
// Task 1: Double the array element: [10, 2, 6, 4, 12]
function double(x) {
  return x * 2;
}
const doubleArr = arr.map(double);
```

### Filter

Filter function is basically used to filter the value inside an array. The arr.filter() method is used to create a new array from a given array consisting of only those elements from the given array which satisfy a condition set by the argument method.

```jsx
const array = [5, 1, 3, 2, 6];
// filter odd values
function isOdd(x) {
  return x % 2;
}
const oddArr = array.filter(isOdd); // [5,1,3]
```

## Reduce

It is a function which take all the values of array and gives a single output of it. It reduces the array to give a single output.

```jsx
const array = [5, 1, 3, 2, 6];
function findSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
```

## CallBack

1. Help in writing asynchronous code
2. Bad Part - create callBack Hell and Inversion of Control
