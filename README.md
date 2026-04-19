# Blogsy

A full-stack blog platform built with React and Appwrite. Write, publish, and manage blog posts with a clean, responsive UI and dark/light mode support.

## Features

- Authentication — sign up, log in, log out via Appwrite
- Create, edit, and delete blog posts
- Rich text editor powered by TinyMCE
- Featured image upload and preview
- Active/inactive post status control
- Dark and light mode toggle (persisted in localStorage)
- Protected routes — only authors can edit or delete their posts
- Fully responsive layout

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Redux Toolkit
- Appwrite (auth, database, storage)
- TinyMCE (rich text editor)
- React Hook Form
- React Router v7

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/blogsy.git
cd blogsy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with the following:

```env
VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

### 4. Set up Appwrite

In your Appwrite project:

- Create a database and a collection with these attributes:
  - `title` — String (255)
  - `content` — String (1000000)
  - `featuredimage` — String (255)
  - `status` — String (255)
  - `userId` — String (255)
- Create a storage bucket for images
- Add `localhost` (dev) and your production domain to the allowed platforms

### 5. Set up TinyMCE

- Get a free API key at [tiny.cloud](https://www.tiny.cloud)
- Add your domain at [tiny.cloud/my-account/domains](https://www.tiny.cloud/my-account/domains)
- Add the key to `src/components/RTE.jsx`

### 6. Run the dev server

```bash
npm run dev
```

## Project Structure

```
src/
├── appwrite/       # Appwrite auth and database/storage services
├── components/     # Reusable UI components
│   ├── Header/
│   ├── Footer/
│   ├── postform/
│   └── container/
├── conf/           # Environment variable config
├── context/        # Theme context (dark/light mode)
├── pages/          # Route-level page components
└── store/          # Redux store and auth slice
```

## Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist/` folder to any static host (Vercel, Netlify, etc.)

3. Add your production environment variables to the hosting platform

4. Add your production domain to both Appwrite's allowed platforms and TinyMCE's approved domains

## License

MIT
