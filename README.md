# **Decidr Coding Test**

This project is a full-stack TypeScript application designed to handle data from a CSV file. Users can upload the file, process the data into a database, and interact with it through a responsive web interface.

---

## **Getting Started**

You can download the source code from the following GitHub repositories:

- **Frontend**: [https://github.com/YaAlB/decidr](https://github.com/YaAlB/decidr)
- **Backend**: [https://github.com/YaAlB/decidr-api](https://github.com/YaAlB/decidr-api)

You will also need the provided CSV file for testing:
- **CSV File**: [Download StarWarsCharacters.csv](StarWarsCharacters.csv)

---

## **Setup and Run**

### **Backend**

#### **1. Prerequisites**
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)

#### **2. Setup**
1. Clone the backend repository:
   ```bash
   git clone https://github.com/YaAlB/decidr-api.git
   cd decidr-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following configuration:
   ```plaintext
   PORT=8000
   MONGO_URI=
   ```

   Replace `MONGO_URI` with your MongoDB connection string if using a cloud instance.

4. Start the server:
   ```bash
   npm start
   ```

#### **3. API Endpoints**
- **Upload CSV File**:
  - Endpoint: `POST /api/upload`
  - Headers:
    - `Content-Type: application/octet-stream`
    - `x-filename: StarWarsCharacters.csv`
  - Body: Raw file data.
  - Example:
    ```bash
    curl -X POST -H "Content-Type: application/octet-stream" -H "x-filename: StarWarsCharacters.csv" --data-binary @StarWarsCharacters.csv http://localhost:8000/api/upload
    ```

- **Fetch People**:
  - Endpoint: `GET /api/people`
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Number of results per page (default: 10)
    - `search`: Search string for filtering results.
    - `sortBy`: Field to sort by (e.g., `first_name`).
    - `order`: Sort order (`asc` or `desc`).
  - Example:
    ```bash
    curl "http://localhost:8000/api/people?page=1&limit=10&search=Darth&sortBy=first_name&order=asc"
    ```

## **File Structure**

### **Backend**
```
backend/
├── src/
│   ├── models/            # MongoDB models (Person, Location, Affiliation)
│   ├── routes/            # Express routes (upload, people)
│   ├── services/          # CSV processing and database logic
│   ├── utils/             # Utility functions (e.g., titleCase)
│   ├── app.ts             # Express app entry point
│   ├── server.ts          # Server initialization
│   ├── .env               # Environment variables
├── package.json
├── tsconfig.json          # TypeScript configuration
```