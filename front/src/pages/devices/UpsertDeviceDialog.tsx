import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  Typography,
  Divider,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { devicesType, type Device } from "../../shapes/device"; // Assuming this is where device types are defined
import type { Employee } from "../../shapes/employee";
import Button from "../../components/Button";
import CustomTextField from "../../components/CustomTextField";
import { CustomFormControl } from "../../components/CustomFromControl";
import { useCreateDevice, useUpdateDevice } from "../../hooks/useDevices";

type UpsertDeviceDialogProps = {
  open: boolean;
  onClose: () => void;
  owners: Employee[] | undefined;
  device?: Device; // Optional device prop for editing
};

export const UpsertDeviceDialog: React.FC<UpsertDeviceDialogProps> = ({
  open,
  onClose,
  owners,
  device,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Device>();

  const { mutate: createDevice } = useCreateDevice();
  const { mutate: updateDevice } = useUpdateDevice();

  useEffect(() => {
    if (open) {
      if (device) {
        reset(device);
      } else {
        reset({
          name: "",
          type: "",
          owner: { id: "none" },
        });
      }
    }
  }, [device, open, reset]);

  const handleClose = () => {
    reset({});
    onClose();
  };

  const submitHandler = async (data: Device & { ownerId?: string | null }) => {
    if (data.owner?.id && data.owner.id !== "none") {
      data = {
        ...data,
        ownerId: data.owner.id,
      };
    } else {
      data.ownerId = null; // Ensure ownerId is null if no owner is selected
    }
    delete data.owner;
    if (device) {
      await updateDevice({
        id: device.id!,
        data,
      });
    } else {
      await createDevice(data);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {device ? "Edit Device" : "Add New Device"}
      </DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Device name is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Device Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            defaultValue=""
            rules={{ required: "Device type is required" }}
            render={({ field }) => (
              <>
                <CustomFormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.type}
                >
                  <InputLabel id="device-type-label">Device Type</InputLabel>
                  <Select
                    {...field}
                    labelId="device-type-label"
                    label="Device Type"
                  >
                    {devicesType.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormControl>
                {errors.type ? (
                  <FormHelperText
                    sx={{ marginLeft: "1em" }}
                    error={!!errors.type}
                  >
                    {errors.type.message}
                  </FormHelperText>
                ) : null}
              </>
            )}
          />
          <Controller
            name="owner.id"
            control={control}
            defaultValue={"none"}
            render={({ field }) => (
              <>
                <CustomFormControl fullWidth margin="normal">
                  <InputLabel id="owner-label">Owner</InputLabel>
                  <Select {...field} labelId="owner-label" label="Owner">
                    <MenuItem value="none" aria-placeholder="Select Owner">
                      <Typography color="textDisabled">Select Owner</Typography>
                    </MenuItem>
                    {owners?.map((owner) => (
                      <MenuItem key={owner.id} value={owner.id}>
                        {owner.name}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormControl>
              </>
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <MuiButton
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "gray",
              },
            }}
          >
            <span>Cancel</span>
          </MuiButton>
          <Button type="submit" name={device ? "Update" : "Create"} />
        </DialogActions>
      </form>
    </Dialog>
  );
};
