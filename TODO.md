# TODO

## P0 - Critical Fixes (Must Have)

- [ ] When creating a Note, action should be "Create Note" not "Create Bookmark"
- [ ] Improve UI text in Preferences; use Note vs Text consistently
- [ ] Make Delete actions appear as destructive actions (`Action.Style.Destructive` in `ActionPanel`):
  - [ ] Delete Bookmark
  - [ ] Delete Note
  - [ ] Delete List
  - [ ] Delete Tag
  - [ ] Delete Highlight
  - [ ] Delete Backup

## P1 - Core Features (High Priority)

### List Management

- [ ] Add ability to manage lists
  - [ ] Add list creation
  - [ ] Add list deletion
  - [ ] Add list updating

### Tag Management

- [ ] Add ability to manage tags
  - [ ] Add tag creation
  - [ ] Add tag deletion
  - [ ] Add tag renaming

### Note Management

- [ ] Add ability to manage notes
  - [ ] Add Notes list (show only `type: "text"` bookmarks)
  - [ ] Add note deletion
  - [ ] Add note updating
  - [ ] Clarify: Notes are bookmarks with `type: "text"`, not a separate entity

### Highlights

- [ ] Add ability to highlights
  - [ ] Add highlight creation
  - [ ] Add highlight deletion
  - [ ] Add highlight updating

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
  - [ ] Add backup view
  - [ ] Trigger backup
  - [ ] Download backup
  - [ ] Delete backup from list

### Analytics

- [ ] Add user stats Command:
  - [ ] Add stats view (including bookmark counts by type, top domains, tag usage, bookmarking activity patterns, and storage usage)

### Browser Extensions

- [ ] Add Action to install [Chrome Extension](https://chromewebstore.google.com/detail/karakeep/kgcjekpmcjjogibpjebkhaanilehneje) and [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/karakeep/)
- [ ] Add link to Chrome Extension to README

### Logging

- [ ] Add extensive logging using @chrismessina/raycast-logger
  - [ ] Log all API calls
  - [ ] Log all errors
  - [ ] Log all successes
  - [ ] Add preference for verbose logging

## P3 - Polish & Advanced Features (Lower Priority)

- [ ] Add support for Raycast AI Tools
- [ ] Add cross-extension integration with Reader Mode or [Send to Kindle](https://www.raycast.com/lemikeone/send-to-kindle) extension
- [ ] Implement optimistic updates for better UX