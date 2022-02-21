import React from "react";
import { Container, Stepper, Step, Card, Grid, StepLabel } from "@mui/material";

interface StepWrapperProps {
  activeStep: number;
}

const steps = [
  "Шаг 1. Ввод почты",
  "Шаг 2. Подтверждение почты",
  "Шаг 3. Создание аккаунта",
];

const StepWrapper: React.FC<StepWrapperProps> = ({ children, activeStep }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={`${step}_${index}`} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center">
        {children}
      </Grid>
    </Container>
  );
};

export default StepWrapper;
