
DSVisualizer - Prepared for Azure Static Web Apps
------------------------------------------------

What I changed / added:
1. Added 'staticwebapp.config.json' at the project root to handle SPA fallback to index.html.
2. Added a '404.html' page.
3. Added a GitHub Actions workflow template at '.github/workflows/azure-static-web-apps-DSVisualizer.yml'
   - This workflow will build (if package.json exists) and deploy to Azure Static Web Apps.
   - You need to create the GitHub secret 'AZURE_STATIC_WEB_APPS_API_TOKEN' after creating the Azure Static Web App.
4. No content files were modified (only added supporting files) to avoid breaking your code.

How to deploy (quick steps):
A) Manual zip upload (no GitHub):
   1. Go to Azure Portal -> Static Web Apps -> Create.
   2. For 'Build details / Source', choose 'Other' or 'Manual' (if available) and complete the creation.
   3. In the Static Web App resource, look for 'Overview' -> 'Browse' or 'Configuration' and upload the built content.
   4. If your app is pure static (index.html in root), you can upload the root folder contents.
   5. Alternatively, use Azure Storage + Static website hosting if manual upload is preferred.

B) Recommended - GitHub automated deployment:
   1. Create a new GitHub repo and push the contents of this prepared folder to the 'main' branch.
   2. In Azure Portal -> Static Web Apps -> Create, choose 'GitHub' as the source and authorize.
   3. Select your repo and branch 'main'. Azure will create a workflow and set secrets automatically OR you can set the secret manually.
   4. If Azure doesn't set the secret, create a secret named 'AZURE_STATIC_WEB_APPS_API_TOKEN' in your repo and paste the deployment token from the Azure Static Web App's 'Manage deployment token' blade.
   5. Push to 'main' and GitHub Actions will run the workflow and deploy.

Notes & Tips:
- If your site requires a build step (React/Vue/Angular) ensure the correct 'app_location' and 'output_location' are set in the workflow file.
- If your main entry is not 'index.html' at the root, move it or update 'staticwebapp.config.json' to rewrite correctly.
- Check the GitHub Actions run logs on the Actions tab for errors.

If you want, I can:
- Move files so that the site root is correct (e.g., if your site is inside a subfolder 'dist' or 'public').
- Update the workflow 'app_location' and 'output_location' automatically after I detect where index.html is.
- Minify assets or fix broken relative paths.


Note: Your index.html is located at 'DSak25'.
If you want GitHub Actions to deploy correctly, set 'app_location' to that subfolder
and 'output_location' to the build folder (if any) in the workflow file.
