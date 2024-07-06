'use client'
import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import styles from '../page.module.css';
import Form from './form';
import Link from 'next/link'
import Weather from "../weather"

const Page = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const response = fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res) => {
      console.log('res received')
      console.log(res,"res")
      if (res.status === 200) {
        console.log('Response succeeded!')
        console.log(res, "res")
      }
    })
    console.log(response, "response")

    // Reset form state or perform further actions
    setFormData({ name: '', contact: '', message: '' }); 
  };

  // Input change handler
  const handleChange = (field: string, value: string) => {
    console.log(`${field}: ${value}`);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Grid container direction="column" sx={{ p: 1 }}>
       <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">Hi.</Typography>
          </Grid>
          <Grid item className={styles.right}>
            <Weather/>
          </Grid>
        </Grid>
      <Grid height="350px" xs={4} sx={{ pt:2 }}>
      <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </Grid>
      <div className={styles.left}>
        <Link href="/">
          <span className={styles.blue}>&#8592; Back</span>
        </Link>
      </div>
    </Grid>
  );
};

export default Page;
