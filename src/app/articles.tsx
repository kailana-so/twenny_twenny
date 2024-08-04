'use client';
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import axios from "axios";

const Articles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const imgRegex = /<img[^>]+src="(https:\/\/cdn-images-[^">]+)"/;

    const getPostData = () => {
        axios
            .get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@TwennyTwenny")
            .then((res) => {
                setArticles(res.data.items);
            })
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            {articles.map((article) => {
                const date = new Date(article.pubDate).toLocaleDateString();
                const match = article.content && article.content.match(imgRegex); // Check if article.content exists
                const imageThumbnail = match ? match[1] : '';

                return (
                    <Link href={article.link}>
                        <Grid 
                            key={article.guid} 
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{ 
                                mt: 1, 
                                p: 2, 
                                border: "1px dashed black", 
                                borderRadius: "3px",
                                backgroundColor: "white"
                                
                            }}
                        >
                            {imageThumbnail && (
                                <img
                                    src={imageThumbnail}
                                    alt={article.title}
                                    style={{ width: '150px', height: 'auto' }} // Adjust width and height as needed
                                />
                            )}
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                >
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    <Typography variant="subtitle1">
                                        {article.title}
                                    </Typography>
                                </a>
                                <Typography variant="caption">
                                    {date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Link>
                );
            })}
        </Box>
    );
};

export default Articles;

interface Article {
    guid: string;
    pubDate: string;
    content: string;
    link: string;
    title: string;
}
