---
title: Hardware Specifications and Recommendations
description: Detailed hardware specifications for different budget tiers and platform compatibility
tags: [hardware, specifications, budget-tiers, compatibility]
---

# Hardware Specifications and Recommendations

This appendix provides detailed hardware specifications and recommendations for different budget tiers to support the practical exercises in this course. The recommendations are organized by budget tier to accommodate different learning environments and constraints.

## 1. Budget Tier - Entry Level Platforms

### Single-Board Computers

#### Raspberry Pi 4 Model B
- **Processor**: Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz
- **RAM**: 2GB, 4GB, or 8GB LPDDR4-3200 SDRAM
- **Connectivity**: 2.4GHz and 5GHz IEEE 802.11ac wireless, Bluetooth 5.0, Gigabit Ethernet
- **USB**: 2 × USB 3.0 ports, 2 × USB 2.0 ports
- **GPIO**: 40-pin GPIO header
- **Camera/Display**: 2 × micro-HDMI ports (up to 4Kp60 supported), 2-lane MIPI DSI display port, 2-lane MIPI CSI camera port
- **Power**: USB-C (5V DC) or GPIO (5V DC)
- **Price Range**: $35-$75 depending on RAM configuration

#### NVIDIA Jetson Nano
- **GPU**: 128-core NVIDIA Maxwell
- **CPU**: Quad-core ARM A57 @ 1.43 GHz
- **Memory**: 4GB 64-bit LPDDR4
- **Connectivity**: Gigabit Ethernet
- **Display**: HDMI and DP
- **Cameras**: 12 lanes MIPI CSI-2
- **Power**: 5V⎓3A DC barrel jack or GPIO 40-pin header
- **Price Range**: $99 (discontinued but available used)

### Basic Sensors and Actuators

#### IMU Sensors
- **MPU-6050**: 3-axis gyroscope and 3-axis accelerometer
  - I2C interface, 10,000 samples/sec
  - Price: $5-$10
- **BNO055**: Absolute orientation sensor with sensor fusion
  - Integrated AHRS, 3-axis accelerometer, gyroscope, magnetometer
  - Price: $15-$25

#### Distance Sensors
- **HC-SR04**: Ultrasonic distance sensor
  - Range: 2cm to 400cm, Accuracy: 3mm
  - Price: $2-$5
- **VL53L0X**: Time-of-flight distance sensor
  - Range: 1mm to 2m, High accuracy
  - Price: $8-$15

#### Servo Motors
- **SG90 Micro Servo**: 9g micro servo
  - Torque: 1.8kg/cm at 4.8V
  - Price: $3-$6 each
- **MG996R Tower Pro**: Full-size servo
  - Torque: 10kg/cm at 6V
  - Price: $10-$15 each

### Simple Robotic Platforms

#### 2WD Mobile Robot Platform
- **Chassis**: Acrylic or aluminum platform with 2 drive wheels
- **Motors**: 2 × 200RPM geared DC motors with encoders
- **Battery**: 7.4V 2200mAh LiPo battery
- **Motor Driver**: L298N dual H-bridge or similar
- **Price Range**: $50-$100

#### Robot Arm Kits
- **OWI-535 Robotic Arm Edge**: 5 DOF educational robot arm
- **UARM Swift Pro**: 4 DOF desktop robot arm with vision
- **Price Range**: $150-$400

## 2. Mini-Humanoid Tier - Specialized Platforms

### Specialized Humanoid Robot Kits

#### Robotis OP3
- **Degrees of Freedom**: 20 (12 in legs, 6 in arms, 2 in head)
- **Processor**: Intel NUC with i5 processor
- **Sensors**: 3 × 13MP cameras, IMU, FSR pressure sensors in feet
- **Actuators**: 20 Dynamixel X-series servos
- **Battery**: 11.1V 5200mAh LiPo battery
- **SDK**: ROS-based framework
- **Price Range**: $12,000-$15,000

#### ROBOTIS OP2
- **Degrees of Freedom**: 28
- **Processor**: Dual-core ARM Cortex-A9
- **Sensors**: Stereo camera, IMU, FSR sensors
- **Actuators**: 28 Dynamixel servos
- **Battery**: 11.1V 2200mAh LiPo
- **Price Range**: $8,000-$10,000

#### InMoov
- **Type**: Open-source 3D-printable humanoid robot
- **Degrees of Freedom**: Up to 32 DOF (varies by configuration)
- **Actuators**: Servo motors (typically 24-32 servos)
- **Sensors**: Camera, microphones, various optional sensors
- **Materials**: 3D-printed parts, electronics, cables
- **Price Range**: $1,000-$3,000 depending on configuration

### Advanced Sensors

#### Depth Cameras
- **Intel RealSense D435**: Stereo depth camera
  - Depth accuracy: ±2% at 1m
  - RGB: 1920×1080, Depth: 1280×720
  - Price: $150-$200
- **Intel RealSense D435i**: Includes IMU
  - Same as D435 plus built-in IMU
  - Price: $200-$250

#### LIDAR Sensors
- **RPLIDAR A1**: 360° laser scanner
  - Range: 0.15m - 6m, Accuracy: ±3%
  - Price: $300-$400
- **YDLIDAR X4**: Low-cost 360° scanner
  - Range: 0.12m - 10m
  - Price: $100-$150

### Computing Platforms

#### NVIDIA Jetson Series
- **Jetson Nano**: Entry-level AI computer
  - 128-core Maxwell GPU, 4GB RAM
  - Price: $99 (discontinued)
- **Jetson Xavier NX**: Professional AI computer
  - 384-core Volta GPU, 8GB RAM
  - Price: $399-$499
- **Jetson AGX Orin**: Highest performance
  - 2048-core Ada GPU, 32GB RAM
  - Price: $1,499-$2,199

## 3. Premium Tier - Professional Platforms

### Full Humanoid Robots

#### Unitree Go1
- **Type**: Quadruped robot
- **Weight**: 12kg
- **Payload**: 3kg
- **Battery**: 25.2V 22000mAh LiPo (4-5 hours)
- **Sensors**: Depth camera, IMU, force sensors
- **Actuators**: 12 high-performance actuators
- **Connectivity**: WiFi, Ethernet, USB, CAN
- **SDK**: ROS, Python, C++
- **Price Range**: $20,000-$25,000

#### Unitree A1
- **Type**: Quadruped robot
- **Weight**: 12kg
- **Max Speed**: 3m/s
- **Payload**: 3kg
- **Battery Life**: 2+ hours
- **Actuators**: 12 joint motors with precise control
- **Sensors**: IMU, depth camera
- **Price Range**: $15,000-$20,000

#### Boston Dynamics Spot
- **Type**: Professional quadruped robot
- **Weight**: 70 pounds (31.7kg)
- **Payload**: 25 pounds (11.3kg)
- **Battery Life**: 90+ minutes
- **Sensors**: Multiple cameras, LIDAR, IMU
- **Connectivity**: WiFi, 4G/LTE, Ethernet
- **SDK**: Python, C++, ROS
- **Price Range**: $74,000-$75,000 (as of 2023)

#### PAL Robotics TIAGo
- **Type**: Mobile manipulator platform
- **Degrees of Freedom**: 7 in arm, 2 in mobile base
- **Gripper**: Robotiq 2F-85 adaptive gripper
- **Sensors**: RGB-D camera, laser scanner, IMU
- **Processor**: Intel i7 with GPU
- **Battery**: 2+ hours operation
- **Price Range**: $100,000-$150,000

### Professional-Grade Sensors

#### High-Resolution Cameras
- **Basler ace acA1300-75gc**: GigE Vision camera
  - Resolution: 1292 × 1020, Frame rate: 75 fps
  - Interface: Gigabit Ethernet
  - Price: $400-$600

#### Professional IMU
- **VectorNav VN-300**: GPS/INS system
  - High-accuracy AHRS with dual GPS antennas
  - Price: $8,000-$12,000
- **Xsens MTI-30**: High-performance IMU
  - 3D orientation, acceleration, angular velocity
  - Price: $2,000-$3,000

#### Force/Torque Sensors
- **ATI Gamma SI-120**: 6-axis force/torque sensor
  - Force range: ±120N, Torque range: ±15 Nm
  - Price: $15,000-$20,000
- **Robotiq FT300**: Force/torque sensor for collaborative robots
  - 6-axis sensing, 300N force, 50Nm torque
  - Price: $10,000-$15,000

### High-Performance Computing

#### Workstation Computers
- **NVIDIA DGX Station**: AI supercomputer
  - 4 × Tesla V100 GPUs, 512GB system memory
  - Price: $199,000+
- **Custom AI Workstation**: Configured for robotics
  - Multiple GPUs (RTX 4090, A6000, etc.)
  - High-end CPU (Threadripper, Xeon)
  - Large RAM (128GB+)
  - Price: $10,000-$50,000+

## 4. Software and Development Environment

### Operating Systems
- **Ubuntu 22.04 LTS**: Recommended for ROS2 Humble
- **Real-time Linux**: For time-critical applications
- **Robot Operating System 2 (ROS2)**: Humble Hawksbill distribution
- **Container Solutions**: Docker, Singularity for reproducible environments

### Development Tools
- **IDEs**: VS Code with ROS extensions, PyCharm, CLion
- **Simulation**: Gazebo Garden, NVIDIA Isaac Sim, Webots
- **Version Control**: Git with Git LFS for large binary files
- **Build Systems**: CMake, colcon for ROS packages

## 5. Budget Recommendations by Application

### Educational Institutions
- **Budget Tier**: For introductory courses and basic concepts
- **Mini-Humanoid Tier**: For advanced robotics courses and research projects
- **Premium Tier**: For cutting-edge research and development

### Individual Learners
- **Budget Tier**: For self-study and basic projects
- **Mini-Humanoid Tier**: For serious hobbyists and advanced learners
- **Premium Tier**: For professional development and specialized applications

### Industry Applications
- **Mini-Humanoid Tier**: For prototyping and proof-of-concept
- **Premium Tier**: For production and commercial applications

## 6. Compatibility and Integration Guidelines

### ROS2 Compatibility
- All platforms should support ROS2 Humble Hawksbill
- Verify real-time performance requirements
- Check sensor driver availability

### Communication Protocols
- **CAN Bus**: For high-performance actuators
- **Ethernet**: For high-bandwidth sensors
- **UART/I2C/SPI**: For basic sensors and microcontrollers
- **WiFi/Ethernet**: For networking and remote control

### Power Management
- Calculate total power consumption
- Ensure battery life meets operational requirements
- Plan for power distribution and regulation

## Summary

This hardware specification guide provides recommendations across three budget tiers to accommodate different learning objectives and constraints. The choice of hardware platform significantly impacts the capabilities and learning outcomes of your robotic systems. Consider your specific needs, budget constraints, and long-term goals when selecting hardware for your projects. Remember that the most expensive platform isn't always the best choice for learning objectives.