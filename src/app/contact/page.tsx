'use client'
import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import styles from '../page.module.css';
import Form from './form';
import Link from 'next/link'
import Weather from "../weather"

const Page = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [sendError, setSendError] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setLoading(true)
      setEmailSubmitted(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Clear form after successful submission
        setFormData({ name: '', contact: '', message: '' });
      } else {
        setSendError(true);
      }
      setLoading(false)
  };

  // Input change handler
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSendError(false)
    setEmailSubmitted(false)
  };

  return (
    <Grid container direction="column">
       <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">Hi.</Typography>
          </Grid>
          <Grid item className={styles.right}>
            <Weather/>
          </Grid>
        </Grid>
      <Grid container direction="row" justifyContent="flex-start">
      <Grid item xs={4} sx={{ pt:2 }}>
        <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} sendError={sendError} emailSubmitted={emailSubmitted} loading={loading}/>
      </Grid>
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
