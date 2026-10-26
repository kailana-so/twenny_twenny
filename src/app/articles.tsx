import { Box, Typography, Grid, Link } from "@mui/material";

const FEED_URL = "https://medium.com/feed/@TwennyTwenny";
const imgRegex = /<img[^>]+src="(https:\/\/cdn-images-[^">]+)"/;

async function getArticles(): Promise<Article[]> {
    try {
        const res = await fetch(FEED_URL, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; kailanasommer.com)" },
            next: { revalidate: 3600 },
        });
        if (!res.ok) {
            console.error(`Medium feed returned ${res.status}`);
            return [];
        }
        return parseFeed(await res.text());
    } catch (err) {
        console.error("Medium feed fetch failed", err);
        return [];
    }
}

function parseFeed(xml: string): Article[] {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.map((item) => ({
        guid: getTag(item, "guid"),
        pubDate: getTag(item, "pubDate"),
        content: getTag(item, "content:encoded"),
        link: getTag(item, "link"),
        title: getTag(item, "title"),
    }));
}

function getTag(xml: string, tag: string): string {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    if (!match) return "";
    return match[1].replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1").trim();
}

const Articles = async () => {
    const articles = await getArticles();

    return (
        <Box sx={{ p: 2 }}>
            {articles.map((article) => {
                const date = new Date(article.pubDate).toLocaleDateString();
                const match = article.content && article.content.match(imgRegex); // Check if article.content exists
                const imageThumbnail = match ? match[1] : '';

                return (
                    <Link key={article.guid} href={article.link}>
                        <Grid
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
