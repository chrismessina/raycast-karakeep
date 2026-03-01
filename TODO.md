# TODO

## P0 - Critical Fixes (Must Have)

- [x] When creating a Note, action should be "Create Note" not "Create Bookmark"
- [x] Improve UI text in Preferences; use Note vs Text consistently
- [x] Make Delete actions appear as destructive actions (`Action.Style.Destructive` in `ActionPanel`):
  - [x] Delete Bookmark
  - [x] Delete Note
  - [x] Delete List
  - [x] Delete Tag
  - [ ] Delete Highlight
  - [ ] Delete Backup

## P1 - Core Features (High Priority)

### List Management

- [ ] Add ability to manage lists
  - [ ] Add list creation — API: [`POST /api/v1/lists`](https://docs.karakeep.app/api/karakeep-api/create-list)
  - [ ] Add list deletion — API: [`DELETE /api/v1/lists/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-list)
  - [ ] Add list updating — API: [`PATCH /api/v1/lists/{id}`](https://docs.karakeep.app/api/karakeep-api/update-list)

### Tag Management

- [ ] Add ability to manage tags
  - [ ] Add tag creation — API: [`POST /api/v1/tags`](https://docs.karakeep.app/api/karakeep-api/create-tag)
  - [ ] Add tag deletion — API: [`DELETE /api/v1/tags/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-tag)
  - [ ] Add tag renaming — API: [`PATCH /api/v1/tags/{id}`](https://docs.karakeep.app/api/karakeep-api/update-tag)

### Note Management

- [ ] Add ability to manage notes
  - [ ] Add Notes list (show only `type: "text"` bookmarks) — API: [`GET /api/v1/bookmarks`](https://docs.karakeep.app/api/karakeep-api/list-bookmarks) with `?type=text` filter
  - [ ] Add note deletion — API: [`DELETE /api/v1/bookmarks/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-bookmark)
  - [ ] Add note updating — API: [`PATCH /api/v1/bookmarks/{id}`](https://docs.karakeep.app/api/karakeep-api/update-bookmark)
  - [ ] Clarify: Notes are bookmarks with `type: "text"`, not a separate entity

### Highlights

- [ ] Add ability to highlights
  - [ ] Add highlight creation — API: [`POST /api/v1/highlights`](https://docs.karakeep.app/api/karakeep-api/create-highlight)
  - [ ] Add highlight deletion — API: [`DELETE /api/v1/highlights/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-highlight)
  - [ ] Add highlight updating — API: [`PATCH /api/v1/highlights/{id}`](https://docs.karakeep.app/api/karakeep-api/update-highlight)

### Bookmarks View Enhancements

- [ ] To Bookmarks view, add Lists SearchBar accessory filter
- [ ] To Bookmarks detail view, add icon to AI-generated tags
- [ ] Add action to bookmark to regenerate thumbnail
- [ ] When adding a bookmark, allow adding tags; support retreiving Karakeep's AI-suggested tags (`attachedBy: ai`)
- [ ] When adding a note, allow adding tags; support retreiving Karakeep's AI-suggested tags (`attachedBy: ai`)

### Technical Foundation

- [ ] Confirm pagination is using native Raycast pagination
- [ ] Add `Action` keyboard shortcuts (e.g., `⌘↵` for primary, `⌘⇧↵` for secondary)
- [ ] Make sure we're using common Raycast keyboard shortcuts
- [ ] Handle API errors gracefully with user-friendly messages
- [ ] Add loading states for all async operations
- [ ] Ensure all `Form` views have proper validation and error handling
- [ ] Add `Toast` feedback for async operations (create/delete/update)
- [ ] Add `List.EmptyView` for empty states in all list views

## P2 - Enhancements (Medium Priority)

### Backups

- [ ] Add ability to manage backups
  - [ ] Add backup view — API: [`GET /api/v1/backups`](https://docs.karakeep.app/api/karakeep-api/list-backups)
  - [ ] Trigger backup — API: [`POST /api/v1/backups`](https://docs.karakeep.app/api/karakeep-api/create-backup)
  - [ ] Download backup — API: `GET /api/v1/backups/{id}/download`
  - [ ] Delete backup from list — API: [`DELETE /api/v1/backups/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-backup)

### Analytics

- [ ] Add user stats Command:
  - [ ] Add stats view — API: [`GET /api/v1/users/me/stats`](https://docs.karakeep.app/api/karakeep-api/get-current-user-stats) (includes bookmark counts by type, top domains, tag usage, bookmarking activity patterns, and storage usage)

### Browser Extensions

- [ ] Add Action to install [Chrome Extension](https://chromewebstore.google.com/detail/karakeep/kgcjekpmcjjogibpjebkhaanilehneje) and [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/karakeep/)
- [ ] Add link to Chrome Extension to README

### Logging

- [x] Add extensive logging using @chrismessina/raycast-logger
  - [x] Log all API calls
  - [x] Log all errors
  - [x] Log all successes
  - [x] Add preference for verbose logging

## P3 - Polish & Advanced Features (Lower Priority)

- [ ] Add support for Raycast AI Tools
- [ ] Add cross-extension integration with Reader Mode or [Send to Kindle](https://www.raycast.com/lemikeone/send-to-kindle) extension
- [ ] Implement optimistic updates for better UX
- [ ] Update README and CHANGELOG with proper documentation
