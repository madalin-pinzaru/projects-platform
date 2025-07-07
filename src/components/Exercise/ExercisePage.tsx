import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function calculateSubstring(input: string): number {
  const stack = [-1];
  let maxLength = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLength;
}

function ExercisePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleShowResult = () => {
    setResult(calculateSubstring(input).toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^()]/g, "");
    setInput(value);
  };

  return (
    <Paper sx={{ maxWidth: 400, margin: "2rem auto", p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Enter parentheses"
          value={input}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleShowResult}>
          Show Result
        </Button>
        {result !== null && (
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Result: {result}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default ExercisePage;
