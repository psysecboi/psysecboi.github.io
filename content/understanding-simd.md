---
title: Understanding SIMD, Properly
date: 2026-05-01
published: true
type: Original
description: A first-principles look at SIMD and how modern CPUs actually process data.
summary: Add a short 1-2 line summary.
---

Modern CPUs don’t operate on single values; they operate on wide registers. Most code ignores this entirely. This piece builds SIMD from first principles, shows how the hardware actually executes it, and grounds it with a real system where the difference is measurable.

## The Pain Point: Scalar Code

Most code runs in a **scalar model**: one instruction operates on exactly one value at a time.

```cpp
//simple c++ code for element-wise array addition
for (int i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
}
```
This loop looks simple, but the execution model is mechanically rigid:

![pic1](/SIMD/pic1.png)

For n elements, the CPU performs n iterations. However, the math isn't the only thing consuming cycles. In a scalar loop, the CPU also pays a control flow tax for every single element.

**Architectural Observations:**
- *Data Uniformity:* The operation (addition) is identical for every single element in the array.
- *Embarrassingly Parallel:* Each calculation is entirely independent; c[1] does not need the result of c[0].

**The Bottleneck:**

Modern CPUs have wide datapaths and can execute multiple instructions per cycle, but scalar code doesn't expose enough parallel work to keep the hardware busy. The CPU is effectively "waiting in line" to process data sequentially.

The inefficiency isn’t in the computation. It’s in the execution model. In simple loops like this, the code is often memory-bound, meaning the CPU spends more time managing the loop and waiting for individual loads than it does actually performing the math.



## What SIMD Is

**SIMD (Single Instruction, Multiple Data)** means applying the same instruction to multiple data elements at once. Instead of processing one value per instruction, the CPU processes a group of values in parallel, called **lanes**. A single instruction “fans out” across these lanes and operates on all of them simultaneously within the same clock cycle.

The operation stays the same. The only thing that changes is how many elements are processed per step. It allows the CPU to treat a group of values as a single vector, performing the same math on every element in a single clock cycle. This hardware-level parallelism transforms sequential bottlenecks into high-throughput streams.

![pic2](/SIMD/pic2.png)


## The Hardware Reality

To make SIMD work, the CPU doesn't use standard 64-bit registers. It relies on specialized **Vector Registers** that are physically wider, allowing them to hold multiple pieces of data at once. Think of these as extra-wide parking spots designed for "buses" (vectors) rather than "cars" (scalar values).

The number of elements processed depends on register width and data size. For instance, SSE uses 128-bit registers and processes 4×32-bit floats per instruction, AVX2 extends this to 256-bit registers handling 8 floats, and AVX-512 further scales to 512-bit registers enabling 16 floats per instruction; on ARM systems, NEON provides 128-bit registers similar to SSE, supporting 4 floats per operation. (**data referenced from internet*)

The key idea is that a wider register means more lanes, which in turn allows more data to be processed per instruction. This is why the same operation can scale from 4 → 8 → 16 elements per step depending on the hardware.

## How You Actually Use It

In most modern software development, you don't have to manually "speak" SIMD. The hardware's power is usually harnessed through two main paths:
- **Compiler Auto-vectorization:** For simple, predictable loops, modern compilers (like GCC or Clang) automatically transform your scalar code into SIMD instructions. This works best when data access is linear and there are no complex dependencies.

- **Manual Control:** For "hot paths" in performance-critical software (like database engines or video encoders), developers can manually invoke SIMD instructions for surgical control, though this requires a much deeper understanding of the hardware.

## The Catch

- **Memory alignment:** SIMD prefers data at specific address boundaries. Misaligned loads work but can reduce throughput depending on the hardware.
- **Control flow branching:** SIMD executes the same instruction across lanes. Divergent logic forces extra work and reduces efficiency.
- **The tail problem:** Real data rarely fits perfectly into fixed-width vectors. Remaining elements require scalar handling.
- **Hardware portability:** Code is often tied to specific instruction sets like AVX or NEON. Supporting different processors requires maintaining multiple implementations.
- **Setup overhead:** Loading registers and preparing masks has a cost. For small workloads, this can outweigh the benefits.
- **Thermal and power limits:** Wide vector usage increases power draw. Sustained SIMD workloads can trigger frequency throttling.


## Application: simdjson

JSON parsing is a good example of where SIMD makes a measurable difference.

Traditional parsers (like [nlohmann](https://github.com/nlohmann/json)) process input character by character, with frequent branching and state updates. This works, but doesn’t scale well as input size grows.

[simdjson](https://github.com/simdjson/simdjson) approaches the problem differently. It processes input in large chunks using SIMD, first identifying structural characters ({ } [ ] , : ") in a fast scan, and then building the JSON structure from those positions. This reduces repeated work and avoids heavy branching.

**The two-stage pipeline:** Stage one (SIMD scan) performs a high-speed scan to identify important character locations and validate strings. Stage two (Parsing) uses these indices to quickly jump through the document and build the final data structure.

**Benchmarking:**

![pic3](/SIMD/pic3.png)

Based on the above benchmarks, simdjson consistently outperforms standard libraries like nlohmann by a factor of roughly 4.7x. (**maybe a bit inconsistent*)

**Developer Experience:** The internal SIMD complexity is hidden behind an intuitive and clean programming interface. You achieve record-breaking performance while writing simple and readable C++ code.

```cpp
// Simple usage of simdjson 
int main() {
    ondemand::parser parser;

    padded_string json = padded_string::load("data.json");
    ondemand::document doc = parser.iterate(json);

    uint64_t count = doc["results"].get_array().count_elements();

    return 0;
}
// Use official documentation to learn how to code :)
```

For large, uniform data like JSON, SIMD shifts the cost from per element → per chunk, and the difference shows directly in execution time.

This is SIMD as a design choice, not a micro-optimization.


## When to Use SIMD

Before refactoring your code for vectorization, pass it through these three architectural filters. If any answer is No, the complexity of SIMD is likely not worth the effort:
1. **Is the data uniform? -** Same operation applies to all elements (arrays, byte streams, numeric buffers)
2. **Is the operation repeated? -** The work is identical across elements (add, compare, scan, transform)
3. **Is it a hot path? -** This code runs frequently or dominates runtime

The rule of thumb is: SIMD is worth it when you’re doing the same simple work over a lot of data, very often.
  

<!-- <br><> -->

## Key Takeaways

- SIMD executes the same operation across multiple data elements in one instruction.
- It works best on large, uniform, repeated workloads.
- Performance gains come from changing the execution model, not the algorithm.

We can gracefully conclude that true performance is found where the software finally respects the reality of the hardware.

**At some point, it stops being about clever code and starts being about understanding the machine you’re running on.**