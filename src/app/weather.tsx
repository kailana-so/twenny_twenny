'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Grid, Typography, CircularProgress } from "@mui/material";
import axios, { AxiosResponse } from 'axios';
import styles from "./page.module.css";

interface WeatherResponse {
  current: {
    feelslike_c: number;
    condition: {
      text: string;
    };
  };
}

export default function Weather() {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [conditions, setConditions] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [weatherError, setWeatherError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        axios.get<WeatherResponse, AxiosResponse<WeatherResponse>>('/api/weather')
            .then((response) => {
                setTemperature(response.data.current.feelslike_c);
                setConditions(response.data.current.condition.text.toLowerCase().replace(/\s+/g, ''));
                setLoading(false);
            })
            .catch(function (error) {
                setWeatherError('/images/error.png');
                setLoading(false);
            });
    }, []);
    

    return (
        <Grid container justifyItems="flex-end" direction="column">
            {loading 
            ? <CircularProgress className={styles.blue} />
            : <>
                {weatherError !== ""
                ? <>
                    <Image 
                        src={weatherError} alt="weather-icon"
                        height="50"
                        width="50"
                    /> 
                    <Typography align="center">404</Typography>
                </>
                : <>
                    <Image 
                        src={`/images/${conditions.toLowerCase()}.png`} alt="weather-icon"
                        height="50"
                        width="50"
                    /> 
                    <Typography variant="overline" align="center">{temperature} &deg;</Typography>
                </>
            }
            </>
            }
        </Grid>
    );
}
