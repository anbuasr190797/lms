import axios from 'axios';

const API_ENDPOINT = 'https://7wrda01ytk.execute-api.ap-south-1.amazonaws.com/default/Dbinteractor';

const createBook = async (data) => {
    const response = await axios.post(API_ENDPOINT, {
        httpMethod: 'POST',
        TableName:'Books',
        Item: data
    });
    return response.data;
};

const getBooks = async () => {
    const response = await axios.get(API_ENDPOINT, {
        params: {
            httpMethod: 'GET',
            TableName: 'Books'
        }
    });
    return response.data;
};

const updateBookAuthor = async (data) => {
    const response = await axios.put(API_ENDPOINT, {
        httpMethod: 'PUT',
        TableName:'Books',
        Key: {"BookId":data.BookId},
        UpdateExpression: 'SET BookAuthor = :BookAuthor',
        ExpressionAttributeValues: {
          ':BookAuthor': data.BookAuthor
        },
    });
    return response.data;
};


const updateBookName = async (data) => {
  const response = await axios.put(API_ENDPOINT, {
      httpMethod: 'PUT',
      TableName:'Books',
      Key: {"BookId":data.BookId},
      UpdateExpression: 'SET BookName = :BookName',
      ExpressionAttributeValues: {
        ':BookName': data.BookName
      },
  });
  return response.data;
};

const updateBookPublisher = async (data) => {
  const response = await axios.put(API_ENDPOINT, {
      httpMethod: 'PUT',
      TableName:'Books',
      Key: {"BookId":data.BookId},
      UpdateExpression: 'SET BookPublisher = :BookPublisher',
      ExpressionAttributeValues: {
        ':BookPublisher': data.BookPublisher
      },
  });
  return response.data;
};

const updateBookAvailability = async (data) => {
  const response = await axios.put(API_ENDPOINT, {
      httpMethod: 'PUT',
      TableName:'Books',
      Key: {"BookId":data.BookId},
      UpdateExpression: 'SET Available = :BookAvailability',
      ExpressionAttributeValues: {
        ':BookAvailability': data.Available
      },
  });
  return response.data;
};

const deleteBook = async (data) => {
    const response = await axios.delete(API_ENDPOINT, {
        data: {
            httpMethod: 'DELETE',
            TableName:'Books',
            Key: {"BookId":data.BookId}
        }
    });
    return response.data;
};

// const data = {
//     BookId: "0002",
//     BookName: "The Alchemist 2",
//     BookAuthor: "Paulo Coelho",
//     BookPublisher: "HarperCollins Publishers",
//     Available: true
// };

// const Borrowers = [
//   {
//     UserId: "U001",
//     UserName: "John Doe",
//     BorrowedBooks: [
//       {
//         BookId: "0002",
//         BorrowDate: "2022-01-01",
//         ReturnDate: null
//       }
//     ]
//   },
//   {
//     UserId: "U002",
//     UserName: "Jane Smith",
//     BorrowedBooks: []
//   },
// ];

// createBook(data)
//     .then(data => console.log('Book created:', data))
//     .catch(err => console.error('Error creating book:', err));

// getBooks()
//     .then(data => console.log('Books:', data))
//     .catch(err => console.error('Error getting books:', err));

// updateBookAuthor(data)
//     .then(data => console.log('BookAuthor updated:', data))
//     .catch(err => console.error('Error updating book:', err));

// updateBookName(data)  
//   .then(data => console.log('BookName updated:', data))
//   .catch(err => console.error('Error updating book:', err));

// updateBookPublisher(data)
//   .then(data => console.log('BookPublisher updated:', data))
//   .catch(err => console.error('Error updating book:', err));

// updateBookAvailability(data)
//   .then(data => console.log('BookAvailability updated:', data))
//   .catch(err => console.error('Error updating book:', err));

// deleteBook(data)
//     .then(data => console.log('Book deleted:', data))
//     .catch(err => console.error('Error deleting book:', err));

export { createBook, getBooks, updateBookAuthor, updateBookName, updateBookPublisher, updateBookAvailability, deleteBook };