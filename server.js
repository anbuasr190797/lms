const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
//const API_ENDPOINT = 'https://7wrda01ytk.execute-api.ap-south-1.amazonaws.com/default/Dbinteractor';
const API_ENDPOINT = 'https://ln2ig26r47.execute-api.us-east-1.amazonaws.com/default/myFunctionName';

app.put('/updateBookAvailabilityStatus', async (req, res) => {
    const response = await axios.put(API_ENDPOINT, {
        httpMethod: 'PUT',
        TableName:'Books',
        Key: {"BookId": req.body.BookId},
        UpdateExpression: 'SET Available = :BookAvailability',
        ExpressionAttributeValues: {
          ':BookAvailability': req.body.Available
        },
    });
    res.send(response.data);
});

app.post('/createBook', async (req, res) => {
    const response = await axios.post(API_ENDPOINT, {
        httpMethod: 'POST',
        TableName:'Books',
        Item: req.body
    });
    res.send(response.data);
});

app.put('/updateBookAuthor', async (req, res) => {
    const response = await axios.put(API_ENDPOINT, {
        httpMethod: 'PUT',
        TableName:'Books',
        Key: {"BookId":req.body.BookId},
        UpdateExpression: 'SET BookAuthor = :BookAuthor',
        ExpressionAttributeValues: {
          ':BookAuthor': req.body.BookAuthor
        },
    });
    res.send(response.data);
});

app.put('/updateBookName', async (req, res) => {
    const response = await axios.put(API_ENDPOINT, {
        httpMethod: 'PUT',
        TableName:'Books',
        Key: {"BookId":req.body.BookId},
        UpdateExpression: 'SET BookName = :BookName',
        ExpressionAttributeValues: {
          ':BookName': req.body.BookName
        },
    });
    res.send(response.data);
});

app.put('/updateBookPublisher', async (req, res) => {
    const response = await axios.put(API_ENDPOINT, {
        httpMethod: 'PUT',
        TableName:'Books',
        Key: {"BookId":req.body.BookId},
        UpdateExpression: 'SET BookPublisher = :BookPublisher',
        ExpressionAttributeValues: {
          ':BookPublisher': req.body.BookPublisher
        },
    });
    res.send(response.data);
});

app.get('/getBooks', async (req, res) => {
    const response = await axios.get(API_ENDPOINT, {
        params: {
            httpMethod: 'GET',
            TableName: 'Books'
        }
    });
    res.send(response.data);
});

app.delete('/deleteBook', async (req, res) => {
    const response = await axios.delete(API_ENDPOINT, {
        data: {
        httpMethod: 'DELETE',
        TableName:'Books',
        Key: {"BookId":req.body.BookId},
        }
    });
    res.send(response.data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});