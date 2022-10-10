import React from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { AppRadio } from "../../../components";

export function AnswerItemRadio({ answer, control, questionNumber }) {
  return (
    <AppRadio
      control={control}
      name={`${questionNumber}`}
      required
      children={
        <>
          {answer.map((i) => {
            return (
              <FormControlLabel
                key={i.content}
                value={i.content}
                control={<Radio />}
                label={i.content}
              />
            );
          })}
        </>
      }
    />
  );
}
