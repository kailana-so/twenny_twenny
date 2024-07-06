'use client'
import React, { useState } from 'react';
import { Grid, TextField, Button, Box, FormControl} from '@mui/material';
import styles from '../page.module.css';

interface Props {
  formData: { name: string; contact: string; message: string };
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export type formData = {
  name: string;
  email: string;
  message: string;
};

const Form = ({ formData, handleChange, handleSubmit }: Props) => {
  const [emailError, setEmailError] = useState(false);

  const formHasEmptyFeilds = Object.values(formData).some(field => field === "")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    handleChange('contact', value);
    setEmailError(!validateEmail(value));
  };

  return (
    <Grid 
      container
      flexDirection="column"
      // spacing={2}
      // className={styles.center}
    >
      <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl fullWidth>
          {/* <Grid item> */}
            <TextField id="name" label="Name" variant="outlined" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
          {/* </Grid> */}
        </FormControl>
        <FormControl fullWidth>
          <TextField id="contact" label="Contact" variant="outlined" error={emailError} value={formData.contact} onChange={(e) => handleEmailChange(e.target.value)} />
        </FormControl>
        <FormControl fullWidth>
          <TextField id="message" label="Message" multiline minRows={4} variant="outlined" value={formData.message} onChange={(e) => handleChange('message', e.target.value)} />
        </FormControl>
        <Grid container justifyContent="flex-end">

        <Grid item>
          <Button 
            type="submit" 
            size="small" 
            variant="outlined"
            disabled={formHasEmptyFeilds}>
            Send <span className={styles.largeFont}>&#9993;</span>
          </Button>
        </Grid>
        </Grid>
        </Box>
      </form>
    </Grid>
  );
};

export default Form;
