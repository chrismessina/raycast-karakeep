/**
 * Validates if a string contains only emoji characters.
 * Empty strings are considered valid (for optional fields).
 */
export function isEmoji(str: string): boolean {
  if (!str) return true;
  const emojiRegex =
    /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;
  return emojiRegex.test(str.trim());
}

export interface EmojiOption {
  value: string;
  title: string;
}

export const LIST_ICON_EMOJI_OPTIONS: EmojiOption[] = [
  { value: "⭐️", title: "Star" },
  { value: "❤️", title: "Heart" },
  { value: "🔥", title: "Fire" },
  { value: "✨", title: "Sparkles" },
  { value: "🚀", title: "Rocket" },
  { value: "💡", title: "Idea" },
  { value: "📌", title: "Pin" },
  { value: "🔖", title: "Bookmark" },
  { value: "📚", title: "Books" },
  { value: "📝", title: "Note" },
  { value: "🎯", title: "Target" },
  { value: "📦", title: "Package" },
  { value: "🧰", title: "Toolbox" },
  { value: "🛠️", title: "Tools" },
  { value: "💼", title: "Work" },
  { value: "🏢", title: "Office" },
  { value: "💰", title: "Money" },
  { value: "📈", title: "Growth" },
  { value: "📊", title: "Chart" },
  { value: "✅", title: "Check" },
  { value: "⏳", title: "Pending" },
  { value: "📅", title: "Calendar" },
  { value: "🎉", title: "Celebrate" },
  { value: "🏠", title: "Home" },
  { value: "🍔", title: "Food" },
  { value: "🍜", title: "Ramen" },
  { value: "☕️", title: "Coffee" },
  { value: "🍷", title: "Wine" },
  { value: "🌱", title: "Nature" },
  { value: "🌎", title: "World" },
  { value: "🌤️", title: "Weather" },
  { value: "🏃", title: "Fitness" },
  { value: "🧘", title: "Wellness" },
  { value: "🎵", title: "Music" },
  { value: "🎬", title: "Movies" },
  { value: "🎮", title: "Gaming" },
  { value: "📷", title: "Photo" },
  { value: "🖼️", title: "Art" },
  { value: "🧠", title: "Learning" },
  { value: "🔬", title: "Science" },
  { value: "💻", title: "Computer" },
  { value: "🖥️", title: "Desktop" },
  { value: "📱", title: "Mobile" },
  { value: "🔐", title: "Security" },
  { value: "🧪", title: "Experiment" },
  { value: "🐛", title: "Bug" },
  { value: "⚡️", title: "Performance" },
  { value: "🤖", title: "AI" },
  { value: "🌐", title: "Web" },
  { value: "📎", title: "Attachment" },
  { value: "🔗", title: "Link" },
  { value: "🗂️", title: "Folder" },
  { value: "📁", title: "Files" },
  { value: "🗃️", title: "Archive" },
  { value: "⚙️", title: "Settings" },
  { value: "🔍", title: "Search" },
  { value: "🚧", title: "In Progress" },
  { value: "❗️", title: "Important" },
  { value: "🔒", title: "Private" },
  { value: "👀", title: "Read Later" },
  { value: "🧭", title: "Reference" },
  { value: "✈️", title: "Travel" },
  { value: "🛒", title: "Shopping" },
  { value: "📰", title: "News" },
];
