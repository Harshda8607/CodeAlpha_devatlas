# DevAtlas: Harshda Sachin Sutar's portfolio

## Run locally
Unzip, open the `devatlas` folder, double-click `index.html`. No install or server needed.

## What to update later
| Task | Where |
|---|---|
| Add GitHub / project links | `github` and `demo` fields in `PROJECTS` (script.js). Buttons appear automatically. Add a GitHub icon by copying the LinkedIn `<li>` in index.html and using `#i-github`. |
| Real project screenshots | Put images in assets/projects/ and change the `image` paths in script.js |
| Contact form delivery | Create a free form at formspree.io, paste its URL into `FORM_ENDPOINT` in script.js. Until then the form opens the visitor's email app and clearly says nothing was sent. |
| Resume | Re-export and replace `assets/resume.pdf` (and `assets/resume-preview.jpg`) |
| Skills, roles, text | `SKILLS` / `CONFIG` in script.js; text in index.html |
| Colors | CSS variables at the top of style.css |

## Deploy: GitHub Pages
1. On github.com create a new public repository, e.g. `portfolio`.
2. Upload all files and the `assets` folder so `index.html` is at the repository root.
3. Settings > Pages > Build and deployment: Source "Deploy from a branch", Branch `main`, folder `/ (root)`, Save.
4. After 1-2 minutes your URL appears at the top of that page: https://USERNAME.github.io/REPO/
5. To update: edit or upload changed files and commit; it redeploys automatically.

## Deploy: Netlify
1. Sign up at netlify.com (free).
2. Add new site > Deploy manually, then drag the `devatlas` folder in. (Or Import from Git and pick your repository.)
3. Build command: empty. Publish directory: `.` (the folder that contains index.html).
4. Netlify gives a URL like https://your-name.netlify.app (rename it in Site configuration).
5. To update: drag the folder again, or push a commit if connected to Git.

All paths are relative, so they work on both hosts. After deploying, test the resume download and contact form on the live URL.
