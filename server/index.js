const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

const imgs = [
    "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
    "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
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
        const postId = req.query;
        console.log(postId)
        const post = getPostData();

        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title>${post.title}</title>`
        )
            .replace('__META_OG_TITLE__', post.title)
            .replace('__META_OG_DESCRIPTION__', post.description)
            .replace('__META_DESCRIPTION__', post.description)
            .replace('__META_OG_IMAGE__', post.thumbnail)
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