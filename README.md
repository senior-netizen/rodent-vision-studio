# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/383f468d-a2e3-4112-926a-52c968dd67e2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/383f468d-a2e3-4112-926a-52c968dd67e2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/383f468d-a2e3-4112-926a-52c968dd67e2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Blog admin setup (new)

This project includes a built-in blog with admin login and post publishing routes:
This project now includes a built-in blog with admin login and post publishing routes:
- `/blog` (public list)
- `/blog/:slug` (public post page)
- `/blog/login` (admin login)
- `/blog/new` (create post)

Admin credentials currently configured in-app:
- Email: `anesu@rodent.co.zw`
- Password: `rodent@2526`

Editorial formats built in: Engineering notes, Field reports, Build logs, Grid experiments, Post-mortems, Research drops.


## Abstract export templates and audit trail

Project abstract downloads now use a premium PDF template mode (default) with:
- cover-style title hierarchy
- accent dividers
- footer page numbering
- PDF metadata (title/author/subject)

Each abstract download also records an audit event in browser local storage (`rodent_audit_events`) and can be exported as CSV from project pages.
To enable admin login, set an environment variable before running the app:

`VITE_BLOG_ADMIN_PASSWORD=your-strong-password`

Without this variable, login is intentionally blocked so the blog cannot be edited accidentally.

Editorial formats built in: Engineering notes, Field reports, Build logs, Grid experiments, Post-mortems, Research drops.
