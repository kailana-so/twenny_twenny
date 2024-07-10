import styles from "../app/page.module.css";
import Link from 'next/link'
import { Typography, Grid } from "@mui/material";
import Weather from "./weather";
import Articles from "./articles"

export default function Home() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item sx={{pb:2}}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">Kailana.</Typography>
            <Typography variant="caption"> Full Stack - DevOps</Typography>
          </Grid>
          <Grid item className={styles.right}>
            <Weather/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Link href="/contact">
          <span className={styles.blue}>
            Get in touch &#8594;
          </span>
        </Link>
      </Grid> 
      <Articles/>
      <Grid item sx={{ pt:2 }}>
        <Link href="https://github.com/kailana-so"
              target="_blank"
              rel="noopener noreferrer"
        >
          &#8627; Github
        </Link>
      </Grid>
    </Grid>
  );
}
