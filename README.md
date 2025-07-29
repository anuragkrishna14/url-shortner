# URL Shortener Backend

A robust and scalable URL shortening service built with Node.js, Express.js, and MongoDB. This application allows users to create shortened URLs with optional custom codes and provides analytics for each shortened link.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Short Codes**: Option to create custom short codes for URLs
- **Click Analytics**: Track the number of clicks for each shortened URL
- **RESTful API**: Clean and intuitive API endpoints
- **MongoDB Integration**: Persistent storage with MongoDB
- **Input Validation**: Comprehensive URL validation and error handling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   CONNECTION_STRING=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### 1. Create Short URL
**POST** `/api/shorten`

Create a new shortened URL.

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url-that-needs-shortening",
  "customCode": "optional-custom-code"
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very-long-url-that-needs-shortening",
  "shortUrl": "http://localhost:3000/r/abc12345"
}
```

### 2. Redirect to Original URL
**GET** `/r/:shortCode`

Redirects to the original URL and increments click count.

**Example:** `GET /r/abc12345`

### 3. Get URL Statistics
**GET** `/api/stats/:shortCode`

Get analytics for a specific shortened URL.

**Response:**
```json
{
  "originalUrl": "https://example.com/very-long-url-that-needs-shortening",
  "shortUrl": "http://localhost:3000/r/abc12345",
  "clicks": 42
}
```

## 🏗️ Project Structure

```
url-shortner/
├── config/
│   └── connectDb.js          # Database connection configuration
├── controllers/
│   └── urlController.js      # Request handlers and business logic
├── models/
│   └── urlModel.js           # MongoDB schema definition
├── routes/
│   └── urlRoute.js           # API route definitions
├── utils/
│   ├── generateShortId.js    # Short ID generation utility
│   └── isValidUrl.js         # URL validation utility
├── index.js                  # Application entry point
└── package.json              # Project dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `CONNECTION_STRING` | MongoDB connection string | Required |
| `BASE_URL` | Base URL for shortened links | Required |

### Database Schema

The application uses a MongoDB collection with the following schema:

```javascript
{
  originalUrl: String,    // The original long URL
  shortCode: String,      // The shortened code (unique)
  clicks: Number,         // Number of times the link was clicked
  createdAt: Date,        // Timestamp when the URL was created
  updatedAt: Date         // Timestamp when the URL was last updated
}
```

## 🚀 Usage Examples

### Using cURL

1. **Create a short URL:**
   ```bash
   curl -X POST http://localhost:3000/api/shorten \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.google.com"}'
   ```

2. **Create a short URL with custom code:**
   ```bash
   curl -X POST http://localhost:3000/api/shorten \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.google.com", "customCode": "google"}'
   ```

3. **Get URL statistics:**
   ```bash
   curl http://localhost:3000/api/stats/abc12345
   ```

## 🛡️ Error Handling

The application includes comprehensive error handling for:

- Invalid URL formats
- Missing required fields
- Duplicate custom codes
- Non-existent short codes
- Database connection issues

## 🧪 Testing

To run tests (when implemented):
```bash
npm test
```

## 📦 Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **dotenv**: Environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Anurag**

---

For questions or support, please open an issue in the repository. 