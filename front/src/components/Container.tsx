import {
  Typography,
  Container as MuiContainer,
  type ContainerProps,
} from "@mui/material";

function Container({ title, children }: ContainerProps) {
  return (
    <MuiContainer
      sx={{
        paddingInline: 1,
        paddingBlock: 2,
        borderRadius: "12px",
        border: "1px solid rgba(240, 240, 241, 255)",
        overflowY: "auto",
        marginLeft: "0em",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {children}
    </MuiContainer>
  );
}

export default Container;
