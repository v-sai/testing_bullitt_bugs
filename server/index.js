const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8000;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

const imgs = [
    "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
    "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
    `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${process.env.API_KEY}`
];

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

const getPostData = () => {
    const randNum = Math.floor(Math.random() * imgs.length);
    const randomImg = imgs[randNum];
    return {
        thumbnail: randomImg,
        title: `Session ${randNum}`,
        description: `This is desc of ${randNum}`,
    }
}


// here we serve the index.html page
app.get('/sessions/:id', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        const postId = req.params.id;
        console.log(postId)
        const post = getPostData();

        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title> Test Session ${postId}</title>`
        )
            .replace('__META_OG_TITLE__', postId)
            .replace('__META_OG_DESCRIPTION__', `This is description of session ${postId}`)
            .replace('__META_DESCRIPTION__', `This is description of session ${postId}`)
            .replace('__META_OG_IMAGE__', postId <= 4 ? imgs[postId] : post.thumbnail)

            // .replace("__META_TWITTER_TITLE__", postId)
            // .replace("__META_TWITTER_DESCRIPTION__",  `This is description of session ${postId}`)
            // .replace("__META_TWITTER_IMAGE__", postId <= 4 ? imgs[postId] : post.thumbnail)
        return res.send(htmlData);
    });
});

app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end();
        }
        // You can add default meta tags or handle other routes here if needed

        return res.send(htmlData);
    });
});


// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});