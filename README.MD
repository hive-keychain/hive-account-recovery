# Setting Up Spreadsheet

## Allowing access to spreadsheet

For this app to be able to access the spreadsheet, the spreadsheet needs to be published:

1. In the Sheet: File → Share → Publish to web → Link → pick the tab (e.g., Sheet1) → CSV → Publish
2. This produces a read-only CSV URL that anyone can fetch. Editors still use the normal Google Sheets link with edit access.
3. Copy the given URL and paste it in .env file as VITE_SPREADSHEET_URL (see sample-env).