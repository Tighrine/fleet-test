import { FormControl, styled } from "@mui/material";

export const CustomFormControl = styled(FormControl)({
  minWidth: 220,
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
});
