# JVM JRE JDK

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/49c55e84-14cf-42af-9dca-4e4094d3a8ca/Untitled.png)

JVM, JRE, and JDK are platform-dependent because the configuration of each [OS](https://www.javatpoint.com/os-tutorial) is different from each other. However, Java is platform-independent

## **The Java Virtual Machine**

is a virtual “machine” that provides a runtime environment for Java applications and programs. Its role is simple: **interpret and execute Java *bytecode***, which a low-level representation of the compiled form of a piece of Java code. When applications written in Java are compiled, they produce bytecode(.class file), which can be executed (or run) by any JVM implementation, regardless of the underlying architecture, hardware, or operating system.

**What JVM does**

- Loading the bytecode
- Verifying the bytecode
- Preparing memory resources

Interpreting the Java bytecode

- Just-in-time Compilation
- Garbage Collection

## JRE(Java Runtime environment)

The Java Runtime Environment is a set of software tools that are used for developing Java applications. It is used to provide the runtime environment. It is the implementation of JVM. It physically exists. It contains a set of libraries + other files that JVM uses at runtime.

## Java Development Toolkit(JDK)

The JDK contains a private Java Virtual Machine (JVM) and a few other resources such as an interpreter/loader (java), a compiler (javac), an archiver (jar), a documentation generator (Javadoc), etc. to complete the development of a Java Application

## Architecture

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/6df7443a-bb69-4690-9236-dd328293e9fe/Untitled.png)

# Thread and Process

## Process

An instance of program that is getting executed. It has own resources like memory, thread, etc.

A single CPU can run several threads but only one process at a time.

## Thread

Lightweight process or smallest sequence of instructions that are executed by CPU independent.

1 Process can have multiple threads

When a process  is created it start with a single thread called the main thread and from that we can create multiple threads to perform tasks concurrently.

 CPU has several cores, each of which is responsible for running a single thread.

**Compilation:** Generate byte code that can be executed by JVM,

**Execution Process:** JVM creates the process. A new JVM instance is created and allocated to the process.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/cc635ca0-e272-4f22-aaab-9682d236ee32/Untitled.png)

**Code Segment:** Contain compile byte code(machine code). Read only. Shared by threads in a process

**Data Segment:** contain global and static variables. Shared by a thread within a process. Thread can read and modify it and sync is necessary

**Heap: O**bjects created at runtime using new keywords are allocated. Read and can be modified and sync is necessary. 

**Register:** contain an intermediate value. 

**Stack :** Each thread has own stack and store local variable

**Counter:** points to instruction that is executed and gets updated. 

Threads are typically used when the task involves a lot of I/O or synchronization with other threads or processes.

Processes are typically used when the task involves a lot of CPU-bound processing or when there are multiple CPUs or cores available to execute the task in parallel.

# MultiThreading

Allow to perform multiple operations at the same time by executing multiple threads within same process. Multiple threads share the same resources but can still perform tasks independently. 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/97b747ef-43fb-4187-a49a-677c159c607f/Untitled.png)

Context Switching between two thread is less expensive than two process.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/3050816f-c3fe-4a66-984e-b6309b693e76/Untitled.png)

### Main Thread:

When a standard application is run a user thread is automatically created to execute the main thread of the application. 

When no other thread is released then program terminates when main method complete execution.

All other threads called child threads are released from main thread. 

The main method can finish but the program will keep running until all user threads have completed

Runtime environment distinguish between user thread and daemon thread. 

Calling the **setDaemon(true**) help us to mark the status of the class as user thread or daemon thread but it should be called before thread starts.

As last as user thread is alive JVM does not terminate. 

As the deamon thread is at the mercy of runtime environment, it is stopped if there are no more user thread running thus terminate the program.

## Thread Creation

A thread in java is represented by object of thread class. Create thread can be done in two ways.

1. **Implementing the java.lang.Runnable interface**
2. **Extending java.lang.Thread class**

```java
import java.util.*;
import java.lang.*;
import java.io.*;

// The main method must be in a class named "Main".
class Main {
    public static void main(String[] args) {
        System.out.println("Main Thread");
        Thread1 thread1 = new Thread1();
         thread1.setDaemon(true);
        thread1.start();
       Thread thread2 = new Thread(new Thread2(), "thread2");
        thread2.start();
         System.out.println("End Thread");
        
    }
}
class Thread1 extends Thread {
    @Override
    public void run() {
        for(int i=0;i<5;i++){
            System.out.println("Thread1"+ i);
        }
    }
}
class Thread2 implements Runnable {
    @Override
    public void run() {
        for(int i=0;i<5;i++){
            System.out.println(Thread.currentThread()+ " "+ i);
        }
    }
}
//output
Main Thread
End ThreaMain Thread
End Thread
Thread10
Thread11
Thread12
Thread13
Thread14
Thread[thread2,5,main] 0
Thread[thread2,5,main] 1
Thread[thread2,5,main] 2
Thread[thread2,5,main] 3
Thread[thread2,5,main] 4
```

Order cannot be decided but we can see that after completing main thread user thread still running 

with the help of currentThread() we can get current Thread which is running

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/47ea4f63-d785-4159-8089-72f1aa88b78b/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/6f38d782-1c19-47db-9b1c-dd81735adc87/Untitled.png)

### Which is Better

As in java we cannot extend multiple classes but can implements multiple interface so Runnable is more useful as if our existing class wants to extend other class as well other than Thread class. 

**We can use Lambda to create thread using runnable instead of creating new Thread class JVM  will take care for all things**

Thread thread2 = new Thread(()->{
for(int i=0;i<5;i++){
System.out.println(Thread.currentThread()+ " "+ i);
}}, "thread2");
thread2.start();
System.out.println("End Thread");

## Synchronization

Threads share resources but there are critical situation where its is desirable that only one thread at a time has access to shared resource.

```java
import java.util.*;
import java.lang.*;
import java.io.*;

class Stack {
    private int capacity;
    private int[] array;
    private int stackTop;
    Object lock;
    public Stack(int cap) {
        array = new int[cap];
        capacity = cap;
        stackTop = -1;
        lock = new Object();
        
    }
    public boolean isFull() {
        return stackTop >=capacity-1;
    }
    public boolean isEmpty(){
        return (stackTop ==-1);
    }
    public boolean push(int val){
        synchronized(lock) {
        if(isFull())
            return false;
        else {
            stackTop++;
            try {
                Thread.sleep(1000);
            }
            catch (Exception e) {}
            array[stackTop] = val;
            return true;
        }
        }
    }
    public int pop(){
        synchronized(lock) {
        if(isEmpty())
            return Integer.MIN_VALUE;
            
        else{
            try {
                Thread.sleep(1000);
            }
            catch (Exception e) {};
               int  val= array[stackTop];
            stackTop--;
            return val;
    }
        }
    }
}
    public class Main{
        public static void main(String[] args) {
            Stack stack = new Stack(5);
            Thread thread1= new Thread(()->{
                int counter = 0;
                while(counter<10){
                    counter++;
                    System.out.println("Pushing" + stack.push(counter));
                    
                }
                    
            }, "pushing");
            thread1.start();
            Thread thread2 = new Thread(()-> { int counter = 0;
                while(counter<10){
                    counter++;
                    System.out.println("Poping" + stack.pop());
                    
                }}, "popping");
        thread2.start();
        }
    }
```

In this stackTop is shared by two thread so its value getting changed by both thread making it inconsistent so we should use synchronization by providing lock to thread when it is using any shared resource so that other thread cannot able to use the resource. 

- The `synchronized` keyword ensures that only one thread at a time can execute critical sections of code in `push` and `pop` methods.
- `lock` object is used as a monitor to coordinate access to stack operation

### **How `synchronized` Works**

- **Monitor Object**: Each object in Java has an associated monitor (or lock). When a method or block of code is synchronized, the thread must acquire the monitor of the object before executing the synchronized code.
- **Mutual Exclusion**: Only one thread can hold the monitor for a given object at a time. Other threads attempting to acquire the same monitor are blocked until the monitor is released.

We can not make assumption for the order in which thread will grant access to lock. 

### **Usage of `synchronized`**

- **Synchronized Methods**:
    - **Instance Methods**: Use `synchronized` to ensure that only one thread can execute the method on a specific instance of a class at a time.
    
    ```java
    
    public synchronized void method() {
        // critical section code
    }
    
    ```
    
    - **Static Methods**: Use `synchronized` to ensure that only one thread can execute the method for the class at a time. This uses the class object’s monitor.
    
    ```java
    
    public static synchronized void staticMethod() {
        // critical section code
    }
    
    ```
    
- **Synchronized Blocks**:
    - Allows for more fine-grained control over synchronization. You can synchronize a block of code within a method, reducing the scope of synchronization and potentially improving performance.
    
    ```java
    
    public void method() {
        synchronized(this) {
            // critical section code
        }
    }
    
    ```
    
    - You can also synchronize on other objects to control access to different resources.
    
    ```java
    
    private final Object lock = new Object();
    
    public void method() {
        synchronized(lock) {
            // critical section code
        }
    }
    
    ```
    

synchronization of static method in a class is independent of synchronization of instance method on object in class. 

Subclass will decide whether new definition of inherited synchronized method will remain synchronized or not in subclass 

**Race Condition:** It occur when tow or more thread try to access and update same value(stackTop in above example) as a consequence leave the value undefined or inconsistent. 

**Thread Safety :** It is a term used to describe design of class that ensure that state of the object is always consistent even when objects are used concurrently by multiple thread.

**Double-Checked Locking**: Used to reduce the overhead of acquiring a lock by first checking a condition without synchronization and then acquiring the lock if needed.

```java
private volatile Object resource = null;

public Object getResource() {
    if (resource == null) {
        synchronized(this) {
            if (resource == null) {
                resource = new Object(); // expensive operation
            }
        }
    }
    return resource;
}
```

### volatile

The `volatile` keyword in Java is used to indicate that a variable’s value will be modified by different threads. It provides a simpler alternative to using `synchronized` blocks for certain types of thread communication and visibility issues. Here’s a comprehensive overview of the `volatile` keyword:

### **1. Purpose of `volatile`**

- **Visibility**: Ensures that changes to a variable are visible to all threads. When a thread updates a `volatile` variable, the new value is immediately visible to all other threads.
- **Avoid Caching Issues**: Without `volatile`, threads may cache variables in local memory, leading to inconsistent views of the variable’s value across threads.

### **2. How `volatile` Works**

- **Memory Visibility**: `volatile` guarantees that reads and writes to a variable are directly from and to the main memory, bypassing thread-local caches.
- **Atomicity**: While `volatile` ensures visibility, it does not guarantee atomicity for compound actions (e.g., incrementing a counter). For compound actions, `synchronized` or atomic classes from `java.util.concurrent` should be used.

Helps in implementing the double-checked locking pattern for singleton objects.

### characterstics

- **No Locking Overhead**: Unlike `synchronized`, `volatile` does not involve locking, making it more lightweight in terms of performance.
- **Atomic Reads/Writes**: `volatile` variables are read and written atomically. However, complex operations on `volatile` variables (like incrementing) are not atomic.

### **5. Limitations**

- **No Compound Operation Guarantees**: `volatile` does not provide atomicity for compound actions. For example, incrementing a `volatile` variable requires additional synchronization.
- **Not Suitable for All Scenarios**: For complex synchronization needs, `volatile` may not be sufficient, and other synchronization mechanisms like `synchronized` blocks or `java.util.concurrent` classes may be needed.

## Producer Consumer Problem

example

**BlockingQueue**: A type of thread-safe queue where threads are blocked when they try to add elements to a full queue or remove elements from an empty queue.

```java
import java.util.*;
import java.lang.*;
import java.io.*;

class BlockingQueue {
    private Queue<Integer>q;
    private int capacity;
    public BlockingQueue(int cap){
        capacity = cap;
        q = new LinkedList<>();
    }
    public int add(int value){
        synchronized(q){
            while (q.size()==capacity) {
                try{
                    q.wait();
                }
                catch(InterruptedException e){
                    e.printStackTrace();
                }
            }
            q.add(value);
            q.notifyAll();
            return value;
            
            
            
        }
    }
    public int remove(){
        synchronized(q){
            while (q.size()==0) {
                try{
                    q.wait();
                }
                 catch(InterruptedException e){
                    e.printStackTrace();
                }
            }
            int val = q.poll();
            q.notifyAll();
            return val;
        }
    }
    
}
    public class Main{
        public static void main(String[] args) {
            BlockingQueue queue = new BlockingQueue(5);
            Thread thread1= new Thread(()->{
                int counter = 0;
                while(counter<10){
                    counter++;
                    System.out.println("Pushing" + queue.add(counter));
                    
                }
                    
            }, "pushing");
            thread1.start();
            Thread thread2 = new Thread(()-> { int counter = 0;
                while(counter<10){
                    counter++;
                    System.out.println("Poping" + queue.remove());
                    
                }}, "popping");
        thread2.start();
        }
    }
```

- **`wait()`**: Causes the current thread to wait(and lock is removed) until another thread calls `notifyAll()` on the same object.
- **`notifyAll()`**: Wakes up all threads that are waiting on the object's monitor (i.e., the queue). In this case, it wakes up threads waiting to add or remove elements.

### Thread State

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/39d23eb8-2894-4167-878f-e59d657feb7d/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/9b091223-d993-4841-af45-1e3b3e6b9802/image.png)

example

```java
 public static void main(String[] args) {
            Thread thread3 = new Thread(()-> {
                try{
                    Thread.sleep(1);
                    for(int i=10000;i>=0;i--);
                      
                }
                catch(InterruptedException e){
                    e.printStackTrace();
                }
            },"states");
            thread3.start();
            while(true){
                Thread.State state = thread3.getState();
                System.out.println(state);
                if(state==Thread.State.TERMINATED)
                    break;
            }
```

`Thread.yield()` provides a hint to the thread scheduler that the current thread is willing to yield its current use of the CPU. This means the thread is willing to pause its execution temporarily to allow other threads of the same or higher priority to run.

- it suggests to the JVM and operating system’s thread scheduler that the current thread should be moved to the runnable state and that other threads should be given a chance to execute.
- **No Guarantee**: It is important to note that `Thread.yield()` does not guarantee that the thread will relinquish CPU control immediately or that other threads will start executing. The actual behavior depends on the thread scheduler and system resources.

```java
public class YieldExample {
    public static void main(String[] args) {
        Runnable task1 = () -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Task 1 - iteration: " + i);
                Thread.yield(); // Hint to scheduler to give other threads a chance
            }
        };

        Runnable task2 = () -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Task 2 - iteration: " + i);
                Thread.yield(); // Hint to scheduler to give other threads a chance
            }
        };

        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        thread1.start();
        thread2.start();
    }
}

```

Useful for improving responsiveness, managing CPU resources, or debugging.

**Sleep Method**

`Thread.sleep()` is non-blocking in terms of the thread's interaction with other threads. It does not release locks or change the state of other threads.

### **1. When a Thread is Sleeping**

**1.1 Using `Thread.sleep()`**

- **Method**: `Thread.sleep(long millis)` or `Thread.sleep(long millis, int nanos)`
- **Condition for Awakening**:
    - The thread will be awakened automatically when the specified sleep duration elapses.
    - The actual wake-up time may be slightly longer than requested due to system scheduling or clock precision.

**1.2 Interrupted During Sleep**

- **Method**: When a thread is sleeping and another thread interrupts it by calling `Thread.interrupt()`.
- **Condition for Awakening**:
    - The thread will throw an `InterruptedException` immediately, and the sleep period will be interrupted.
    - You need to handle or declare the `InterruptedException` in your code.

```java
public class SleepExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(5000); // Sleep for 5 seconds
                System.out.println("Thread woke up");
            } catch (InterruptedException e) {
                System.out.println("Thread was interrupted");
            }
        });
        thread.start();
        thread.interrupt(); // Interrupting the thread during sleep
    }
}

```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3507d505-968f-40f9-bdcf-0976cb396023/83d4fa60-3474-495d-ba0a-22878376f0af/image.png)

Condition for thread to get awaken when in waiting stage

1. object.notifly() or object.notifyAll()
2. object.wait(long timeout)
3. Thread.interupt() → 
A thread waiting on `wait()`, `sleep()`, or `join()` can be interrupted by another thread.

**Join Method**
The `Thread.join()` method in Java is used to ensure that one thread waits for another thread to complete before continuing execution. 

### Thread Priority

- By default, every thread inherits its priority from its parent thread. If the thread is created as a new thread, it gets the default priority set by the JVM, which is `Thread.NORM_PRIORITY` (value `5`).

**1.2 Priority Range**

- The priority of a thread can be set within a range of integers from `1` to `10`:
    - **`Thread.MIN_PRIORITY`**: Constant value `1`, the lowest priority.
    - **`Thread.NORM_PRIORITY`**: Constant value `5`, the default priority.
    - **`Thread.MAX_PRIORITY`**: Constant value `10`, the highest priority.

```java
public class ThreadPriorityExample {
    public static void main(String[] args) {
        Runnable task = () -> {
            System.out.println(Thread.currentThread().getName() + " with priority: " + Thread.currentThread().getPriority());
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);
        Thread thread3 = new Thread(task);

        thread1.setPriority(Thread.MIN_PRIORITY); // Lowest priority
        thread2.setPriority(Thread.NORM_PRIORITY); // Default priority
        thread3.setPriority(Thread.MAX_PRIORITY); // Highest priority

        thread1.start();
        thread2.start();
        thread3.start();
    }
}

```

**Priority Influence**: Higher-priority threads are generally given more CPU time compared to lower-priority threads, but this is not guaranteed. The exact scheduling behavior depends on the JVM and the underlying operating system's thread scheduler.

- **Not a Guarantee**: Thread priority does not guarantee the order or fairness of execution. The operating system's thread scheduler decides how threads are actually executed.
- **Starvation**: If priorities are used excessively, lower-priority threads may suffer from starvation, meaning they might not get enough CPU time.

### Thread Scheduler

the thread scheduler is a part of the Java Virtual Machine (JVM) responsible for managing the execution of threads. The thread scheduler determines the order and timing of thread execution, aiming to ensure that multiple threads can run concurrently while making efficient use of system resources. 

- **Preemptive Scheduling**: The scheduler can preempt lower-priority threads in favor of higher-priority threads. This means that a high-priority thread can interrupt a lower-priority thread to execute if necessary.
- **Time-Slicing**: In many systems, the CPU time is divided into small time slices (or time quanta). Each thread is given a slice of CPU time, after which the scheduler may switch to another thread.

## Deadlock

**Deadlock** occurs when two or more threads are blocked forever, each waiting for the other to release a resource. Here's how deadlock might happen in this code:

```jsx

class HelloWorld {
    public static void main(String[] args) {
    String lock1 = "lock1";
    String lock2 = "lock2";
    System.out.println("main started");
    Thread thread1 = new Thread(()->{
        synchronized(lock1){
            try{
                Thread.sleep(1);
            }
            catch(InterruptedException e)
            {
                e.printStackTrace();
            }
        
        synchronized(lock2){
            System.out.println("lock acquired");
        }
        }
    }, "thread1");
     Thread thread2 = new Thread(()->{
        synchronized(lock2){
            try{
                Thread.sleep(1);
            }
            catch(InterruptedException e)
            {
                e.printStackTrace();
            }
        
        synchronized(lock1){
            System.out.println("lock acquired");
        }
        }
    }, "thread2");
    thread1.start();
    thread2.start();
    System.out.println("main end");
    }
}
```
