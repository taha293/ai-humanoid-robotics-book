---
title: Week 3 - The Robotic Nervous System (ROS 2)
description: Introduction to Robot Operating System 2 architecture, nodes, topics, and services
tags: [ros2, architecture, nodes, topics, services]
---

# Week 3 - The Robotic Nervous System (ROS 2)

## Learning Objectives

By the end of this week, you will be able to:
- Understand the fundamental concepts of Robot Operating System 2 (ROS 2)
- Explain the architecture of ROS 2 including nodes, topics, services, and actions
- Create and run basic ROS 2 nodes
- Implement publisher-subscriber communication patterns
- Use services for request-response communication

## 1. Introduction to ROS 2

ROS 2 (Robot Operating System 2) is the next-generation robotics middleware that provides a collection of libraries and tools to help software developers create robot applications. Unlike its predecessor, ROS 2 is designed for production environments with improved security, real-time support, and better scalability.

### Key Improvements in ROS 2

- **Real-time support**: Enhanced capabilities for real-time applications
- **Multi-robot systems**: Better support for multi-robot scenarios
- **Production deployment**: Designed with industrial applications in mind
- **DDS-based communication**: Uses Data Distribution Service (DDS) for communication

## 2. ROS 2 Architecture

### Nodes

A node is a process that performs computation. In ROS 2, nodes are designed to be as lightweight as possible. Each node contains:
- Publishers and subscribers
- Service clients and servers
- Action clients and servers
- Parameters

```python
# Example ROS 2 Node Structure
import rclpy
from rclpy.node import Node

class RobotNervousSystem(Node):
    def __init__(self):
        super().__init__('robot_nervous_system')
        self.get_logger().info('Robot Nervous System initialized')

def main(args=None):
    rclpy.init(args=args)
    node = RobotNervousSystem()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Topics and Messages

Topics are named buses over which nodes exchange messages. The publisher-subscriber pattern allows for asynchronous communication between nodes.

- **Publisher**: Sends messages to a topic
- **Subscriber**: Receives messages from a topic
- **Message Types**: Strongly typed data structures for communication

### Services

Services provide synchronous request-response communication between nodes. A service has:
- Request message type
- Response message type
- Service server (provider)
- Service client (requester)

## 3. Practical Exercise: Creating a Simple Publisher-Subscriber System

Let's create a simple system where one node publishes sensor data and another subscribes to it.

### Publisher Node

```python
# sensor_publisher.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class SensorPublisher(Node):
    def __init__(self):
        super().__init__('sensor_publisher')
        self.publisher = self.create_publisher(Float32, 'sensor_data', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = Float32()
        import random
        msg.data = random.uniform(0.0, 100.0)
        self.publisher.publish(msg)
        self.get_logger().info(f'Sensor data published: {msg.data}')

def main(args=None):
    rclpy.init(args=args)
    sensor_publisher = SensorPublisher()
    rclpy.spin(sensor_publisher)
    sensor_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscriber Node

```python
# sensor_subscriber.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class SensorSubscriber(Node):
    def __init__(self):
        super().__init__('sensor_subscriber')
        self.subscription = self.create_subscription(
            Float32,
            'sensor_data',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'Received sensor data: {msg.data}')

def main(args=None):
    rclpy.init(args=args)
    sensor_subscriber = SensorSubscriber()
    rclpy.spin(sensor_subscriber)
    sensor_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## 4. Running the Example

1. Build the package:
```bash
colcon build --packages-select your_robot_package
```

2. Source the workspace:
```bash
source install/setup.bash
```

3. Run the publisher:
```bash
ros2 run your_robot_package sensor_publisher
```

4. In another terminal, run the subscriber:
```bash
ros2 run your_robot_package sensor_subscriber
```

## 5. Advanced ROS 2 Concepts

### Actions

Actions are a more complex communication pattern that allows for:
- Long-running requests
- Feedback during execution
- Canceling requests

### Parameters

Parameters allow nodes to be configured dynamically:
- Set at runtime
- Remotely accessed
- Saved and loaded from files

## 6. Best Practices

1. **Node Design**: Keep nodes focused on a single responsibility
2. **Topic Naming**: Use descriptive, consistent naming conventions
3. **Message Design**: Create efficient, well-structured message types
4. **Error Handling**: Implement proper error handling and logging
5. **Resource Management**: Properly clean up resources when nodes are destroyed

## 7. Summary

This week, we explored the fundamentals of ROS 2, which serves as the nervous system for robotic applications. We learned about nodes, topics, services, and how they enable communication between different parts of a robotic system. In the next week, we'll dive deeper into more advanced ROS 2 concepts and create more complex communication patterns.

## 8. Further Reading

- [ROS 2 Documentation](https://docs.ros.org/en/humble/)
- [Designing Message Types](https://design.ros2.org/articles/interface_definition.html)
- [ROS 2 Security](https://docs.ros.org/en/humble/Concepts/About-Security.html)