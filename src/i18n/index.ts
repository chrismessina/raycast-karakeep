export type Language = "en" | "zh";

export const translations = {
  en: {
    // Global
    loading: "Loading",
    pleaseWait: "Please wait...",
    refreshingBookmarks: "Refreshing bookmarks...",
    bookmarksRefreshed: "Bookmarks refreshed",
    refreshingLists: "Refreshing list...",
    listsRefreshed: "List refreshed",
    refreshError: "Refresh error",
    searchBookmarks: "Search bookmarks...",

    // Common Actions & Messages
    common: {
      delete: "Delete",
      deleting: "Deleting...",
      deleteSuccess: "Deleted successfully",
      deleteFailed: "Delete failed",
      deleteCancel: "Delete cancelled",
      viewInBrowser: "View in Browser",
      copyId: "Copy ID",
      open: "Open",
      search: "Search",
      empty: {
        title: "No items found",
        description: "No items in this list",
      },
    },

    // Note Related
    note: {
      create: "Create Note",
      creating: "Creating note...",
      createSuccess: "Note created successfully",
      createFailed: "Note creation failed",
    },

    // Bookmark Related
    bookmark: {
      // Creation
      create: "Create Bookmark",
      creating: "Creating bookmark...",
      createSuccess: "Bookmark created successfully",
      createFailed: "Creation failed",

      // Types and Fields
      type: "Type",
      typeText: "Plain Text",
      typeLink: "URL Link",
      content: "Content",
      contentRequired: "Content is required",
      contentTooLong: "Content cannot exceed 2500 characters",
      contentPlaceholder: "Enter text content (max 2500 characters)",
      url: "URL",
      urlInvalid: "Please enter a valid URL",
      urlPlaceholder: "Enter URL",
      note: "Note",
      notePlaceholder: "Enter note (optional)",

      // Titles
      title: "Bookmark Detail",
      untitled: "Untitled",
      untitledImage: "Untitled Image",
      originalTitle: "Original Title",
      customTitle: "Custom Title",
      titlePlaceholder: "Enter title",
      list: "List",
      defaultListPlaceholder: "Default",
      // Sections
      sections: {
        summary: "📝 Summary",
        note: "📒 Note",
      },

      // Actions
      actions: {
        openInBrowser: "Open in Browser",
        previewInDashboard: "Preview in Dashboard",
        openLink: "Open Link",
        copyLink: "Copy Link",
        copyContent: "Copy Content",
        aiSummary: "AI Summary",
        regenerateThumbnail: "Regenerate Thumbnail",
        favorite: "Favorite",
        unfavorite: "Unfavorite",
        archive: "Archive",
        unarchive: "Unarchive",
        delete: "Delete",
        edit: "Edit",
        viewImage: "View Image",
      },

      // Metadata
      metadata: {
        status: "Status",
        tags: "Tags",
        createdAt: "Created At",
        description: "Description",
        content: "Content",
        summary: "Summary",
        filename: "Filename",
        note: "Note",
      },

      // Status
      status: {
        favorited: "Favorited",
        unfavorited: "Unfavorited",
        archived: "Archived",
        unarchived: "Unarchived",
        summarized: "AI Summary",
        unsummarized: "Unsummarized",
      },

      // Toast Messages
      toast: {
        summarize: {
          title: "Summarize Bookmark",
          loading: "Summarizing bookmark...",
          success: "Summarized successfully",
        },
        regenerateThumbnail: {
          title: "Regenerate Thumbnail",
          loading: "Regenerating thumbnail...",
          success: "Thumbnail regeneration started",
        },
        update: {
          title: "Update Bookmark",
          loading: "Updating...",
          success: "Updated successfully",
        },
        delete: {
          title: "Delete Bookmark",
          loading: "Deleting bookmark...",
          success: "Deleted bookmark successfully",
        },
      },

      // Update
      update: "Update Bookmark",
      updating: "Updating bookmark...",
      updateSuccess: "Bookmark updated successfully",
      updateFailed: "Bookmark update failed",
    },

    // List Related
    list: {
      favorites: "Favorites",
      openFavorites: "Open Favorites",
      searchInFavorites: "Search in Favorites...",
      noFavorites: {
        title: "No bookmarks found",
        description: "No bookmarks in favorites",
      },
      archived: "Archived",
      openArchived: "Open Archived",
      searchInArchived: "Search in Archived...",
      openList: "Open List",
      createList: "Create List",
      editList: "Edit List",
      listName: "Name",
      listNamePlaceholder: "Enter list name",
      listIcon: "Icon",
      listIconPlaceholder: "Enter an emoji (e.g. 📚)",
      listDescription: "Description",
      listDescriptionPlaceholder: "Optional description",
      listParent: "Parent List",
      listParentNone: "No Parent",
      listType: "List Type",
      listTypeManual: "Manual List",
      listTypeSmart: "Smart List",
      listQuery: "Search Query",
      listQueryPlaceholder: "e.g. #tag or is:fav or url:github.com",
      listQueryDescription:
        "Use qualifiers only — bare keywords are not allowed. Examples: #tag, is:fav, is:archived, url:domain.com, after:YYYY-MM-DD, before:YYYY-MM-DD. Combine with and/or and parentheses.",
      listQueryInvalid: "Query must use qualifiers (e.g. #tag, is:fav, url:). Bare keywords are not allowed.",
      queryBuilder: {
        sectionTitle: "Smart List Builder",
        addTag: "Add #tag",
        addIsFilter: "Add is: Filter",
        addUrlFilter: "Add url: Filter",
        addAfterDate: "Add after: Date",
        addBeforeDate: "Add before: Date",
        addTypeFilter: "Add type: Filter",
        isFav: "is:fav — Favorited",
        isArchived: "is:archived — Archived",
        isRead: "is:read — Read",
        isUnread: "is:unread — Unread",
        typeLink: "type:link — Links",
        typeText: "type:text — Notes",
        typeImage: "type:image — Images",
        typeVideo: "type:video — Videos",
        typePdf: "type:pdf — PDFs",
      },
      deleteList: "Delete List",
      deleteConfirm: "Are you sure you want to delete list {{name}}?",
      searchInList: "Search in {{name}}...",
      noBookmarks: {
        title: "No bookmarks found",
        description: "No bookmarks in this list",
      },
      noArchived: {
        title: "No archived bookmarks",
        description: "No archived bookmarks found",
      },
      empty: {
        title: "No lists yet",
        description: "Create your first list to get started",
      },
      toast: {
        create: {
          loading: "Creating list...",
          success: "List created",
          error: "List creation failed",
        },
        update: {
          loading: "Updating list...",
          success: "List updated",
          error: "List update failed",
        },
      },
    },

    // Tags Related
    tags: {
      searchPlaceholder: "Search tags",
      createTag: "Create Tag",
      renameTag: "Rename Tag",
      tagName: "Name",
      tagNamePlaceholder: "Enter tag name",
      bookmarks: {
        searchInTag: "Search in {{name}} tag...",
        empty: {
          title: "No bookmarks found",
          description: "No bookmarks in this tag yet",
        },
      },
      empty: {
        title: "No tags yet",
        description: "Tags will appear here once you create or assign them",
      },
      detail: {
        name: "Tag name",
        id: "Tag ID",
        totalBookmarks: "Total bookmarks",
        source: "Source",
      },
      actions: {
        viewBookmarks: "View bookmarks",
        openInBrowser: "View in Browser",
        copyTagName: "Copy tag name",
        copyTagId: "Copy tag ID",
        deleteTag: "Delete tag",
        createTag: "Create Tag",
        renameTag: "Rename Tag",
      },
      toast: {
        create: {
          loading: "Creating tag...",
          success: "Tag created",
          error: "Tag creation failed",
        },
        rename: {
          loading: "Renaming tag...",
          success: "Tag renamed",
          error: "Tag rename failed",
        },
        delete: {
          loading: "Deleting tag...",
          success: "Tag deleted successfully",
          error: "Tag deletion failed",
        },
      },
    },

    // Notes Related
    notes: {
      title: "Notes",
      titleWithCount: "Notes ({{count}})",
      searchPlaceholder: "Search notes...",
      empty: {
        title: "No notes yet",
        description: "Create your first note with the Create Note command",
      },
      actions: {
        edit: "Edit Note",
        delete: "Delete Note",
        viewDetail: "View Note Detail",
        copy: "Copy Note",
      },
    },

    // Highlights Related
    highlights: {
      title: "Highlights",
      searchPlaceholder: "Search highlights...",
      createHighlight: "Create Highlight",
      editHighlight: "Edit Highlight",
      deleteHighlight: "Delete Highlight",
      deleteConfirm: "Are you sure you want to delete this highlight?",
      highlightText: "Highlighted Text",
      highlightTextPlaceholder: "The highlighted text",
      note: "Note",
      notePlaceholder: "Add a note (optional)",
      color: "Color",
      colorPlaceholder: "Color (optional, e.g. yellow)",
      bookmarkId: "Bookmark ID",
      bookmarkIdPlaceholder: "Enter the bookmark ID",
      startOffset: "Start Offset",
      endOffset: "End Offset",
      empty: {
        title: "No highlights yet",
        description: "Highlights let you save excerpts from your bookmarks",
      },
      metadata: {
        bookmarkId: "Bookmark",
        note: "Note",
        color: "Color",
        createdAt: "Created At",
      },
      actions: {
        edit: "Edit Highlight",
        delete: "Delete Highlight",
        copyText: "Copy Text",
        copyNote: "Copy Note",
      },
      toast: {
        create: {
          loading: "Creating highlight...",
          success: "Highlight created",
          error: "Highlight creation failed",
        },
        update: {
          loading: "Updating highlight...",
          success: "Highlight updated",
          error: "Highlight update failed",
        },
        delete: {
          loading: "Deleting highlight...",
          success: "Highlight deleted",
          error: "Highlight deletion failed",
        },
      },
    },

    // Bookmark Item
    bookmarkItem: {
      untitled: "Untitled",
      untitledImage: "Untitled Image",
      metadata: {
        content: "Content",
        createdAt: "Created At",
        tags: "Tags",
        filename: "Filename",
        description: "Description",
      },
      actions: {
        viewDetail: "View Detail",
        copyContent: "Copy Content",
        refresh: "Refresh List",
        clearCache: "Clear Cache",
        delete: "Delete",
        viewImage: "View Image",
        openLink: "Open Link",
        copyLink: "Copy Link",
      },
      toast: {
        delete: {
          title: "Delete Bookmark",
          loading: "Please wait...",
          success: "Bookmark deleted",
          error: "Bookmark deletion failed",
        },
      },
    },

    // Bookmark List
    bookmarkList: {
      title: "Bookmarks ({{count}})",
      filterResultsLabel: '{{label}} matching "{{searchText}}" ({{count}})',
      searchPlaceholder: "Search bookmarks...",
      searchResults: (searchText: string, count: number) => `Search results: ${searchText} (${count})`,
      filterResults: (filterText: string, count: number) => `Filter results: ${filterText} (${count})`,
      loading: {
        title: "Loading...",
        description: "Please wait...",
      },
      emptySearch: {
        title: "No bookmarks found",
        description: "No bookmarks in this search",
      },
      onlineSearch: {
        title: (searchText: string) => `Online search: ${searchText}`,
        action: (searchText: string) => `Online search: ${searchText}`,
      },
      toast: {
        cleanCache: {
          loading: "Clearing cache...",
          success: "Cache cleared",
          error: "Cache clearing failed",
        },
      },
    },

    quickBookmark: {
      gettingBrowserUrl: "Getting browser URL...",
      failedToGetBrowserUrl: {
        title: "Failed to get browser URL",
        message: "Make sure a browser is open with an active tab",
      },
      creatingBookmark: "Creating bookmark...",
      failedToCreateBookmark: "Failed to create bookmark",
      successHud: "✓ Bookmark created",
      failureToastTitle: "Failed to create quick bookmark",
    },
  },

  zh: {
    // 全局
    loading: "加载中...",
    pleaseWait: "请稍等...",
    refreshingBookmarks: "正在刷新书签...",
    bookmarksRefreshed: "书签已刷新",
    refreshingLists: "正在刷新列表...",
    listsRefreshed: "列表已刷新",
    refreshError: "刷新失败",
    searchBookmarks: "搜索书签...",

    // 通用操作和消息
    common: {
      delete: "删除",
      deleting: "删除中...",
      deleteSuccess: "删除成功",
      deleteFailed: "删除失败",
      deleteCancel: "已取消删除",
      viewInBrowser: "在浏览器中查看",
      copyId: "复制 ID",
      open: "打开",
      search: "搜索",
      empty: {
        title: "暂无内容",
        description: "列表为空",
      },
    },

    // 笔记相关
    note: {
      create: "创建笔记",
      creating: "创建笔记中...",
      createSuccess: "笔记创建成功",
      createFailed: "笔记创建失败",
    },

    // 书签相关
    bookmark: {
      // 创建
      create: "创建书签",
      creating: "创建中...",
      createSuccess: "创建成功",
      createFailed: "创建失败",

      // 类型和字段
      type: "类型",
      typeText: "纯文本",
      typeLink: "URL 链接",
      content: "内容",
      contentRequired: "请输入内容",
      contentTooLong: "内容不能超过2500字符",
      contentPlaceholder: "输入文本内容（最多2500字符）",
      url: "URL",
      urlInvalid: "请输入有效的 URL",
      urlPlaceholder: "输入 URL",
      note: "备注",
      notePlaceholder: "输入备注（可选）",

      // 标题
      title: "书签详情",
      untitled: "无标题",
      untitledImage: "无标题图片",
      originalTitle: "原标题",
      customTitle: "自定义标题",
      titlePlaceholder: "输入标题",

      list: "列表",
      defaultListPlaceholder: "默认",

      // 分区
      sections: {
        summary: "📝 摘要",
        note: "📒 笔记",
      },

      // 操作
      actions: {
        openInBrowser: "在浏览器中打开",
        previewInDashboard: "在控制台中预览",
        openLink: "打开链接",
        copyLink: "复制链接",
        copyContent: "复制内容",
        aiSummary: "AI 摘要",
        regenerateThumbnail: "重新生成缩略图",
        favorite: "收藏",
        unfavorite: "取消收藏",
        archive: "归档",
        unarchive: "取消归档",
        delete: "删除",
        edit: "编辑",
        viewImage: "查看图片",
      },

      // 元数据
      metadata: {
        status: "状态",
        tags: "标签",
        createdAt: "创建时间",
        description: "描述",
        content: "内容",
        summary: "摘要",
        filename: "文件名",
        note: "备注",
      },

      // 状态
      status: {
        favorited: "已收藏",
        unfavorited: "未收藏",
        archived: "已归档",
        unarchived: "未归档",
        summarized: "AI 摘要",
        unsummarized: "无摘要",
      },

      // 提示消息
      toast: {
        summarize: {
          title: "生成摘要",
          loading: "正在生成摘要...",
          success: "摘要生成成功",
        },
        regenerateThumbnail: {
          title: "重新生成缩略图",
          loading: "正在重新生成缩略图...",
          success: "缩略图重新生成已启动",
        },
        update: {
          title: "更新书签",
          loading: "更新中...",
          success: "更新成功",
        },
        delete: {
          title: "删除书签",
          loading: "删除中...",
          success: "删除成功",
        },
      },

      // 更新
      update: "更新书签",
      updating: "更新中...",
      updateSuccess: "更新成功",
      updateFailed: "更新失败",
    },

    // 列表相关
    list: {
      favorites: "收藏夹",
      openFavorites: "打开收藏夹",
      searchInFavorites: "在收藏夹中搜索...",
      noFavorites: {
        title: "暂无收藏",
        description: "收藏夹中暂无书签",
      },
      archived: "已归档",
      openArchived: "打开已归档",
      searchInArchived: "在已归档中搜索...",
      openList: "打开列表",
      createList: "创建列表",
      editList: "编辑列表",
      listName: "名称",
      listNamePlaceholder: "输入列表名称",
      listIcon: "图标",
      listIconPlaceholder: "输入 Emoji（如 📚）",
      listDescription: "描述",
      listDescriptionPlaceholder: "可选描述",
      listParent: "父列表",
      listParentNone: "无父列表",
      listType: "列表类型",
      listTypeManual: "手动列表",
      listTypeSmart: "智能列表",
      listQuery: "搜索查询",
      listQueryPlaceholder: "例如 #标签 或 is:fav 或 url:github.com",
      listQueryDescription:
        "只能使用限定词，不允许裸关键词。示例：#标签、is:fav、is:archived、url:域名、after:YYYY-MM-DD、before:YYYY-MM-DD。可用 and/or 和括号组合。",
      listQueryInvalid: "查询必须使用限定词（如 #标签、is:fav、url:），不允许裸关键词。",
      queryBuilder: {
        sectionTitle: "智能列表构建器",
        addTag: "添加 #标签",
        addIsFilter: "添加 is: 过滤",
        addUrlFilter: "添加 url: 过滤",
        addAfterDate: "添加 after: 日期",
        addBeforeDate: "添加 before: 日期",
        addTypeFilter: "添加 type: 过滤",
        isFav: "is:fav — 已收藏",
        isArchived: "is:archived — 已归档",
        isRead: "is:read — 已读",
        isUnread: "is:unread — 未读",
        typeLink: "type:link — 链接",
        typeText: "type:text — 笔记",
        typeImage: "type:image — 图片",
        typeVideo: "type:video — 视频",
        typePdf: "type:pdf — PDF",
      },
      deleteList: "删除列表",
      deleteConfirm: "确定要删除列表 {{name}} 吗？",
      searchInList: "在 {{name}} 中搜索...",
      noBookmarks: {
        title: "暂无书签",
        description: "列表中暂无书签",
      },
      noArchived: {
        title: "暂无归档",
        description: "暂无已归档的书签",
      },
      empty: {
        title: "暂无列表",
        description: "创建第一个列表开始使用",
      },
      toast: {
        create: {
          loading: "创建列表中...",
          success: "列表已创建",
          error: "列表创建失败",
        },
        update: {
          loading: "更新列表中...",
          success: "列表已更新",
          error: "列表更新失败",
        },
      },
    },

    // 标签相关
    tags: {
      searchPlaceholder: "搜索标签",
      createTag: "创建标签",
      renameTag: "重命名标签",
      tagName: "名称",
      tagNamePlaceholder: "输入标签名称",
      bookmarks: {
        searchInTag: "在标签 {{name}} 中搜索...",
        empty: {
          title: "暂无书签",
          description: "该标签下暂无书签",
        },
      },
      empty: {
        title: "暂无标签",
        description: "创建或分配标签后将显示在此处",
      },
      detail: {
        name: "标签名称",
        id: "标签 ID",
        totalBookmarks: "书签总数",
        source: "来源",
      },
      actions: {
        viewBookmarks: "查看相关书签",
        openInBrowser: "在浏览器中查看",
        copyTagName: "复制标签名称",
        copyTagId: "复制标签 ID",
        deleteTag: "删除标签",
        createTag: "创建标签",
        renameTag: "重命名标签",
      },
      toast: {
        create: {
          loading: "创建标签中...",
          success: "标签已创建",
          error: "标签创建失败",
        },
        rename: {
          loading: "重命名标签中...",
          success: "标签已重命名",
          error: "标签重命名失败",
        },
        delete: {
          loading: "删除中...",
          success: "删除成功",
          error: "删除失败",
        },
      },
    },

    // 笔记列表相关
    notes: {
      title: "笔记",
      titleWithCount: "笔记 ({{count}})",
      searchPlaceholder: "搜索笔记...",
      empty: {
        title: "暂无笔记",
        description: "使用「创建笔记」命令创建第一条笔记",
      },
      actions: {
        edit: "编辑笔记",
        delete: "删除笔记",
        viewDetail: "查看笔记详情",
        copy: "复制笔记",
      },
    },

    // 高亮相关
    highlights: {
      title: "高亮",
      searchPlaceholder: "搜索高亮...",
      createHighlight: "创建高亮",
      editHighlight: "编辑高亮",
      deleteHighlight: "删除高亮",
      deleteConfirm: "确定要删除此高亮吗？",
      highlightText: "高亮文本",
      highlightTextPlaceholder: "高亮的文本内容",
      note: "备注",
      notePlaceholder: "添加备注（可选）",
      color: "颜色",
      colorPlaceholder: "颜色（可选，如 yellow）",
      bookmarkId: "书签 ID",
      bookmarkIdPlaceholder: "输入书签 ID",
      startOffset: "起始偏移",
      endOffset: "结束偏移",
      empty: {
        title: "暂无高亮",
        description: "高亮可以保存书签中的精彩片段",
      },
      metadata: {
        bookmarkId: "书签",
        note: "备注",
        color: "颜色",
        createdAt: "创建时间",
      },
      actions: {
        edit: "编辑高亮",
        delete: "删除高亮",
        copyText: "复制文本",
        copyNote: "复制备注",
      },
      toast: {
        create: {
          loading: "创建高亮中...",
          success: "高亮已创建",
          error: "高亮创建失败",
        },
        update: {
          loading: "更新高亮中...",
          success: "高亮已更新",
          error: "高亮更新失败",
        },
        delete: {
          loading: "删除高亮中...",
          success: "高亮已删除",
          error: "高亮删除失败",
        },
      },
    },

    // 书签项
    bookmarkItem: {
      untitled: "无标题",
      untitledImage: "无标题图片",
      metadata: {
        content: "内容",
        createdAt: "创建时间",
        tags: "标签",
        filename: "文件名",
        description: "描述",
      },
      actions: {
        viewDetail: "查看详情",
        copyContent: "复制内容",
        refresh: "刷新列表",
        clearCache: "清除缓存",
        delete: "删除",
        viewImage: "查看图片",
        openLink: "打开链接",
        copyLink: "复制链接",
      },
      toast: {
        delete: {
          title: "删除书签",
          loading: "请稍等...",
          success: "删除成功",
          error: "删除失败",
        },
      },
    },

    // 书签列表
    bookmarkList: {
      title: "书签列表（{{count}}）",
      filterResultsLabel: '{{label}} 匹配 "{{searchText}}"（{{count}}）',
      searchPlaceholder: "搜索书签...",
      searchResults: (searchText: string, count: number) => `搜索结果：${searchText}（共 ${count} 个）`,
      filterResults: (filterText: string, count: number) => `筛选结果：${filterText}（共 ${count} 个）`,
      loading: {
        title: "加载中...",
        description: "请稍等...",
      },
      emptySearch: {
        title: "未找到书签",
        description: "请尝试其他关键词",
      },
      onlineSearch: {
        title: (searchText: string) => `在线搜索：${searchText}`,
        action: (searchText: string) => `在线搜索：${searchText}`,
      },
      toast: {
        cleanCache: {
          loading: "清除缓存中...",
          success: "缓存已清除",
          error: "清除缓存失败",
        },
      },
    },

    quickBookmark: {
      gettingBrowserUrl: "正在获取浏览器链接...",
      failedToGetBrowserUrl: {
        title: "获取浏览器链接失败",
        message: "请确认浏览器已打开且有活动标签页",
      },
      creatingBookmark: "正在创建书签...",
      failedToCreateBookmark: "创建书签失败",
      successHud: "✓ 已创建书签",
      failureToastTitle: "快速创建书签失败",
    },
  },
};
