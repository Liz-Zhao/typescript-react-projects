// src/components/Calculator.tsx
import React, { useState } from "react";

// 运算符类型
type Operator = "+" | "-" | "*" | "/";

// 定义错误类型
enum CalculatorError {
  DIVIDE_BY_ZERO = "Cannot divide by zero",
  INVALID_OPERATION = "Invalid operation",
}

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operator, setOperator] = useState<Operator>("+");
  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 处理运算
  const calculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError(CalculatorError.INVALID_OPERATION);
      setResult(null);
      return;
    }

    setError(null); // 清除之前的错误
    let res: number;
    try {
      switch (operator) {
        case "+":
          res = number1 + number2;
          break;
        case "-":
          res = number1 - number2;
          break;
        case "*":
          res = number1 * number2;
          break;
        case "/":
          if (number2 === 0) {
            throw new Error(CalculatorError.DIVIDE_BY_ZERO);
          }
          res = number1 / number2;
          break;
        default:
          throw new Error(CalculatorError.INVALID_OPERATION);
      }
      setResult(res);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Calculator</h1>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
          style={{ marginRight: "8px", padding: "4px" }}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value as Operator)}
          style={{ marginRight: "8px", padding: "4px" }}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="text"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
          style={{ marginRight: "8px", padding: "4px" }}
        />
        <button onClick={calculate} style={{ padding: "4px 8px" }}>
          Calculate
        </button>
      </div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {result !== null && !error && <div>Result: {result}</div>}
    </div>
  );
};

export default Calculator;
