# Deployment Guide — Blogsy

This guide walks you through deploying Blogsy from your local machine to the internet using GitHub and Vercel. No prior deployment experience needed.

---

## What You Need

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free — sign up with your GitHub account)
- Your project working locally (`npm run dev` runs without errors)

---

## Step 1 — Check Your .gitignore

Before pushing to GitHub, make sure your `.env` file is NOT uploaded. It contains secret keys.

Open `.gitignore` and confirm this line exists:

```
.env
```

If it's not there, add it and save. This keeps your Appwrite credentials private.

---

## Step 2 — Push Your Project to GitHub

### 2a. Create a new repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top right → **New repository**
3. Give it a name like `blogsy`
4. Set it to **Public** or **Private** (your choice)
5. Do NOT check "Add a README" or "Add .gitignore" — you already have those
6. Click **Create repository**

### 2b. Connect your local project to GitHub

Open your terminal in the project folder and run these commands one by one:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "initial commit"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/blogsy.git
```

> Replace `YOUR_USERNAME` with your actual GitHub username and `blogsy` with your repo name.

```bash
git push -u origin main
```

Your code is now on GitHub. Refresh your GitHub repo page to confirm.

---

## Step 3 — Deploy to Vercel

### 3a. Import your project

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New** → **Project**
3. Under "Import Git Repository", find your `blogsy` repo and click **Import**

### 3b. Configure the project

Vercel will auto-detect it as a Vite project. The default settings are correct:

- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

You don't need to change any of these.

### 3c. Add environment variables

This is the most important step. Since `.env` was not pushed to GitHub, you need to add your variables manually in Vercel.

1. Scroll down to the **Environment Variables** section
2. Add each variable one by one:

| Name | Value |
|------|-------|
| `VITE_APPWRITE_URL` | `https://fra.cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID` | your project ID |
| `VITE_APPWRITE_DATABASE_ID` | your database ID |
| `VITE_APPWRITE_COLLECTION_ID` | your collection ID |
| `VITE_APPWRITE_BUCKET_ID` | your bucket ID |

> You can find all these values in your Appwrite dashboard.

3. Click **Deploy**

Vercel will build your project. This takes about 1–2 minutes. When it's done you'll get a live URL like `https://blogsy.vercel.app`.

---

## Step 4 — Configure Appwrite for Your Live Domain

Your Appwrite project currently only allows `localhost`. You need to add your Vercel domain.

1. Go to your [Appwrite Console](https://cloud.appwrite.io)
2. Open your project → **Settings** → **Platforms**
3. Click **Add Platform** → **Web App**
4. Enter your Vercel URL (e.g. `blogsy.vercel.app`) — no `https://`, just the domain
url : https://blogsy-iota.vercel.app/
5. Click **Next** and save

Without this step, Appwrite will block all requests from your live site.

---

## Step 5 — Configure TinyMCE for Your Live Domain

TinyMCE also validates the domain your editor runs on.

1. Go to [tiny.cloud/my-account/domains](https://www.tiny.cloud/my-account/domains)
2. Add your Vercel domain (e.g. `blogsy.vercel.app`)
3. Save

Without this, the text editor will be disabled on your live site.

---

## Step 6 — Test Your Live Site

Open your Vercel URL and test:

- [ ] Home page loads
- [ ] Sign up works
- [ ] Log in works
- [ ] Create a post with an image
- [ ] TinyMCE editor is not showing any API key warning
- [ ] Post appears on the home page
- [ ] Edit and delete work
- [ ] Dark mode toggle works
- [ ] Log out works

---

## Updating Your Site Later

Every time you push new code to GitHub, Vercel automatically redeploys. Just run:

```bash
git add .
git commit -m "your update message"
git push
```

Vercel picks it up and your live site updates within a minute.

---

## Troubleshooting

**Build fails on Vercel**
- Check the build logs in Vercel dashboard for the exact error
- Make sure all environment variables are added correctly (no quotes around values)

**Appwrite requests blocked on live site**
- You forgot Step 4 — add your Vercel domain to Appwrite platforms

**TinyMCE editor disabled on live site**
- You forgot Step 5 — add your Vercel domain to TinyMCE approved domains

**Environment variables not working**
- Variable names must start with `VITE_` exactly
- After adding/changing env vars in Vercel, trigger a manual redeploy: Vercel dashboard → your project → **Deployments** → **Redeploy**
