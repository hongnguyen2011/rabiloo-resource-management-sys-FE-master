import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AppCheckbox } from "../../../components";

export function AnswerItemCheckbox({ answer, control, questionNumber }) {
  return (
    <FormGroup>
      <Controller
        name={`${questionNumber}`}
        control={control}
        rules={{
          required: {
            value: true,
            message: "required",
          },
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <>
              {answer.map((item) => {
                return (
                  <FormControlLabel
                    key={`${item.content}`}
                    control={
                      <Checkbox
                        color="primary"
                        onChange={(e) => {
                          onChange({
                            ...value,
                            [`${item.content}`]: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={item.content}
                  />
                );
              })}
            </>
          );
        }}
      />
    </FormGroup>

    // <>
    //   {answer.map((i) => {
    //     return (
    //       <AppCheckbox
    //         key={i.content}
    //         control={control}
    //         name={`${questionNumber}${i.content}`}
    //         label={i.content}
    //       />
    //     );
    //   })}
    // </>
  );
}
