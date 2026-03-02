# Karakeep Changelog

## [2.2.0] - {PR_MERGE_DATE}

### New Features

- **Smart List Builder**: When creating or editing a Smart List, an action panel section ("Smart List Builder") is now available via `⌘K`. It provides one-click insertion of valid qualifiers — `is:` filters (fav, archived, read, unread), `url:`, `#tag`, `after:`/`before:` dates pre-filled with today, and `type:` filters (link, text, image, video, pdf) — with submenus for grouped options. Qualifiers are appended to any existing query rather than replacing it.
- **List management CRUD**: Create, edit, and delete lists directly from the Lists command. The Create List form now includes Description, Parent List, List Type (manual/smart), and Search Query fields.
- **Tag management CRUD**: Create, rename, and delete tags directly from the Tags command.
- **Note management**: Create, edit, and delete notes (text bookmarks) from within the extension.
- **Highlights CRUD**: Create, edit, view detail, and delete highlights via a new Highlights command.
- **Smart list icon**: Smart lists display a ✨ icon when no custom icon is set.
- **Tag picker in Create Bookmark and Create Note**: Both forms now include a Tags picker for selecting existing tags and an "Add Tag" field for creating new ones. Type a name and press ↵ or comma to commit it as a pill; it is immediately added to the Tags picker above. Tags are attached to the bookmark via `POST /api/v1/bookmarks/{id}/tags` after creation.
- **List filter in Bookmarks view**: A dropdown in the search bar lets you filter bookmarks by list. Selecting a list switches to paginated list-scoped results; selecting "Default" returns to all bookmarks.

### Improvements

- **Human-readable API errors**: Error toasts now show the human-readable message extracted from Karakeep's JSON error responses (e.g. "Smart lists cannot have unqualified terms") instead of the raw HTTP body.
- **Copy Error action on all failure toasts**: Every failure toast now includes a "Copy Error" primary action for easy bug reporting.
- **Smart list query validation**: The Search Query field validates that all terms use valid qualifiers (`#tag`, `is:*`, `url:*`, `after:*`, `before:*`, `list:*`, `type:*`) and blocks bare keywords before submission, with a descriptive inline error and tooltip.
- **Form error handling**: All forms (lists, tags, highlights) now stay open on API failure so the error toast remains visible, rather than dismissing immediately after submit.
- **HUD feedback for standalone commands**: The Create List command shows a HUD confirmation after closing the window so the result is visible even after the form disappears.
- **Destructive action styling**: Delete actions use `Action.Style.Destructive` throughout.
- **Verbose logging preference**: New opt-in preference to enable debug-level logging.
- **Notes-aware UI copy**: The Notes command now shows "Notes (N)" as the section title and navigation title, and all actions are labelled accordingly (Edit Note, Delete Note, View Note Detail, Copy Note).
- **Lists sorted alphabetically**: Lists are now sorted by name before the hierarchy is built.
- **Notes view stale cache fix**: A client-side filter ensures only `type: "text"` bookmarks are shown in the Notes view, preventing link bookmarks from appearing while the type-filtered fetch is in flight.

### Removed

- Removed the "Regenerate Thumbnail" action from the Bookmark Item context menu.
- Removed "Create Highlight" — creating highlights requires DOM character offsets only available via the browser extension. The Highlights command remains for viewing, editing, and deleting highlights.

### Chores

- Reorganized `package.json`, added keywords and Windows platform support
- Updated dependencies

## [2.1.1] - 2026-02-23

### Fixes

- **Fixed pagination sometimes stuck at 10 items after reopening the Bookmarks list**: Added a small prefetch strategy to avoid Raycast pagination deadlocks when the first page is cached and the list isn’t scrollable yet.
- **Fixed authenticated preview images not rendering in list view**: Restored the `getScreenshot` “prewarm” flow and limited it to the currently selected item to prevent performance issues.
- **Fixed BookmarkDetail always showing placeholder image for bookmarks without screenshots**: Detail view now only renders the screenshot image when an actual screenshot has been loaded, preventing the placeholder from being shown permanently.
- **Fixed stale action handlers in BookmarkItem**: Actions (favorite, archive, delete) now always operate on the latest bookmark state instead of the initial snapshot passed by the parent.
- **Fixed server-side search not re-fetching when search text changes**: The online search hook now correctly re-executes when the user updates the search query.
- **Fixed React Rules of Hooks violation in Lists view**: `getDashboardListsPage` was calling `useConfig()` inside a regular function; converted to a pure helper that receives `apiUrl` as a parameter.

### Improvements

- **More consistent toasts and translations**: Unified toast handling for common actions and improved i18n placeholder formatting; added missing translation keys used by the UI and Quick Bookmark.
- **Internal cleanup**: Strengthened API typings, removed remaining `console.*` usage in favor of structured logging, and simplified selection/state handling after list mutations (e.g., delete).
- **Type safety improvements**: `List` type now includes `parentId` and `icon` fields used by the hierarchy view; `Asset.assetType` is now an optional property instead of a `| undefined` union member.
- **Simplified `useTranslation` hook**: Removed unnecessary `isInitialMount` ref pattern; language sync is now handled by a single clean effect.
- **Removed redundant imports and calls**: Cleaned up duplicate `Bookmark` import in `quickBookmark.tsx`, unnecessary `URL` polyfill import in `apis/index.ts`, and a redundant `showHUD` call that duplicated the success toast in `createNote.tsx`.

## [2.1.0] 2025-11-21

### Big changes

- **Separated Create Bookmark and Create Note commands**: Split bookmark creation into two dedicated commands for better UX
  - `Create Bookmark` now focuses exclusively on URL bookmarks
  - New `Create Note` command for text-only notes
- **Browser Extension Integration**: Automatically prefill URL field from active browser tab
  - Uses Raycast Browser Extension API to fetch current tab URL
  - New preference to toggle automatic URL prefilling (enabled by default)
  - Gracefully handles cases where browser extension is unavailable
- **Raycast API Optimization**: Migrated to native Raycast pagination
  - Replaced manual pagination state management with Raycast's native `useCachedPromise` pagination
  - Eliminated rendering loop bug caused by stale closures
  - Optimized memory usage by removing data accumulation across pages
  - Bookmarks display in reverse chronological order (newest first)
  - **Code reduction**: 65% fewer lines across pagination hooks (384 → 136 lines)

### Chores

- Updated dependencies
- Updated ESLint configuration
- Refactored pagination hooks to use Raycast utilities

## [2.0.1] - 2025-06-28

### Changes

- Renamed to Karakeep
- Add create bookmark default type setting

## [2.0.0] - 2024-12-11

### Major Changes

- Merged and replaced with enhanced version from @foru17, bringing comprehensive features and improvements
- Added full CRUD operations for bookmark management
- Implemented tag management system
- Added AI-powered features
- Enhanced UI following Raycast's design principles
- Improved documentation and user guide

## [Pre-release Development]

### [Karakeep API Integration] - 2024-11-24

- Implemented core functionality for communicating with Karakeep API
- Added search, list, and detail view functionality
- Fix lists count display bug

### [UI Development] - 2024-11-24

- Designed and implemented main list view for bookmarks
- Created detail view for individual bookmarks

### [Settings and Preferences] - 2024-11-24

- Implemented configuration for Karakeep API host and apikey
- Added language preference setting (English and Chinese)

### [Enhanced Project Initialization] - 2024-11-24

- Set up basic project structure
- Configured development environment with TypeScript and Raycast API
- Created initial README and documentation

### [Add url as item title if title is not defined] - 2024-09-10

### [Initial Version] - 2024-08-22
