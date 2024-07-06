import styles from "../app/page.module.css";
import Link from 'next/link'
import { Typography, Grid } from "@mui/material";
import Weather from "./weather";
import Articles from "./articles"

export default function Home() {
  return (
    <Grid container direction="column" sx={{ p:2
  }}>
      <Grid item>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">Kailana.</Typography>
          </Grid>
          <Grid item className={styles.right}>
            <Weather/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
      <Typography> Full Stack - DevOps</Typography>
      </Grid>
        <Articles/>
        <Grid item sx={{ pt:2 }}>
          <Link href="/">&#8627; 
            Git
          </Link>
        </Grid>
      <Grid item sx={{ pt:2 }}>
        <Link href="/contact"><span className={styles.blue}>Get in touch &#8594;</span></Link>
      </Grid>
    </Grid>
  );
}
