# Backend + DevOps Project: AWS Load Balancer & AutoScaling Group

## Overview
This project demonstrates a backend application deployed with AWS Load Balancer and AutoScaling Group. It exposes an API endpoint to compute the sum of natural numbers up to **(N-1)**.

## API Endpoint
https://autoscalinggroup.avtg.fun/sum/{N}

- **Method**: `GET`
- **Description**: Returns the sum of the first `N-1` natural numbers.
- **Example**:  
  ```sh
  curl -s https://autoscalinggroup.avtg.fun/sum/20


## Response
```sh
  {
    "sum": 190
  }


