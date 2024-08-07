import { TextField } from '@mui/material';

type Props = {
  name: string;
  type: string;
  label: string;
};

function CustomizedInput({ name, type, label }: Props) {
  return (
    <TextField
      margin='normal'
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      inputProps={{
        style: {
          width: '400px',
          borderRadius: 10,
          fontSize: 20,
          color: 'white',
        },
      }}
      name={name}
      label={label}
      type={type}
    />
  );
}

export default CustomizedInput;
