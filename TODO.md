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

- [x] Add ability to manage lists
  - [x] Add list creation — API: [`POST /api/v1/lists`](https://docs.karakeep.app/api/karakeep-api/create-list)
  - [x] Add list deletion — API: [`DELETE /api/v1/lists/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-list)
  - [x] Add list updating — API: [`PATCH /api/v1/lists/{id}`](https://docs.karakeep.app/api/karakeep-api/update-list)
  - [x] Add Parent List field to create/edit list forms
  - [x] Add List Type field (manual/smart) to create/edit list forms
  - [x] Add Search Query field to create/edit list forms (smart lists only)
  - [x] Switch list icon field from dropdown to text field (allows any emoji via system picker)

### Tag Management

- [x] Add ability to manage tags
  - [x] Add tag creation — API: [`POST /api/v1/tags`](https://docs.karakeep.app/api/karakeep-api/create-tag)
  - [x] Add tag deletion — API: [`DELETE /api/v1/tags/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-tag)
  - [x] Add tag renaming — API: [`PATCH /api/v1/tags/{id}`](https://docs.karakeep.app/api/karakeep-api/update-tag)

### Note Management

- [x] Add ability to manage notes
  - [x] Add Notes list (show only `type: "text"` bookmarks) — API: [`GET /api/v1/bookmarks`](https://docs.karakeep.app/api/karakeep-api/list-bookmarks) with `?type=text` filter
  - [x] Add note deletion — API: [`DELETE /api/v1/bookmarks/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-bookmark)
  - [x] Add note updating — API: [`PATCH /api/v1/bookmarks/{id}`](https://docs.karakeep.app/api/karakeep-api/update-bookmark)
  - [x] Clarify: Notes are bookmarks with `type: "text"`, not a separate entity

### Highlights

- [x] Add ability to highlights
  - [x] Add highlight creation — API: [`POST /api/v1/highlights`](https://docs.karakeep.app/api/karakeep-api/create-highlight)
  - [x] Add highlight deletion — API: [`DELETE /api/v1/highlights/{id}`](https://docs.karakeep.app/api/karakeep-api/delete-highlight)
  - [x] Add highlight updating — API: [`PATCH /api/v1/highlights/{id}`](https://docs.karakeep.app/api/karakeep-api/update-highlight)

### Bookmarks View Enhancements

- [ ] To Bookmarks view, add Lists SearchBar accessory filter
- [x] To Bookmarks detail view, add icon to AI-generated tags
- [x] Add action to bookmark to regenerate thumbnail
- [ ] When adding a bookmark, allow adding tags; support retreiving Karakeep's AI-suggested tags (`attachedBy: ai`)
- [ ] When adding a note, allow adding tags; support retreiving Karakeep's AI-suggested tags (`attachedBy: ai`)

### Technical Foundation

- [x] Confirm pagination is using native Raycast pagination
- [x] Add `Action` keyboard shortcuts (e.g., `⌘↵` for primary, `⌘⇧↵` for secondary)
- [x] Make sure we're using common Raycast keyboard shortcuts
- [x] Handle API errors gracefully with user-friendly messages
- [x] Add loading states for all async operations
- [x] Ensure all `Form` views have proper validation and error handling
- [x] Add `Toast` feedback for async operations (create/delete/update)
- [x] Add `List.EmptyView` for empty states in all list views

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
