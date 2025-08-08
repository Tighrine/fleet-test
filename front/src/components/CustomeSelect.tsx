import { Select, styled, type SelectProps } from "@mui/material";

export const CustomSelect = styled(Select)<SelectProps>({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "lightgray",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "& .MuiSelect-icon": {
    color: "gray",
  },
  "&.Mui-focused .MuiSelect-icon": {
    color: "black",
  },
});
